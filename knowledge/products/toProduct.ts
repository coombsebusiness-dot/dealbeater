import type {
  Product,
  ProductAlternative,
  ProductFAQItem,
} from "@/types/product";

import type {
  CanonicalProduct,
  CanonicalProductRelationship,
} from "./CanonicalProduct";

import type {
  ProductIntelligence,
} from "./intelligence";

import type {
  ResolvedCanonicalProduct,
} from "./ResolvedCanonicalProduct";

import {
  defaultProductBrain,
} from "./defaultProductBrain";

function normaliseSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function createRouteModelSlug(
  product: CanonicalProduct,
): string {
  const productSlug =
    normaliseSlug(
      product.slug,
    );

  const brandSlug =
    normaliseSlug(
      product.brand,
    );

  const brandPrefix =
    `${brandSlug}-`;

  if (
    productSlug.startsWith(
      brandPrefix,
    )
  ) {
    return productSlug.slice(
      brandPrefix.length,
    );
  }

  return productSlug;
}

function createVerdictLabel(
  verdict:
    ProductIntelligence["buyingVerdict"],
): string {
  return verdict
    .replace(
      /_/g,
      " ",
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}

function createAlternative(
  relationship:
    CanonicalProductRelationship,
): ProductAlternative {
  const relatedProduct =
    defaultProductBrain.findKnowledge(
      relationship.productId,
    );

  if (!relatedProduct) {
    return {
      name:
        relationship.productId
          .replace(
            /-/g,
            " ",
          )
          .replace(
            /\b\w/g,
            (character) =>
              character.toUpperCase(),
          ),

      slug:
        relationship.productId,

      reason:
        relationship.reason,
    };
  }

  return {
    name:
      relatedProduct.fullName,

    slug:
      createRouteModelSlug(
        relatedProduct,
      ),

    category:
      normaliseSlug(
        relatedProduct.category,
      ),

    brand:
      normaliseSlug(
        relatedProduct.brand,
      ),

    reason:
      relationship.reason,

    image:
      relatedProduct.images.primary
        ?.url,

    score:
      Math.round(
        relatedProduct.confidence *
          100,
      ),
  };
}

function createAlternatives(
  product: CanonicalProduct,
): ProductAlternative[] {
  return product.relationships
    .alternatives
    .map(
      createAlternative,
    );
}

function createFAQs(
  product: CanonicalProduct,
): ProductFAQItem[] {
  const bestFor =
    product.bestFor
      .slice(
        0,
        3,
      )
      .join(" ");

  const mainWeaknesses =
    product.weaknesses
      .slice(
        0,
        2,
      )
      .join(" ");

  const alternatives =
    product.relationships
      .alternatives
      .map((relationship) => {
        const relatedProduct =
          defaultProductBrain
            .findKnowledge(
              relationship.productId,
            );

        return (
          relatedProduct?.fullName ??
          relationship.productId
            .replace(
              /-/g,
              " ",
            )
            .replace(
              /\b\w/g,
              (character) =>
                character.toUpperCase(),
            )
        );
      })
      .slice(
        0,
        3,
      );

  const faqItems:
    ProductFAQItem[] = [
    {
      question:
        `Is the ${product.fullName} worth buying?`,

      answer:
        product.buyingAdvice,
    },

    {
      question:
        `Who is the ${product.fullName} best for?`,

      answer:
        bestFor ||
        `The ${product.fullName} is best suited to buyers whose needs match its core strengths and intended use.`,
    },

    {
      question:
        `What are the main weaknesses of the ${product.fullName}?`,

      answer:
        mainWeaknesses ||
        `Blinlx has not identified enough verified limitations to provide a detailed answer yet.`,
    },
  ];

  if (
    alternatives.length >
    0
  ) {
    faqItems.push({
      question:
        `What are the best alternatives to the ${product.fullName}?`,

      answer:
        `The main alternatives currently identified by Blinlx are ${alternatives.join(
          ", ",
        )}. The best choice depends on your budget, priorities and intended use.`,
    });
  }

  return faqItems;
}

function createScoreBreakdown(
  product: CanonicalProduct,
): NonNullable<
  Product["scoreBreakdown"]
> {
  const confidenceScore =
    Math.round(
      product.confidence *
        100,
    );

  return {
    price:
      0,

    reviews:
      confidenceScore,

    retailer:
      0,

    warranty:
      0,

    value:
      confidenceScore,
  };
}

export function toProduct(
  resolved:
    ResolvedCanonicalProduct,

  intelligence:
    ProductIntelligence,
): Product {
  const knowledge =
    resolved.knowledge;

  const savedProduct =
    resolved.savedProduct;

  const intelligenceConfidence =
    Math.max(
      0,
      Math.min(
        1,
        intelligence.confidence,
      ),
    );

  const knowledgeScore =
    Math.round(
      knowledge.confidence *
        100,
    );

  return {
    /*
     * Preserve useful saved-product fields when
     * Supabase enrichment already exists.
     */
    ...(savedProduct ?? {}),

    id:
      knowledge.id,

    slug:
      knowledge.slug,

    name:
      knowledge.fullName,

    brand:
      knowledge.brand,

    category:
      knowledge.category,

    model: {
      base:
        knowledge.model,

      sku:
        knowledge.identifiers
          ?.sku,
    },

    specs: {
      brand:
        knowledge.brand,

      model:
        knowledge.model,

      productType:
        knowledge.productType,

      status:
        knowledge.status,

      releaseYear:
        knowledge.releaseYear,

      sku:
        knowledge.identifiers
          ?.sku,

      ...knowledge.specifications,
    },

    image:
      resolved.image.url ??
      savedProduct?.image ??
      undefined,

    imageAlt:
      resolved.image.alt,

    summary:
      knowledge.description,

    currentPrice:
      resolved.pricing.current ??
      savedProduct?.currentPrice,

    fairPrice:
      resolved.pricing.fair ??
      savedProduct?.fairPrice,

    lowestPrice:
      resolved.pricing.lowest ??
      savedProduct?.lowestPrice,

    /*
     * Until live pricing and review evidence are
     * available, this reflects canonical knowledge
     * confidence rather than a deal-quality score.
     */
    blinlxScore:
      savedProduct?.blinlxScore ??
      knowledgeScore,

    dealScore:
      savedProduct?.dealScore,

    confidence:
      intelligenceConfidence,

    verdict:
      intelligence.buyingVerdict,

    verdictLabel:
      createVerdictLabel(
        intelligence.buyingVerdict,
      ),

    ifItWasOurMoney:
      intelligence.buyingAdvice,

    highlights:
      intelligence.strengths,

    scoreContext: {
      confidence:
        intelligenceConfidence,

      concerns:
        intelligence.weaknesses,
    },

    scoreBreakdown:
      savedProduct?.scoreBreakdown ??
      createScoreBreakdown(
        knowledge,
      ),

    scoreExplanation:
      savedProduct?.scoreExplanation ??
      `This score currently reflects the confidence and completeness of Blinlx canonical product knowledge. Live price, retailer and offer evidence will strengthen the assessment as it becomes available.`,

    topOffers:
      resolved.offers,

    alternatives:
      createAlternatives(
        knowledge,
      ),

    faqs:
      createFAQs(
        knowledge,
      ),

    primaryOfferUrl:
      savedProduct
        ?.primaryOfferUrl,

    primaryOfferRetailer:
      savedProduct
        ?.primaryOfferRetailer,

    priceStatus:
      savedProduct?.priceStatus,

    priceHistoryUrl:
      savedProduct
        ?.priceHistoryUrl ??
      "#price-history",
  };
}