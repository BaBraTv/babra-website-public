import bcrypt from "bcryptjs";
import { z } from "zod";
import type { UserRole } from "@prisma/client";

export const authRoles = ["CUSTOMER", "ADMIN", "MANAGER", "STAFF"] as const satisfies readonly UserRole[];

export const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().min(7).max(32).optional().or(z.literal("")),
  password: z.string().min(8).max(128),
  role: z.enum(authRoles).default("CUSTOMER")
});

export const loginSchema = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().min(1)
});

export const forgotPasswordSchema = z.object({
  identifier: z.string().trim().min(3)
});

export function requireAdminRole(role: UserRole) {
  if (role !== "ADMIN" && role !== "MANAGER" && role !== "STAFF") {
    throw new Error("Admin access required");
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
