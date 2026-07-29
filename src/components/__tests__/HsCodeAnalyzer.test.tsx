import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HsCodeAnalyzer } from '@/components/tools/HsCodeAnalyzer';
import { analyzeHsCode } from '@/lib/ai-service';

vi.mock('@/lib/ai-service', () => ({
  analyzeHsCode: vi.fn(),
}));

const analyzeMock = vi.mocked(analyzeHsCode);

describe('HsCodeAnalyzer', () => {
  beforeEach(() => {
    analyzeMock.mockReset();
  });

  it('submits accessible market, origin, and product controls', async () => {
    const user = userEvent.setup();
    analyzeMock.mockResolvedValue({
      mode: 'live',
      sourceLabel: 'AI-generated tariff estimate',
      hsCode6Digit: '6109.10',
      hsCode10Digit: '6109.10.00.12',
      productDescription: 'Cotton T-shirt',
      categoryName: 'Textiles',
      destinationMarket: 'EU',
      originCountry: 'Vietnam (VN)',
      dutyRates: {
        baseDutyPercent: 12,
        section301Percent: 0,
        additionalTaxesPercent: 2,
        effectiveDutyPercent: 14,
      },
      dutyBreakdownNotes: ['Verify the current TARIC rate.'],
      regulatoryWarnings: ['Requirements depend on the final product.'],
      alternativeHsCodes: [],
    });

    render(<HsCodeAnalyzer />);

    const usButton = screen.getByRole('button', {
      name: /USA \(HTSUS\)/i,
    });
    const euButton = screen.getByRole('button', {
      name: /European Union \(TARIC\)/i,
    });
    expect(usButton).toHaveAttribute('aria-pressed', 'true');
    expect(euButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(euButton);
    await user.selectOptions(
      screen.getByRole('combobox', { name: /Country of origin/i }),
      'VN',
    );
    await user.type(
      screen.getByRole('textbox', {
        name: /Describe the product or enter an HS code/i,
      }),
      'cotton T-shirt',
    );
    await user.click(
      screen.getByRole('button', { name: /Analyze HS Code/i }),
    );

    expect(analyzeMock).toHaveBeenCalledWith({
      query: 'cotton T-shirt',
      destinationMarket: 'EU',
      originCountry: 'VN',
    });
    expect(await screen.findByText('Live AI estimate')).toBeInTheDocument();
    expect(
      screen.getByText('AI-generated tariff estimate'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Verification required/i)).toBeInTheDocument();
    expect(euButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows service errors as alerts and does not keep a stale result', async () => {
    const user = userEvent.setup();
    analyzeMock
      .mockResolvedValueOnce({
        mode: 'demo',
        sourceLabel: 'Limited U.S. tariff demo data',
        hsCode6Digit: '7323.93',
        hsCode10Digit: '7323.93.00.80',
        productDescription: 'Stainless steel drinkware',
        categoryName: 'Drinkware',
        destinationMarket: 'US',
        originCountry: 'China (CN)',
        dutyRates: {
          baseDutyPercent: 3.4,
          section301Percent: 7.5,
          additionalTaxesPercent: 0.3464,
          effectiveDutyPercent: 11.2464,
        },
        dutyBreakdownNotes: [],
        regulatoryWarnings: [],
        alternativeHsCodes: [],
      })
      .mockRejectedValueOnce(
        new Error('This request is not covered by the limited demo data.'),
      );

    render(<HsCodeAnalyzer />);

    const query = screen.getByRole('textbox', {
      name: /Describe the product or enter an HS code/i,
    });
    await user.type(query, 'stainless steel bottle');
    await user.click(
      screen.getByRole('button', { name: /Analyze HS Code/i }),
    );
    expect(await screen.findByText('Limited demo result')).toBeInTheDocument();

    await user.clear(query);
    await user.type(query, 'wireless earbuds');
    await user.click(
      screen.getByRole('button', { name: /Analyze HS Code/i }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'This request is not covered by the limited demo data.',
    );
    expect(screen.queryByText('Limited demo result')).not.toBeInTheDocument();
  });
});
