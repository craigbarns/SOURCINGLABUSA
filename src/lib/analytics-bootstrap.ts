export const GA_MEASUREMENT_ID = 'G-ZJ0M56QGGM';

/** Initialize the official gtag queue only on the configured live origins. */
export function analyticsBootstrap(origins: string[]): string {
  return `(function () {
    var allowedOrigins = ${JSON.stringify(origins).replace(/</g, '\\u003c')};
    window.sourcingAnalyticsEnabled = allowedOrigins.indexOf(window.location.origin) !== -1;
    if (!window.sourcingAnalyticsEnabled) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', '${GA_MEASUREMENT_ID}');
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
    document.head.appendChild(tag);
  })();`;
}
