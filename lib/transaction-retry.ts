export type RetryOptions = {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  random?: () => number;
  sleep?: (milliseconds: number) => Promise<void>;
};

export function isRetryableTransactionConflict(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { code?: unknown; meta?: { code?: unknown }; cause?: { code?: unknown } };
  return [candidate.code, candidate.meta?.code, candidate.cause?.code].some(
    (code) => code === "P2034" || code === "40001" || code === "40P01"
  );
}

export async function withSerializableRetry<T>(operation: (attempt: number) => Promise<T>, options: RetryOptions = {}) {
  const maxAttempts = options.maxAttempts ?? 4;
  const baseDelayMs = options.baseDelayMs ?? 25;
  const maxDelayMs = options.maxDelayMs ?? 500;
  const random = options.random ?? Math.random;
  const sleep = options.sleep ?? ((milliseconds) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds)));
  if (!Number.isSafeInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 10) throw new RangeError("maxAttempts must be from 1 to 10");
  if (baseDelayMs < 0 || maxDelayMs < baseDelayMs) throw new RangeError("Invalid retry delays");

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (!isRetryableTransactionConflict(error) || attempt === maxAttempts) throw error;
      const exponential = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      const jittered = Math.floor(exponential * (0.5 + Math.max(0, Math.min(1, random())) * 0.5));
      await sleep(jittered);
    }
  }
  throw new Error("Unreachable retry state");
}
