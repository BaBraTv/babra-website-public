export type LocationLevel = "province" | "district" | "sector" | "cell" | "village";

export type LocationOption = {
  id: string;
  name: string;
  parentId?: string;
};

export type LocationValue = {
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  sectorId: string;
  sectorName: string;
  sectorManual: string;
  cellId: string;
  cellName: string;
  cellManual: string;
  villageId: string;
  villageName: string;
  villageManual: string;
};

export const emptyLocation: LocationValue = {
  provinceId: "",
  provinceName: "",
  districtId: "",
  districtName: "",
  sectorId: "",
  sectorName: "",
  sectorManual: "",
  cellId: "",
  cellName: "",
  cellManual: "",
  villageId: "",
  villageName: "",
  villageManual: ""
};

export const provinces: LocationOption[] = [
  { id: "rw-kigali", name: "Kigali City" },
  { id: "rw-east", name: "Eastern Province" },
  { id: "rw-north", name: "Northern Province" },
  { id: "rw-south", name: "Southern Province" },
  { id: "rw-west", name: "Western Province" }
];

export const districts: LocationOption[] = [
  { id: "rw-kigali-gasabo", name: "Gasabo", parentId: "rw-kigali" },
  { id: "rw-kigali-kicukiro", name: "Kicukiro", parentId: "rw-kigali" },
  { id: "rw-kigali-nyarugenge", name: "Nyarugenge", parentId: "rw-kigali" },
  { id: "rw-east-bugesera", name: "Bugesera", parentId: "rw-east" },
  { id: "rw-east-gatsibo", name: "Gatsibo", parentId: "rw-east" },
  { id: "rw-east-kayonza", name: "Kayonza", parentId: "rw-east" },
  { id: "rw-east-kirehe", name: "Kirehe", parentId: "rw-east" },
  { id: "rw-east-ngoma", name: "Ngoma", parentId: "rw-east" },
  { id: "rw-east-nyagatare", name: "Nyagatare", parentId: "rw-east" },
  { id: "rw-east-rwamagana", name: "Rwamagana", parentId: "rw-east" },
  { id: "rw-north-burera", name: "Burera", parentId: "rw-north" },
  { id: "rw-north-gakenke", name: "Gakenke", parentId: "rw-north" },
  { id: "rw-north-gicumbi", name: "Gicumbi", parentId: "rw-north" },
  { id: "rw-north-musanze", name: "Musanze", parentId: "rw-north" },
  { id: "rw-north-rulindo", name: "Rulindo", parentId: "rw-north" },
  { id: "rw-south-gisagara", name: "Gisagara", parentId: "rw-south" },
  { id: "rw-south-huye", name: "Huye", parentId: "rw-south" },
  { id: "rw-south-kamonyi", name: "Kamonyi", parentId: "rw-south" },
  { id: "rw-south-muhanga", name: "Muhanga", parentId: "rw-south" },
  { id: "rw-south-nyamagabe", name: "Nyamagabe", parentId: "rw-south" },
  { id: "rw-south-nyanza", name: "Nyanza", parentId: "rw-south" },
  { id: "rw-south-nyaruguru", name: "Nyaruguru", parentId: "rw-south" },
  { id: "rw-south-ruhango", name: "Ruhango", parentId: "rw-south" },
  { id: "rw-west-karongi", name: "Karongi", parentId: "rw-west" },
  { id: "rw-west-ngororero", name: "Ngororero", parentId: "rw-west" },
  { id: "rw-west-nyabihu", name: "Nyabihu", parentId: "rw-west" },
  { id: "rw-west-nyamasheke", name: "Nyamasheke", parentId: "rw-west" },
  { id: "rw-west-rubavu", name: "Rubavu", parentId: "rw-west" },
  { id: "rw-west-rusizi", name: "Rusizi", parentId: "rw-west" },
  { id: "rw-west-rutsiro", name: "Rutsiro", parentId: "rw-west" }
];

export const sectors: LocationOption[] = [
  { id: "rw-nyarugenge-kimisagara", name: "Kimisagara", parentId: "rw-kigali-nyarugenge" },
  { id: "rw-nyarugenge-gitega", name: "Gitega", parentId: "rw-kigali-nyarugenge" },
  { id: "rw-nyarugenge-nyamirambo", name: "Nyamirambo", parentId: "rw-kigali-nyarugenge" },
  { id: "rw-nyarugenge-rwezamenyo", name: "Rwezamenyo", parentId: "rw-kigali-nyarugenge" },
  { id: "rw-gasabo-kimironko", name: "Kimironko", parentId: "rw-kigali-gasabo" },
  { id: "rw-gasabo-kacyiru", name: "Kacyiru", parentId: "rw-kigali-gasabo" },
  { id: "rw-kicukiro-gatenga", name: "Gatenga", parentId: "rw-kigali-kicukiro" },
  { id: "rw-kicukiro-kanombe", name: "Kanombe", parentId: "rw-kigali-kicukiro" },
  { id: "manual-sector", name: "Sindi kubona umurenge wanjye", parentId: "*" }
];

export const cells: LocationOption[] = [
  { id: "rw-kimisagara-katabaro", name: "Katabaro", parentId: "rw-nyarugenge-kimisagara" },
  { id: "rw-kimisagara-kamuhoza", name: "Kamuhoza", parentId: "rw-nyarugenge-kimisagara" },
  { id: "rw-kimisagara-kimisagara", name: "Kimisagara", parentId: "rw-nyarugenge-kimisagara" },
  { id: "rw-gitega-akabahizi", name: "Akabahizi", parentId: "rw-nyarugenge-gitega" },
  { id: "rw-kimironko-bibare", name: "Bibare", parentId: "rw-gasabo-kimironko" },
  { id: "rw-gatenga-karugira", name: "Karugira", parentId: "rw-kicukiro-gatenga" },
  { id: "manual-cell", name: "Sindi kubona akagari kanjye", parentId: "*" }
];

export const villages: LocationOption[] = [
  { id: "rw-katabaro-amahoro", name: "Amahoro", parentId: "rw-kimisagara-katabaro" },
  { id: "rw-katabaro-ingenzi", name: "Ingenzi", parentId: "rw-kimisagara-katabaro" },
  { id: "rw-katabaro-ubumwe", name: "Ubumwe", parentId: "rw-kimisagara-katabaro" },
  { id: "rw-kamuhoza-icyerekezo", name: "Icyerekezo", parentId: "rw-kimisagara-kamuhoza" },
  { id: "rw-kimisagara-isangano", name: "Isangano", parentId: "rw-kimisagara-kimisagara" },
  { id: "manual-village", name: "Sindi kubona umudugudu wanjye", parentId: "*" }
];

export const locationSeedNotes = [
  "This module stores both IDs and names for database records.",
  "Districts are seeded for Rwanda province coverage.",
  "Sectors, cells, and villages are import-ready. Replace or extend this file from an official Rwanda CSV/JSON dataset.",
  "Every selection is filtered by parentId so a district cannot be selected outside its province."
];
