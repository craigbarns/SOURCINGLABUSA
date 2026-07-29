import { NextRequest, NextResponse } from 'next/server';

import {
  getDomainRoutingConfig,
  normalizeHostname,
  resolveDomainRoute,
} from '@/lib/routing/subdomains';

function addRoutingHeaders(response: NextResponse, isAppArea = false) {
  const existingVary = response.headers.get('Vary');
  const varyValues = new Set(
    existingVary
      ?.split(',')
      .map((value) => value.trim())
      .filter(Boolean) ?? [],
  );
  varyValues.add('Host');
  varyValues.add('X-Forwarded-Host');
  response.headers.set('Vary', [...varyValues].join(', '));

  if (isAppArea) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export function proxy(request: NextRequest) {
  const config = getDomainRoutingConfig();
  const hostname = normalizeHostname(
    request.headers.get('x-forwarded-host') ??
      request.headers.get('host') ??
      request.nextUrl.hostname,
  );
  const decision = resolveDomainRoute(request.nextUrl, hostname, config);

  switch (decision.kind) {
    case 'redirect':
      return addRoutingHeaders(
        NextResponse.redirect(
          decision.destination,
          decision.permanent ? 308 : 307,
        ),
      );
    case 'rewrite':
      return addRoutingHeaders(
        NextResponse.rewrite(decision.destination),
        decision.area === 'app',
      );
    case 'app-robots':
      return addRoutingHeaders(
        new NextResponse('User-agent: *\nDisallow: /\n', {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=3600',
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Robots-Tag': 'noindex, nofollow, noarchive',
          },
        }),
        true,
      );
    case 'next':
      return addRoutingHeaders(
        NextResponse.next(),
        decision.area === 'app',
      );
  }
}

export const config = {
  matcher: [
    '/robots.txt',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
