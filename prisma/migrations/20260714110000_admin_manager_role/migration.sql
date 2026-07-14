-- Milestone 4: Add Manager role for role-based admin access.
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'MANAGER';