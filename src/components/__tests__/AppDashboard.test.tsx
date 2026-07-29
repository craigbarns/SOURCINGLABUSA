import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/tools/QuoteAnalyzer', () => ({
  QuoteAnalyzer: () => (
    <label>
      Quote workspace note
      <input aria-label="Quote workspace note" />
    </label>
  ),
}));

vi.mock('@/components/tools/ProductSpecGenerator', () => ({
  ProductSpecGenerator: () => <div>Product specifications workspace</div>,
}));

vi.mock('@/components/tools/LandedCostCalculator', () => ({
  LandedCostCalculator: () => <div>Landed cost workspace</div>,
}));

vi.mock('@/components/tools/HsCodeAnalyzer', () => ({
  HsCodeAnalyzer: () => <div>Customs workspace</div>,
}));

vi.mock('@/components/tools/SupplierEmailGenerator', () => ({
  SupplierEmailGenerator: () => <div>Supplier email workspace</div>,
}));

import { AppDashboard } from '@/components/AppDashboard';

describe('AppDashboard', () => {
  it('opens on Quote Audit with a real marketing link and accessible tabs', () => {
    render(<AppDashboard marketingHref="/marketing" />);

    expect(
      screen.getByRole('link', { name: 'Back to SourcingLab USA' }),
    ).toHaveAttribute('href', '/marketing');
    expect(screen.getByRole('tablist', { name: 'Sourcing tools' })).toBeVisible();

    const quoteTab = screen.getByRole('tab', { name: 'Quote Audit' });
    const specsTab = screen.getByRole('tab', {
      name: 'Product Specifications',
    });

    expect(quoteTab).toHaveAttribute('aria-selected', 'true');
    expect(quoteTab).toHaveAttribute(
      'aria-controls',
      'sourcing-tool-panel-quote',
    );
    expect(quoteTab).toHaveAttribute('tabindex', '0');
    expect(specsTab).toHaveAttribute('aria-selected', 'false');
    expect(specsTab).toHaveAttribute('tabindex', '-1');

    expect(
      screen.getByRole('tabpanel', { name: 'Quote Audit' }),
    ).toBeVisible();
    const specsPanel = document.getElementById('sourcing-tool-panel-specs');
    expect(specsPanel).toHaveAttribute('hidden');
    expect(specsPanel).not.toBeVisible();
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(5);

    expect(screen.queryByText(/Engine:/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /OpenAI Key/i }),
    ).not.toBeInTheDocument();
  });

  it('supports keyboard tab navigation without losing mounted tool state', async () => {
    const user = userEvent.setup();
    render(<AppDashboard marketingHref="/marketing" />);

    const quoteNote = screen.getByRole('textbox', {
      name: 'Quote workspace note',
    });
    await user.type(quoteNote, 'Keep this analysis');

    const quoteTab = screen.getByRole('tab', { name: 'Quote Audit' });
    quoteTab.focus();
    await user.keyboard('{ArrowRight}');

    const specsTab = screen.getByRole('tab', {
      name: 'Product Specifications',
    });
    expect(specsTab).toHaveFocus();
    expect(specsTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('tabpanel', { name: 'Product Specifications' }),
    ).toBeVisible();

    await user.click(quoteTab);

    expect(quoteTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('textbox', { name: 'Quote workspace note' }),
    ).toHaveValue('Keep this analysis');
  });
});
