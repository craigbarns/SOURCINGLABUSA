import '@testing-library/jest-dom/vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactForm } from '@/components/ContactForm';
import { trackEvent } from '@/lib/analytics';

vi.mock('@/lib/analytics', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/analytics')>();
  return { ...original, trackEvent: vi.fn() };
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/custom-packaging',
}));

const fetchMock = vi.fn();

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Your name/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/Work email/i), 'jane@example.com');
  await user.selectOptions(
    screen.getByLabelText(/What do you need/i),
    'packaging',
  );
}

describe('ContactForm', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.mocked(trackEvent).mockClear();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('blocks submission and shows field errors when required details are missing', async () => {
    const user = userEvent.setup();
    render(<ContactForm appearance="editorial" />);

    await user.click(
      screen.getByRole('button', { name: /Send my project brief/i }),
    );

    expect(
      await screen.findByText('Please enter your name.'),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the brief to the server route with its source page', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue({ message: 'Brief received.' }),
    } as unknown as Response);

    render(<ContactForm appearance="editorial" />);
    await fillRequiredFields(user);
    await user.click(
      screen.getByRole('button', { name: /Send my project brief/i }),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/contact');
    expect(JSON.parse(String(init.body))).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
      projectType: 'packaging',
      quantityRange: 'not_sure',
      sourcePath: '/custom-packaging',
    });

    expect(await screen.findByText('Brief received.')).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith('generate_lead', expect.objectContaining({ project_type: 'packaging', source_path: '/custom-packaging' }));
  });

  it('offers an email fallback carrying the brief when delivery fails', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      json: vi.fn().mockResolvedValue({ message: 'Delivery unavailable.' }),
    } as unknown as Response);

    render(<ContactForm appearance="editorial" />);
    await fillRequiredFields(user);
    await user.type(screen.getByLabelText(/Your brief/i), '5000 rigid boxes');
    await user.click(
      screen.getByRole('button', { name: /Send my project brief/i }),
    );

    expect(
      await screen.findByText('Delivery unavailable.'),
    ).toBeInTheDocument();

    const fallback = screen.getByRole('link', {
      name: /Send it by email instead/i,
    });
    expect(fallback.getAttribute('href')).toContain(
      'mailto:contact@sourcinglabusa.com',
    );
    expect(fallback.getAttribute('href')).toContain(
      encodeURIComponent('5000 rigid boxes'),
    );
    expect(vi.mocked(trackEvent).mock.calls.some(([name]) => name === 'generate_lead')).toBe(false);
  });

  it('starts a category inquiry with the relevant product selected but allows changing it', async () => {
    const user = userEvent.setup();
    render(<ContactForm initialProjectType="textile" />);
    const select = screen.getByLabelText(/What do you need/i);
    expect(select).toHaveValue('textile');
    await user.selectOptions(select, 'both');
    expect(select).toHaveValue('both');
  });
});
