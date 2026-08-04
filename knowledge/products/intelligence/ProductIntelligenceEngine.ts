import type {
  CanonicalProduct,
} from "../CanonicalProduct";

import type {
  ResolvedCanonicalProduct,
} from "../ResolvedCanonicalProduct";

export type ProductValueVerdict =
  | "EXCELLENT_VALUE"
  | "GOOD_VALUE"
  | "FAIR_VALUE"
  | "POOR_VALUE"
  | "UNKNOWN";

export type ProductBuyingVerdict =
  | "BUY"
  | "CONSIDER"
  | "WAIT"
  | "AVOID";

export interface ProductValueAnalysis {
  verdict:
    ProductValueVerdict;

  currentPrice?:
    number;

  fairPrice?:
    number;

  lowestPrice?:
    number;

  differenceFromFair?:
    number;

  explanation:
    string;
}

export interface ProductIntelligence {
  productId:
    string;

  slug:
    string;

  name:
    string;

  buyingVerdict:
    ProductBuyingVerdict;

  verdictReason:
    string;

  value:
    ProductValueAnalysis;

  whoShouldBuy:
    string[];

  whoShouldAvoid:
    string[];

  strengths:
    string[];

  weaknesses:
    string[];

  alternatives:
    string[];

  upgrades:
    string[];

  accessories:
    string[];

  compatibleProducts:
    string[];

  buyingAdvice:
    string;

  confidence:
    number;

  evidence: {
    canonicalKnowledge:
      boolean;

    savedProduct:
      boolean;

    pricing:
      boolean;

    offers:
      number;
  };
}

function clampConfidence(
  value: number,
): number {
  return Math.max(
    0,
    Math.min(
      1,
      value,
    ),
  );
}

function analyseValue(
  product:
    ResolvedCanonicalProduct,
): ProductValueAnalysis {
  const {
    current,
    fair,
    lowest,
  } =
    product.pricing;

  if (
    current === undefined ||
    fair === undefined ||
    fair <= 0
  ) {
    return {
      verdict:
        "UNKNOWN",

      currentPrice:
        current,

      fairPrice:
        fair,

      lowestPrice:
        lowest,

      explanation:
        "There is not enough reliable pricing information to make a confident value judgement.",
    };
  }

  const differenceFromFair =
    current - fair;

  const percentageDifference =
    differenceFromFair /
    fair;

  if (
    percentageDifference <=
    -0.15
  ) {
    return {
      verdict:
        "EXCELLENT_VALUE",

      currentPrice:
        current,

      fairPrice:
        fair,

      lowestPrice:
        lowest,

      differenceFromFair,

      explanation:
        "The current price is meaningfully below the estimated fair price, making this a potentially excellent-value purchase if the exact product and condition are correct.",
    };
  }

  if (
    percentageDifference <=
    -0.05
  ) {
    return {
      verdict:
        "GOOD_VALUE",

      currentPrice:
        current,

      fairPrice:
        fair,

      lowestPrice:
        lowest,

      differenceFromFair,

      explanation:
        "The current price is below the estimated fair price and appears to represent good value.",
    };
  }

  if (
    percentageDifference <=
    0.1
  ) {
    return {
      verdict:
        "FAIR_VALUE",

      currentPrice:
        current,

      fairPrice:
        fair,

      lowestPrice:
        lowest,

      differenceFromFair,

      explanation:
        "The current price is close to the estimated fair price. It may be worth buying, but it is not an unusually strong deal.",
    };
  }

  return {
    verdict:
      "POOR_VALUE",

    currentPrice:
      current,

    fairPrice:
      fair,

    lowestPrice:
      lowest,

    differenceFromFair,

    explanation:
      "The current price is above the estimated fair price. Waiting or comparing alternatives would be sensible.",
  };
}

function createBuyingVerdict(
  knowledge:
    CanonicalProduct,
  value:
    ProductValueAnalysis,
): {
  verdict:
    ProductBuyingVerdict;

  reason:
    string;
} {
  if (
    knowledge.confidence <
    0.6
  ) {
    return {
      verdict:
        "WAIT",

      reason:
        "The underlying product knowledge is not yet complete enough for a confident recommendation.",
    };
  }

  if (
    value.verdict ===
    "POOR_VALUE"
  ) {
    return {
      verdict:
        "WAIT",

      reason:
        "The product may be suitable, but the current price appears too high compared with its estimated fair value.",
    };
  }

  if (
    value.verdict ===
      "EXCELLENT_VALUE" ||
    value.verdict ===
      "GOOD_VALUE"
  ) {
    return {
      verdict:
        "BUY",

      reason:
        knowledge.buyingAdvice,
    };
  }

  return {
    verdict:
      "CONSIDER",

    reason:
      knowledge.buyingAdvice,
  };
}

function extractRelationshipIds(
  relationships:
    CanonicalProduct["relationships"],
): {
  alternatives:
    string[];

  upgrades:
    string[];

  accessories:
    string[];

  compatibleProducts:
    string[];
} {
  return {
    alternatives:
      relationships.alternatives
        .map(
          (relationship) =>
            relationship.productId,
        ),

    upgrades:
      relationships.upgrades
        .map(
          (relationship) =>
            relationship.productId,
        ),

    accessories:
      relationships.accessories
        .map(
          (relationship) =>
            relationship.productId,
        ),

    compatibleProducts:
      relationships
        .compatibleProducts
        .map(
          (relationship) =>
            relationship.productId,
        ),
  };
}

export class ProductIntelligenceEngine {
  analyse(
    product:
      ResolvedCanonicalProduct,
  ): ProductIntelligence {
    const knowledge =
      product.knowledge;

    const value =
      analyseValue(
        product,
      );

    const buyingDecision =
      createBuyingVerdict(
        knowledge,
        value,
      );

    const relationships =
      extractRelationshipIds(
        knowledge.relationships,
      );

    const evidenceCount = [
      Boolean(
        knowledge,
      ),

      Boolean(
        product.savedProduct,
      ),

      value.verdict !==
        "UNKNOWN",

      product.offers.length > 0,
    ].filter(Boolean).length;

    const evidenceConfidence =
      evidenceCount / 4;

    const confidence =
      clampConfidence(
        (
          knowledge.confidence +
          evidenceConfidence
        ) / 2,
      );

    return {
      productId:
        knowledge.id,

      slug:
        knowledge.slug,

      name:
        knowledge.fullName,

      buyingVerdict:
        buyingDecision.verdict,

      verdictReason:
        buyingDecision.reason,

      value,

      whoShouldBuy: [
        ...knowledge.bestFor,
      ],

      whoShouldAvoid: [
        ...knowledge.avoidIf,
      ],

      strengths: [
        ...knowledge.strengths,
      ],

      weaknesses: [
        ...knowledge.weaknesses,
      ],

      alternatives:
        relationships.alternatives,

      upgrades:
        relationships.upgrades,

      accessories:
        relationships.accessories,

      compatibleProducts:
        relationships
          .compatibleProducts,

      buyingAdvice:
        knowledge.buyingAdvice,

      confidence,

      evidence: {
        canonicalKnowledge:
          true,

        savedProduct:
          Boolean(
            product.savedProduct,
          ),

        pricing:
          value.verdict !==
          "UNKNOWN",

        offers:
          product.offers.length,
      },
    };
  }
}