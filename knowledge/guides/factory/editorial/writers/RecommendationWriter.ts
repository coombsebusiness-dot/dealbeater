import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import type {
  KnowledgeContext,
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

function removeEndingPunctuation(
  value: string,
): string {
  return value
    .trim()
    .replace(
      /[.!?]+$/g,
      "",
    );
}

function lowerFirstCharacter(
  value: string,
): string {
  const cleaned =
    removeEndingPunctuation(
      value,
    );

  if (!cleaned) {
    return "";
  }

  return [
    cleaned.charAt(0)
      .toLowerCase(),

    cleaned.slice(1),
  ].join("");
}

function createRecommendationId(
  product:
    ProductRecommendation,
): string {
  if (
    product.slug?.trim()
  ) {
    return product.slug;
  }

  return product.name
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function createRecommendationBadge(
  product:
    ProductRecommendation,
): string | undefined {
  switch (
    product.verdict
  ) {
    case "BEST_OVERALL":
      return "Best Overall";

    case "BEST_VALUE":
      return "Best Value";

    case "BEST_BEGINNER":
      return "Best for Beginners";

    case "BEST_USED":
      return "Best Used Buy";

    case "BEST_SPECIALIST":
      return "Best Specialist Choice";

    case "ALTERNATIVE":
      return "Alternative";

    case "CONSIDER":
      return "Worth Considering";

    default:
      return undefined;
  }
}

function createRecommendationDescription(
  product:
    ProductRecommendation,
): string {
  const bestFor =
    product.bestFor?.[0];

  const strongestPoint =
    product.strengths?.[0];

  const mainWeakness =
    product.weaknesses?.[0];

  const sentences:
    string[] = [];

  if (bestFor) {
    sentences.push(
      `${product.name} is particularly well suited to ${lowerFirstCharacter(
        bestFor,
      )}.`,
    );
  } else if (
    strongestPoint
  ) {
    sentences.push(
      `${product.name} stands out because it offers ${lowerFirstCharacter(
        strongestPoint,
      )}.`,
    );
  } else {
    sentences.push(
      product.reason,
    );
  }

  if (
    strongestPoint &&
    bestFor
  ) {
    sentences.push(
      `Its biggest advantage is ${lowerFirstCharacter(
        strongestPoint,
      )}.`,
    );
  }

  if (mainWeakness) {
    sentences.push(
      `The main compromise is ${lowerFirstCharacter(
        mainWeakness,
      )}.`,
    );
  }

  return sentences.join(
    " ",
  );
}

function createRecommendationReasons(
  product:
    ProductRecommendation,
): string[] {
  const reasons = [
    ...(product.strengths ??
      []).slice(
      0,
      3,
    ),

    product.currentPrice !==
        undefined &&
      product.fairPrice !==
        undefined
      ? `The current price is £${product.currentPrice.toFixed(
          2,
        )}, compared with an estimated fair price of £${product.fairPrice.toFixed(
          2,
        )}.`
      : undefined,
  ].filter(
    (
      reason,
    ): reason is string =>
      Boolean(
        reason?.trim(),
      ),
  );

  if (
    reasons.length > 0
  ) {
    return reasons.slice(
      0,
      4,
    );
  }

  return [
    product.reason,
  ];
}

function createRecommendation(
  product:
    ProductRecommendation,
): NonNullable<
  BuyingGuide["recommendations"]
>[number] {
  return {
    id:
      createRecommendationId(
        product,
      ),

    title:
      product.name,

    description:
      createRecommendationDescription(
        product,
      ),

    reasons:
      createRecommendationReasons(
        product,
      ),

    image:
      product.imageUrl,

    href:
      product.slug
        ? `/products/${product.slug}`
        : undefined,

    badge:
      createRecommendationBadge(
        product,
      ),
  };
}

export function writeRecommendations(
  knowledge:
    KnowledgeContext,
): NonNullable<
  BuyingGuide["recommendations"]
> {
  return knowledge.products.map(
    createRecommendation,
  );
}