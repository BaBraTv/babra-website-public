"use client";

import { useMemo, useState } from "react";
import {
  cells,
  districts,
  emptyLocation,
  LocationOption,
  LocationValue,
  provinces,
  sectors,
  villages
} from "./rwanda-location-seed";

type PickerProps = {
  namePrefix: string;
  title: string;
  description: string;
  value: LocationValue;
  onChange: (value: LocationValue) => void;
};

const steps = [
  ["province", "Intara"],
  ["district", "Akarere"],
  ["sector", "Umurenge"],
  ["cell", "Akagari"],
  ["village", "Umudugudu"]
] as const;

function byParent(options: LocationOption[], parentId: string) {
  return options.filter((option) => option.parentId === parentId || option.parentId === "*");
}

function findName(options: LocationOption[], id: string) {
  return options.find((option) => option.id === id)?.name ?? "";
}

function filtered(options: LocationOption[], term: string) {
  const value = term.trim().toLowerCase();
  if (!value) return options;
  return options.filter((option) => option.name.toLowerCase().includes(value));
}

function LocationSelect({
  label,
  placeholder,
  options,
  value,
  disabled,
  onSelect
}: {
  label: string;
  placeholder: string;
  options: LocationOption[];
  value: string;
  disabled?: boolean;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const visibleOptions = useMemo(() => filtered(options, search), [options, search]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <label className="grid gap-2 text-base font-black text-[#18110c]">
        {label}
        <input
          className="min-h-12 rounded-xl border border-black/10 bg-[#fffaf1] px-4 text-base outline-none focus:border-[#d6ad57]"
          placeholder={`Shakisha ${label.toLowerCase()}...`}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          disabled={disabled}
        />
        <select
          className="min-h-14 rounded-xl border border-black/10 bg-white px-4 text-lg font-bold outline-none focus:border-[#d6ad57] disabled:opacity-45"
          value={value}
          onChange={(event) => onSelect(event.target.value)}
          disabled={disabled}
          required
        >
          <option value="">{placeholder}</option>
          {visibleOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function RwandaLocationPicker({ namePrefix, title, description, value, onChange }: PickerProps) {
  const districtOptions = byParent(districts, value.provinceId);
  const sectorOptions = byParent(sectors, value.districtId);
  const cellOptions = byParent(cells, value.sectorId);
  const villageOptions = byParent(villages, value.cellId);
  const activeStep = value.villageId ? 5 : value.cellId ? 4 : value.sectorId ? 3 : value.districtId ? 2 : value.provinceId ? 1 : 0;
  const manualSector = value.sectorId === "manual-sector";
  const manualCell = value.cellId === "manual-cell";
  const manualVillage = value.villageId === "manual-village";

  function update(next: Partial<LocationValue>) {
    onChange({ ...value, ...next });
  }

  function selectProvince(id: string) {
    update({
      ...emptyLocation,
      provinceId: id,
      provinceName: findName(provinces, id)
    });
  }

  function selectDistrict(id: string) {
    if (!districts.some((district) => district.id === id && district.parentId === value.provinceId)) return;
    update({
      districtId: id,
      districtName: findName(districts, id),
      sectorId: "",
      sectorName: "",
      sectorManual: "",
      cellId: "",
      cellName: "",
      cellManual: "",
      villageId: "",
      villageName: "",
      villageManual: ""
    });
  }

  function selectSector(id: string) {
    if (id !== "manual-sector" && !sectors.some((sector) => sector.id === id && sector.parentId === value.districtId)) return;
    update({
      sectorId: id,
      sectorName: findName(sectors, id),
      sectorManual: id === "manual-sector" ? value.sectorManual : "",
      cellId: "",
      cellName: "",
      cellManual: "",
      villageId: "",
      villageName: "",
      villageManual: ""
    });
  }

  function selectCell(id: string) {
    if (id !== "manual-cell" && !cells.some((cell) => cell.id === id && cell.parentId === value.sectorId)) return;
    update({
      cellId: id,
      cellName: findName(cells, id),
      cellManual: id === "manual-cell" ? value.cellManual : "",
      villageId: "",
      villageName: "",
      villageManual: ""
    });
  }

  function selectVillage(id: string) {
    if (id !== "manual-village" && !villages.some((village) => village.id === id && village.parentId === value.cellId)) return;
    update({
      villageId: id,
      villageName: findName(villages, id),
      villageManual: id === "manual-village" ? value.villageManual : ""
    });
  }

  return (
    <section className="rounded-[1.35rem] border border-[#d6ad57]/25 bg-[#fffaf1] p-4 text-[#18110c] md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-3xl leading-none">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">{description}</p>
        </div>
        <div className="rounded-full bg-[#090706] px-4 py-2 text-sm font-black text-[#f1d58b]">
          Intambwe {Math.min(activeStep + 1, 5)} / 5
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-5">
        {steps.map(([key, label], index) => (
          <div
            key={key}
            className={`rounded-full px-3 py-2 text-center text-xs font-black ${
              index <= activeStep ? "bg-[#090706] text-[#f1d58b]" : "bg-black/5 text-black/45"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4">
        <LocationSelect label="Intara" placeholder="Hitamo intara" options={provinces} value={value.provinceId} onSelect={selectProvince} />
        <LocationSelect label="Akarere" placeholder="Banza uhitemo intara" options={districtOptions} value={value.districtId} onSelect={selectDistrict} disabled={!value.provinceId} />
        <LocationSelect label="Umurenge" placeholder="Banza uhitemo akarere" options={sectorOptions} value={value.sectorId} onSelect={selectSector} disabled={!value.districtId} />
        <LocationSelect label="Akagari" placeholder="Banza uhitemo umurenge" options={cellOptions} value={value.cellId} onSelect={selectCell} disabled={!value.sectorId} />
        <LocationSelect label="Umudugudu" placeholder="Banza uhitemo akagari" options={villageOptions} value={value.villageId} onSelect={selectVillage} disabled={!value.cellId} />
      </div>

      {manualSector ? (
        <label className="mt-4 grid gap-2 rounded-2xl border border-[#d6ad57]/30 bg-white p-4 text-base font-black">
          Andika umurenge wawe
          <input
            className="min-h-14 rounded-xl border border-black/10 px-4 text-lg outline-none focus:border-[#d6ad57]"
            value={value.sectorManual}
            onChange={(event) => update({ sectorManual: event.target.value })}
            placeholder="Urugero: Umurenge wawe"
            required
          />
        </label>
      ) : null}

      {manualCell ? (
        <label className="mt-4 grid gap-2 rounded-2xl border border-[#d6ad57]/30 bg-white p-4 text-base font-black">
          Andika akagari kawe
          <input
            className="min-h-14 rounded-xl border border-black/10 px-4 text-lg outline-none focus:border-[#d6ad57]"
            value={value.cellManual}
            onChange={(event) => update({ cellManual: event.target.value })}
            placeholder="Urugero: Akagari kawe"
            required
          />
        </label>
      ) : null}

      {manualVillage ? (
        <label className="mt-4 grid gap-2 rounded-2xl border border-[#d6ad57]/30 bg-white p-4 text-base font-black">
          Andika umudugudu wawe
          <input
            className="min-h-14 rounded-xl border border-black/10 px-4 text-lg outline-none focus:border-[#d6ad57]"
            value={value.villageManual}
            onChange={(event) => update({ villageManual: event.target.value })}
            placeholder="Urugero: Umudugudu wawe"
            required
          />
        </label>
      ) : null}

      <input type="hidden" name={`${namePrefix}.provinceId`} value={value.provinceId} />
      <input type="hidden" name={`${namePrefix}.provinceName`} value={value.provinceName} />
      <input type="hidden" name={`${namePrefix}.districtId`} value={value.districtId} />
      <input type="hidden" name={`${namePrefix}.districtName`} value={value.districtName} />
      <input type="hidden" name={`${namePrefix}.sectorId`} value={value.sectorId} />
      <input type="hidden" name={`${namePrefix}.sectorName`} value={manualSector ? value.sectorManual : value.sectorName} />
      <input type="hidden" name={`${namePrefix}.cellId`} value={value.cellId} />
      <input type="hidden" name={`${namePrefix}.cellName`} value={manualCell ? value.cellManual : value.cellName} />
      <input type="hidden" name={`${namePrefix}.villageId`} value={value.villageId} />
      <input type="hidden" name={`${namePrefix}.villageName`} value={manualVillage ? value.villageManual : value.villageName} />
    </section>
  );
}
