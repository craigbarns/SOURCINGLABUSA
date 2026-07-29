import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('exposes real links between spaces from marketing', () => {
    render(<Navbar area="marketing" />);

    expect(
      screen.getByRole('link', { name: /SourcingLab/i }),
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('link', { name: /Launch AI Copilot/i }),
    ).toHaveAttribute('href', '/app');
    expect(
      screen.getByRole('link', { name: 'Landing Page' }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('uses inter-domain alias to return to marketing', () => {
    render(<Navbar area="app" />);

    expect(
      screen.getByRole('link', { name: /SourcingLab/i }),
    ).toHaveAttribute('href', '/marketing');
    expect(
      screen.getByRole('link', { name: /Launch AI Copilot/i }),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      screen.getByRole('link', {
        name: /View Pricing & Waitlist/i,
      }),
    ).toHaveAttribute('href', '/marketing');
  });
});
