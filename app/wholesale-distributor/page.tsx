import { WholesaleDistributorForm } from "../forms/FormsClient";

export const metadata = {
  title: "Wholesale & Distributor Request | babra.store",
  description: "Request BaBra wholesale, reseller, salon, shop, or distributor onboarding with Rwanda business address flow."
};

export default function WholesaleDistributorPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/forms">BaBra forms</a>
        <div className="mt-8">
          <WholesaleDistributorForm />
        </div>
      </div>
    </main>
  );
}
