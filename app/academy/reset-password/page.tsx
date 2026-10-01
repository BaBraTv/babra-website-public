import { AcademyRecoveryForm } from "../AcademyRecoveryForm";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) { const { token = "" } = await searchParams; return <main className="mx-auto max-w-md px-6 py-16"><h1 className="text-3xl font-bold">Choose a new password</h1><AcademyRecoveryForm mode="reset" token={token} /></main>; }
