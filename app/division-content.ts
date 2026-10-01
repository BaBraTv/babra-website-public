const emptyMedia: string[] = [];

export const divisionContent = {
  cosmetics: {
    name: "BaBra Cosmetics",
    eyebrow: "Official product division",
    route: "/cosmetics",
    theme: "from-[#f1d58b]/26 via-[#090706] to-[#090706]",
    accent: "#f1d58b",
    description: "Approved official BaBra Lotion media is available on the Cosmetics and Products pages.",
    image: "/media/logos/babra-logo.jpeg",
    imageAlt: "Official BaBra logo",
    serviceImages: ["", "", "", ""],
    galleryImages: emptyMedia,
    videoSources: emptyMedia,
    points: ["BaBra Lotion Women - 500 ml", "BaBra Lotion Men - 500 ml", "BaBra Lotion Babies - 500 ml"],
    cta: "Open BaBra Cosmetics",
    ctaHref: "/cosmetics",
    formsHref: "/forms/cosmetics"
  },
  farm: createDivision("BaBra Farm", "Agriculture division", "/farm", "from-[#4ade80]/24 via-[#0c1b12] to-[#080606]", "#4ade80", "/forms/farm", ["Farmers", "Suppliers", "Marketplace", "Partnerships"]),
  schools: createDivision("BaBra Schools", "Education division", "/schools", "from-[#7dd3fc]/24 via-[#07172c] to-[#080606]", "#7dd3fc", "/forms/schools", ["Admissions", "Teachers", "Scholarships", "Digital school"]),
  foundation: {
    name: "BaBra Foundation",
    eyebrow: "Foundation division",
    route: "/foundation",
    theme: "from-[#c084fc]/24 via-[#1c102a] to-[#080606]",
    accent: "#c084fc",
    description: "Use the official BaBra Foundation routes for child and family support, volunteer, donation, and community requests.",
    image: "/media/logos/babra-logo.jpeg",
    imageAlt: "Official BaBra logo",
    serviceImages: ["", "", "", ""],
    galleryImages: emptyMedia,
    videoSources: emptyMedia,
    points: ["Mission", "Education", "Health", "Community"],
    cta: "Donation CTA",
    ctaHref: "/forms/foundation",
    formsHref: "/forms/foundation"
  },
  hospital: createDivision("BaBra Hospital", "Healthcare division", "/hospital", "from-[#38bdf8]/22 via-[#07101e] to-[#080606]", "#38bdf8", "/contact", ["Healthcare roadmap", "Digital systems", "Trust", "Partnerships"]),
  "rwanda-mobile-hub": {
    name: "Rwanda Mobile Hub",
    eyebrow: "Technology division",
    route: "/rwanda-mobile-hub",
    theme: "from-[#4ebeff]/22 via-[#071722] to-[#080606]",
    accent: "#4ebeff",
    description: "Official Rwanda Mobile Hub media is now available for phone and computer service routes.",
    image: "/media/mobile-hub/rwanda-mobile-hub-hero.jpg",
    imageAlt: "Official Rwanda Mobile Hub signage and service workspace",
    serviceImages: [
      "/media/mobile-hub/rwanda-mobile-hub-repairs.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-accessories.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-software.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-hardware.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-training.jpg"
    ],
    galleryImages: [
      "/media/mobile-hub/rwanda-mobile-hub-hero.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-about.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-repairs.jpg",
      "/media/mobile-hub/rwanda-mobile-hub-gallery.jpg"
    ],
    videoSources: ["/media/mobile-hub/RMH%201.mp4", "/media/mobile-hub/RMH%202.mp4"],
    points: ["Repairs", "Accessories", "Software", "Hardware", "Training"],
    cta: "Open Rwanda Mobile Hub forms",
    ctaHref: "/forms/rwanda-mobile-hub",
    formsHref: "/forms/rwanda-mobile-hub"
  }
} as const;

function createDivision(name: string, eyebrow: string, route: string, theme: string, accent: string, formsHref: string, points: string[]) {
  return {
    name,
    eyebrow,
    route,
    theme,
    accent,
    description: `Explore ${name} and use its official contact and request routes on babra.store.`,
    image: "/media/logos/babra-logo.jpeg",
    imageAlt: "Official BaBra logo",
    serviceImages: ["", "", "", ""],
    galleryImages: emptyMedia,
    videoSources: emptyMedia,
    points,
    cta: `Open ${name} forms`,
    ctaHref: formsHref,
    formsHref
  };
}

export type DivisionKey = keyof typeof divisionContent;
