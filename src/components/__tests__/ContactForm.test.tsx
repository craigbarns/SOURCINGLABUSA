import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/ContactForm';

afterEach(() => vi.unstubAllGlobals());

async function fillBrief() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Your name'), 'Test Brand');
  await user.type(screen.getByLabelText('Email address'), 'test@example.com');
  await user.selectOptions(
    screen.getByLabelText('What are you creating?'),
    'Packaging',
  );
  await user.type(
    screen.getByLabelText('A little about your idea'),
    '500 custom paper boxes.',
  );
  return user;
}

describe('ContactForm', () => {
  it('waits for the server, preserves Netlify fields, and focuses confirmed success', async () => {
    let respond!: (response: { ok: boolean }) => void;
    const fetchMock = vi.fn(
      () =>
        new Promise((resolve) => {
          respond = resolve;
        }),
    );
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm appearance="editorial" />);
    const user = await fillBrief();
    await user.click(
      screen.getByRole('button', { name: 'Send your project brief' }),
    );
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    const [url, request] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe('/contact.html');
    const body = new URLSearchParams(String(request.body));
    expect(body.get('form-name')).toBe('contact');
    expect(body.get('projectType')).toBe('Packaging');
    expect(body.get('message')).toBe('500 custom paper boxes.');
    await act(async () => respond({ ok: true }));
    expect(screen.getByRole('status')).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent('Brief received.');
  });

  it('retains the brief and offers an email fallback after a failed submission', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(<ContactForm appearance="editorial" />);
    const user = await fillBrief();
    await user.click(
      screen.getByRole('button', { name: 'Send your project brief' }),
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Your brief could not be sent',
    );
    expect(screen.getByLabelText('A little about your idea')).toHaveValue(
      '500 custom paper boxes.',
    );
    expect(
      screen.getByRole('button', { name: 'Send your project brief' }),
    ).toBeEnabled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
