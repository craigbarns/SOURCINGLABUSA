import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('exposes product navigation and a real app link from marketing', () => {
    render(<Navbar area="marketing" />);

    expect(
      screen.getByRole('link', { name: /SourcingLab/i }),
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('link', { name: /Analyze a quote/i }),
    ).toHaveAttribute('href', '/app');
    expect(
      screen.getByRole('link', { name: 'Product' }),
    ).toHaveAttribute('href', '#product');
  });

  it('uses inter-domain alias to return to marketing', () => {
    render(<Navbar area="app" />);

    expect(
      screen.getByRole('link', { name: /SourcingLab/i }),
    ).toHaveAttribute('href', '/marketing');
    expect(
      screen.getByRole('link', { name: /Back to website/i }),
    ).toHaveAttribute('href', '/marketing');
    expect(
      screen.queryByRole('navigation', { name: /Primary navigation/i }),
    ).not.toBeInTheDocument();
  });
});
