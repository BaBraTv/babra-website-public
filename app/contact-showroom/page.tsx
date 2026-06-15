import { ContactShowroomForm } from "../forms/FormsClient";

export const metadata = {
  title: "Contact & Showroom | babra.store",
  description: "Contact BaBra Store, book showroom support, ask product questions, or start reseller onboarding by WhatsApp."
};

export default function ContactShowroomPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/forms">BaBra forms</a>
        <div className="mt-8">
          <ContactShowroomForm />
        </div>
      </div>
    </main>
  );
}
