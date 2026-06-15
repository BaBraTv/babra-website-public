"use client";

import { FormEvent, useState } from "react";
import { RwandaLocationPicker } from "./RwandaLocationPicker";
import { emptyLocation, LocationValue } from "./rwanda-location-seed";

function formatLocation(label: string, location: LocationValue) {
  const sector = location.sectorId === "manual-sector" ? location.sectorManual : location.sectorName;
  const cell = location.cellId === "manual-cell" ? location.cellManual : location.cellName;
  const village = location.villageId === "manual-village" ? location.villageManual : location.villageName;
  return `${label}: ${location.provinceName} > ${location.districtName} > ${sector} > ${cell} > ${village}`;
}

function openWhatsApp(message: string) {
  window.open(`https://wa.me/250788351482?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function TextInput({ name, placeholder, required = true }: { name: string; placeholder: string; required?: boolean }) {
  return (
    <input
      className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-base outline-none focus:border-[#d6ad57]"
      name={name}
      placeholder={placeholder}
      required={required}
    />
  );
}

function SelectInput({ name, options }: { name: string; options: string[] }) {
  return (
    <select className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-base outline-none focus:border-[#d6ad57]" name={name} required>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function NotesArea({ name, placeholder }: { name: string; placeholder: string }) {
  return (
    <textarea
      className="min-h-32 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base outline-none focus:border-[#d6ad57]"
      name={name}
      placeholder={placeholder}
    />
  );
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
        <TextInput name="name" placeholder="Amazina" />
        <TextInput name="phone" placeholder="Telefone / WhatsApp" />
        <TextInput name="role" placeholder="Akazi ashaka" />
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
        <select className="min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-base outline-none" name="caseType" required>
          <option>Nataye icyangombwa/ikintu</option>
          <option>Natoraguye icyangombwa/ikintu</option>
        </select>
        <TextInput name="ownerName" placeholder="Amazina ya nyiracyo" />
        <TextInput name="phone" placeholder="Telefone / WhatsApp" />
        <TextInput name="itemType" placeholder="Indangamuntu, permis, telefoni..." />
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

export function SampleRequestForm() {
  const [deliveryAddress, setDeliveryAddress] = useState<LocationValue>(emptyLocation);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsApp(
      [
        "BaBra Sample Request",
        `Name: ${form.get("name")}`,
        `Phone: ${form.get("phone")}`,
        `Customer type: ${form.get("customerType")}`,
        `Product interest: ${form.get("productInterest")}`,
        `Quantity: ${form.get("quantity")}`,
        `Landmark: ${form.get("landmark")}`,
        `Notes: ${form.get("notes")}`,
        formatLocation("Delivery address", deliveryAddress)
      ].join("\n")
    );
  }

  return (
    <form id="sample-request" onSubmit={submit} className="rounded-[1.5rem] border border-[#d6ad57]/25 bg-[#18110f] p-4 md:p-6">
      <h2 className="font-serif text-4xl leading-none">Sample Request</h2>
      <p className="mt-3 max-w-3xl leading-7 text-white/64">
        For customers, shops, salons, and reviewers who want official BaBra product samples without exposing private product records online.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <TextInput name="name" placeholder="Full name / Business name" />
        <TextInput name="phone" placeholder="Phone / WhatsApp" />
        <SelectInput name="customerType" options={["Retail customer", "Salon", "Shop", "Influencer / media", "Distributor lead"]} />
        <SelectInput name="productInterest" options={["BaBra Lotion Women", "BaBra Lotion Men", "BaBra Soft Care Kids", "BaBra Serum", "Mixed sample pack"]} />
        <TextInput name="quantity" placeholder="Requested quantity" />
        <TextInput name="landmark" placeholder="Nearest landmark" />
      </div>
      <div className="mt-6">
        <RwandaLocationPicker namePrefix="sampleDelivery" title="Sample delivery address" description="Province, district, sector, cell, village, phone, landmark, and delivery notes." value={deliveryAddress} onChange={setDeliveryAddress} />
      </div>
      <div className="mt-6">
        <NotesArea name="notes" placeholder="Delivery notes, preferred time, or business context" />
      </div>
      <button className="mt-6 min-h-14 w-full rounded-full bg-[#f1d58b] px-6 text-lg font-black text-[#130d08]" type="submit">
        Request samples on WhatsApp
      </button>
    </form>
  );
}

export function WholesaleDistributorForm() {
  const [businessAddress, setBusinessAddress] = useState<LocationValue>(emptyLocation);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsApp(
      [
        "BaBra Wholesale / Distributor Request",
        `Business: ${form.get("businessName")}`,
        `Contact person: ${form.get("contactName")}`,
        `Phone: ${form.get("phone")}`,
        `Account type: ${form.get("accountType")}`,
        `Monthly volume: ${form.get("monthlyVolume")}`,
        `Products: ${form.get("products")}`,
        `Notes: ${form.get("notes")}`,
        formatLocation("Business address", businessAddress)
      ].join("\n")
    );
  }

  return (
    <form id="wholesale-distributor" onSubmit={submit} className="rounded-[1.5rem] border border-[#d6ad57]/25 bg-[#100d0a] p-4 md:p-6">
      <h2 className="font-serif text-4xl leading-none">Wholesale / Distributor Request</h2>
      <p className="mt-3 max-w-3xl leading-7 text-white/64">
        For shops, salons, resellers, wholesalers, and distributors. BaBra shares deeper commercial documents only after business verification.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <TextInput name="businessName" placeholder="Business name" />
        <TextInput name="contactName" placeholder="Contact person" />
        <TextInput name="phone" placeholder="Phone / WhatsApp" />
        <SelectInput name="accountType" options={["Reseller", "Wholesale", "Distributor", "Salon partner", "Retail shop"]} />
        <TextInput name="monthlyVolume" placeholder="Expected monthly units" />
        <TextInput name="products" placeholder="Products of interest" />
      </div>
      <div className="mt-6">
        <RwandaLocationPicker namePrefix="businessAddress" title="Business address" description="Choose province, district, sector, cell, and village for delivery and territory planning." value={businessAddress} onChange={setBusinessAddress} />
      </div>
      <div className="mt-6">
        <NotesArea name="notes" placeholder="Tell us about your shop, salon, route, or distributor coverage" />
      </div>
      <button className="mt-6 min-h-14 w-full rounded-full bg-[#f1d58b] px-6 text-lg font-black text-[#130d08]" type="submit">
        Send wholesale request
      </button>
    </form>
  );
}

export function ContactShowroomForm() {
  const [visitAddress, setVisitAddress] = useState<LocationValue>(emptyLocation);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsApp(
      [
        "BaBra Contact / Showroom Request",
        `Name: ${form.get("name")}`,
        `Phone: ${form.get("phone")}`,
        `Purpose: ${form.get("purpose")}`,
        `Preferred date/time: ${form.get("preferredTime")}`,
        `Notes: ${form.get("notes")}`,
        formatLocation("Customer location", visitAddress)
      ].join("\n")
    );
  }

  return (
    <form id="contact-showroom" onSubmit={submit} className="rounded-[1.5rem] border border-white/10 bg-[#18110f] p-4 md:p-6">
      <h2 className="font-serif text-4xl leading-none">Contact / Showroom</h2>
      <p className="mt-3 max-w-3xl leading-7 text-white/64">
        Book showroom support, product consultation, reseller onboarding, or customer care through the official BaBra WhatsApp route.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <TextInput name="name" placeholder="Full name" />
        <TextInput name="phone" placeholder="Phone / WhatsApp" />
        <SelectInput name="purpose" options={["Showroom visit", "Product consultation", "Order support", "Reseller onboarding", "Media / partnership"]} />
        <TextInput name="preferredTime" placeholder="Preferred date/time" required={false} />
      </div>
      <div className="mt-6">
        <RwandaLocationPicker namePrefix="customerLocation" title="Customer location" description="Province, district, sector, cell, and village help BaBra route support correctly." value={visitAddress} onChange={setVisitAddress} />
      </div>
      <div className="mt-6">
        <NotesArea name="notes" placeholder="Write your request, delivery need, or showroom question" />
      </div>
      <button className="mt-6 min-h-14 w-full rounded-full bg-white px-6 text-lg font-black text-[#130d08]" type="submit">
        Contact BaBra on WhatsApp
      </button>
    </form>
  );
}
