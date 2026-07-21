import { z } from "zod";

export const academyRegisterSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(12).max(128)
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
});

export const academyLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128)
});

export const academyForgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254)
});

export const academyResetPasswordSchema = z.object({
  token: z.string().min(32).max(256),
  password: academyRegisterSchema.shape.password
});

export type AcademyRegisterInput = z.infer<typeof academyRegisterSchema>;
export type AcademyLoginInput = z.infer<typeof academyLoginSchema>;
