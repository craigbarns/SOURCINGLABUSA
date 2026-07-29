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

  it("shows success message only after server confirmation", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue({
        message: 'Your registration has been saved.',
      }),
    } as unknown as Response);

    render(<WaitlistSection />);

    await user.type(
      screen.getByRole('textbox', { name: /Work Email Address/i }),
      'OWNER@EXAMPLE.COM',
    );
    await user.click(screen.getByRole('button', { name: /Claim Priority Access/i }));

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
        name: /You are on the list!/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('owner@example.com')).toBeInTheDocument();
  });

  it('shows duplicate error message and keeps form filled', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 409,
      json: vi.fn().mockResolvedValue({
        message: 'This email address is already registered.',
      }),
    } as unknown as Response);

    render(<WaitlistSection />);

    await user.type(
      screen.getByRole('textbox', { name: /Work Email Address/i }),
      'deja@example.com',
    );
    await user.click(screen.getByRole('button', { name: /Claim Priority Access/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'This email address is already registered.',
    );
    expect(
      screen.getByRole('textbox', { name: /Work Email Address/i }),
    ).toHaveValue('deja@example.com');
    expect(
      screen.queryByRole('heading', {
        name: /You are on the list!/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("shows temporary unavailable notice without false success", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      json: vi.fn().mockResolvedValue({
        message:
          "Registration is temporarily unavailable. Please try again later.",
      }),
    } as unknown as Response);

    render(<WaitlistSection />);

    await user.type(
      screen.getByRole('textbox', { name: /Work Email Address/i }),
      'buyer@example.com',
    );
    await user.click(screen.getByRole('button', { name: /Claim Priority Access/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "Registration is temporarily unavailable.",
    );
    expect(
      screen.queryByRole('heading', {
        name: /You are on the list!/i,
      }),
    ).not.toBeInTheDocument();
  });
});
