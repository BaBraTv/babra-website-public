export type ProductKnowledgeSlug = "women" | "men" | "babies";

export type EvidenceState =
  | "verified-public-fact"
  | "document-matched-final-approval-pending";

export type IngredientHighlight = {
  name: string;
  displayName?: string;
  function: string;
  explanation: string;
  state: EvidenceState;
  caution?: string;
};

export type EvidenceReference = {
  id: string;
  type: "label-artwork" | "manufacturer-msds" | "batch-coa" | "company-record" | "rwanda-fda-import-license";
  reference: string;
  reviewed: string;
  status: "reviewed" | "reviewed-with-open-items";
  publicSummary: string;
};

export type ProductKnowledgeRecord = {
  slug: ProductKnowledgeSlug;
  publicName: string;
  variant: string;
  category: "Adult body lotion" | "Children's body lotion";
  size: "500 mL";
  image: string;
  imageAlt: string;
  manufacturer: string;
  countryOfManufacture: "China";
  productCode: string;
  overview: string;
  intendedUse: string;
  usage: string;
  faceUse: string;
  dailyUse: string;
  precautions: string[];
  labelIngredientDeclaration: string[];
  ingredientHighlights: IngredientHighlight[];
  retinolStatus: string;
  finalInciStatus: string;
  evidence: EvidenceReference[];
  lastEvidenceReview: string;
};

const adultLabelIngredientDeclaration = [
  "Water",
  "Glycerin",
  "Butylene Glycol",
  "Aloe Barbadensis Leaf Juice",
  "Shea Butter",
  "Caprylic/Capric Triglyceride",
  "Jojoba Seed Oil",
  "Collagen",
  "Stearic Acid",
  "Cetearyl Alcohol",
  "Sunflower Seed Oil",
  "Grape Seed Oil",
  "Avocado Oil",
  "Olive Fruit Oil",
  "Beta-Glucan",
  "Ginkgo Biloba Leaf Extract",
  "Avocado Fruit Extract",
  "Bisabolol",
  "Vitamin E",
  "Panthenol",
  "Lecithin",
  "Allantoin",
  "Hyaluronic Acid",
  "Retinol",
  "Xanthan Gum",
  "Fragrance"
];

const kidsLabelIngredientDeclaration = [
  "Water",
  "Glycerin",
  "Butylene Glycol",
  "Aloe Barbadensis Leaf Juice",
  "Shea Butter",
  "Caprylic/Capric Triglyceride",
  "Jojoba Seed Oil",
  "Niacinamide",
  "Squalane",
  "Collagen",
  "Stearic Acid",
  "Cetearyl Alcohol",
  "Sunflower Seed Oil",
  "Grape Seed Oil",
  "Avocado Oil",
  "Olive Fruit Oil",
  "Sodium PCA",
  "Beta-Glucan",
  "Ginkgo Biloba Leaf Extract",
  "Calendula Officinalis Extract",
  "Oat Kernel Extract",
  "Bisabolol",
  "Vitamin E",
  "Panthenol",
  "Lecithin",
  "Allantoin",
  "Hyaluronic Acid",
  "Xanthan Gum",
  "Fragrance"
];

const commonAdultHighlights: IngredientHighlight[] = [
  {
    name: "Glycerin",
    function: "Humectant",
    explanation: "Helps attract and retain water at the skin surface.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Butylene Glycol",
    function: "Humectant and solvent",
    explanation: "Helps hold moisture at the skin surface and supports even distribution of ingredients in the formula.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Aloe Barbadensis Leaf Juice",
    displayName: "Aloe vera leaf juice",
    function: "Skin-conditioning ingredient",
    explanation: "Supports a conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Butyrospermum Parkii Butter",
    displayName: "Shea butter",
    function: "Emollient",
    explanation: "Helps soften skin and supports a smoother application feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Caprylic/Capric Triglyceride",
    function: "Emollient",
    explanation: "Helps soften the skin surface and gives the lotion a smooth, spreadable feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Simmondsia Chinensis Seed Oil",
    displayName: "Jojoba seed oil",
    function: "Emollient and skin-conditioning ingredient",
    explanation: "Helps soften and condition the skin surface.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Beta-Glucan",
    function: "Skin-conditioning ingredient",
    explanation: "Included to support a comfortable, conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Bisabolol",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Panthenol",
    function: "Humectant and skin-conditioning ingredient",
    explanation: "Supports moisture retention and a conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Allantoin",
    function: "Skin-conditioning ingredient",
    explanation: "Supports a soft, conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Hyaluronic Acid",
    function: "Humectant",
    explanation: "Helps bind water at the skin surface.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Retinol",
    function: "Skin-conditioning ingredient",
    explanation: "Listed in the manufacturer MSDS and label artwork for Signature for Her and Signature for Him.",
    state: "document-matched-final-approval-pending"
  }
];

const kidsHighlights: IngredientHighlight[] = [
  {
    name: "Glycerin",
    function: "Humectant",
    explanation: "Helps attract and retain water at the skin surface.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Butylene Glycol",
    function: "Humectant and solvent",
    explanation: "Helps hold moisture at the skin surface and supports even distribution of ingredients in the formula.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Aloe Barbadensis Leaf Juice",
    displayName: "Aloe vera leaf juice",
    function: "Skin-conditioning ingredient",
    explanation: "Supports a conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Nicotinamide",
    displayName: "Niacinamide",
    function: "Skin-conditioning ingredient",
    explanation: "Supports skin conditioning.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Butyrospermum Parkii Butter",
    displayName: "Shea butter",
    function: "Emollient",
    explanation: "Helps soften skin and supports a smoother application feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Caprylic/Capric Triglyceride",
    function: "Emollient",
    explanation: "Helps soften the skin surface and gives the lotion a smooth, spreadable feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Simmondsia Chinensis Seed Oil",
    displayName: "Jojoba seed oil",
    function: "Emollient and skin-conditioning ingredient",
    explanation: "Helps soften and condition the skin surface.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Squalane",
    function: "Emollient",
    explanation: "Helps soften the skin surface and improve spreadability.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Sodium PCA",
    function: "Humectant",
    explanation: "Helps attract and retain moisture at the skin surface.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Beta-Glucan",
    function: "Skin-conditioning ingredient",
    explanation: "Included to support a comfortable, conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Calendula Officinalis Extract",
    displayName: "Calendula extract",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Avena Sativa Kernel Extract",
    displayName: "Oat kernel extract",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Bisabolol",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Panthenol",
    function: "Humectant and skin-conditioning ingredient",
    explanation: "Supports moisture retention and a conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Allantoin",
    function: "Skin-conditioning ingredient",
    explanation: "Supports a soft, conditioned skin feel.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Hyaluronic Acid",
    function: "Humectant",
    explanation: "Helps bind water at the skin surface.",
    state: "document-matched-final-approval-pending"
  }
];

const attachedLabelEvidence: Record<ProductKnowledgeSlug, EvidenceReference> = {
  women: {
    id: "label-artwork-women-2026-10-23",
    type: "label-artwork",
    reference: "Signature for Her label artwork supplied 23 October 2026",
    reviewed: "2026-10-23",
    status: "reviewed-with-open-items",
    publicSummary: "Confirms the variant name, 500 mL presentation, body-lotion positioning, current directions and a label ingredient declaration that includes retinol. Final INCI normalization, directions, certification symbols and artwork approval remain open."
  },
  men: {
    id: "label-artwork-men-2026-10-23",
    type: "label-artwork",
    reference: "Signature for Him label artwork supplied 23 October 2026",
    reviewed: "2026-10-23",
    status: "reviewed-with-open-items",
    publicSummary: "Confirms the variant name, 500 mL presentation, body-lotion positioning, current directions and a label ingredient declaration that includes retinol. Final INCI normalization, directions, certification symbols and artwork approval remain open."
  },
  babies: {
    id: "label-artwork-kids-2026-10-23",
    type: "label-artwork",
    reference: "Soft Care for Kids label artwork supplied 23 October 2026",
    reviewed: "2026-10-23",
    status: "reviewed-with-open-items",
    publicSummary: "Confirms the variant name, 500 mL presentation, body-lotion positioning, current directions and a distinct children's label ingredient declaration with niacinamide, squalane and sodium PCA and without retinol. Final INCI normalization, age guidance, directions, certification symbols and artwork approval remain open."
  }
};

const commonEvidence = {
  coa: {
    id: "coa-batch-20260401",
    type: "batch-coa" as const,
    reference: "Manufacturer COA for batch 20260401",
    reviewed: "2026-10-08",
    status: "reviewed-with-open-items" as const,
    publicSummary: "Manufacturer quality record for batch 20260401."
  },
  rwandaImportLicense: {
    id: "rwanda-fda-import-license-0469",
    type: "rwanda-fda-import-license" as const,
    reference: "Rwanda FDA Import Licence RWANDA-FDA26/COS/SLIC/0469 (13 May–12 November 2026)",
    reviewed: "2026-11-03",
    status: "reviewed" as const,
    publicSummary: "Rwanda FDA listed Signature for Her, Signature for Him and Soft Care for Kids on this import licence for the stated term."
  }
};

export const productKnowledge: Record<ProductKnowledgeSlug, ProductKnowledgeRecord> = {
  women: {
    slug: "women",
    publicName: "BaBra Lotion Signature for Her",
    variant: "Signature for Her",
    category: "Adult body lotion",
    size: "500 mL",
    image: "/media/products/babra-lotion-women-luxury-500ml.webp",
    imageAlt: "Official BaBra Lotion Signature for Her 500 mL bottle",
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    countryOfManufacture: "China",
    productCode: "L-350W365477",
    overview: "A 500 mL moisturising body lotion combining glycerin, aloe vera leaf juice, shea butter, jojoba seed oil, panthenol and hyaluronic acid to help hydrate, soften and condition the skin.",
    intendedUse: "The product information presents this variant as a body lotion. Follow the directions printed on the bottle you receive.",
    usage: "Massage the lotion into skin where moisture is desired. The product is ready to use and should not be diluted. Follow the physical label on your bottle.",
    faceUse: "Follow the directions and precautions on your product label. Contact BaBra Cosmetics for guidance on your edition.",
    dailyUse: "Apply when skin needs moisture and follow the directions on the physical bottle supplied with your product.",
    precautions: [
      "If you are pregnant or have sensitive skin, ask a healthcare professional for advice about your skincare routine.",
      "Use the current bottle label as the controlling direction and contact BaBra for product-specific guidance."
    ],
    labelIngredientDeclaration: adultLabelIngredientDeclaration,
    ingredientHighlights: commonAdultHighlights,
    retinolStatus: "Retinol is listed in the manufacturer MSDS and label artwork for this edition.",
    finalInciStatus: "The ingredient declaration is transcribed from the supplied label artwork and matches the current adult MSDS. The physical released label remains the controlling consumer reference.",
    evidence: [
      attachedLabelEvidence.women,
      {
        id: "msds-pls26040803",
        type: "manufacturer-msds",
        reference: "Manufacturer MSDS PLS26040803, issued 8 April 2026",
        reviewed: "2026-10-08",
        status: "reviewed-with-open-items",
        publicSummary: "Supports product identity and the current document-matched ingredient highlights, including retinol."
      },
      commonEvidence.coa,
      commonEvidence.rwandaImportLicense
    ],
    lastEvidenceReview: "2026-11-03"
  },
  men: {
    slug: "men",
    publicName: "BaBra Lotion Signature for Him",
    variant: "Signature for Him",
    category: "Adult body lotion",
    size: "500 mL",
    image: "/media/products/babra-lotion-men-luxury-500ml.webp",
    imageAlt: "Official BaBra Lotion Signature for Him 500 mL bottle",
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    countryOfManufacture: "China",
    productCode: "L-349W702477",
    overview: "A 500 mL moisturising body lotion combining glycerin, aloe vera leaf juice, shea butter, jojoba seed oil, panthenol and hyaluronic acid to help hydrate, soften and condition the skin.",
    intendedUse: "The product information presents this variant as a body lotion. Follow the directions printed on the bottle you receive.",
    usage: "Massage the lotion into skin where moisture is desired. The product is ready to use and should not be diluted. Follow the physical label on your bottle.",
    faceUse: "Follow the directions and precautions on your product label. Contact BaBra Cosmetics for guidance on your edition.",
    dailyUse: "Apply when skin needs moisture and follow the directions on the physical bottle supplied with your product.",
    precautions: [
      "If you are pregnant or have sensitive skin, ask a healthcare professional for advice about your skincare routine.",
      "Use the current bottle label as the controlling direction and contact BaBra for product-specific guidance."
    ],
    labelIngredientDeclaration: adultLabelIngredientDeclaration,
    ingredientHighlights: commonAdultHighlights,
    retinolStatus: "Retinol is listed in the manufacturer MSDS and label artwork for this edition.",
    finalInciStatus: "The ingredient declaration is transcribed from the supplied label artwork and matches the current adult MSDS. The physical released label remains the controlling consumer reference.",
    evidence: [
      attachedLabelEvidence.men,
      {
        id: "msds-pls26040802",
        type: "manufacturer-msds",
        reference: "Manufacturer MSDS PLS26040802, issued 8 April 2026",
        reviewed: "2026-10-08",
        status: "reviewed-with-open-items",
        publicSummary: "Supports product identity and the current document-matched ingredient highlights, including retinol."
      },
      commonEvidence.coa,
      commonEvidence.rwandaImportLicense
    ],
    lastEvidenceReview: "2026-11-03"
  },
  babies: {
    slug: "babies",
    publicName: "BaBra Lotion Soft Care for Kids",
    variant: "Soft Care for Kids",
    category: "Children's body lotion",
    size: "500 mL",
    image: "/media/products/babra-lotion-babies-luxury-500ml.webp",
    imageAlt: "Official BaBra Lotion Soft Care for Kids 500 mL bottle",
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    countryOfManufacture: "China",
    productCode: "L-351W220477",
    overview: "A 500 mL children's body lotion with glycerin, niacinamide, squalane, sodium PCA, shea butter, panthenol and oat kernel extract to help moisturise, soften and condition the skin.",
    intendedUse: "The product information presents this variant as a children's body lotion. Follow the age and usage directions printed on the bottle you receive.",
    usage: "Massage the lotion into skin where moisture is desired. The product is ready to use and should not be diluted. Follow the physical label and ask BaBra if you need age-specific guidance.",
    faceUse: "Follow the directions and precautions on your product label. Contact BaBra Cosmetics for guidance on your edition.",
    dailyUse: "Apply when skin needs moisture and follow the age and usage directions on the physical bottle supplied with your product.",
    precautions: [
      "No retinol is listed in the reviewed Kids MSDS or current label artwork; adult ingredients are never transferred to this record.",
      "No newborn or 0-12 age claim is published; follow the age guidance on the bottle.",
      "Use the current bottle label as the controlling direction and contact BaBra for age- and product-specific guidance."
    ],
    labelIngredientDeclaration: kidsLabelIngredientDeclaration,
    ingredientHighlights: kidsHighlights,
    retinolStatus: "No retinol is listed in the reviewed Kids MSDS or current label artwork.",
    finalInciStatus: "The ingredient declaration is transcribed from the supplied label artwork and matches the current Kids MSDS. The physical released label remains the controlling consumer reference.",
    evidence: [
      attachedLabelEvidence.babies,
      {
        id: "msds-pls26040801",
        type: "manufacturer-msds",
        reference: "Manufacturer MSDS PLS26040801, issued 8 April 2026",
        reviewed: "2026-10-08",
        status: "reviewed-with-open-items",
        publicSummary: "Supports product identity and the current document-matched ingredient highlights. It does not establish newborn suitability, a public age range or finished-product safety for every child."
      },
      commonEvidence.coa,
      commonEvidence.rwandaImportLicense
    ],
    lastEvidenceReview: "2026-11-03"
  }
};

export const productKnowledgeList = Object.values(productKnowledge);

export function getProductKnowledge(slug: string) {
  return productKnowledge[slug as ProductKnowledgeSlug];
}

export type PublicProductFaq = {
  question: string;
  answer: string;
};

export function buildPublicProductFaqs({
  manufacturer,
  rwandaPartner,
  rwandaContactPhone,
  rwandaOrderPhone,
  domain
}: {
  manufacturer: string;
  rwandaPartner: string;
  rwandaContactPhone: string;
  rwandaOrderPhone: string;
  domain: string;
}): PublicProductFaq[] {
  return [
    {
      question: "What is BaBra Lotion?",
      answer: "BaBra Lotion is a BaBra Cosmetics body-lotion collection presented in three 500 mL variants: Signature for Her, Signature for Him and Soft Care for Kids. Public product information is kept variant-specific and evidence-labelled."
    },
    {
      question: "Who manufactures BaBra Lotion?",
      answer: `BaBra Lotion is manufactured by ${manufacturer} in China.`
    },
    {
      question: "What BaBra Lotion variants are available?",
      answer: "The BaBra collection contains Signature for Her, Signature for Him and Soft Care for Kids. Each is presented in a 500 mL bottle."
    },
    {
      question: "Is BaBra Lotion designed for face and body?",
      answer: "The bottle directions say to massage the lotion into skin wherever and whenever it needs moisture. Follow the directions and precautions on your edition’s label. Contact BaBra Cosmetics for specific guidance on face and body use."
    },
    {
      question: "What ingredients does BaBra Lotion contain?",
      answer: "Each product page publishes the ingredient declaration from the manufacturer-supplied label record, without confidential percentages. Signature for Her and Signature for Him include retinol. Soft Care for Kids has a distinct declaration that includes niacinamide, squalane and sodium PCA and does not list retinol. The physical bottle remains the controlling consumer reference."
    },
    {
      question: "What are the recognized cosmetic functions of the highlighted ingredients?",
      answer: "Humectants such as glycerin, sodium PCA and hyaluronic acid help retain moisture at the skin surface. Emollients such as shea butter, squalane, jojoba seed oil and caprylic/capric triglyceride help soften the skin surface. Panthenol, niacinamide, aloe vera leaf juice, oat kernel extract and other highlighted ingredients support skin conditioning."
    },
    {
      question: "Does BaBra publish the full ingredient list?",
      answer: "BaBra publishes the complete ingredient declaration transcribed from the supplied label artwork for each variant, alongside evidence-labelled highlights and without confidential formula percentages. The physical label on the released product remains the controlling consumer reference."
    },
    {
      question: "Which BaBra Lotion variants contain retinol?",
      answer: "Retinol is listed in the manufacturer MSDS and label artwork for Signature for Her and Signature for Him. It is not listed in the Soft Care for Kids MSDS or label artwork."
    },
    {
      question: "Can BaBra Lotion be used every day?",
      answer: "Apply the lotion when skin needs moisture and follow the directions on the physical bottle supplied with your product. Ask BaBra if you need product-specific guidance."
    },
    {
      question: "Is Soft Care for Kids suitable from birth?",
      answer: "BaBra does not publish a newborn-suitability claim for Soft Care for Kids. Follow the age guidance on the physical bottle and contact BaBra when you need product-specific advice."
    },
    {
      question: "Where can I verify BaBra Lotion’s Rwanda FDA documents?",
      answer: "Visit Quality & Documentation for Rwanda FDA licence references, including the import licence that lists all three BaBra Lotion editions. To verify your bottle or request the latest product documents, contact BaBra Cosmetics with the product name and batch number on the label."
    },
    {
      question: "Where can customers buy authentic BaBra Lotion?",
      answer: `For Rwanda orders, call or WhatsApp ${rwandaPartner} at ${rwandaOrderPhone}. For general ${rwandaPartner} enquiries, call ${rwandaContactPhone}. For international orders, contact BaBra Cosmetics through ${domain}. Price, stock and delivery are confirmed at the time of enquiry.`
    },
    {
      question: "How can distributors contact BaBra Cosmetics Ltd?",
      answer: `Distributors, wholesalers and international partners can use the official contact and wholesale-distributor pages on ${domain}. BaBra confirms current commercial terms directly rather than publishing an unverified offer.`
    }
  ];
}

export function productJsonLd(product: ProductKnowledgeRecord, siteUrl = "https://www.babra.store") {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/products/${product.slug}#product`,
    name: product.publicName,
    description: product.overview,
    image: [`${siteUrl}${product.image}`],
    url: `${siteUrl}/products/${product.slug}`,
    sku: product.productCode,
    size: product.size,
    category: product.category,
    brand: { "@type": "Brand", "@id": `${siteUrl}/#babra-cosmetics-brand`, name: "BaBra Cosmetics" },
    manufacturer: {
      "@type": "Organization",
      name: product.manufacturer,
      address: { "@type": "PostalAddress", addressCountry: "CN" }
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Variant", value: product.variant },
      { "@type": "PropertyValue", name: "Net content", value: product.size }
    ]
    // Offer is intentionally omitted until price, currency, stock and seller are verified.
  };
}
