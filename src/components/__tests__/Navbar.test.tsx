import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('expose de vrais liens vers les deux espaces depuis le marketing', () => {
    render(<Navbar area="marketing" />);

    expect(
      screen.getByRole('link', { name: 'Retour à l’accueil SourcingLab' }),
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('link', { name: /Lancer l'App Copilote/i }),
    ).toHaveAttribute('href', '/app');
    expect(
      screen.getByRole('link', { name: 'Landing Page' }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('utilise l’alias inter-domaine pour revenir au marketing', () => {
    render(<Navbar area="app" />);

    expect(
      screen.getByRole('link', { name: 'Retour à l’accueil SourcingLab' }),
    ).toHaveAttribute('href', '/marketing');
    expect(
      screen.getByRole('link', { name: /Lancer l'App Copilote/i }),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      screen.getByRole('link', {
        name: /Voir Offres & Liste d'attente/i,
      }),
    ).toHaveAttribute('href', '/marketing');
  });
});
