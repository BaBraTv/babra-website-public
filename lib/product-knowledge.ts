export type ProductKnowledgeSlug = "women" | "men" | "babies";

export type EvidenceState =
  | "verified-public-fact"
  | "document-matched-final-approval-pending"
  | "requires-product-specific-review";

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
  type: "label-artwork" | "manufacturer-msds" | "batch-coa" | "company-record";
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
    explanation: "Supports a conditioned skin feel. Ingredient presence alone does not establish a soothing or therapeutic result for the finished lotion.",
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
    explanation: "Included to support a comfortable, conditioned skin feel; this is not a therapeutic claim.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Bisabolol",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support. The ingredient does not by itself prove a finished-product calming or clinical result.",
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
    explanation: "Supports a soft, conditioned skin feel without implying a medical or healing effect.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Hyaluronic Acid",
    function: "Humectant",
    explanation: "Helps bind water at the skin surface. Ingredient function is not clinical proof of the finished lotion.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Retinol",
    function: "Ingredient under product-specific review",
    explanation: "It appears in the current adult manufacturer documents, but the final active concentration and safety basis have not been verified for public claims.",
    state: "requires-product-specific-review",
    caution: "Do not infer facial suitability, pregnancy suitability, efficacy, or final active concentration from ingredient presence alone."
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
    explanation: "Supports a conditioned skin feel. Ingredient presence alone does not establish a soothing or therapeutic result for the finished lotion.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Nicotinamide",
    displayName: "Niacinamide",
    function: "Skin-conditioning ingredient",
    explanation: "Supports skin conditioning. Ingredient presence alone does not establish a finished-product clinical result.",
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
    explanation: "Included to support a comfortable, conditioned skin feel; this is not a therapeutic claim.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Calendula Officinalis Extract",
    displayName: "Calendula extract",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support; ingredient presence does not establish a treatment or finished-product clinical result.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Avena Sativa Kernel Extract",
    displayName: "Oat kernel extract",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support; this is not proof of a therapeutic effect.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Bisabolol",
    function: "Skin-conditioning ingredient",
    explanation: "Included for skin-conditioning support. The ingredient does not by itself prove a finished-product calming or clinical result.",
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
    explanation: "Supports a soft, conditioned skin feel without implying a medical or healing effect.",
    state: "document-matched-final-approval-pending"
  },
  {
    name: "Hyaluronic Acid",
    function: "Humectant",
    explanation: "Helps bind water at the skin surface. Ingredient function is not clinical proof of the finished lotion.",
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
    publicSummary: "A batch-specific quality record was reviewed. It is not a clinical study, long-term stability study or product-registration approval."
  }
};

export const productKnowledge: Record<ProductKnowledgeSlug, ProductKnowledgeRecord> = {
  women: {
    slug: "women",
    publicName: "BaBra Lotion Signature for Her",
    variant: "Signature for Her",
    category: "Adult body lotion",
    size: "500 mL",
    image: "/media/products/babra-lotion-women-500ml.png",
    imageAlt: "Official BaBra Lotion Signature for Her 500 mL bottle",
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    countryOfManufacture: "China",
    productCode: "L-350W365477",
    overview: "A 500 mL moisturising body lotion combining glycerin, aloe vera leaf juice, shea butter, jojoba seed oil, panthenol and hyaluronic acid to help hydrate, soften and condition the skin.",
    intendedUse: "Current product records and artwork identify this variant as a body lotion. Facial use is not confirmed by the approved public evidence currently available.",
    usage: "The current artwork directs users to massage the lotion into skin where moisture is desired. It states that the product is ready to use and should not be diluted. Follow the physical label on your bottle because final artwork may change.",
    faceUse: "Not confirmed. The current artwork identifies a body lotion; this is not a blanket prohibition on facial use. Product-specific label and safety confirmation are required before recommending face use.",
    dailyUse: "The current artwork describes use when skin needs moisture, but the final approved frequency has not been separately verified. Follow the label supplied with the product.",
    precautions: [
      "Retinol is listed in the current adult manufacturer documents, but its final active concentration and safety basis remain under review.",
      "Do not infer universal facial, pregnancy or sensitive-skin suitability from the ingredient list.",
      "Use the current bottle label as the controlling direction and contact BaBra for product-specific guidance."
    ],
    labelIngredientDeclaration: adultLabelIngredientDeclaration,
    ingredientHighlights: commonAdultHighlights,
    retinolStatus: "Listed in current MSDS and label artwork; final active concentration and product-specific safety review are unresolved.",
    finalInciStatus: "The ingredient declaration on the label artwork supplied 23 October 2026 has been transcribed. Final controlled approval, INCI-name normalization and regulatory review are still required before it can be described as the approved final INCI list.",
    evidence: [
      attachedLabelEvidence.women,
      {
        id: "msds-pls26040803",
        type: "manufacturer-msds",
        reference: "Manufacturer MSDS PLS26040803, issued 8 April 2026",
        reviewed: "2026-10-08",
        status: "reviewed-with-open-items",
        publicSummary: "Supports product identity and the current document-matched ingredient highlights. Retinol assay, final active concentration and some ingredient identities remain open."
      },
      commonEvidence.coa
    ],
    lastEvidenceReview: "2026-10-23"
  },
  men: {
    slug: "men",
    publicName: "BaBra Lotion Signature for Him",
    variant: "Signature for Him",
    category: "Adult body lotion",
    size: "500 mL",
    image: "/media/products/babra-lotion-men-500ml.png",
    imageAlt: "Official BaBra Lotion Signature for Him 500 mL bottle",
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    countryOfManufacture: "China",
    productCode: "L-349W702477",
    overview: "A 500 mL moisturising body lotion combining glycerin, aloe vera leaf juice, shea butter, jojoba seed oil, panthenol and hyaluronic acid to help hydrate, soften and condition the skin.",
    intendedUse: "Current product records and artwork identify this variant as a body lotion. Facial use is not confirmed by the approved public evidence currently available.",
    usage: "The current artwork directs users to massage the lotion into skin where moisture is desired. It states that the product is ready to use and should not be diluted. Follow the physical label on your bottle because final artwork may change.",
    faceUse: "Not confirmed. The current artwork identifies a body lotion; this is not a blanket prohibition on facial use. Product-specific label and safety confirmation are required before recommending face use.",
    dailyUse: "The current artwork describes use when skin needs moisture, but the final approved frequency has not been separately verified. Follow the label supplied with the product.",
    precautions: [
      "Retinol is listed in the current adult manufacturer documents, but its final active concentration and safety basis remain under review.",
      "Do not infer universal facial, pregnancy or sensitive-skin suitability from the ingredient list.",
      "Use the current bottle label as the controlling direction and contact BaBra for product-specific guidance."
    ],
    labelIngredientDeclaration: adultLabelIngredientDeclaration,
    ingredientHighlights: commonAdultHighlights,
    retinolStatus: "Listed in current MSDS and label artwork; final active concentration and product-specific safety review are unresolved.",
    finalInciStatus: "The ingredient declaration on the label artwork supplied 23 October 2026 has been transcribed. Final controlled approval, INCI-name normalization and regulatory review are still required before it can be described as the approved final INCI list.",
    evidence: [
      attachedLabelEvidence.men,
      {
        id: "msds-pls26040802",
        type: "manufacturer-msds",
        reference: "Manufacturer MSDS PLS26040802, issued 8 April 2026",
        reviewed: "2026-10-08",
        status: "reviewed-with-open-items",
        publicSummary: "Supports product identity and the current document-matched ingredient highlights. Retinol assay, final active concentration and some ingredient identities remain open."
      },
      commonEvidence.coa
    ],
    lastEvidenceReview: "2026-10-23"
  },
  babies: {
    slug: "babies",
    publicName: "BaBra Lotion Soft Care for Kids",
    variant: "Soft Care for Kids",
    category: "Children's body lotion",
    size: "500 mL",
    image: "/media/products/babra-lotion-babies-500ml.png",
    imageAlt: "Official BaBra Lotion Soft Care for Kids 500 mL bottle",
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    countryOfManufacture: "China",
    productCode: "L-351W220477",
    overview: "A 500 mL children's body lotion with glycerin, niacinamide, squalane, sodium PCA, shea butter, panthenol and oat kernel extract to help moisturise, soften and condition the skin.",
    intendedUse: "Current product records and artwork identify this variant as a children's body lotion. The reviewed documents do not establish a public age range or newborn suitability.",
    usage: "The current artwork directs users to massage the lotion into skin where moisture is desired. It states that the product is ready to use and should not be diluted. Follow the physical label on your bottle and request age guidance from BaBra.",
    faceUse: "Not confirmed. The current artwork identifies a body lotion; this is not a blanket prohibition on facial use. Product-specific label, age and safety confirmation are required before recommending face use.",
    dailyUse: "The current artwork describes use when skin needs moisture, but an approved age-specific frequency has not been separately verified. Follow the label supplied with the product.",
    precautions: [
      "No retinol is listed in the reviewed Kids MSDS or current label artwork; adult ingredients are never transferred to this record.",
      "The reviewed evidence does not establish newborn suitability or a public 0-12 age claim.",
      "Use the current bottle label as the controlling direction and contact BaBra for age- and product-specific guidance."
    ],
    labelIngredientDeclaration: kidsLabelIngredientDeclaration,
    ingredientHighlights: kidsHighlights,
    retinolStatus: "No retinol is listed in the reviewed Kids MSDS or current label artwork.",
    finalInciStatus: "The ingredient declaration on the Kids label artwork supplied 23 October 2026 has been transcribed. Final controlled approval, INCI-name normalization, age guidance and regulatory review are still required before it can be described as the approved final INCI list.",
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
      commonEvidence.coa
    ],
    lastEvidenceReview: "2026-10-23"
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
  rwandaPhone,
  domain
}: {
  manufacturer: string;
  rwandaPartner: string;
  rwandaPhone: string;
  domain: string;
}): PublicProductFaq[] {
  return [
    {
      question: "What is BaBra Lotion?",
      answer: "BaBra Lotion is a BaBra Cosmetics body-lotion collection presented in three 500 mL variants: Signature for Her, Signature for Him and Soft Care for Kids. Public product information is kept variant-specific and evidence-labelled."
    },
    {
      question: "Who manufactures BaBra Lotion?",
      answer: `The reviewed records identify ${manufacturer} in China as the manufacturing partner for the three BaBra Lotion variants. Manufacturing certificates describe facility scope; they do not replace product-specific registration or safety evidence.`
    },
    {
      question: "What BaBra Lotion variants are available?",
      answer: "The public collection contains BaBra Lotion Signature for Her, Signature for Him and Soft Care for Kids. Each is presented in a 500 mL bottle."
    },
    {
      question: "Is BaBra Lotion designed for face and body?",
      answer: "The current reviewed artwork identifies all three variants as body lotion, and the approved public evidence does not yet confirm facial suitability. This is not a generic statement that BaBra Lotion is prohibited for facial use. A face-use recommendation requires the final label and product-specific safety evidence for the exact variant."
    },
    {
      question: "What ingredients does BaBra Lotion contain?",
      answer: "Each product page publishes the complete ingredient declaration transcribed from the supplied label artwork, without confidential percentages. Signature for Her and Signature for Him have an adult declaration that includes retinol. Soft Care for Kids has a distinct declaration that includes niacinamide, squalane and sodium PCA and does not list retinol. Final controlled artwork approval and INCI-name normalization remain pending."
    },
    {
      question: "What are the recognized cosmetic functions of the highlighted ingredients?",
      answer: "Humectants such as glycerin, sodium PCA and hyaluronic acid help retain moisture at the skin surface. Emollients such as shea butter, squalane, jojoba seed oil and caprylic/capric triglyceride help soften the skin surface. Panthenol, niacinamide, aloe vera leaf juice, oat kernel extract and other highlighted ingredients support skin conditioning. These general functions are not clinical proof of the finished lotion."
    },
    {
      question: "Does BaBra publish the full ingredient list?",
      answer: "BaBra publishes the complete ingredient declaration transcribed from the supplied label artwork for each variant, alongside evidence-labelled highlights and without confidential formula percentages. The physical label on the released product remains the controlling consumer reference."
    },
    {
      question: "Which BaBra Lotion variants contain retinol?",
      answer: "Retinol is listed in the current manufacturer MSDS and label artwork for Signature for Her and Signature for Him. The final active concentration and product-specific safety basis remain under review. Retinol is not listed in the reviewed Soft Care for Kids MSDS or current label artwork."
    },
    {
      question: "Can BaBra Lotion be used every day?",
      answer: "Current artwork describes applying the lotion when skin needs moisture, but a separate final approved frequency has not been published. Follow the directions on the physical bottle supplied with your product and request product-specific guidance when needed."
    },
    {
      question: "Is Soft Care for Kids suitable from birth?",
      answer: "The reviewed MSDS and label artwork do not establish a public age range or newborn suitability. Manufacturing capability for infant and children's skincare is not the same as a finished-product safety assessment. Contact BaBra for current age-specific guidance."
    },
    {
      question: "Is BaBra Lotion FDA approved?",
      answer: "BaBra does not claim US FDA product approval. A manufacturing certificate that references US FDA cosmetic GMP guidance is not issued by the FDA and is not product approval. Rwanda company, premises-licence and product-registration statuses are reported separately on the Quality page."
    },
    {
      question: "Where can customers buy authentic BaBra Lotion?",
      answer: `For Rwanda orders, contact ${rwandaPartner} at ${rwandaPhone}. For international orders, contact BaBra Cosmetics through ${domain}. Price, stock and delivery are confirmed at the time of enquiry.`
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
      { "@type": "PropertyValue", name: "Net content", value: product.size },
      { "@type": "PropertyValue", name: "Product information review", value: product.lastEvidenceReview }
    ]
    // Offer is intentionally omitted until price, currency, stock and seller are verified.
  };
}
