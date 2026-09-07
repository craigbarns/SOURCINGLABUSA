/**
 * Thin GA4 wrapper. Without conversion events the funnel cannot be measured,
 * so every commercial interaction on the marketing site reports through here.
 *
 * Analytics must never break the interface: every call is defensive and fails
 * silently when the tag is blocked, deferred, or absent.
 */

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const ANALYTICS_EVENTS = {
  ctaClick: 'cta_click',
  formStart: 'form_start',
  formError: 'form_error',
  lead: 'generate_lead',
  emailCopy: 'email_copy',
  emailFallback: 'email_fallback_used',
} as const;

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
      return;
    }

    // The tag loads after hydration, so queue early events on the data layer.
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: name, ...payload });
  } catch {
    // Measurement is never worth a broken page.
  }
}

/** Records a click on a commercial call to action, with its position. */
export function trackCtaClick(location: string, label: string): void {
  trackEvent(ANALYTICS_EVENTS.ctaClick, { cta_location: location, cta_label: label });
}
