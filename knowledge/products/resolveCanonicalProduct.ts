import {
  getProductBySlug,
} from "@/app/components/lib/products/getProductBySlug";

import type {
  CanonicalProduct,
} from "./CanonicalProduct";

import type {
  ResolvedCanonicalProduct,
} from "./ResolvedCanonicalProduct";

export async function resolveCanonicalProduct<
  TProduct extends CanonicalProduct,
>(
  knowledge: TProduct,
): Promise<
  ResolvedCanonicalProduct<TProduct>
> {
  const savedProduct =
    await getProductBySlug(
      knowledge.slug,
    );

  const savedImage =
    savedProduct?.image
      ?.trim() ||
    null;

  const canonicalImage =
    knowledge.images.primary
      ?.url
      .trim() ||
    null;

  return {
    knowledge,

    savedProduct,

    image: {
      url:
        savedImage ??
        canonicalImage,

      alt:
        savedProduct
          ?.imageAlt
          ?.trim() ||
        knowledge.images.primary
          ?.alt
          ?.trim() ||
        `${knowledge.fullName} product image`,
    },

    pricing: {
      current:
        savedProduct
          ?.currentPrice,

      fair:
        savedProduct
          ?.fairPrice,

      lowest:
        savedProduct
          ?.lowestPrice,
    },

    offers:
      savedProduct
        ?.topOffers ??
      [],

    resolvedAt:
      new Date()
        .toISOString(),
  };
}