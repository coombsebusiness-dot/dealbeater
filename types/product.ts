export interface ProductOffer {
  retailer: string;
  title: string;
  price: number;
  url: string;
  image?: string;
  
}

export interface ProductAlternative {
  name: string;
  slug?: string;
  category?: string;
  brand?: string;
  reason?: string;
  price?: number;
  image?: string;
  url?: string;
  score?: number;
}

export interface ProductFAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  family?: string;
  faqs?: ProductFAQItem[];

  model: {
    base: string;
    revision?: string;
    variant?: string;
    sku?: string;
  };

specs: Record<
  string,
  string | number | boolean | null | undefined
>;

  image?: string;
  imageAlt?: string;

  summary: string;

  currentPrice?: number;
  fairPrice?: number;
  lowestPrice?: number;

  blinlxScore?: number;

  

  verdict?: string;
  verdictLabel?: string;
  ifItWasOurMoney?: string;

  primaryOfferUrl?: string;
  primaryOfferRetailer?: string;

  dealScore?: number;
confidence?: number;

scoreBreakdown?: {
  price: number;
  reviews: number;
  retailer: number;
  warranty: number;
  value: number;
};

scoreExplanation?: string;

  topOffers?: ProductOffer[];

  alternatives?: ProductAlternative[];

  

  highlights?: string[];

scoreContext?: {
  confidence?: number;
  concerns?: string[];
};

priceStatus?: "Excellent" | "Good" | "Fair" | "High";

priceHistoryUrl?: string;
}