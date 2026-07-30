import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { QuoteReportActions } from '@/components/tools/QuoteReportActions';
import type { QuoteAnalysisResponse } from '@/lib/types';

const result: QuoteAnalysisResponse = {
  mode: 'live',
  providers: { ocr: 'mistral', extraction: 'openai', analysis: 'openai' },
  quotes: [],
  comparison: {
    comparability: 'high',
    summary: 'Two comparable offers in USD.',
    recommendedQuoteFileName: 'a.pdf',
    priceSpreadPercent: 18,
    ranking: [
      {
        rank: 1,
        fileName: 'a.pdf',
        supplierName: 'Shenzhen Alpha',
        amount: 12000,
        currency: 'USD',
        basis: 'weighted_unit_price',
      },
    ],
    mathChecks: [],
    vigilancePoints: [],
    recommendations: [],
  },
  warning: null,
};

function setClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('QuoteReportActions', () => {
  it('copies the deterministic summary and confirms success', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);

    render(<QuoteReportActions result={result} />);

    await user.click(screen.getByRole('button', { name: /Copy summary/i }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toContain(
      'SUPPLIER QUOTE COMPARISON — SourcingLab USA',
    );
    expect(writeText.mock.calls[0][0]).toContain('Shenzhen Alpha');
    expect(
      await screen.findByRole('button', { name: /^Copied$/i }),
    ).toBeInTheDocument();
  });

  it('surfaces a failure state when copying is rejected', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    setClipboard(writeText);
    Object.assign(document, { execCommand: vi.fn().mockReturnValue(false) });

    render(<QuoteReportActions result={result} />);

    await user.click(screen.getByRole('button', { name: /Copy summary/i }));

    expect(
      await screen.findByRole('button', { name: /Copy failed/i }),
    ).toBeInTheDocument();
  });

  it('triggers the browser print dialog', async () => {
    const user = userEvent.setup();
    setClipboard(vi.fn().mockResolvedValue(undefined));
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});

    render(<QuoteReportActions result={result} />);

    await user.click(
      screen.getByRole('button', { name: /Print \/ Save as PDF/i }),
    );

    expect(print).toHaveBeenCalledTimes(1);
  });
});
