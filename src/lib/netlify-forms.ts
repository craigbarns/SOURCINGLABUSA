/**
 * Submits the brief to Netlify Forms from the browser.
 *
 * This has to run in the visitor's browser rather than on the server. Netlify
 * screens every submission for spam, and a POST replayed by a serverless
 * function — one shared IP, no referer, no browser context — is scored as spam
 * and filed away silently, without triggering the notification email. A real
 * browser submission is the supported path.
 *
 * Field names must match the static form in public/contact.html: Netlify only
 * records fields that exist on the form it detected at deploy time.
 */

import type { ValidatedContactInput } from '@/lib/validation/contact';
import {
  PROJECT_TYPE_LABELS,
  QUANTITY_RANGE_LABELS,
} from '@/lib/validation/contact';

export const FORM_DELIVERY_TIMEOUT_MS = 15_000;

export const NETLIFY_FORM_NAME = 'contact';
export const NETLIFY_FORM_PATH = '/contact.html';

export async function submitToNetlifyForms(
  brief: ValidatedContactInput,
): Promise<boolean> {
  const body = new URLSearchParams({
    'form-name': NETLIFY_FORM_NAME,
    name: brief.name,
    email: brief.email,
    company: brief.company ?? '',
    // Readable labels, because this is what lands in the notification email.
    projectType: PROJECT_TYPE_LABELS[brief.projectType],
    quantityRange: QUANTITY_RANGE_LABELS[brief.quantityRange],
    message: brief.message,
    sourcePath: brief.sourcePath,
    locale: brief.locale ?? 'en',
    'bot-field': brief.botField,
  });

  try {
    const response = await fetch(NETLIFY_FORM_PATH, {
      method: 'POST',
      signal: AbortSignal.timeout(FORM_DELIVERY_TIMEOUT_MS),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!response.ok) return false;

    // Netlify's built-in confirmation explicitly acknowledges receipt. A
    // static fallback can also return HTTP 200 (including /contact.html), so
    // its status cannot establish that Forms actually accepted the lead.
    const acknowledgement = await response.text();
    return /Your form submission has been received/i.test(acknowledgement)
      && /Thank you/i.test(acknowledgement);
  } catch {
    // The caller can still succeed when its independent database write is
    // acknowledged. Otherwise it preserves the brief and offers email.
    return false;
  }
}
