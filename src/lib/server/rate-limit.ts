import 'server-only';

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitBucket>();
const MAX_LOCAL_BUCKETS = 10_000;
const PRUNE_INTERVAL = 100;
let callsSincePrune = 0;

function pruneExpiredBuckets(now: number) {
  callsSincePrune += 1;

  if (
    callsSincePrune < PRUNE_INTERVAL &&
    buckets.size < MAX_LOCAL_BUCKETS
  ) {
    return;
  }

  callsSincePrune = 0;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }

  if (buckets.size <= MAX_LOCAL_BUCKETS) {
    return;
  }

  const oldest = [...buckets.entries()]
    .sort((left, right) => left[1].resetAt - right[1].resetAt)
    .slice(0, buckets.size - MAX_LOCAL_BUCKETS);

  for (const [key] of oldest) {
    buckets.delete(key);
  }
}

export function consumeRateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  pruneExpiredBuckets(now);
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: Math.ceil(options.windowMs / 1_000),
    };
  }

  if (current.count >= options.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    retryAfterSeconds: Math.ceil((current.resetAt - now) / 1_000),
  };
}

export function getRequestClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'local';
}
