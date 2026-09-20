import { NextResponse } from "next/server.js";
import { ZodError } from "zod";

export function ok(data: unknown = {}) {
  return NextResponse.json({ ok: true, ...((data && typeof data === "object") ? data : { data }) });
}

export function fail(error: unknown, status = 400) {
  const requestId = crypto.randomUUID();
  const message = publicErrorMessage(error, status);

  if (!(error instanceof ZodError)) {
    console.error("API request failed", {
      requestId,
      status,
      errorType: error instanceof Error ? error.name : typeof error
    });
  }

  return NextResponse.json({ ok: false, error: message, requestId }, { status });
}

const safeMessages = new Set([
  "Authentication required",
  "Admin access required",
  "Invalid login details",
  "Account is not active",
  "Email or phone is required",
  "Account already exists. Please login.",
  "Order not found",
  "Rate limit exceeded"
]);

export function publicErrorMessage(error: unknown, status = 400) {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join("; ");
  }
  if (error instanceof Error && safeMessages.has(error.message)) return error.message;
  return status >= 500 ? "Service temporarily unavailable" : "Request could not be completed";
}

export function authFail(error: unknown) {
  const message = error instanceof Error ? error.message : "Authentication required";
  const status = message.includes("Admin") ? 403 : 401;
  return fail(error, status);
}

export function redactUser<T extends { passwordHash?: unknown }>(user: T) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export function redactPayment<T extends { callbackPayload?: unknown }>(payment: T) {
  const { callbackPayload: _callbackPayload, ...safePayment } = payment;
  return safePayment;
}

export function redactOrder<T extends { payments?: Array<{ callbackPayload?: unknown }> }>(order: T) {
  return order.payments
    ? { ...order, payments: order.payments.map(redactPayment) }
    : order;
}
