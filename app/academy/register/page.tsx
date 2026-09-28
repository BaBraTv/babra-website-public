import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../../lib/academy/feature";
import { AcademyAuthForm } from "../AcademyAuthForm";

export default function AcademyRegisterPage() {
  if (!isAcademyEnabled()) notFound();
  return <main className="mx-auto max-w-md px-6 py-16"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#55e6d0]">Preparing Africa&apos;s Next AI Generation.</p><h1 className="mt-3 font-serif text-5xl">Iyandikishe · Register</h1><AcademyAuthForm mode="register" /></main>;
}
