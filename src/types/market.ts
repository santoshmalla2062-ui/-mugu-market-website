export interface TraderContact {
  name: string;
  role: string;
  phone: string;
  location: string;
  isVerified: boolean;
}

export interface MarketProduceItem {
  id: string;
  nameNepali: string;
  nameEnglish: string;
  rateCurrent: string;
  unit: string;
  priceTrend: "up" | "stable" | "high-demand";
  trendLabel: string;
  monthlyDemand: string;
  suppliedThisWeek: string;
  activeTradersCount: number;
  mainOrigin: string;
  consumptionHub: string;
  status: "उच्च माग (High Demand)" | "स्थिर खपत (Steady)" | "सिजनल पिक (Peak Season)";
  featuredSellers: TraderContact[];
}

export const DEFAULT_MARKET_PRODUCE: MarketProduceItem[] = [
  {
    id: "marsi-rice",
    nameNepali: "जुम्ली तथा मुगुको मार्सी चामल",
    nameEnglish: "Karnali Organic Marsi Rice",
    rateCurrent: "रु १६० - १८०",
    unit: "प्रति के.जी.",
    priceTrend: "high-demand",
    trendLabel: "+१२% उच्च माग",
    monthlyDemand: "१५,०००+ के.जी. / महिना",
    suppliedThisWeek: "३,४५० के.जी. डेलिभर",
    activeTradersCount: 42,
    mainOrigin: "गमगढी, सिँजा र छायाँनाथ",
    consumptionHub: "मुगु बजार, सुर्खेत, नेपालगन्ज र काठमाडौँ",
    status: "उच्च माग (High Demand)",
    featuredSellers: [
      {
        name: "रारा कृषि तथा मार्सी उत्पादक समूह",
        role: "उत्पादक सहकारी (Co-op)",
        phone: "९८४८१२३४५६",
        location: "छायाँनाथ रारा-४, मुगु",
        isVerified: true,
      },
      {
        name: "कर्णाली अर्गानिक सप्लायर्स",
        role: "थोक बिक्रेता (Wholesaler)",
        phone: "९८४८६५४३२१",
        location: "गमगढी मुख्य बजार",
        isVerified: true,
      }
    ]
  },
  {
    id: "mugu-apple",
    nameNepali: "मुगुको अग्र्यानिक स्याउ तथा सुकुटी",
    nameEnglish: "Mugu Fresh Apple & Sukuti",
    rateCurrent: "रु ११० - १४०",
    unit: "प्रति के.जी.",
    priceTrend: "up",
    trendLabel: "सिजनल पिक",
    monthlyDemand: "२८,०००+ के.जी. / महिना",
    suppliedThisWeek: "६,२०० के.जी. डेलिभर",
    activeTradersCount: 58,
    mainOrigin: "ताल्चा, छायाँनाथ रारा र रोवा",
    consumptionHub: "मुगु सदरमुकाम र तराईका मुख्य सहरहरू",
    status: "सिजनल पिक (Peak Season)",
    featuredSellers: [
      {
        name: "ताल्चा स्याउ बगैँचा फार्म",
        role: "स्थानीय कृषक (Apple Farmer)",
        phone: "९८६८००११२२",
        location: "ताल्चा विमानस्थल क्षेत्र",
        isVerified: true,
      },
      {
        name: "मुगु हिमाली कोसेली घर",
        role: "सुकुटी तथा फलफूल डिस्टिब्युटर",
        phone: "९८४८२२३३४४",
        location: "गमगढी बसपार्क नजिक",
        isVerified: true,
      }
    ]
  },
  {
    id: "simi-beans",
    nameNepali: "मुगुको स्थानीय रंगीचंगी सिमी",
    nameEnglish: "Himalayan Local Simi Beans",
    rateCurrent: "रु १७० - २००",
    unit: "प्रति के.जी.",
    priceTrend: "high-demand",
    trendLabel: "दैनिक नियमित खपत",
    monthlyDemand: "१२,०००+ के.जी. / महिना",
    suppliedThisWeek: "२,८०० के.जी. डेलिभर",
    activeTradersCount: 36,
    mainOrigin: "खत्याड र सोरु भेग",
    consumptionHub: "होटल, स्थानीय बजार र कोसेली बजार",
    status: "उच्च माग (High Demand)",
    featuredSellers: [
      {
        name: "खत्याड स्थानीय दाल तथा गेडागुडी केन्द्र",
        role: "किसान समूह (Farmers Union)",
        phone: "९८४८३३४४५५",
        location: "माझखर्क, खत्याड, मुगु",
        isVerified: true,
      },
      {
        name: "सोरु लोकल गेडागुडी भण्डार",
        role: "थोक संकलक (Collector)",
        phone: "९८६८५५६६७७",
        location: "सोरु गाउँपालिका",
        isVerified: true,
      }
    ]
  },
  {
    id: "mountain-ghee",
    nameNepali: "हिमाली च्याङ्ग्रा / गाईको शुद्ध घिउ",
    nameEnglish: "Pure Mountain Chyangra & Cow Ghee",
    rateCurrent: "रु १,२५० - १,४५०",
    unit: "प्रति लिटर",
    priceTrend: "stable",
    trendLabel: "नियमित माग",
    monthlyDemand: "१,८००+ लिटर / महिना",
    suppliedThisWeek: "४२० लिटर डेलिभर",
    activeTradersCount: 24,
    mainOrigin: "मुगुम कार्मारोङ उच्च लेक",
    consumptionHub: "स्थानीय स्वास्थ्य आहार र पूजापाठ",
    status: "स्थिर खपत (Steady)",
    featuredSellers: [
      {
        name: "कार्मारोङ हिमाली च्याङ्ग्रा पालन",
        role: "लेकाली गोठाला तथा डेरी",
        phone: "९८४८७७८८९९",
        location: "पुलु, मुगुम कार्मारोङ",
        isVerified: true,
      },
      {
        name: "रारा शुद्ध घिउ डिपो",
        role: "स्थानीय विक्रेता",
        phone: "९८६८९९००११",
        location: "गमगढी बजार",
        isVerified: true,
      }
    ]
  },
  {
    id: "forest-honey",
    nameNepali: "रारा वरपरको जंगली जडीबुटी मह",
    nameEnglish: "Rara Wild Herbal Honey",
    rateCurrent: "रु ९५० - १,२००",
    unit: "प्रति के.जी.",
    priceTrend: "high-demand",
    trendLabel: "अत्यधिक खोजिएको",
    monthlyDemand: "२,५००+ के.जी. / महिना",
    suppliedThisWeek: "५८० के.जी. डेलिभर",
    activeTradersCount: 19,
    mainOrigin: "रारा राष्ट्रिय निकुञ्ज वन क्षेत्र",
    consumptionHub: "औषधीय प्रयोग र पर्यटक उपहार",
    status: "उच्च माग (High Demand)",
    featuredSellers: [
      {
        name: "छायाँनाथ मौरीपालन तथा मह संकलन",
        role: "मौरीपालक कृषक",
        phone: "९८४८४४५५६६",
        location: "मुर्मा गाउँ, रारा नजिक",
        isVerified: true,
      },
      {
        name: "कर्णाली जडीबुटी तथा मह केन्द्र",
        role: "आधिकारिक संकलक",
        phone: "९८६८११२२३३",
        location: "गमगढी, मुगु",
        isVerified: true,
      }
    ]
  },
  {
    id: "buckwheat-flour",
    nameNepali: "अग्र्यानिक तिते/मिठे फापरको पिठो",
    nameEnglish: "Organic Himalayan Buckwheat Flour",
    rateCurrent: "रु १३० - १५०",
    unit: "प्रति के.जी.",
    priceTrend: "stable",
    trendLabel: "दैनिक खाद्य माग",
    monthlyDemand: "८,५००+ के.जी. / महिना",
    suppliedThisWeek: "१,९०० के.जी. डेलिभर",
    activeTradersCount: 29,
    mainOrigin: "गमगढी, सोरु र कार्मारोङ",
    consumptionHub: "मुगु भान्सा र स्थानीय रेस्टुरेन्टहरू",
    status: "स्थिर खपत (Steady)",
    featuredSellers: [
      {
        name: "मुगु स्थानीय अन्न मिल तथा पिठो उद्योग",
        role: "स्थानीय मिल सञ्चालक",
        phone: "९८४८५५६६७७",
        location: "गमगढी खोला किनार",
        isVerified: true,
      },
      {
        name: "सोरु अर्गानिक कृषि फर्म",
        role: "फापर उत्पादक",
        phone: "९८६८३३४४५५",
        location: "सोरु गाउँपालिका",
        isVerified: true,
      }
    ]
  }
];
