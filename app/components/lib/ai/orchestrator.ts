import type { DealReport } from "../types";

import { productAgent } from "./productAgent";
import { priceAgent } from "./priceAgent";
import { reviewAgent } from "./reviewAgent";
import { retailerAgent } from "./retailerAgent";
import { alternativeAgent } from "./alternativeAgent";
import { recommendationAgent } from "./recommendationAgent";

import { decisionAgent } from "@/app/components/lib/agents/decisionAgent";

import { specificationsAgent } from "@/app/components/lib/agents/specificationsAgent";

type ProductSpecifications = Record<
  string,
  string | number | boolean | null
>;

async function measureAgent<T>(
  name: string,
  task: () => Promise<T>
): Promise<T> {
  const startedAt = performance.now();

  try {
    return await task();
  } finally {
    console.info(
      `${name}: ${Math.round(
        performance.now() - startedAt
      )}ms`
    );
  }
}

export async function analyseDeal(
  input: string
): Promise<DealReport> {
  const startedAt = performance.now();

  const cleanInput = input.trim();

  if (!cleanInput) {
    throw new Error(
      "A product link or description is required."
    );
  }

  const product = await measureAgent(
    "PRODUCT_AGENT_TIME",
    () => productAgent(cleanInput)
  );

  console.log(
    "========== ORCHESTRATOR DEBUG =========="
  );

  console.log(
    JSON.stringify(
      product,
      null,
      2
    )
  );

  console.log(
    "========================================"
  );

  console.log(
    "PRODUCT_AGENT_RESULT:",
    JSON.stringify(
      product,
      null,
      2
    )
  );

  console.error(
    "➡️ Starting PRICE"
  );

  const pricing = await measureAgent(
    "PRICE_AGENT_TIME",
    () => priceAgent(product)
  );

  console.error(
    "✅ PRICE DONE"
  );

  console.error(
    "➡️ Starting REVIEWS"
  );

  const reviews = await measureAgent(
    "REVIEW_AGENT_TIME",
    () => reviewAgent(product)
  );

  console.error(
    "✅ REVIEWS DONE"
  );

  console.error(
    "➡️ Starting RETAILERS"
  );

  const retailers = await measureAgent(
    "RETAILER_AGENT_TIME",
    () => retailerAgent(product)
  );

  console.error(
    "✅ RETAILERS DONE"
  );

  console.error(
    "➡️ Starting ALTERNATIVES"
  );

  const alternatives = await measureAgent(
    "ALTERNATIVE_AGENT_TIME",
    () => alternativeAgent(product)
  );

  console.error(
    "✅ ALTERNATIVES DONE"
  );

  console.error(
    "➡️ Starting PRODUCT OVERVIEW"
  );

const productOverview = {
  shortDescription:
    product.description?.trim() ||
    `${product.name} is a ${
      product.category?.toLowerCase() ||
      "product"
    }. Blinlx is building a fuller product overview in the background.`,

  bestFor: [],

  strengths: [],

  considerations: [],

  confidence: Math.max(
    0,
    Math.min(
      100,
      Math.round(
        product.confidence ?? 50
      )
    )
  ),
};

  console.error(
    "✅ PRODUCT OVERVIEW DONE"
  );

  console.error(
    "➡️ Starting SPECIFICATIONS"
  );

  const specifications =
    await measureAgent(
      "SPECIFICATIONS_AGENT_TIME",
      () =>
        specificationsAgent(
          product
        )
    );

  console.error(
    "✅ SPECIFICATIONS DONE"
  );

  console.log(
    "ORCHESTRATOR_SPECIFICATIONS_RAW:",
    JSON.stringify(
      specifications,
      null,
      2
    )
  );

  const normalisedSpecifications:
    ProductSpecifications =
      typeof specifications ===
        "object" &&
      specifications !== null &&
      "specifications" in
        specifications
        ? (
            specifications as {
              specifications?: ProductSpecifications;
            }
          ).specifications ?? {}
        : (
            specifications as ProductSpecifications
          ) ?? {};

  console.log(
    "ORCHESTRATOR_SPECIFICATIONS_NORMALISED:",
    JSON.stringify(
      normalisedSpecifications,
      null,
      2
    )
  );

  const decisionStartedAt =
    performance.now();

  const decision =
    decisionAgent(
      pricing,
      reviews,
      retailers,
      alternatives
    );

  console.log(
    `DECISION_AGENT_TIME: ${Math.round(
      performance.now() -
        decisionStartedAt
    )}ms`
  );

  const enrichedProduct = {
    ...product,

    imageUrl:
      pricing.productImage ??
      product.imageUrl ??
      product.image ??
      undefined,

    ctaUrl:
      pricing.bestRetailerUrl ??
      product.ctaUrl ??
      undefined,

    ctaLabel:
      pricing.bestRetailerUrl ||
      product.ctaUrl
        ? "Buy Now"
        : undefined,
  };

  console.log(
    "ENRICHED_PRODUCT:",
    JSON.stringify(
      enrichedProduct,
      null,
      2
    )
  );

  const recommendationStartedAt =
    performance.now();

  const report =
    recommendationAgent({
      product:
        enrichedProduct,
      pricing,
      reviews,
      retailers,
      alternatives,
      decision,
    });

  console.log(
    "RECOMMENDATION_PRODUCT:",
    JSON.stringify(
      report.product,
      null,
      2
    )
  );

  console.log(
    `RECOMMENDATION_AGENT_TIME: ${Math.round(
      performance.now() -
        recommendationStartedAt
    )}ms`
  );

  console.log(
    "ORCHESTRATOR_FINAL_SPECIFICATIONS:",
    JSON.stringify(
      normalisedSpecifications,
      null,
      2
    )
  );

  console.log(
    `BLINLX ANALYSIS COMPLETE: ${Math.round(
      performance.now() -
        startedAt
    )}ms`
  );

  return {
    ...report,

    product:
      enrichedProduct,

    productOverview,

    specifications:
      normalisedSpecifications,
  };
}