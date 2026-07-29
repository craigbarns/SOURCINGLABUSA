import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { WaitlistSection } from '@/components/WaitlistSection';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

const fetchMock = vi.fn();

describe('WaitlistSection', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("affiche un succès uniquement après l'enregistrement serveur", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue({
        message: 'Votre inscription a bien été enregistrée.',
      }),
    } as unknown as Response);

    render(<WaitlistSection />);

    await user.type(
      screen.getByRole('textbox', { name: /adresse e-mail professionnelle/i }),
      'OWNER@EXAMPLE.COM',
    );
    await user.click(screen.getByRole('button', { name: /rejoindre/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/waitlist',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'owner@example.com',
          role: 'brand_owner_ecommerce',
        }),
      }),
    );
    expect(
      await screen.findByRole('heading', {
        name: /vous êtes inscrit avec succès/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('owner@example.com')).toBeInTheDocument();
  });

  it('annonce un doublon et conserve le formulaire', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 409,
      json: vi.fn().mockResolvedValue({
        message: 'Cette adresse e-mail est déjà inscrite.',
      }),
    } as unknown as Response);

    render(<WaitlistSection />);

    await user.type(
      screen.getByRole('textbox', { name: /adresse e-mail professionnelle/i }),
      'deja@example.com',
    );
    await user.click(screen.getByRole('button', { name: /rejoindre/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Cette adresse e-mail est déjà inscrite.',
    );
    expect(
      screen.getByRole('textbox', { name: /adresse e-mail professionnelle/i }),
    ).toHaveValue('deja@example.com');
    expect(
      screen.queryByRole('heading', {
        name: /vous êtes inscrit avec succès/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("annonce une indisponibilité sans afficher de faux succès", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      json: vi.fn().mockResolvedValue({
        message:
          "L'inscription est temporairement indisponible. Veuillez réessayer plus tard.",
      }),
    } as unknown as Response);

    render(<WaitlistSection />);

    await user.type(
      screen.getByRole('textbox', { name: /adresse e-mail professionnelle/i }),
      'buyer@example.com',
    );
    await user.click(screen.getByRole('button', { name: /rejoindre/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "L'inscription est temporairement indisponible.",
    );
    expect(
      screen.queryByRole('heading', {
        name: /vous êtes inscrit avec succès/i,
      }),
    ).not.toBeInTheDocument();
  });
});
