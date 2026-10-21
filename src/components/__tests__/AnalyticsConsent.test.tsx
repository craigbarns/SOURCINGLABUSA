import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { AnalyticsConsent } from '@/components/AnalyticsConsent';
import { ANALYTICS_CONSENT_EVENT } from '@/lib/analytics-bootstrap';

afterEach(() => {
  delete window.sourcingAnalyticsConsent;
  delete window.sourcingSetAnalyticsConsent;
});

it('offers equal explicit choices and permits a later withdrawal', () => {
  window.sourcingAnalyticsConsent = null;
  window.sourcingSetAnalyticsConsent = vi.fn((granted: boolean) => {
    window.sourcingAnalyticsConsent = granted ? 'granted' : 'denied';
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  });
  render(<AnalyticsConsent />);
  expect(screen.getByRole('button', { name: 'Decline analytics' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Allow analytics' }));
  expect(window.sourcingSetAnalyticsConsent).toHaveBeenLastCalledWith(true);
  fireEvent.click(screen.getByRole('button', { name: 'Analytics settings' }));
  fireEvent.click(screen.getByRole('button', { name: 'Decline analytics' }));
  expect(window.sourcingSetAnalyticsConsent).toHaveBeenLastCalledWith(false);
  expect(screen.getByRole('button', { name: 'Analytics settings' })).toBeVisible();
});
