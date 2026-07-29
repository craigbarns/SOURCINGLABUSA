export const DEFAULT_MARKETING_ORIGIN = 'https://sourcinglabusa.com';
export const DEFAULT_APP_ORIGIN = 'https://app.sourcinglabusa.com';

type RoutingEnvironment = {
  [key: string]: string | undefined;
  MARKETING_ORIGIN?: string;
  APP_ORIGIN?: string;
};

export interface DomainRoutingConfig {
  marketingOrigin: string;
  appOrigin: string;
  marketingHostname: string;
  appHostname: string;
}

export type DomainRoutingDecision =
  | {
      kind: 'next';
      area: 'marketing' | 'app' | 'preview';
    }
  | {
      kind: 'redirect';
      destination: string;
      permanent: boolean;
    }
  | {
      kind: 'rewrite';
      destination: string;
      area: 'app';
    }
  | {
      kind: 'app-robots';
    };

function parseOrigin(value: string | undefined, fallback: string, name: string) {
  const candidate = value?.trim() || fallback;

  try {
    const url = new URL(candidate);
    const hasUnexpectedParts =
      (url.protocol !== 'http:' && url.protocol !== 'https:') ||
      url.pathname !== '/' ||
      Boolean(url.search) ||
      Boolean(url.hash) ||
      Boolean(url.username) ||
      Boolean(url.password);

    if (hasUnexpectedParts) {
      throw new Error('origin must only contain a scheme, host, and optional port');
    }

    return url;
  } catch {
    throw new Error(
      `${name} doit être une origine HTTP(S) absolue sans chemin, par exemple ${fallback}.`,
    );
  }
}

export function getDomainRoutingConfig(
  environment: RoutingEnvironment = process.env,
): DomainRoutingConfig {
  const marketingUrl = parseOrigin(
    environment.MARKETING_ORIGIN,
    DEFAULT_MARKETING_ORIGIN,
    'MARKETING_ORIGIN',
  );
  const appUrl = parseOrigin(
    environment.APP_ORIGIN,
    DEFAULT_APP_ORIGIN,
    'APP_ORIGIN',
  );

  // If marketing and app share the same hostname (e.g. single domain deployment or Vercel preview), handle gracefully without crashing
  return {
    marketingOrigin: marketingUrl.origin,
    appOrigin: appUrl.origin,
    marketingHostname: marketingUrl.hostname.toLowerCase(),
    appHostname: appUrl.hostname.toLowerCase(),
  };
}

export function normalizeHostname(rawHost: string | null | undefined) {
  const firstHost = rawHost?.split(',')[0]?.trim();

  if (!firstHost) {
    return '';
  }

  try {
    return new URL(`http://${firstHost}`)
      .hostname.replace(/^\[|\]$/g, '')
      .toLowerCase();
  } catch {
    return firstHost
      .replace(/:\d+$/, '')
      .replace(/^\[|\]$/g, '')
      .toLowerCase();
  }
}

function isPathWithin(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function targetUrl(origin: string, pathname: string, requestUrl: URL) {
  const destination = new URL(origin);
  destination.pathname = pathname;
  destination.search = requestUrl.search;
  return destination.toString();
}

function pathAfterPrefix(pathname: string, prefix: string) {
  const suffix = pathname.slice(prefix.length);
  return suffix || '/';
}

function appRewriteUrl(requestUrl: URL) {
  const destination = new URL(requestUrl);
  destination.pathname =
    requestUrl.pathname === '/' ? '/app' : `/app${requestUrl.pathname}`;
  return destination.toString();
}

function localMarketingUrl(requestUrl: URL, pathname = '/') {
  const destination = new URL(requestUrl);
  destination.hostname = 'localhost';
  destination.pathname = pathname;
  return destination.toString();
}

export function resolveDomainRoute(
  requestUrl: URL,
  rawHostname: string,
  config: DomainRoutingConfig,
): DomainRoutingDecision {
  const hostname = normalizeHostname(rawHostname);
  const { pathname } = requestUrl;
  const isAppPath = isPathWithin(pathname, '/app');
  const isMarketingAliasPath = isPathWithin(pathname, '/marketing');
  const isMarketingHost = hostname === config.marketingHostname;
  const isMarketingAlias = hostname === `www.${config.marketingHostname}`;
  const isAppHost = hostname === config.appHostname;
  const isLocalMarketingHost =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  const isLocalAppHost = hostname === 'app.localhost';

  if (isAppHost) {
    if (pathname === '/robots.txt') {
      return { kind: 'app-robots' };
    }

    if (isMarketingAliasPath) {
      return {
        kind: 'redirect',
        destination: targetUrl(
          config.marketingOrigin,
          pathAfterPrefix(pathname, '/marketing'),
          requestUrl,
        ),
        permanent: false,
      };
    }

    if (isAppPath) {
      return { kind: 'next', area: 'app' };
    }

    return {
      kind: 'rewrite',
      destination: appRewriteUrl(requestUrl),
      area: 'app',
    };
  }

  if (isMarketingHost || isMarketingAlias) {
    if (isAppPath) {
      return {
        kind: 'redirect',
        destination: targetUrl(
          config.appOrigin,
          pathAfterPrefix(pathname, '/app'),
          requestUrl,
        ),
        permanent: true,
      };
    }

    if (isMarketingAliasPath) {
      return {
        kind: 'redirect',
        destination: targetUrl(
          config.marketingOrigin,
          pathAfterPrefix(pathname, '/marketing'),
          requestUrl,
        ),
        permanent: true,
      };
    }

    if (isMarketingAlias) {
      return {
        kind: 'redirect',
        destination: targetUrl(config.marketingOrigin, pathname, requestUrl),
        permanent: true,
      };
    }

    return { kind: 'next', area: 'marketing' };
  }

  if (isLocalAppHost) {
    if (pathname === '/robots.txt') {
      return { kind: 'app-robots' };
    }

    if (isMarketingAliasPath) {
      return {
        kind: 'redirect',
        destination: localMarketingUrl(
          requestUrl,
          pathAfterPrefix(pathname, '/marketing'),
        ),
        permanent: false,
      };
    }

    if (isAppPath) {
      return { kind: 'next', area: 'app' };
    }

    return {
      kind: 'rewrite',
      destination: appRewriteUrl(requestUrl),
      area: 'app',
    };
  }

  if (isLocalMarketingHost) {
    if (isMarketingAliasPath) {
      const destination = new URL(requestUrl);
      destination.pathname = pathAfterPrefix(pathname, '/marketing');
      return {
        kind: 'redirect',
        destination: destination.toString(),
        permanent: false,
      };
    }

    return { kind: 'next', area: isAppPath ? 'app' : 'marketing' };
  }

  if (isMarketingAliasPath) {
    const destination = new URL(requestUrl);
    destination.pathname = pathAfterPrefix(pathname, '/marketing');
    return {
      kind: 'redirect',
      destination: destination.toString(),
      permanent: false,
    };
  }

  return { kind: 'next', area: isAppPath ? 'app' : 'preview' };
}
