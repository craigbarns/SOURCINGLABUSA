export const GA_MEASUREMENT_ID = 'G-ZJ0M56QGGM';
export const ANALYTICS_CONSENT_KEY = 'sourcing-analytics-consent-v1';
export const ANALYTICS_CONSENT_EVENT = 'sourcing-analytics-consent';

/** Basic consent mode: no Google script or measurement until explicit consent. */
export function analyticsBootstrap(origins: string[]): string {
  return `(function () {
    var allowedOrigins = ${JSON.stringify(origins).replace(/</g, '\\u003c')};
    var allowed = allowedOrigins.indexOf(window.location.origin) !== -1;
    var initialized = false;
    var consentKey = '${ANALYTICS_CONSENT_KEY}';
    var disableKey = 'ga-disable-${GA_MEASUREMENT_ID}';
    window.sourcingAnalyticsEnabled = false;
    window[disableKey] = true;

    function savedChoice() {
      try {
        var choice = window.localStorage.getItem(consentKey);
        return choice === 'granted' || choice === 'denied' ? choice : null;
      } catch (_) { return null; }
    }

    function removeAnalyticsCookies() {
      var hostname = window.location.hostname;
      var domains = ['', hostname];
      var parts = hostname.split('.');
      for (var i = 0; i < parts.length - 1; i++) {
        domains.push('.' + parts.slice(i).join('.'));
      }
      document.cookie.split(';').forEach(function (cookie) {
        var name = cookie.split('=')[0].trim();
        if (!/^(_ga($|_)|_gid$|_gat($|_))/.test(name)) return;
        domains.forEach(function (domain) {
          document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
        });
      });
    }

    function applyChoice(choice, persist) {
      var granted = choice === 'granted' && allowed;
      window.sourcingAnalyticsConsent = choice;
      window.sourcingAnalyticsEnabled = granted;
      window[disableKey] = !granted;
      if (persist) {
        try { window.localStorage.setItem(consentKey, choice); } catch (_) {}
      }
      if (granted) {
        if (!initialized) {
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
          window.gtag('consent', 'default', {
            analytics_storage: 'denied', ad_storage: 'denied',
            ad_user_data: 'denied', ad_personalization: 'denied'
          });
          window.gtag('consent', 'update', { analytics_storage: 'granted' });
          window.gtag('js', new Date());
          window.gtag('config', '${GA_MEASUREMENT_ID}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            page_location: window.location.origin + window.location.pathname
          });
          var tag = document.createElement('script');
          tag.async = true;
          tag.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
          document.head.appendChild(tag);
          initialized = true;
        } else {
          window.gtag('consent', 'update', { analytics_storage: 'granted' });
        }
      } else {
        if (initialized) {
          window.gtag('consent', 'update', { analytics_storage: 'denied' });
        }
        removeAnalyticsCookies();
      }
      window.dispatchEvent(new Event('${ANALYTICS_CONSENT_EVENT}'));
    }

    window.sourcingSetAnalyticsConsent = function (granted) {
      applyChoice(granted ? 'granted' : 'denied', true);
    };
    applyChoice(savedChoice(), false);
    window.addEventListener('storage', function (event) {
      if (event.key === consentKey || event.key === null) applyChoice(savedChoice(), false);
    });
  })();`;
}
