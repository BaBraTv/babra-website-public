export const divisionContent = {
  cosmetics: {
    name: "BaBra Cosmetics",
    eyebrow: "Premium skincare and beauty commerce",
    route: "/cosmetics",
    theme: "from-[#f1d58b]/26 via-[#090706] to-[#090706]",
    accent: "#f1d58b",
    description:
      "BaBra Cosmetics is the premium beauty division for BaBra Lotion, soap, pads, pocket fresh, showroom, product verification, samples, wholesale, and Rwanda-first delivery.",
    image: "/brand/official-babra-bottle.png",
    imageAlt: "Official BaBra Lotion product bottle",
    points: ["BaBra Lotion Rwanda", "Premium skincare and showroom", "Wholesale and distributor engine", "Product verification and customer support"],
    cta: "Shop BaBra Cosmetics",
    ctaHref: "/store",
    formsHref: "/forms/cosmetics"
  },
  farm: {
    name: "BaBra Farm",
    eyebrow: "Agriculture and East Africa expansion",
    route: "/farm",
    theme: "from-[#4ade80]/24 via-[#0c1b12] to-[#080606]",
    accent: "#4ade80",
    description:
      "BaBra Farm is the agriculture division for farmer registration, supplier networks, produce marketplace, livestock systems, and regional supply-chain growth.",
    image: "/brand/logo.jpeg",
    imageAlt: "Official BaBra brand image",
    points: ["Farmer registration", "Supplier onboarding", "Produce marketplace", "Agriculture partnerships"],
    cta: "Open BaBra Farm forms",
    ctaHref: "/forms/farm",
    formsHref: "/forms/farm"
  },
  schools: {
    name: "BaBra Schools",
    eyebrow: "Future education systems",
    route: "/schools",
    theme: "from-[#7dd3fc]/24 via-[#07172c] to-[#080606]",
    accent: "#7dd3fc",
    description:
      "BaBra Schools represents the long-term education vision for nursery, primary, secondary, university, digital learning, admissions, teachers, and scholarships.",
    image: "/brand/logo.jpeg",
    imageAlt: "Official BaBra Schools brand image",
    points: ["Student applications", "Teacher applications", "Scholarship requests", "Digital school registration"],
    cta: "Open BaBra Schools forms",
    ctaHref: "/forms/schools",
    formsHref: "/forms/schools"
  },
  foundation: {
    name: "BaBra Foundation",
    eyebrow: "Community impact and family support",
    route: "/foundation",
    theme: "from-[#c084fc]/24 via-[#1c102a] to-[#080606]",
    accent: "#c084fc",
    description:
      "BaBra Foundation is the community impact division for volunteers, family-based support requests, donations, and community partner applications.",
    image: "/brand/logo.jpeg",
    imageAlt: "Official BaBra Foundation brand image",
    points: ["Volunteer registration", "Child and family support", "Donation form", "Community partner application"],
    cta: "Open Foundation forms",
    ctaHref: "/forms/foundation",
    formsHref: "/forms/foundation"
  },
  hospital: {
    name: "BaBra Hospital",
    eyebrow: "Future healthcare systems",
    route: "/hospital",
    theme: "from-[#38bdf8]/22 via-[#07101e] to-[#080606]",
    accent: "#38bdf8",
    description:
      "BaBra Hospital is the long-term healthcare vision for trusted medical services, patient systems, care access, and community health support.",
    image: "/showroom/showroom.png",
    imageAlt: "BaBra uploaded project showroom image",
    points: ["Future hospital roadmap", "Healthcare systems", "Patient trust", "Community health"],
    cta: "Contact EI BaBra",
    ctaHref: "/contact",
    formsHref: "/forms/foundation"
  },
  "rwanda-mobile-hub": {
    name: "Rwanda Mobile Hub",
    eyebrow: "Technology and mobile commerce",
    route: "/rwanda-mobile-hub",
    theme: "from-[#4ebeff]/22 via-[#071722] to-[#080606]",
    accent: "#4ebeff",
    description:
      "Rwanda Mobile Hub is the technology division for mobile devices, repair, digital trade, youth skills, and future digital business systems.",
    image: "/showroom/showroom.png",
    imageAlt: "BaBra uploaded project showroom image",
    points: ["Mobile commerce", "Device support", "Digital jobs", "Youth technology skills"],
    cta: "Open Rwanda Mobile Hub forms",
    ctaHref: "/forms/rwanda-mobile-hub",
    formsHref: "/forms/rwanda-mobile-hub"
  }
} as const;

export type DivisionKey = keyof typeof divisionContent;
