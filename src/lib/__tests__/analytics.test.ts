import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyticsBootstrap, ANALYTICS_CONSENT_KEY, GA_MEASUREMENT_ID } from '@/lib/analytics-bootstrap';
import { trackEvent } from '@/lib/analytics';

afterEach(() => { vi.unstubAllGlobals(); });

function bootstrap(origin: string, savedChoice: string | null = null) {
  const state = {
    location: new URL(origin),
    localStorage: { getItem: vi.fn(() => savedChoice), setItem: vi.fn() },
    addEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as Window;
  const appendChild = vi.fn();
  const doc = { createElement: () => ({}), head: { appendChild }, cookie: '' };
  // Execute the same inline script emitted in the document without networking.
  new Function('window', 'document', analyticsBootstrap(['https://sourcinglabusa.com', 'https://app.sourcinglabusa.com']))(state, doc);
  return { state, appendChild };
}

describe('commercial analytics', () => {
  it.each(['http://localhost:3000', 'https://deploy-preview-2--example.netlify.app', 'https://sourcinglabusa.com.example.org'])(
    'does not load production analytics on %s', (origin) => {
      const { state, appendChild } = bootstrap(origin);
      expect(state.sourcingAnalyticsEnabled).toBe(false);
      expect(appendChild).not.toHaveBeenCalled();
      expect(state.gtag).toBeUndefined();
      state.sourcingSetAnalyticsConsent!(true);
      expect(state.sourcingAnalyticsEnabled).toBe(false);
      expect(appendChild).not.toHaveBeenCalled();
    },
  );

  it('does not load the tag or queue conversions before a choice or after rejection', () => {
    const { state, appendChild } = bootstrap('https://sourcinglabusa.com');
    vi.stubGlobal('window', state);
    trackEvent('generate_lead');
    expect(state.sourcingAnalyticsEnabled).toBe(false);
    expect(state.gtag).toBeUndefined();
    state.sourcingSetAnalyticsConsent!(false);
    expect(state.localStorage.setItem).toHaveBeenCalledWith(ANALYTICS_CONSENT_KEY, 'denied');
    expect(appendChild).not.toHaveBeenCalled();
    expect(state.gtag).toBeUndefined();
  });

  it('queues early conversions as gtag commands after configuration', () => {
    const { state, appendChild } = bootstrap('https://sourcinglabusa.com');
    vi.stubGlobal('window', state);
    state.sourcingSetAnalyticsConsent!(true);
    trackEvent('generate_lead', { project_type: 'textile', unused: undefined });
    expect(appendChild).toHaveBeenCalledOnce();
    const commands = state.dataLayer!.map((entry) => Array.from(entry as ArrayLike<unknown>));
    expect(commands[0]).toEqual(['consent', 'default', expect.objectContaining({ analytics_storage: 'denied', ad_storage: 'denied' })]);
    expect(commands[1]).toEqual(['consent', 'update', { analytics_storage: 'granted' }]);
    expect(commands[3]).toEqual(['config', GA_MEASUREMENT_ID, expect.objectContaining({ allow_google_signals: false })]);
    expect(commands[4]).toEqual(['event', 'generate_lead', { project_type: 'textile' }]);
  });

  it('restores explicit consent and stops future events on withdrawal without duplicating the tag', () => {
    const { state, appendChild } = bootstrap('https://sourcinglabusa.com', 'granted');
    vi.stubGlobal('window', state);
    expect(state.sourcingAnalyticsEnabled).toBe(true);
    expect(appendChild).toHaveBeenCalledOnce();
    state.sourcingSetAnalyticsConsent!(false);
    const count = state.dataLayer!.length;
    trackEvent('generate_lead');
    expect(state.dataLayer).toHaveLength(count);
    expect(state.sourcingAnalyticsEnabled).toBe(false);
    expect((state as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(true);
    state.sourcingSetAnalyticsConsent!(true);
    expect(appendChild).toHaveBeenCalledOnce();
    expect(state.sourcingAnalyticsEnabled).toBe(true);
  });

  it('restores denial and treats unrecognized saved choices as no consent', () => {
    for (const saved of ['denied', 'yes', 'corrupt']) {
      const { state, appendChild } = bootstrap('https://sourcinglabusa.com', saved);
      expect(state.sourcingAnalyticsEnabled).toBe(false);
      expect(appendChild).not.toHaveBeenCalled();
    }
  });

  it('keeps forms working if a tag is unavailable or throws', () => {
    vi.stubGlobal('window', { sourcingAnalyticsEnabled: false, gtag: vi.fn() });
    trackEvent('generate_lead');
    expect(window.gtag).not.toHaveBeenCalled();
    window.sourcingAnalyticsEnabled = true;
    window.gtag = () => { throw new Error('blocked'); };
    expect(() => trackEvent('generate_lead')).not.toThrow();
  });
});
