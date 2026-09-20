export type PendingWithdrawalRequest = {
  amountMinor: number;
  currency: string;
  idempotencyKey: string;
};

export function createOrReuseWithdrawalRequest(
  existing: PendingWithdrawalRequest | null,
  amountMinor: number,
  currency: string,
  createIdempotencyKey: () => string
): PendingWithdrawalRequest {
  const normalizedCurrency = currency.trim().toUpperCase();
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw new Error("Withdrawal amount must be a positive integer");
  if (!/^[A-Z]{3,8}$/.test(normalizedCurrency)) throw new Error("Withdrawal currency is invalid");
  if (existing && existing.amountMinor === amountMinor && existing.currency === normalizedCurrency && existing.idempotencyKey) return existing;
  const idempotencyKey = createIdempotencyKey().trim();
  if (!idempotencyKey || idempotencyKey.length > 128) throw new Error("Withdrawal idempotency key is invalid");
  return { amountMinor, currency: normalizedCurrency, idempotencyKey };
}

export function parsePendingWithdrawalRequest(value: string | null): PendingWithdrawalRequest | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<PendingWithdrawalRequest>;
    if (!Number.isSafeInteger(parsed.amountMinor) || Number(parsed.amountMinor) <= 0) return null;
    if (typeof parsed.currency !== "string" || !/^[A-Z]{3,8}$/.test(parsed.currency)) return null;
    if (typeof parsed.idempotencyKey !== "string" || !parsed.idempotencyKey || parsed.idempotencyKey.length > 128) return null;
    return parsed as PendingWithdrawalRequest;
  } catch {
    return null;
  }
}
