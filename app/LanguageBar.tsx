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
    "About": "Abo turi bo",
    "Dental Clinic": "Ivuriro ry'amenyo",
    "Explore BaBra": "Menya BaBra",
    "One vision.": "Icyerekezo kimwe.",
    "A growing legacy.": "Umurage ukomeza gukura.",
    "A Rwandan enterprise building premium beauty, technology, education, healthcare, agriculture, media, and community impact for generations.": "Ikigo nyarwanda cyubaka ubwiza bwa premium, ikoranabuhanga, uburezi, ubuzima, ubuhinzi, itangazamakuru n'ibikorwa bifasha abantu mu bihe bizaza.",
    "Discover our ecosystem": "Menya ibikorwa byacu byose",
    "Our story": "Inkuru yacu",
    "Rooted at home": "Dushingiye iwacu",
    "Built to expand": "Twubakiye kwaguka",
    "Designed to endure": "Twubakiye kuramba",
    "The BaBra promise": "Isezerano rya BaBra",
    "Purpose in every enterprise.": "Intego muri buri gikorwa.",
    "View all BaBra divisions": "Reba amashami yose ya BaBra",
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
    "Customer profile": "Umwirondoro w'umukiriya",
    "Samples, wholesale, support": "Samples, kurangura, ubufasha",
    "Talk to BaBra directly.": "Vugana na BaBra ako kanya.",
    "WhatsApp now": "Andika kuri WhatsApp",
    "Showroom form": "Ifishi ya showroom",
    "Email BaBra": "Ohereza email kuri BaBra",
    "Quick routes": "Inzira zihuse",
    "Choose the right conversation.": "Hitamo aho ikibazo cyawe kijyana.",
    "Business email readiness": "Email za business ziteguye",
    "Correct email route for every BaBra division.": "Inzira ya email ikwiye kuri buri shami rya BaBra.",
    "Retail experience": "Uburyo bwo kwakira abakiriya",
    "BaBra Showroom.": "BaBra Showroom.",
    "Book showroom support": "Saba ubufasha bwa showroom",
    "View products": "Reba products",
    "Showroom system": "System ya showroom",
    "A physical brand experience built for trust.": "Aho abakiriya babonera brand ku buryo bubaha icyizere.",
    "Gallery ready": "Gallery yiteguye",
    "Photos, videos, and franchise proof.": "Amafoto, videos n'ibimenyetso bya franchise.",
    "Quality and compliance": "Quality n'ibyangombwa",
    "Trust that can be verified.": "Icyizere gishobora kugenzurwa.",
    "Important wording rule": "Itegeko ry'imvugo ikoreshwa",
    "Use evidence-based claims only.": "Koresha gusa ibyo ufitiye gihamya.",
    "Trust signals": "Ibimenyetso by'icyizere",
    "Premium quality story without exposing private documents.": "Inkuru ya quality ya premium idashyira hanze documents z'ibanga.",
    "Claim control": "Kugenzura ibyo tuvuga",
    "Strong claims must be legally defensible.": "Ibyo tuvuga bigomba kuba bifite gihamya yemewe.",
    "Verification model": "Uburyo bwo kugenzura",
    "Public confidence, private proof.": "Icyizere cya public, gihamya ikinzwe.",
    "BaBra Cosmetics Division": "Ishami rya BaBra Cosmetics",
    "A complete premium product house.": "Inzu yuzuye ya products za premium.",
    "Usage": "Uko ikoreshwa",
    "Protected details": "Amakuru arinzwe",
    "Samples and partnerships": "Samples n'ubufatanye",
    "Launch-ready for shops, salons, and distributors.": "Yiteguye amaduka, salons n'abacuruzi barangura.",
    "View quality proof": "Reba gihamya ya quality",
    "Future e-commerce structure": "Imiterere ya e-commerce izaza",
    "Ready for ordering, verification, and scale.": "Yiteguye commande, verification no kwaguka.",
    "BaBra Store commerce app": "BaBra Store commerce app",
    "Shop BaBra skincare with Rwanda-first delivery.": "Gura BaBra skincare ifite delivery ibanza mu Rwanda.",
    "Official product information pending approval.": "Amakuru yemewe ya product ategereje kwemezwa.",
    "Product pages": "Amapaji ya products",
    "Women, men, and babies.": "Abagore, abagabo n'abana.",
    "Quote request.": "Gusaba quote.",
    "Cart is empty. Add a product above or use WhatsApp fallback for manual ordering.": "Cart nta kintu kirimo. Hitamo product hejuru cyangwa ukoreshe WhatsApp.",
    "Price confirmed by BaBra support": "Igiciro cyemezwa na BaBra support",
    "Rwanda-first delivery.": "Delivery ibanza mu Rwanda.",
    "Delivery Policy": "Amategeko ya delivery",
    "Delivery support": "Ubufasha bwa delivery"
  },
  FR: {
    "About": "A propos",
    "Dental Clinic": "Clinique dentaire",
    "Explore BaBra": "Explorer BaBra",
    "One vision.": "Une vision.",
    "A growing legacy.": "Un heritage en croissance.",
    "A Rwandan enterprise building premium beauty, technology, education, healthcare, agriculture, media, and community impact for generations.": "Une entreprise rwandaise qui developpe la beaute premium, la technologie, l'education, la sante, l'agriculture, les medias et l'impact communautaire pour les generations futures.",
    "Discover our ecosystem": "Decouvrir notre ecosysteme",
    "Our story": "Notre histoire",
    "Rooted at home": "Enracines au Rwanda",
    "Built to expand": "Construits pour grandir",
    "Designed to endure": "Concus pour durer",
    "The BaBra promise": "La promesse BaBra",
    "Purpose in every enterprise.": "Une mission dans chaque entreprise.",
    "View all BaBra divisions": "Voir toutes les divisions BaBra",
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
    "Customer profile": "Profil client",
    "Samples, wholesale, support": "Echantillons, grossiste, support",
    "Talk to BaBra directly.": "Parlez directement a BaBra.",
    "WhatsApp now": "WhatsApp maintenant",
    "Showroom form": "Formulaire showroom",
    "Email BaBra": "Envoyer un email a BaBra",
    "Quick routes": "Acces rapides",
    "Choose the right conversation.": "Choisissez le bon sujet de contact.",
    "Business email readiness": "Emails business prets",
    "Correct email route for every BaBra division.": "Le bon email pour chaque division BaBra.",
    "Retail experience": "Experience retail",
    "Book showroom support": "Reserver le support showroom",
    "View products": "Voir les produits",
    "Showroom system": "Systeme showroom",
    "A physical brand experience built for trust.": "Une experience de marque physique creee pour la confiance.",
    "Gallery ready": "Galerie prete",
    "Photos, videos, and franchise proof.": "Photos, videos et preuves de franchise.",
    "Quality and compliance": "Qualite et conformite",
    "Trust that can be verified.": "Une confiance verifiable.",
    "Important wording rule": "Regle importante de formulation",
    "Use evidence-based claims only.": "Utiliser uniquement des affirmations fondees sur des preuves.",
    "Trust signals": "Signaux de confiance",
    "Premium quality story without exposing private documents.": "Une histoire de qualite premium sans exposer les documents prives.",
    "Claim control": "Controle des affirmations",
    "Strong claims must be legally defensible.": "Les affirmations fortes doivent etre defendables legalement.",
    "Verification model": "Modele de verification",
    "Public confidence, private proof.": "Confiance publique, preuves privees.",
    "BaBra Cosmetics Division": "Division BaBra Cosmetics",
    "A complete premium product house.": "Une maison complete de produits premium.",
    "Usage": "Utilisation",
    "Protected details": "Details proteges",
    "Samples and partnerships": "Echantillons et partenariats",
    "Launch-ready for shops, salons, and distributors.": "Pret pour boutiques, salons et distributeurs.",
    "View quality proof": "Voir les preuves de qualite",
    "Future e-commerce structure": "Future structure e-commerce",
    "Ready for ordering, verification, and scale.": "Pret pour commandes, verification et croissance.",
    "BaBra Store commerce app": "Application commerce BaBra Store",
    "Shop BaBra skincare with Rwanda-first delivery.": "Achetez BaBra skincare avec livraison prioritaire au Rwanda.",
    "Official product information pending approval.": "Les informations officielles du produit sont en attente d'approbation.",
    "Product pages": "Pages produits",
    "Women, men, and babies.": "Femmes, hommes et bebes.",
    "Quote request.": "Demande de devis.",
    "Cart is empty. Add a product above or use WhatsApp fallback for manual ordering.": "Le panier est vide. Ajoutez un produit ou utilisez WhatsApp.",
    "Price confirmed by BaBra support": "Prix confirme par le support BaBra",
    "Rwanda-first delivery.": "Livraison Rwanda d'abord.",
    "Delivery Policy": "Politique de livraison",
    "Delivery support": "Support livraison"
  },
  SW: {
    "About": "Kuhusu sisi",
    "Dental Clinic": "Kliniki ya meno",
    "Explore BaBra": "Gundua BaBra",
    "One vision.": "Dira moja.",
    "A growing legacy.": "Urithi unaokua.",
    "A Rwandan enterprise building premium beauty, technology, education, healthcare, agriculture, media, and community impact for generations.": "Biashara ya Rwanda inayojenga urembo wa hali ya juu, teknolojia, elimu, afya, kilimo, vyombo vya habari na maendeleo ya jamii kwa vizazi vijavyo.",
    "Discover our ecosystem": "Gundua mfumo wetu",
    "Our story": "Hadithi yetu",
    "Rooted at home": "Mizizi yetu Rwanda",
    "Built to expand": "Tumejengwa kukua",
    "Designed to endure": "Tumeundwa kudumu",
    "The BaBra promise": "Ahadi ya BaBra",
    "Purpose in every enterprise.": "Lengo katika kila biashara.",
    "View all BaBra divisions": "Tazama vitengo vyote vya BaBra",
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
    "Payment method": "Njia ya malipo",
    "Samples, wholesale, support": "Sampuli, jumla, msaada",
    "Talk to BaBra directly.": "Wasiliana moja kwa moja na BaBra.",
    "WhatsApp now": "WhatsApp sasa",
    "Showroom form": "Fomu ya showroom",
    "Email BaBra": "Tuma email kwa BaBra",
    "Quick routes": "Njia za haraka",
    "Choose the right conversation.": "Chagua mazungumzo sahihi.",
    "Retail experience": "Uzoefu wa duka",
    "Book showroom support": "Omba msaada wa showroom",
    "View products": "Tazama bidhaa",
    "Quality and compliance": "Ubora na utii",
    "Trust that can be verified.": "Uaminifu unaoweza kuthibitishwa.",
    "Trust signals": "Ishara za uaminifu",
    "BaBra Cosmetics Division": "Kitengo cha BaBra Cosmetics",
    "A complete premium product house.": "Nyumba kamili ya bidhaa za premium.",
    "Usage": "Matumizi",
    "Protected details": "Maelezo yaliyolindwa",
    "Samples and partnerships": "Sampuli na ushirikiano",
    "View quality proof": "Tazama uthibitisho wa ubora",
    "BaBra Store commerce app": "Programu ya biashara ya BaBra Store",
    "Shop BaBra skincare with Rwanda-first delivery.": "Nunua BaBra skincare kwa delivery inayoanza Rwanda.",
    "Product pages": "Kurasa za bidhaa",
    "Women, men, and babies.": "Wanawake, wanaume na watoto wachanga.",
    "Quote request.": "Ombi la bei.",
    "Price confirmed by BaBra support": "Bei inathibitishwa na msaada wa BaBra",
    "Rwanda-first delivery.": "Delivery ya Rwanda kwanza.",
    "Delivery Policy": "Sera ya delivery",
    "Delivery support": "Msaada wa delivery"
  },
  CN: {
    "About": "关于我们",
    "Dental Clinic": "牙科诊所",
    "Explore BaBra": "探索 BaBra",
    "One vision.": "同一个愿景。",
    "A growing legacy.": "不断成长的传承。",
    "A Rwandan enterprise building premium beauty, technology, education, healthcare, agriculture, media, and community impact for generations.": "一家立足卢旺达、为世代发展高端美妆、科技、教育、医疗、农业、媒体与社区影响力的企业。",
    "Discover our ecosystem": "探索我们的生态体系",
    "Our story": "我们的故事",
    "Rooted at home": "扎根卢旺达",
    "Built to expand": "面向增长",
    "Designed to endure": "致力长久",
    "The BaBra promise": "BaBra 的承诺",
    "Purpose in every enterprise.": "每项事业皆有使命。",
    "View all BaBra divisions": "查看所有 BaBra 业务",
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
    "Payment method": "付款方式",
    "Samples, wholesale, support": "样品、批发、支持",
    "Talk to BaBra directly.": "直接联系 BaBra。",
    "WhatsApp now": "立即 WhatsApp",
    "Showroom form": "展厅表单",
    "Email BaBra": "发送邮件给 BaBra",
    "Quick routes": "快速入口",
    "Choose the right conversation.": "选择正确的沟通入口。",
    "Retail experience": "零售体验",
    "Book showroom support": "预约展厅支持",
    "View products": "查看产品",
    "Quality and compliance": "质量与合规",
    "Trust that can be verified.": "可验证的信任。",
    "Trust signals": "信任信号",
    "BaBra Cosmetics Division": "BaBra Cosmetics 部门",
    "A complete premium product house.": "完整的高端产品体系。",
    "Usage": "使用方法",
    "Protected details": "受保护的信息",
    "Samples and partnerships": "样品与合作",
    "View quality proof": "查看质量证明",
    "BaBra Store commerce app": "BaBra Store 商务应用",
    "Shop BaBra skincare with Rwanda-first delivery.": "购买 BaBra 护肤品，优先支持卢旺达配送。",
    "Product pages": "产品页面",
    "Women, men, and babies.": "女性、男性和婴儿。",
    "Quote request.": "报价请求。",
    "Price confirmed by BaBra support": "价格由 BaBra 客服确认",
    "Rwanda-first delivery.": "卢旺达优先配送。",
    "Delivery Policy": "配送政策",
    "Delivery support": "配送支持"
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
  try {
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
  } finally {
    isApplyingLanguage = false;
  }
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
    <div className="sticky top-0 z-[60] h-11 border-b border-white/10 bg-[#050404]/96 px-4 text-white backdrop-blur-xl" data-no-translate="true">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between gap-3">
        <span className="hidden text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f1d58b] sm:block">{selectedCopy.language}</span>
        <div className="flex items-center gap-1 text-[0.68rem] font-black">
          {languages.map(([code, label]) => (
            <button
              key={code}
              type="button"
              aria-label={`Choose ${label}`}
              aria-pressed={selected === code}
              onClick={() => chooseLanguage(code)}
              className={`rounded-full border px-2.5 py-1 transition sm:px-3 ${
                selected === code
                  ? "border-[#4ebeff] bg-[#4ebeff] text-[#061017]"
                  : "border-white/12 bg-white/[0.04] text-white/72 hover:border-[#d6ad57]/60 hover:text-[#f1d58b]"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <span className="hidden text-[11px] font-bold text-white/52 md:block">{selectedCopy.active}</span>
      </div>
    </div>
  );
}
