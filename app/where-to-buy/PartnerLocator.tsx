"use client";

import { useMemo, useState } from "react";

type Category = "pharmacy" | "cosmetics" | "supermarket" | "distributor";
type Filter = "all" | Category;

type Partner = {
  name: string;
  category: Category;
  area: string;
  phone?: string;
  mapsQuery?: string;
};

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All partners" },
  { id: "pharmacy", label: "Pharmacies" },
  { id: "cosmetics", label: "Cosmetics shops" },
  { id: "supermarket", label: "Supermarkets" },
  { id: "distributor", label: "Distributors" }
];

const categoryLabels: Record<Category, string> = {
  pharmacy: "Pharmacy partner",
  cosmetics: "Cosmetics retail partner",
  supermarket: "Supermarket partner",
  distributor: "Distribution partner"
};

// These are BaBra-recorded partner names and broad locations, NOT confirmed live inventory.
// Only provide map search when there is an independently identifiable public listing.
// Do not publish coordinates from the earlier imported CSV: some were inaccurate (including 0,0).
const partners: Partner[] = [
  { name: "VIDAPHARMA LTD", category: "distributor", area: "Nyarugenge, Kigali — confirm collection point", phone: "+250 734 299 777" },
  { name: "IMPRESS PHARMACY", category: "pharmacy", area: "288 KN 2 Avenue, Kigali", phone: "+250 780 274 614", mapsQuery: "IMPRESS PHARMACY 288 KN 2 Avenue Kigali Rwanda" },
  { name: "Pharmacie La Licorne", category: "pharmacy", area: "Opposite Nyabugogo Bus Station, Kimisagara, Kigali", phone: "+250 788 485 071" },
  { name: "Healthcare Pharmacy", category: "pharmacy", area: "Near Kigali City Market, Kigali", phone: "+250 788 872 220" },
  { name: "Stream Pharmacy", category: "pharmacy", area: "Kagugu, Kigali", phone: "+250 781 294 430" },
  { name: "Ngabo Pharmacy", category: "pharmacy", area: "Kisimenti, Remera, Kigali", mapsQuery: "Ngabo Pharmacy KG 201 Street Kisimenti Kigali Rwanda" },
  { name: "Teta Pharmacy", category: "pharmacy", area: "Kisimenti / Rando, Remera, Kigali", phone: "+250 789 192 226" },
  { name: "UNIPHARMA Kisimenti B1", category: "pharmacy", area: "Kisimenti, Remera, Kigali — confirm branch address" },
  { name: "UNIPHARMA Giporoso B3", category: "pharmacy", area: "Giporoso, Remera, Kigali — confirm branch address" },
  { name: "UNIPHARMA Nyarutarama B4", category: "pharmacy", area: "Nyarutarama, Kigali — confirm branch address" },
  { name: "Umoja Cosmetics", category: "cosmetics", area: "Downtown Kigali", phone: "+250 786 994 364" },
  { name: "Igihozo Supermarket", category: "supermarket", area: "Contact BaBra to confirm the exact store location" }
];

const babraWhatsapp = "250788351482";
const whatsappHelp = (partner: string) =>
  "https://wa.me/" + babraWhatsapp + "?text=" + encodeURIComponent(
    "Hello BaBra Cosmetics, please confirm the current stock, exact location and directions for " + partner + "."
  );

export default function PartnerLocator({ projectMapUrl }: { projectMapUrl?: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const matchingPartners = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return partners.filter((partner) =>
      (filter === "all" || partner.category === filter) &&
      (!search || (partner.name + " " + partner.area).toLocaleLowerCase().includes(search))
    );
  }, [filter, query]);

  return (
    <section id="partner-locator" className="bg-[#f4ecdf] px-5 py-16 text-[#251a13] md:px-8 md:py-24" aria-labelledby="partner-locator-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">BaBra partner directory</p>
            <h2 id="partner-locator-title" className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-6xl">Find a BaBra partner near you.</h2>
            <p className="mt-6 max-w-3xl leading-8 text-[#4d423b]">
              Explore pharmacies, cosmetics shops, supermarkets and distributors recorded as BaBra partners. 
              Addresses are provided at their currently known level of detail. Please confirm the exact branch, current BaBra Lotion stock and opening hours before travelling.
            </p>
          </div>
          {projectMapUrl ? (
            <a href={projectMapUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25170f] px-7 py-4 text-center font-bold text-white hover:bg-[#473120]">
              Open BaBra partner map ↗
            </a>
          ) : null}
        </div>

        <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_18px_55px_rgba(68,43,20,0.08)] md:p-8">
          <label htmlFor="partner-search" className="block text-xs font-black uppercase tracking-[0.16em] text-[#7a562f]">Search by name or area</label>
          <input
            id="partner-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Nyabugogo, pharmacy, Igihozo"
            className="mt-3 w-full rounded-xl border border-black/15 bg-[#faf8f4] px-5 py-4 text-base text-[#251a13] placeholder:text-[#8a8179] focus:border-[#8b5c28] focus:outline-none focus:ring-2 focus:ring-[#d6ad57]/30"
          />
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter partner category">
            {filters.map((item) => (
              <button
                key={item.id} type="button" onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={"rounded-full border px-4 py-2 text-sm font-bold transition-colors " + (
                  filter === item.id
                    ? "border-[#25170f] bg-[#25170f] text-white"
                    : "border-black/15 bg-white text-[#473120] hover:bg-[#f5eee2]"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm text-[#65564a]" aria-live="polite">
            {matchingPartners.length} {matchingPartners.length === 1 ? "partner" : "partners"} shown · Listed partners are not a live stock guarantee.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {matchingPartners.map((partner) => (
            <article key={partner.name} className="flex h-full flex-col rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-[0_12px_40px_rgba(68,43,20,0.06)]">
              <span className="self-start rounded-full bg-[#f5ead7] px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#77501f]">
                {categoryLabels[partner.category]}
              </span>
              <h3 className="mt-5 font-serif text-3xl leading-tight">{partner.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5c5046]">{partner.area}</p>
              {partner.phone ? (
                <a className="mt-3 self-start text-sm font-bold text-[#724b20] underline underline-offset-4" href={"tel:" + partner.phone.replace(/[^\d+]/g, "")}>
                  {partner.phone}
                </a>
              ) : null}
              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                {partner.mapsQuery ? (
                  <a
                    className="rounded-full bg-[#25170f] px-4 py-3 text-xs font-bold text-white hover:bg-[#473120]"
                    href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(partner.mapsQuery)}
                    target="_blank" rel="noopener noreferrer"
                  >
                    Search on Google Maps ↗
                  </a>
                ) : null}
                <a className="rounded-full border border-black/15 px-4 py-3 text-xs font-bold text-[#25170f] hover:bg-[#f5eee2]"
                   href={whatsappHelp(partner.name)} target="_blank" rel="noopener noreferrer">
                  Confirm location &amp; stock ↗
                </a>
              </div>
            </article>
          ))}
        </div>
        {matchingPartners.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-black/10 bg-white p-8 text-center text-[#5c5046]">
            No matching partner is listed yet. Contact BaBra and we will help you find a suitable purchase point.
          </div>
        ) : null}

        <p className="mt-8 text-sm leading-7 text-[#5c5046]">
          This directory reflects partner information recorded by BaBra Cosmetics; it is not synced to pharmacy inventory systems.
          New partners and corrected locations will be added after verification. If a location is inaccurate, please contact BaBra.
        </p>
      </div>
    </section>
  );
}
