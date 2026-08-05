export interface ProductIntelligence {
  buyingSuitability:
    BuyingSuitability;

  valueAssessment:
    ValueAssessment;

  ownership:
    OwnershipInsights;

  strengths:
    IntelligencePoint[];

  weaknesses:
    IntelligencePoint[];

  tradeOffs:
    IntelligenceTradeOff[];

  alternatives:
    IntelligenceAlternative[];

  upgrades:
    IntelligenceRelationship[];

  accessories:
    IntelligenceRelationship[];

  compatibleProducts:
    IntelligenceRelationship[];

  recommendations:
    RecommendationInsight[];

  buyingAdvice:
    BuyingAdvice;

  confidence:
    number;
}
export interface IntelligenceRelationship {
  productId:
    string;

  reason:
    string;
}

export interface IntelligencePoint {
  title: string;
  explanation: string;
  importance: number;
}

export interface IntelligenceTradeOff {
  gain: string;
  sacrifice: string;
  worthItFor: string[];
}

export interface IntelligenceAlternative {
  reason: string;
  productId: string;
}

export interface RecommendationInsight {
  audience: string;
  recommendation: string;
}

export interface BuyingSuitability {
  beginner: number;
  enthusiast: number;
  professional: number;
}

export interface ValueAssessment {
  excellentUsed: boolean;
  worthBuyingNew: boolean;
  waitForSale: boolean;
}

export interface OwnershipInsights {
  hiddenCosts: string[];
  upgradePath: string[];
  ecosystemNotes: string[];
}

export interface BuyingAdvice {
  buyNow: string;
  wait: string;
  avoidIf: string[];
}