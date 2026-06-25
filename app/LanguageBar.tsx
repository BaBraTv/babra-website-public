"use client";

import { useEffect, useMemo, useState } from "react";

type LanguageCode = "RW" | "EN" | "FR" | "SW" | "CN";

const languages: [LanguageCode, string][] = [
  ["RW", "Kinyarwanda"],
  ["EN", "English"],
  ["FR", "Francais"],
  ["SW", "Kiswahili"],
  ["CN", "Chinese"]
];

const htmlLang: Record<LanguageCode, string> = {
  RW: "rw",
  EN: "en",
  FR: "fr",
  SW: "sw",
  CN: "zh"
};

const uiCopy: Record<LanguageCode, { language: string; active: string }> = {
  RW: { language: "Ururimi", active: "Kinyarwanda yakoreshejwe" },
  EN: { language: "Language", active: "English active" },
  FR: { language: "Langue", active: "Francais active" },
  SW: { language: "Lugha", active: "Kiswahili imetumika" },
  CN: { language: "语言", active: "中文已启用" }
};

const dictionary: Record<Exclude<LanguageCode, "EN">, Record<string, string>> = {
  RW: {
    "Home": "Ahabanza",
    "Companies": "Amashami",
    "Lost & Found": "Ibyatakaye n'ibyabonetse",
    "Foundation": "Umuryango ufasha",
    "Investors": "Abashoramari",
    "Careers": "Akazi",
    "Content Studio": "Aho gutegurira content",
    "My Account": "Konti yanjye",
    "Contact": "Twandikire",
    "Login": "Injira",
    "Sign Up": "Iyandikishe",
    "Install Guide": "Uko ubishyira muri phone",
    "Shop Now": "Baza igiciro",
    "Baza igiciro": "Baza igiciro",
    "Ask today's BaBra price": "Baza igiciro cya BaBra uyu munsi",
    "Explore companies": "Reba amashami",
    "Open forms": "Fungura amafishi",
    "Lost & Found Rwanda": "Ibyatakaye n'ibyabonetse mu Rwanda",
    "Contact EI BaBra": "Vugana na EI BaBra",
    "Parent company portal": "Urubuga rwa company nkuru",
    "EI BaBra Holding Ltd": "EI BaBra Holding Ltd",
    "Building Beauty, Agriculture, Education, Media & Community Impact for Global Markets.": "Kubaka ubucuruzi bwa beauty, ubuhinzi, uburezi, media n'ibikorwa bifasha abantu ku rwego mpuzamahanga.",
    "Premium feel": "Uburyohe bwa premium",
    "3 lotion editions": "Lotion z'ibyiciro 3",
    "Global-ready brand": "Brand yiteguye isi",
    "Watch BaBra production": "Reba uko BaBra ikorwa",
    "From production care to premium skincare.": "Kuva ku musaruro witaweho kugeza kuri skincare ya premium.",
    "Production story": "Inkuru y'umusaruro",
    "Quality control": "Kugenzura quality",
    "Premium packaging": "Packaging ya premium",
    "BaBra Brand Promise": "Icyo BaBra isezeranya",
    "Luxury people can feel fast.": "Luxury umuntu yumva ako kanya.",
    "Our Dedication": "Ukwitanga kwacu",
    "Founder Vision": "Icyerekezo cy'uwashinze",
    "BaBra is bigger than one product.": "BaBra irenze product imwe.",
    "BaBra Lotion": "BaBra Lotion",
    "Luxury in Every Touch": "Luxury in Every Touch",
    "Premium skincare for women, men, and babies.": "Skincare ya premium ku bagore, abagabo n'abana.",
    "Premium 500ml": "Premium 500ml",
    "Testimonials": "Ibyo abakiriya bavuga",
    "Early trust around BaBra.": "Icyizere BaBra itangiye kubaka.",
    "Main divisions": "Amashami y'ingenzi",
    "Choose a BaBra company.": "Hitamo ishami rya BaBra.",
    "BaBra Cosmetics product families": "Product families za BaBra Cosmetics",
    "Future ecosystem platforms": "Platforms zizaza",
    "Public Services": "Serivisi rusange",
    "Post content for BaBra.": "Tegura content ya BaBra.",
    "Post Image": "Shyiraho ifoto",
    "Post Video": "Shyiraho video",
    "Post Text": "Shyiraho inyandiko",
    "Open studio": "Fungura studio",
    "Global launch engine": "Uburyo bwo kugera ku isi",
    "Built to turn attention into orders.": "Byubakiwe guhindura abareba abakiriya.",
    "Share on WhatsApp": "Sangiza kuri WhatsApp",
    "Prepare content": "Tegura content",
    "Watch production story": "Reba inkuru y'umusaruro",
    "Corporate systems": "Systems za company",
    "Separated forms by division.": "Amafishi atandukanye hakurikijwe ishami.",
    "Investors & Partners": "Abashoramari n'abafatanyabikorwa",
    "Partner with the right BaBra division.": "Korana n'ishami rya BaBra rikwiye.",
    "FAQ": "Ibibazo bikunze kubazwa",
    "Common BaBra questions.": "Ibibazo bisanzwe kuri BaBra.",
    "Fast customer route": "Inzira yihuse y'umukiriya",
    "Samples, wholesale, partnership.": "Samples, kurangura, ubufatanye.",
    "Request samples": "Saba samples",
    "Contact BaBra": "Vugana na BaBra",
    "Products": "Products",
    "Samples": "Samples",
    "Wholesale": "Kurangura",
    "Store": "Iduka",
    "Showroom": "Showroom",
    "Quality": "Quality",
    "Science": "Science",
    "Platform": "Platform",
    "WhatsApp": "WhatsApp",
    "Ask price": "Baza igiciro",
    "Ask on WhatsApp": "Baza kuri WhatsApp",
    "Request quote": "Saba quote",
    "Price request summary": "Incamake yo kubaza igiciro",
    "Price confirmation": "Kwemeza igiciro",
    "Customer information": "Amakuru y'umukiriya",
    "Payment method": "Uburyo bwo kwishyura",
    "Order tracking": "Gukurikirana commande",
    "Customer profile": "Umwirondoro w'umukiriya"
  },
  FR: {
    "Home": "Accueil",
    "Companies": "Divisions",
    "Lost & Found": "Objets perdus",
    "Foundation": "Fondation",
    "Investors": "Investisseurs",
    "Careers": "Carrieres",
    "Content Studio": "Studio de contenu",
    "My Account": "Mon compte",
    "Contact": "Contact",
    "Login": "Connexion",
    "Sign Up": "Inscription",
    "Install Guide": "Guide d'installation",
    "Shop Now": "Demander le prix",
    "Baza igiciro": "Demander le prix",
    "Ask today's BaBra price": "Demander le prix BaBra du jour",
    "Explore companies": "Explorer les divisions",
    "Open forms": "Ouvrir les formulaires",
    "Lost & Found Rwanda": "Objets perdus Rwanda",
    "Contact EI BaBra": "Contacter EI BaBra",
    "Parent company portal": "Portail de la societe mere",
    "Building Beauty, Agriculture, Education, Media & Community Impact for Global Markets.": "Construire la beaute, l'agriculture, l'education, les medias et l'impact communautaire pour les marches mondiaux.",
    "Premium feel": "Sensation premium",
    "3 lotion editions": "3 editions de lotion",
    "Global-ready brand": "Marque prete pour le monde",
    "Watch BaBra production": "Voir la production BaBra",
    "From production care to premium skincare.": "De la production soignee au skincare premium.",
    "Production story": "Histoire de production",
    "Quality control": "Controle qualite",
    "Premium packaging": "Emballage premium",
    "BaBra Brand Promise": "Promesse de marque BaBra",
    "Luxury people can feel fast.": "Un luxe que l'on ressent vite.",
    "Our Dedication": "Notre engagement",
    "Founder Vision": "Vision du fondateur",
    "BaBra is bigger than one product.": "BaBra est plus qu'un seul produit.",
    "Luxury in Every Touch": "Luxury in Every Touch",
    "Premium skincare for women, men, and babies.": "Skincare premium pour femmes, hommes et enfants.",
    "Testimonials": "Temoignages",
    "Early trust around BaBra.": "La confiance autour de BaBra commence.",
    "Main divisions": "Divisions principales",
    "Choose a BaBra company.": "Choisir une division BaBra.",
    "BaBra Cosmetics product families": "Familles de produits BaBra Cosmetics",
    "Future ecosystem platforms": "Plateformes futures",
    "Public Services": "Services publics",
    "Post content for BaBra.": "Publier du contenu pour BaBra.",
    "Post Image": "Publier une image",
    "Post Video": "Publier une video",
    "Post Text": "Publier un texte",
    "Open studio": "Ouvrir le studio",
    "Global launch engine": "Moteur de lancement mondial",
    "Built to turn attention into orders.": "Concu pour transformer l'attention en commandes.",
    "Share on WhatsApp": "Partager sur WhatsApp",
    "Prepare content": "Preparer le contenu",
    "Corporate systems": "Systemes d'entreprise",
    "Separated forms by division.": "Formulaires separes par division.",
    "Investors & Partners": "Investisseurs et partenaires",
    "FAQ": "FAQ",
    "Common BaBra questions.": "Questions frequentes sur BaBra.",
    "Request samples": "Demander des echantillons",
    "Contact BaBra": "Contacter BaBra",
    "Products": "Produits",
    "Samples": "Echantillons",
    "Wholesale": "Grossiste",
    "Store": "Boutique",
    "Showroom": "Showroom",
    "Quality": "Qualite",
    "Science": "Science",
    "Platform": "Plateforme",
    "Ask price": "Demander le prix",
    "Ask on WhatsApp": "Demander sur WhatsApp",
    "Request quote": "Demander un devis",
    "Price request summary": "Resume de demande de prix",
    "Price confirmation": "Confirmation du prix",
    "Customer information": "Informations client",
    "Payment method": "Mode de paiement",
    "Order tracking": "Suivi de commande",
    "Customer profile": "Profil client"
  },
  SW: {
    "Home": "Mwanzo",
    "Companies": "Vitengo",
    "Lost & Found": "Vilivyopotea",
    "Foundation": "Wakfu",
    "Investors": "Wawekezaji",
    "Careers": "Ajira",
    "Content Studio": "Studio ya Maudhui",
    "My Account": "Akaunti yangu",
    "Contact": "Wasiliana",
    "Login": "Ingia",
    "Sign Up": "Jisajili",
    "Install Guide": "Mwongozo wa kusakinisha",
    "Shop Now": "Uliza bei",
    "Baza igiciro": "Uliza bei",
    "Ask today's BaBra price": "Uliza bei ya BaBra ya leo",
    "Explore companies": "Angalia vitengo",
    "Open forms": "Fungua fomu",
    "Lost & Found Rwanda": "Vilivyopotea Rwanda",
    "Contact EI BaBra": "Wasiliana na EI BaBra",
    "Parent company portal": "Tovuti ya kampuni mama",
    "Building Beauty, Agriculture, Education, Media & Community Impact for Global Markets.": "Kujenga urembo, kilimo, elimu, vyombo vya habari na athari kwa jamii kwa masoko ya dunia.",
    "Premium feel": "Hisia ya premium",
    "3 lotion editions": "Aina 3 za lotion",
    "Global-ready brand": "Brand iliyo tayari duniani",
    "Watch BaBra production": "Tazama uzalishaji wa BaBra",
    "Production story": "Hadithi ya uzalishaji",
    "Quality control": "Udhibiti wa ubora",
    "Premium packaging": "Ufungashaji wa premium",
    "Luxury in Every Touch": "Luxury in Every Touch",
    "Request samples": "Omba sampuli",
    "Contact BaBra": "Wasiliana na BaBra",
    "Products": "Bidhaa",
    "Samples": "Sampuli",
    "Wholesale": "Jumla",
    "Store": "Duka",
    "Ask price": "Uliza bei",
    "Ask on WhatsApp": "Uliza WhatsApp",
    "Request quote": "Omba bei",
    "Customer information": "Taarifa za mteja",
    "Payment method": "Njia ya malipo"
  },
  CN: {
    "Home": "首页",
    "Companies": "公司",
    "Lost & Found": "失物招领",
    "Foundation": "基金会",
    "Investors": "投资者",
    "Careers": "招聘",
    "Content Studio": "内容工作室",
    "My Account": "我的账户",
    "Contact": "联系我们",
    "Login": "登录",
    "Sign Up": "注册",
    "Install Guide": "安装指南",
    "Shop Now": "询价",
    "Baza igiciro": "询价",
    "Ask today's BaBra price": "咨询今日 BaBra 价格",
    "Explore companies": "探索公司",
    "Open forms": "打开表单",
    "Lost & Found Rwanda": "卢旺达失物招领",
    "Contact EI BaBra": "联系 EI BaBra",
    "Parent company portal": "母公司门户",
    "Building Beauty, Agriculture, Education, Media & Community Impact for Global Markets.": "为全球市场打造美容、农业、教育、媒体和社区影响力。",
    "Premium feel": "高端体验",
    "3 lotion editions": "三款乳液",
    "Global-ready brand": "面向全球的品牌",
    "Watch BaBra production": "观看 BaBra 生产",
    "Production story": "生产故事",
    "Quality control": "质量控制",
    "Premium packaging": "高端包装",
    "Luxury in Every Touch": "Luxury in Every Touch",
    "Request samples": "申请样品",
    "Contact BaBra": "联系 BaBra",
    "Products": "产品",
    "Samples": "样品",
    "Wholesale": "批发",
    "Store": "商店",
    "Ask price": "询价",
    "Ask on WhatsApp": "WhatsApp 询价",
    "Request quote": "请求报价",
    "Customer information": "客户信息",
    "Payment method": "付款方式"
  }
};

const originalText = new WeakMap<Text, string>();
let isApplyingLanguage = false;

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script,style,noscript,textarea,input,select,option,[data-no-translate='true']"));
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function translateText(value: string, code: LanguageCode) {
  if (code === "EN") return value;
  const translated = dictionary[code][normalizeText(value)];
  return translated ?? value;
}

function applyLanguage(code: LanguageCode) {
  if (isApplyingLanguage) return;
  isApplyingLanguage = true;
  document.documentElement.lang = htmlLang[code];
  document.documentElement.dataset.babraLanguage = code;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    if (shouldSkipNode(node)) continue;
    const current = node.nodeValue ?? "";
    if (!normalizeText(current)) continue;
    if (!originalText.has(node)) originalText.set(node, current);
    const original = originalText.get(node) ?? current;
    const nextValue = translateText(original, code);
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }
  isApplyingLanguage = false;
}

export function LanguageBar() {
  const [selected, setSelected] = useState<LanguageCode>("EN");

  const selectedCopy = useMemo(() => uiCopy[selected], [selected]);

  useEffect(() => {
    const saved = window.localStorage.getItem("babra-language") as LanguageCode | null;
    const initial = saved && languages.some(([code]) => code === saved) ? saved : "EN";
    setSelected(initial);
    window.requestAnimationFrame(() => applyLanguage(initial));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => applyLanguage(selected));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [selected]);

  function chooseLanguage(code: LanguageCode) {
    setSelected(code);
    window.localStorage.setItem("babra-language", code);
    applyLanguage(code);
  }

  return (
    <div className="sticky top-0 z-[60] border-b border-white/10 bg-[#050404]/96 px-4 py-2 text-white backdrop-blur-xl" data-no-translate="true">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">{selectedCopy.language}:</span>
        <div className="flex flex-wrap items-center gap-1 text-xs font-black">
          {languages.map(([code, label]) => (
            <button
              key={code}
              type="button"
              aria-label={`Choose ${label}`}
              aria-pressed={selected === code}
              onClick={() => chooseLanguage(code)}
              className={`rounded-full border px-3 py-1.5 transition ${
                selected === code
                  ? "border-[#4ebeff] bg-[#4ebeff] text-[#061017]"
                  : "border-white/12 bg-white/[0.04] text-white/72 hover:border-[#d6ad57]/60 hover:text-[#f1d58b]"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <span className="w-full text-[11px] font-bold text-white/52 sm:w-auto">{selectedCopy.active}</span>
      </div>
    </div>
  );
}
