import { JobApplicationForm } from "../forms/FormsClient";

export const metadata = {
  title: "Job Application | babra.store",
  description: "Apply for BaBra opportunities with official WhatsApp submission and Rwanda address flow."
};

export default function JobApplicationPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/forms">BaBra forms</a>
        <div className="mt-8">
          <JobApplicationForm />
        </div>
      </div>
    </main>
  );
}
