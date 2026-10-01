import { z } from "zod";

const academyRegisterBaseSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  accountType: z.enum(["student", "parent"]).default("student"),
  birthYear: z.preprocess((value) => value === "" ? undefined : value, z.coerce.number().int().min(1900).max(new Date().getFullYear()).optional()),
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
  password: academyRegisterBaseSchema.shape.password
});

export const academyRegisterSchema = academyRegisterBaseSchema.superRefine((value, context) => {
  if (value.accountType !== "student") return;
  const age = new Date().getFullYear() - (value.birthYear ?? new Date().getFullYear());
  if (!value.birthYear || age < 10) context.addIssue({ code: "custom", path: ["birthYear"], message: "Students must be at least 10 years old" });
});

export const academyProgressSchema = z.object({
  lessonId: z.string().regex(/^y(?:10|[1-9])-t[1-4]-l[1-6]$/),
  answer: z.number().int().min(0).max(3)
});

export type AcademyRegisterInput = z.infer<typeof academyRegisterSchema>;
export type AcademyLoginInput = z.infer<typeof academyLoginSchema>;
