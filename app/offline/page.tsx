export const metadata = {
  title: "Offline | babra.store",
  description: "BaBra Store offline fallback page."
};

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#090706] px-5 text-center text-white">
      <section className="max-w-xl rounded-lg border border-white/10 bg-[#18110f] p-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">babra.store</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">You are offline.</h1>
        <p className="mt-5 leading-7 text-white/64">
          BaBra Store is ready as a PWA. Reconnect to continue shopping, checkout, or WhatsApp ordering.
        </p>
      </section>
    </main>
  );
}
