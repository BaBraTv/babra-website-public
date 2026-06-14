"use client";

import { FormEvent, useState } from "react";
import { RwandaLocationPicker } from "./RwandaLocationPicker";
import { emptyLocation, LocationValue } from "./rwanda-location-seed";

function formatLocation(label: string, location: LocationValue) {
  const village = location.villageId === "manual-village" ? location.villageManual : location.villageName;
  return `${label}: ${location.provinceName} > ${location.districtName} > ${location.sectorName} > ${location.cellName} > ${village}`;
}

function openWhatsApp(message: string) {
  window.open(`https://wa.me/250788351482?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

export function JobApplicationForm() {
  const [address, setAddress] = useState<LocationValue>(emptyLocation);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsApp(
      [
        "BaBra Job Application",
        `Amazina: ${form.get("name")}`,
        `Telefone: ${form.get("phone")}`,
        `Akazi ashaka: ${form.get("role")}`,
        formatLocation("Aho atuye", address)
      ].join("\n")
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-[#d6ad57]/25 bg-white/8 p-4 md:p-6">
      <h2 className="font-serif text-4xl leading-none">Job application address</h2>
      <p className="mt-3 max-w-3xl leading-7 text-white/64">
        Umuntu usaba akazi ahitamo aho atuye buhoro buhoro, atajijishijwe n'urutonde rurerure.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <input className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="name" placeholder="Amazina" required />
        <input className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="phone" placeholder="Telefone" required />
        <input className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="role" placeholder="Akazi ashaka" required />
      </div>
      <div className="mt-6">
        <RwandaLocationPicker namePrefix="jobAddress" title="Job application address" description="Hitamo aho utuye: Intara, Akarere, Umurenge, Akagari, Umudugudu." value={address} onChange={setAddress} />
      </div>
      <button className="mt-6 min-h-14 w-full rounded-full bg-[#f1d58b] px-6 text-lg font-black text-[#130d08]" type="submit">
        Ohereza application
      </button>
    </form>
  );
}

export function LostDocumentForm() {
  const [ownerAddress, setOwnerAddress] = useState<LocationValue>(emptyLocation);
  const [lostPlace, setLostPlace] = useState<LocationValue>(emptyLocation);
  const [finderAddress, setFinderAddress] = useState<LocationValue>(emptyLocation);
  const [foundPlace, setFoundPlace] = useState<LocationValue>(emptyLocation);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsApp(
      [
        "BaBra Lost Document / Found Item",
        `Ubwoko: ${form.get("caseType")}`,
        `Amazina ya nyir'icyangombwa: ${form.get("ownerName")}`,
        `Telefone: ${form.get("phone")}`,
        `Icyangombwa/ikintu: ${form.get("itemType")}`,
        formatLocation("Owner address", ownerAddress),
        formatLocation("Place lost", lostPlace),
        formatLocation("Finder address", finderAddress),
        formatLocation("Place found", foundPlace)
      ].join("\n")
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-[#4ebeff]/20 bg-[#10161a] p-4 md:p-6">
      <h2 className="font-serif text-4xl leading-none">Lost document / found item</h2>
      <p className="mt-3 max-w-3xl leading-7 text-white/64">
        Iyi form ifasha nyir'ikintu n'uwagitoraguye gushyiramo location neza, ku buryo admin ashobora kuyishakisha ahereye ku ntara kugera ku mudugudu.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <select className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="caseType" required>
          <option>Nataye icyangombwa/ikintu</option>
          <option>Natoraguye icyangombwa/ikintu</option>
        </select>
        <input className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="ownerName" placeholder="Amazina ya nyiracyo" required />
        <input className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="phone" placeholder="Telefone" required />
        <input className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-lg outline-none" name="itemType" placeholder="Indangamuntu, permis, telefoni..." required />
      </div>
      <div className="mt-6 grid gap-5">
        <RwandaLocationPicker namePrefix="ownerAddress" title="Lost document owner address" description="Aho nyir'icyangombwa atuye." value={ownerAddress} onChange={setOwnerAddress} />
        <RwandaLocationPicker namePrefix="lostPlace" title="Place where document/item was lost" description="Aho icyangombwa cyangwa ikintu cyatakariye." value={lostPlace} onChange={setLostPlace} />
        <RwandaLocationPicker namePrefix="finderAddress" title="Finder address" description="Aho uwatoraguye ikintu atuye." value={finderAddress} onChange={setFinderAddress} />
        <RwandaLocationPicker namePrefix="foundPlace" title="Place where item was found" description="Aho ikintu cyangwa icyangombwa cyatoraguwe." value={foundPlace} onChange={setFoundPlace} />
      </div>
      <button className="mt-6 min-h-14 w-full rounded-full bg-[#4ebeff] px-6 text-lg font-black text-[#061017]" type="submit">
        Ohereza amakuru
      </button>
    </form>
  );
}
