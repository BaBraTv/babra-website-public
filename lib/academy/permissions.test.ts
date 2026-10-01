import { describe, expect, it } from "vitest";
import { academyDashboardForRoles, hasAcademyPermission } from "./permissions";

describe("Academy RBAC", () => {
  it("allows a candidate to read their profile", () => expect(hasAcademyPermission(["CANDIDATE"], "profile:read")).toBe(true));
  it("does not allow a candidate to administer the Academy", () => expect(hasAcademyPermission(["CANDIDATE"], "academy:admin")).toBe(false));
  it("allows a super admin to administer the Academy", () => expect(hasAcademyPermission(["SUPER_ADMIN"], "academy:admin")).toBe(true));
  it("routes each role to an allowed dashboard", () => {
    expect(academyDashboardForRoles(["STUDENT"])).toBe("/academy/candidate");
    expect(academyDashboardForRoles(["PARENT"])).toBe("/academy/parent");
    expect(academyDashboardForRoles(["ACADEMY_ADMIN"])).toBe("/academy/admin");
  });
});
