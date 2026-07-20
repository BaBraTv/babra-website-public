import type { AcademyRole } from "@prisma/client";

export const academyPermissions = {
  "profile:read": ["CANDIDATE", "INSTRUCTOR", "CONTENT_EDITOR", "EXAMINER", "HR_RECRUITER", "HR_MANAGER", "EMPLOYER_USER", "EMPLOYER_ADMIN", "FINANCE", "ACADEMY_ADMIN", "SUPER_ADMIN"],
  "academy:admin": ["ACADEMY_ADMIN", "SUPER_ADMIN"],
  "recruitment:read": ["HR_RECRUITER", "HR_MANAGER", "ACADEMY_ADMIN", "SUPER_ADMIN"],
  "content:manage": ["CONTENT_EDITOR", "INSTRUCTOR", "ACADEMY_ADMIN", "SUPER_ADMIN"]
} as const satisfies Record<string, readonly AcademyRole[]>;

export type AcademyPermission = keyof typeof academyPermissions;

export function hasAcademyPermission(roles: readonly AcademyRole[], permission: AcademyPermission) {
  return roles.some((role) => academyPermissions[permission].includes(role as never));
}
