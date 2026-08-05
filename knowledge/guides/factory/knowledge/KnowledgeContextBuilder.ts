import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  recommendationEngine,
} from "@/knowledge/recommendation";

import {
  bootstrapProductIntelligence,
  createCameraIntelligenceInput,
  createLensIntelligenceInput,
  productIntelligenceEngine,
} from "@/knowledge/intelligence";

import {
  getCameraProductById,
} from "@/knowledge/products/cameras";

import {
  getLensProductById,
} from "@/knowledge/products/lenses";

import type {
  ProductRecommendation,
  KnowledgeContext,
  ProductIntelligenceContextEntry,
} from "./KnowledgeContext";

import {
  loadProductBrainKnowledge,
} from "./ProductBrainAdapter";

function createProductSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
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
function findProductIntelligence(
  product:
    ProductRecommendation,

  entries:
    ProductIntelligenceContextEntry[],
): ProductIntelligenceContextEntry | undefined {
  const productSlug =
    createProductSlug(
      product.slug?.trim() ||
      product.name,
    );

  return entries.find(
    (entry) => {
      const entrySlug =
        createProductSlug(
          entry.slug?.trim() ||
          entry.productName,
        );

      return (
        entrySlug ===
        productSlug
      );
    },
  );
}

function createProductIntelligenceEntry(
  product:
    ProductRecommendation,
): ProductIntelligenceContextEntry | undefined {
  const lookupValue =
    product.slug?.trim() ||
    createProductSlug(
      product.name,
    );

  const canonicalCamera =
    getCameraProductById(
      lookupValue,
    );

  const canonicalLens =
    canonicalCamera
      ? undefined
      : getLensProductById(
          lookupValue,
        );

  const input =
    canonicalCamera
      ? createCameraIntelligenceInput(
          canonicalCamera,
          {
            currentPrice:
              product.currentPrice,

            fairPrice:
              product.fairPrice,

            condition:
              "UNKNOWN",
          },
        )
      : canonicalLens
        ? createLensIntelligenceInput(
            canonicalLens,
            {
              currentPrice:
                product.currentPrice,

              fairPrice:
                product.fairPrice,

              condition:
                "UNKNOWN",
            },
          )
        : undefined;

  if (!input) {
    return undefined;
  }

  const result =
    productIntelligenceEngine
      .analyse(
        input,
      );

  if (
    !result.matched ||
    !result.intelligence
  ) {
    return undefined;
  }

  const slug =
    canonicalCamera?.slug ??
    canonicalLens?.slug;

  return {
    productId:
      result.productId,

    productName:
      result.productName,

    slug,

    provider:
      result.provider,

    confidence:
      result.intelligence
        .confidence,

    intelligence:
      result.intelligence,
  };
}

function createProductIntelligence(
  products:
    ProductRecommendation[],
): ProductIntelligenceContextEntry[] {
  bootstrapProductIntelligence();

  const entriesByProductId =
    new Map<
      string,
      ProductIntelligenceContextEntry
    >();

  products.forEach(
    (product) => {
      const entry =
        createProductIntelligenceEntry(
          product,
        );

      if (!entry) {
        return;
      }

      entriesByProductId.set(
        entry.productId,
        entry,
      );
    },
  );

  return Array.from(
    entriesByProductId.values(),
  );
}

export function createKnowledgeContext(
  blueprint:
    GuideBlueprint,
): KnowledgeContext {
  const knowledge =
    loadProductBrainKnowledge(
      blueprint,
    );

  const buyerProfiles =
    Array.from(
      new Set([
        ...knowledge.buyerProfiles,

        ...(blueprint.audience
          ? [
              blueprint.audience,
            ]
          : []),
      ]),
    );

const productIntelligence =
  createProductIntelligence(
    knowledge.products,
  );

const recommendationResult =
  recommendationEngine.recommend({
    topic:
      blueprint.topic,

    category:
      blueprint.category,

    audience:
      blueprint.audience,

    recommendationTopic:
      blueprint.recommendationTopic,

    primaryKeyword:
      blueprint.primaryKeyword,

    secondaryKeywords:
      blueprint.secondaryKeywords,

    candidates:
      knowledge.products.map(
        (product) => ({
          product,

          intelligence:
            findProductIntelligence(
              product,
              productIntelligence,
            ),
        }),
      ),

    limit:
      8,
  });

const rankedProducts =
  recommendationResult.ranked.map(
    (recommendation) => ({
      ...recommendation.product,

      verdict:
        recommendation.category,
    }),
  );

console.log(
  "\n🎯 RECOMMENDATION RESULT\n",
  JSON.stringify(
    {
      diagnostics:
        recommendationResult
          .diagnostics,

      ranked:
        recommendationResult
          .ranked.map(
            (recommendation) => ({
              category:
                recommendation.category,

              label:
                recommendation.label,

              product:
                recommendation
                  .product
                  .name,

              score:
                recommendation
                  .score
                  .totalScore,

              reasons:
                recommendation.reasons,

              caveats:
                recommendation.caveats,
            }),
          ),
    },
    null,
    2,
  ),
);

  return {
    topic:
      blueprint.topic,

    category:
      blueprint.category,

    products:
  rankedProducts,

    productIntelligence,

    keyFacts:
      knowledge.keyFacts,

    tradeOffs:
      knowledge.tradeOffs,

    commonMistakes:
      knowledge.commonMistakes,

    terminology:
      knowledge.terminology,

    buyerProfiles,
  };
}