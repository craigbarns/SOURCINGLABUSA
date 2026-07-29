import { describe, expect, it } from 'vitest';

import {
  DEFAULT_APP_ORIGIN,
  DEFAULT_MARKETING_ORIGIN,
  getDomainRoutingConfig,
  normalizeHostname,
  resolveDomainRoute,
} from '@/lib/routing/subdomains';

const config = getDomainRoutingConfig({});

function resolve(url: string, hostname: string) {
  return resolveDomainRoute(new URL(url), hostname, config);
}

describe('configuration des domaines', () => {
  it('utilise les domaines de production par défaut', () => {
    expect(config).toEqual({
      marketingOrigin: DEFAULT_MARKETING_ORIGIN,
      appOrigin: DEFAULT_APP_ORIGIN,
      marketingHostname: 'sourcinglabusa.com',
      appHostname: 'app.sourcinglabusa.com',
    });
  });

  it('accepte deux origines HTTP(S) configurées', () => {
    expect(
      getDomainRoutingConfig({
        MARKETING_ORIGIN: 'http://marketing.localhost:3000',
        APP_ORIGIN: 'http://app.localhost:3000',
      }),
    ).toMatchObject({
      marketingOrigin: 'http://marketing.localhost:3000',
      appOrigin: 'http://app.localhost:3000',
      marketingHostname: 'marketing.localhost',
      appHostname: 'app.localhost',
    });
  });

  it('accepte une origine identique pour les déploiements monopasse ou Vercel', () => {
    expect(
      getDomainRoutingConfig({
        MARKETING_ORIGIN: 'https://example.com',
        APP_ORIGIN: 'https://example.com',
      }),
    ).toMatchObject({
      marketingOrigin: 'https://example.com',
      appOrigin: 'https://example.com',
      marketingHostname: 'example.com',
      appHostname: 'example.com',
    });
  });
});

describe('normalisation des hôtes', () => {
  it('retire le port et ignore les valeurs forwarded secondaires', () => {
    expect(
      normalizeHostname('App.SourcingLabUSA.com:443, internal.vercel.app'),
    ).toBe('app.sourcinglabusa.com');
    expect(normalizeHostname('[::1]:3000')).toBe('::1');
  });
});

describe('routage du domaine marketing', () => {
  it('sert la landing sans redirection', () => {
    expect(resolve('https://sourcinglabusa.com/', 'sourcinglabusa.com')).toEqual({
      kind: 'next',
      area: 'marketing',
    });
  });

  it('redirige /app vers le sous-domaine en conservant chemin et query', () => {
    expect(
      resolve(
        'https://sourcinglabusa.com/app/projects/42?source=hero',
        'sourcinglabusa.com',
      ),
    ).toEqual({
      kind: 'redirect',
      destination:
        'https://app.sourcinglabusa.com/projects/42?source=hero',
      permanent: true,
    });
  });

  it('canonicalise www sans construire la destination depuis Host', () => {
    expect(
      resolve(
        'https://www.sourcinglabusa.com/pricing?plan=pro',
        'www.sourcinglabusa.com',
      ),
    ).toEqual({
      kind: 'redirect',
      destination: 'https://sourcinglabusa.com/pricing?plan=pro',
      permanent: true,
    });
  });
});

describe('routage du domaine applicatif', () => {
  it('réécrit la racine vers la route applicative interne', () => {
    expect(
      resolve('https://app.sourcinglabusa.com/?project=42', 'app.sourcinglabusa.com'),
    ).toEqual({
      kind: 'rewrite',
      destination: 'https://app.sourcinglabusa.com/app?project=42',
      area: 'app',
    });
  });

  it('réécrit les futures routes applicatives sous /app', () => {
    expect(
      resolve(
        'https://app.sourcinglabusa.com/projects/42?tab=quotes',
        'app.sourcinglabusa.com',
      ),
    ).toEqual({
      kind: 'rewrite',
      destination:
        'https://app.sourcinglabusa.com/app/projects/42?tab=quotes',
      area: 'app',
    });
  });

  it('laisse passer la route interne sans boucle', () => {
    expect(
      resolve('https://app.sourcinglabusa.com/app', 'app.sourcinglabusa.com'),
    ).toEqual({
      kind: 'next',
      area: 'app',
    });
  });

  it('renvoie /marketing vers le domaine public', () => {
    expect(
      resolve(
        'https://app.sourcinglabusa.com/marketing/pricing?plan=pro',
        'app.sourcinglabusa.com',
      ),
    ).toEqual({
      kind: 'redirect',
      destination: 'https://sourcinglabusa.com/pricing?plan=pro',
      permanent: false,
    });
  });

  it('interdit entièrement l’indexation via robots.txt', () => {
    expect(
      resolve(
        'https://app.sourcinglabusa.com/robots.txt',
        'app.sourcinglabusa.com',
      ),
    ).toEqual({ kind: 'app-robots' });
  });
});

describe('développement local et previews', () => {
  it('conserve /app sur localhost sans redirection vers la production', () => {
    expect(resolve('http://localhost:3000/app', 'localhost:3000')).toEqual({
      kind: 'next',
      area: 'app',
    });
  });

  it('simule le sous-domaine avec app.localhost', () => {
    expect(resolve('http://app.localhost:3000/', 'app.localhost:3000')).toEqual({
      kind: 'rewrite',
      destination: 'http://app.localhost:3000/app',
      area: 'app',
    });

    expect(
      resolve(
        'http://app.localhost:3000/marketing?ref=app',
        'app.localhost:3000',
      ),
    ).toEqual({
      kind: 'redirect',
      destination: 'http://localhost:3000/?ref=app',
      permanent: false,
    });
  });

  it('ne force pas les domaines de preview vers la production', () => {
    expect(
      resolve(
        'https://sourcinglabusa-git-feature.vercel.app/',
        'sourcinglabusa-git-feature.vercel.app',
      ),
    ).toEqual({
      kind: 'next',
      area: 'preview',
    });

    expect(
      resolve(
        'https://sourcinglabusa-git-feature.vercel.app/app',
        'sourcinglabusa-git-feature.vercel.app',
      ),
    ).toEqual({
      kind: 'next',
      area: 'app',
    });
  });
});

describe('single-domain routing', () => {
  const sharedHostConfig = getDomainRoutingConfig({
    MARKETING_ORIGIN: 'https://preview.example.com',
    APP_ORIGIN: 'https://preview.example.com',
  });

  it('keeps the homepage on the marketing surface', () => {
    expect(
      resolveDomainRoute(
        new URL('https://preview.example.com/'),
        'preview.example.com',
        sharedHostConfig,
      ),
    ).toEqual({
      kind: 'next',
      area: 'marketing',
    });
  });

  it('keeps /app on the application surface', () => {
    expect(
      resolveDomainRoute(
        new URL('https://preview.example.com/app'),
        'preview.example.com',
        sharedHostConfig,
      ),
    ).toEqual({
      kind: 'next',
      area: 'app',
    });
  });

  it('canonicalizes the marketing alias without rewriting the homepage', () => {
    expect(
      resolveDomainRoute(
        new URL('https://preview.example.com/marketing?ref=app'),
        'preview.example.com',
        sharedHostConfig,
      ),
    ).toEqual({
      kind: 'redirect',
      destination: 'https://preview.example.com/?ref=app',
      permanent: true,
    });
  });
});
