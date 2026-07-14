export const homepageNav = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Companies", "#companies"],
  ["Products", "#products"],
  ["Why BaBra", "#why-babra"],
  ["Contact", "/contact"]
] as const;

export const companyCards = [
  {
    title: "BaBra Cosmetics",
    href: "/cosmetics",
    image: "/brand/official-babra-bottle.png",
    label: "Official product division",
    text: "Public product pages, store flow, wholesale requests, and safe product information."
  },
  {
    title: "BaBra School",
    href: "/schools",
    image: "/photos/school-classroom.jpg",
    label: "Education platform",
    text: "Admissions, school planning, parent access, and future education systems."
  },
  {
    title: "LifeTalk TV",
    href: "/lifetalk-tv",
    image: "/brand/homepage-video-poster.webp",
    label: "Media division",
    text: "Storytelling, programs, business education, and social-impact media."
  },
  {
    title: "Rwanda Mobile Hub",
    href: "/rwanda-mobile-hub",
    image: "/photos/mobile-smartphone.jpg",
    label: "Technology division",
    text: "Mobile services, accessories, support workflows, and youth technology skills."
  },
  {
    title: "BaBra Foundation",
    href: "/foundation",
    image: "/photos/foundation-community.jpg",
    label: "Community impact",
    text: "Volunteer coordination, donation routing, and community support programs."
  }
] as const;

export const featuredProducts = [
  {
    name: "Women Lotion 500ml",
    image: "/brand/official-babra-bottle.png",
    status: "Official product structure",
    note: "Public product details are being organized for official approval."
  },
  {
    name: "Men Lotion 500ml",
    image: "/brand/official-babra-bottle-men.png",
    status: "Official product structure",
    note: "Gallery, label details, and ordering notes use placeholders until confirmed."
  },
  {
    name: "Babies Lotion 500ml",
    image: "/brand/official-babra-bottle-kids.png",
    status: "Official product structure",
    note: "Safety and usage copy should be approved before public expansion."
  }
] as const;

export const whyChooseBaBra = [
  "One ecosystem for products, services, forms, and customer access.",
  "Official uploaded visuals are used where available.",
  "Sensitive product details remain protected until verified for release.",
  "The platform is designed to grow with admin, orders, payments, and content systems."
] as const;