import { describe, expect, it } from "vitest";
import { academyRegisterSchema } from "./validation";

describe("Academy registration validation", () => {
  it("normalizes email", () => expect(academyRegisterSchema.parse({ fullName: "Test User", email: "USER@EXAMPLE.COM", password: "StrongPassword1" }).email).toBe("user@example.com"));
  it("rejects weak passwords", () => expect(academyRegisterSchema.safeParse({ fullName: "Test User", email: "user@example.com", password: "password" }).success).toBe(false));
});
