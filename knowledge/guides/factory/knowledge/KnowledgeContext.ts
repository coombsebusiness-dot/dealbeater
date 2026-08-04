export interface KnowledgeFact {
  title: string;

  explanation: string;

  confidence: number;
}

export type ProductRecommendationVerdict =
  | "BEST_OVERALL"
  | "BEST_VALUE"
  | "BEST_BEGINNER"
  | "BEST_USED"
  | "BEST_SPECIALIST"
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

export interface BuyerWarning {
  title: string;

  explanation: string;
}

export interface KnowledgeContext {
  topic: string;

  category: string;

  products: ProductRecommendation[];

  keyFacts: KnowledgeFact[];

  tradeOffs: KnowledgeFact[];

  commonMistakes: BuyerWarning[];

  terminology: string[];

  buyerProfiles: string[];
}