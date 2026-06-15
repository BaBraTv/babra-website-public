import { LostDocumentForm } from "../forms/FormsClient";

export const metadata = {
  title: "Lost Documents Announcement | babra.store",
  description: "Announce a lost document or found item with Rwanda province, district, sector, cell, and village details."
};

export default function LostDocumentsPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/forms">BaBra forms</a>
        <div className="mt-8">
          <LostDocumentForm />
        </div>
      </div>
    </main>
  );
}
