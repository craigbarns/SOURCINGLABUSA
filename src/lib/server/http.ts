function firstForwardedValue(value: string | null): string | null {
  return value?.split(',')[0]?.trim() || null;
}

export function isSameOriginRequest(request: Request): boolean {
  const originHeader = request.headers.get('origin');

  if (!originHeader) {
    return true;
  }

  try {
    const receivedOrigin = new URL(originHeader).origin;
    const requestOrigin = new URL(request.url).origin;
    const forwardedHost = firstForwardedValue(
      request.headers.get('x-forwarded-host'),
    );
    const host = forwardedHost || request.headers.get('host')?.trim();
    const forwardedProto = firstForwardedValue(
      request.headers.get('x-forwarded-proto'),
    );
    const protocol =
      forwardedProto || new URL(request.url).protocol.replace(':', '');
    const publicOrigin = host ? new URL(`${protocol}://${host}`).origin : null;

    return (
      receivedOrigin === requestOrigin ||
      (publicOrigin !== null && receivedOrigin === publicOrigin)
    );
  } catch {
    return false;
  }
}

export function exceedsContentLength(
  request: Request,
  maximumBytes: number,
): boolean {
  const rawValue = request.headers.get('content-length');

  if (!rawValue) {
    return false;
  }

  const contentLength = Number(rawValue);
  return (
    !Number.isSafeInteger(contentLength) ||
    contentLength < 0 ||
    contentLength > maximumBytes
  );
}
