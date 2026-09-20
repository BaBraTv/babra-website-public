import { timingSafeEqual } from "crypto";

export function secretsMatch(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const receivedBytes = Buffer.from(received);
  const expectedBytes = Buffer.from(expected);
  return receivedBytes.length === expectedBytes.length && timingSafeEqual(receivedBytes, expectedBytes);
}
