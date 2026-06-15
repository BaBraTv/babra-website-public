import { SampleRequestForm } from "../forms/FormsClient";

export const metadata = {
  title: "Sample Request | babra.store",
  description: "Request official BaBra Lotion Rwanda and premium skincare samples through WhatsApp with Rwanda delivery flow."
};

export default function SampleRequestPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/forms">BaBra forms</a>
        <div className="mt-8">
          <SampleRequestForm />
        </div>
      </div>
    </main>
  );
}
