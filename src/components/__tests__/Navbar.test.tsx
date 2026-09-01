import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      screen.getByRole('link', { name: 'Packaging' }),
    ).toHaveAttribute('href', '/custom-packaging');
    expect(
      screen.getByRole('link', { name: 'Private label' }),
    ).toHaveAttribute('href', '/private-label-packaging');
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

  it('offers Spanish switching in the mobile navigation', async () => {
    const user = userEvent.setup();
    render(<Navbar area="marketing" />);

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));

    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' });
    expect(
      within(mobileNavigation).getByRole('link', { name: 'Español' }),
    ).toHaveAttribute('href', '/es');
    expect(
      within(mobileNavigation).getByRole('link', { name: 'English' }),
    ).toHaveAttribute('href', '/');
  });
});
