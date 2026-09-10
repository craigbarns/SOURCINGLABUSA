import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyticsBootstrap, GA_MEASUREMENT_ID } from '@/lib/analytics-bootstrap';
import { trackEvent } from '@/lib/analytics';

afterEach(() => { vi.unstubAllGlobals(); });

function bootstrap(origin: string) {
  const state = { location: { origin } } as unknown as Window;
  const appendChild = vi.fn();
  const doc = { createElement: () => ({}), head: { appendChild } };
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
    },
  );

  it('queues early conversions as gtag commands after configuration', () => {
    const { state, appendChild } = bootstrap('https://sourcinglabusa.com');
    vi.stubGlobal('window', state);
    trackEvent('generate_lead', { project_type: 'textile', unused: undefined });
    expect(appendChild).toHaveBeenCalledOnce();
    const commands = state.dataLayer!.map((entry) => Array.from(entry as ArrayLike<unknown>));
    expect(commands[1]).toEqual(['config', GA_MEASUREMENT_ID]);
    expect(commands[2]).toEqual(['event', 'generate_lead', { project_type: 'textile' }]);
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
