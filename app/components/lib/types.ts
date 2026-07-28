import type { AlternativeData } from "./ai/alternativeAgent";
import type { RetailerData } from "./ai/retailerAgent";
import type { ReviewData } from "./ai/reviewAgent";
import type { PriceData } from "./ai/priceAgent";

export type Recommendation =
  | "BUY"
  | "WAIT"
  | "NEGOTIATE"
  | "WALK_AWAY";

export interface ScoreBreakdown {
  price: number;
  reviews: number;
  retailer: number;
  warranty: number;
  value: number;
}

export interface DealReport {
  recommendation: Recommendation;

  confidence: number;

  dealScore: number;

  scoreBreakdown: ScoreBreakdown;

  scoreExplanation?: string;

  product: {
    name: string;
    brand: string;
    model: string;
    imageUrl?: string;
    ctaUrl?: string;
    ctaLabel?: string;
  };

  productOverview?: {
    shortDescription: string;
    bestFor: string[];
    strengths: string[];
    considerations: string[];
    confidence: number;
  };

  reviews: ReviewData;

  pricing: PriceData;

  summary: string;

  ifItWasOurMoney: string;

  specifications?: Record<
  string,
  string | number | boolean | null
>;

  strengths: string[];

  concerns: string[];

  betterAlternatives: AlternativeData[];

  retailers: RetailerData[];

  topOffers: PriceData["topOffers"];
}