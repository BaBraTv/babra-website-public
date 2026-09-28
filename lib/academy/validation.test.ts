import { describe, expect, it } from "vitest";
import { academyLoginSchema, academyProgressSchema, academyRegisterSchema } from "./validation";

describe("Academy registration validation", () => {
  it("normalizes email", () => expect(academyRegisterSchema.parse({ fullName: "Test User", email: "USER@EXAMPLE.COM", birthYear: new Date().getFullYear() - 12, password: "StrongPassword1" }).email).toBe("user@example.com"));
  it("rejects weak passwords", () => expect(academyRegisterSchema.safeParse({ fullName: "Test User", email: "user@example.com", birthYear: new Date().getFullYear() - 12, password: "password" }).success).toBe(false));
  it("rejects a student below age 10", () => expect(academyRegisterSchema.safeParse({ fullName: "Young User", email: "young@example.com", birthYear: new Date().getFullYear() - 9, password: "StrongPassword1" }).success).toBe(false));
  it("allows a parent account without a birth year", () => expect(academyRegisterSchema.safeParse({ fullName: "Parent User", email: "parent@example.com", accountType: "parent", password: "StrongPassword1" }).success).toBe(true));
  it("validates sign-in input", () => expect(academyLoginSchema.safeParse({ email: "learner@example.com", password: "StrongPassword1" }).success).toBe(true));
  it("accepts valid protected progress input", () => expect(academyProgressSchema.safeParse({ lessonId: "y10-t4-l6", answer: 0 }).success).toBe(true));
  it("rejects unknown lesson progress", () => expect(academyProgressSchema.safeParse({ lessonId: "year-99", answer: 0 }).success).toBe(false));
});
