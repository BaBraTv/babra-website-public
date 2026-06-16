export const divisionForms = {
  cosmetics: {
    name: "BaBra Cosmetics forms",
    accent: "#f1d58b",
    description: "Official BaBra Cosmetics forms for beauty commerce, showroom, samples, wholesale, and customer support.",
    items: [
      ["Wholesale Distributor Application", "/wholesale-distributor", "Apply as a reseller, wholesaler, distributor, shop, salon, or beauty partner."],
      ["Sample Request", "/sample-request", "Request BaBra Lotion and skincare samples through the official WhatsApp flow."],
      ["Beauty Agent Application", "/job-application", "Apply to represent BaBra Cosmetics as a beauty agent or sales promoter."],
      ["Showroom Visit Booking", "/contact-showroom", "Book showroom support, product consultation, or partner onboarding."],
      ["Product Verification / Customer Support", "/contact-showroom", "Ask for product support while keeping QR, barcode, and batch details private."]
    ]
  },
  farm: {
    name: "BaBra Farm forms",
    accent: "#4ade80",
    description: "Agriculture forms for farmer onboarding, suppliers, produce marketplace, and partnerships.",
    items: [
      ["Farmer Registration", "whatsapp", "Register as a farmer for future BaBra Farm supply-chain opportunities."],
      ["Supplier Registration", "whatsapp", "Register seeds, inputs, logistics, packaging, or agriculture service supply."],
      ["Produce Marketplace", "whatsapp", "Submit produce availability for future marketplace and buyer matching."],
      ["Agriculture Partnership", "whatsapp", "Request partnership with BaBra Farm for land, production, supply, or exports."]
    ]
  },
  schools: {
    name: "BaBra Schools forms",
    accent: "#7dd3fc",
    description: "Education forms for the future BaBra Schools system and digital learning platform.",
    items: [
      ["Student Application", "whatsapp", "Register interest for future nursery, primary, secondary, or university admissions."],
      ["Teacher Application", "whatsapp", "Apply for future teaching, administration, or digital-learning roles."],
      ["Scholarship Request", "whatsapp", "Submit a scholarship request for future education support review."],
      ["Digital School Registration", "whatsapp", "Join the future digital school and parent/student systems waitlist."]
    ]
  },
  "lifetalk-tv": {
    name: "LifeTalk TV forms",
    accent: "#ef4444",
    description: "Media forms for presenters, actors, advertising, stories, documentaries, and production requests.",
    items: [
      ["Presenter Application", "whatsapp", "Apply to present LifeTalk TV shows, interviews, or business programs."],
      ["Actor Registration", "whatsapp", "Register for future films, drama, commercials, and creative productions."],
      ["Advertise With Us", "whatsapp", "Request advertising packages, sponsored programs, or brand campaigns."],
      ["Story Submission", "whatsapp", "Submit a success story, business story, or community story."],
      ["Documentary Request", "whatsapp", "Request documentary coverage, interviews, or production support."]
    ]
  },
  foundation: {
    name: "BaBra Foundation forms",
    accent: "#fb923c",
    description: "Community impact forms for volunteers, family support, donations, and community partnerships.",
    items: [
      ["Volunteer Registration", "whatsapp", "Register to support BaBra Foundation community programs."],
      ["Child / Family Support Request", "/child-family-support", "Request family-based support, education support, nutrition support, or emergency help."],
      ["Donation Form", "whatsapp", "Ask for official donation guidance and verified support channels."],
      ["Community Partner Application", "whatsapp", "Apply as a community organization, school, church, or local partner."]
    ]
  }
} as const;

export type DivisionFormsKey = keyof typeof divisionForms;
