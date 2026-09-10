import '@testing-library/jest-dom/vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactForm } from '@/components/ContactForm';
import { PROJECT_TYPE_LABELS } from '@/lib/validation/contact';
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

  it('prevents native submission and entering details before hydration', () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<ContactForm />);
    const form = container.querySelector('form')!;
    expect(form.method).toBe('post');
    for (const control of form.querySelectorAll('input, select, textarea, button')) {
      expect(control).toBeDisabled();
    }

    render(<ContactForm />, { container, hydrate: true });

    expect(container.querySelector('input[name="name"]')).toBeEnabled();
    expect(container.querySelector('button[type="submit"]')).toBeEnabled();
    expect(fetchMock).not.toHaveBeenCalled();
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
      json: vi.fn().mockResolvedValue({ message: 'Brief received.', delivery: ['database'] }),
    } as unknown as Response);

    render(<ContactForm appearance="editorial" />);
    await fillRequiredFields(user);
    await user.click(
      screen.getByRole('button', { name: /Send my project brief/i }),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    const apiCall = fetchMock.mock.calls.find(([target]) => target === '/api/contact');
    expect(apiCall).toBeDefined();
    const [url, init] = apiCall as [string, RequestInit];
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

  // Regression guard: replaying this POST from the server made Netlify score
  // every submission as spam, which silences the notification email.
  it('submits to Netlify Forms from the browser, with the detected field names', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue({ delivery: ['database'] }),
    } as unknown as Response);

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole('button', { name: /Send my project brief/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    const netlifyCall = fetchMock.mock.calls.find(([target]) => target === '/contact.html');
    expect(netlifyCall).toBeDefined();

    const init = netlifyCall![1] as RequestInit;
    expect(init.headers).toMatchObject({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const fields = new URLSearchParams(String(init.body));
    expect(fields.get('form-name')).toBe('contact');
    expect(fields.get('projectType')).toBe(PROJECT_TYPE_LABELS.packaging);
    expect(fields.get('bot-field')).toBe('');
  });

  it('still succeeds when the database is unavailable but Netlify accepts it', async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementation((target: string) =>
      Promise.resolve(
        target === '/contact.html'
          ? ({ ok: true, status: 200, json: vi.fn() } as unknown as Response)
          : ({
              ok: false,
              status: 503,
              json: vi.fn().mockResolvedValue({ message: 'Storage unavailable.' }),
            } as unknown as Response),
      ),
    );

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole('button', { name: /Send my project brief/i }));

    expect(await screen.findByText('Brief received.')).toBeInTheDocument();
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
