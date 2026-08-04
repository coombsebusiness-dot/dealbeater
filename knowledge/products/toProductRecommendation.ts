import type {
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge";

import type {
  CanonicalProduct,
} from "./CanonicalProduct";

export function toProductRecommendation(
  product:
    CanonicalProduct,
): ProductRecommendation {
  return {
    name:
      product.fullName,

    slug:
      product.slug,

    verdict:
      "CONSIDER",

    reason:
      product.buyingAdvice,

    strengths: [
      ...product.strengths,
    ],

    weaknesses: [
      ...product.weaknesses,
    ],

    bestFor: [
      ...product.bestFor,
    ],

    avoidIf: [
      ...product.avoidIf,
    ],

    buyingAdvice:
      product.buyingAdvice,

    imageUrl:
      product.images.primary
        ?.url,

    confidence:
      product.confidence,
  };
}