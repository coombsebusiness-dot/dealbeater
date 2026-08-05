import type {
  ProductIntelligence,
} from "@/knowledge/intelligence";

export interface KnowledgeFact {
  title:
    string;

  explanation:
    string;

  confidence:
    number;
}

export type ProductRecommendationVerdict =
  | "BEST_OVERALL"
  | "BEST_BEGINNER"
  | "BEST_VALUE"
  | "BEST_BUDGET"
  | "BEST_PRIME"
  | "BEST_ZOOM"
  | "BEST_USED"
  | "BEST_UPGRADE"
  | "BEST_TRAVEL"
  | "BEST_STREET"
  | "BEST_PORTRAIT"
  | "BEST_WILDLIFE"
  | "BEST_SPORTS"
  | "BEST_VIDEO"
  | "BEST_SPECIALIST"
  | "SPECIALIST"
  | "ALTERNATIVE"
  | "CONSIDER";

export interface ProductRecommendation {
  name:
    string;

  reason:
    string;

  confidence:
    number;

  slug?:
    string;

  verdict?:
    ProductRecommendationVerdict;

  strengths?:
    string[];

  weaknesses?:
    string[];

  bestFor?:
    string[];

  avoidIf?:
    string[];

  currentPrice?:
    number;

  fairPrice?:
    number;

  imageUrl?:
    string;

  buyingAdvice?:
    string;
}

export interface ProductIntelligenceContextEntry {
  productId:
    string;

  productName:
    string;

  slug?:
    string;

  provider:
    string | null;

  confidence:
    number;

  intelligence:
    ProductIntelligence;
}

export interface BuyerWarning {
  title:
    string;

  explanation:
    string;
}

export interface KnowledgeContext {
  topic:
    string;

  category:
    string;

  products:
    ProductRecommendation[];

  productIntelligence:
    ProductIntelligenceContextEntry[];

  keyFacts:
    KnowledgeFact[];

  tradeOffs:
    KnowledgeFact[];

  commonMistakes:
    BuyerWarning[];

  terminology:
    string[];

  buyerProfiles:
    string[];
}