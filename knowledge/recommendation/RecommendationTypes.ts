import type {
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  ProductIntelligenceContextEntry,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  RecommendationCategory,
} from "./RecommendationCategories";

export type RecommendationFactorKind =
  | "TOPIC"
  | "AUDIENCE"
  | "SUITABILITY"
  | "VALUE"
  | "CONFIDENCE"
  | "PRODUCT_TYPE"
  | "STATUS"
  | "RELATIONSHIP"
  | "PENALTY";

export interface RecommendationFactor {
  kind:
    RecommendationFactorKind;

  name:
    string;

  score:
    number;

  explanation:
    string;
}

export interface RecommendationCandidate {
  product:
    ProductRecommendation;

  intelligence?:
    ProductIntelligenceContextEntry;
}

export interface RecommendationRequest {
  topic:
    string;

  category:
    string;

  audience?:
    string;

  recommendationTopic?:
    string;

  primaryKeyword?:
    string;

  secondaryKeywords?:
    string[];

  candidates:
    RecommendationCandidate[];

  limit?:
    number;
}

export interface RecommendationScore {
  productId:
    string;

  productName:
    string;

  slug?:
    string;

  totalScore:
    number;

  positiveScore:
    number;

  penaltyScore:
    number;

  factors:
    RecommendationFactor[];

  penalties:
    RecommendationFactor[];
}

export interface RankedRecommendation {
  category:
    RecommendationCategory;

  label:
    string;

  rank:
    number;

  score:
    RecommendationScore;

  product:
    ProductRecommendation;

  intelligence?:
    ProductIntelligenceContextEntry;

  reasons:
    string[];

  caveats:
    string[];
}

export interface RecommendationResult {
  ranked:
    RankedRecommendation[];

  scored:
    RecommendationScore[];

  rejected: RecommendationScore[];

  diagnostics: {
    candidateCount:
      number;

    rankedCount:
      number;

    rejectedCount:
      number;
  };
}