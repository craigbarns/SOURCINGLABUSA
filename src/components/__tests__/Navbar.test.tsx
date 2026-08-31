import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('exposes service navigation and scrolls to project contact from marketing', () => {
    render(<Navbar area="marketing" />);

    expect(
      screen.getByRole('link', { name: /SourcingLab/i }),
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('link', { name: /Send a project brief/i }),
    ).toHaveAttribute('href', '#contact');
    expect(
      screen.getByRole('link', { name: 'Offerings' }),
    ).toHaveAttribute('href', '/#offerings');
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
