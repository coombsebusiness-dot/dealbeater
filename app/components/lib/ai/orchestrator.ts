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

function formatDuration(
  milliseconds: number
): string {
  if (milliseconds < 1000) {
    return `${Math.round(milliseconds)}ms`;
  }

  return `${(
    milliseconds / 1000
  ).toFixed(2)}s`;
}

function logTimeline(
  message: string,
  analysisStartedAt: number
): void {
  const elapsed =
    performance.now() -
    analysisStartedAt;

  console.info(
    `[BLINLX +${formatDuration(
      elapsed
    )}] ${message}`
  );
}

async function measureAgent<T>(
  name: string,
  analysisStartedAt: number,
  task: () => Promise<T>
): Promise<T> {
  const stageStartedAt =
    performance.now();

  logTimeline(
    `➡️ ${name} STARTED`,
    analysisStartedAt
  );

  try {
    const result =
      await task();

    const stageDuration =
      performance.now() -
      stageStartedAt;

    logTimeline(
      `✅ ${name} FINISHED — ${formatDuration(
        stageDuration
      )}`,
      analysisStartedAt
    );

    return result;
  } catch (error) {
    const stageDuration =
      performance.now() -
      stageStartedAt;

    logTimeline(
      `❌ ${name} FAILED — ${formatDuration(
        stageDuration
      )}`,
      analysisStartedAt
    );

    console.error(
      `${name}_ERROR:`,
      error
    );

    throw error;
  }
}

export async function analyseDeal(
  input: string
): Promise<DealReport> {
  const analysisStartedAt =
    performance.now();

  console.log(
    "\n\n=================================================="
  );

  console.log(
    "🚀 BLINLX ANALYSIS STARTED"
  );

  console.log(
    "=================================================="
  );

  console.log(
    "INPUT:",
    input
  );

  const cleanInput =
    input.trim();

  if (!cleanInput) {
    throw new Error(
      "A product link or description is required."
    );
  }

  try {
    /*
     * PRODUCT IDENTIFICATION
     */

    const product =
      await measureAgent(
        "PRODUCT_AGENT",
        analysisStartedAt,
        () =>
          productAgent(
            cleanInput
          )
      );

    console.log(
      "PRODUCT_AGENT_RESULT:",
      JSON.stringify(
        product,
        null,
        2
      )
    );

    /*
     * LIVE PRICE SEARCHES
     */

    const pricing =
      await measureAgent(
        "PRICE_AGENT",
        analysisStartedAt,
        () =>
          priceAgent(
            product
          )
      );

   console.log(
  "PRICE_AGENT_RESULT:",
  JSON.stringify(pricing, null, 2)
);
    

    /*
     * REVIEW INTELLIGENCE
     */

    const reviews =
      await measureAgent(
        "REVIEW_AGENT",
        analysisStartedAt,
        () =>
          reviewAgent(
            product
          )
      );

    /*
     * RETAILER INTELLIGENCE
     */

    const retailers =
      await measureAgent(
        "RETAILER_AGENT",
        analysisStartedAt,
        () =>
          retailerAgent(
            product
          )
      );

    /*
     * ALTERNATIVE PRODUCTS
     */

    const alternatives =
      await measureAgent(
        "ALTERNATIVE_AGENT",
        analysisStartedAt,
        () =>
          alternativeAgent(
            product
          )
      );

    /*
     * PRODUCT OVERVIEW
     *
     * This is currently generated locally
     * and does not make an AI request.
     */

    const overviewStartedAt =
      performance.now();

    logTimeline(
      "➡️ PRODUCT_OVERVIEW STARTED",
      analysisStartedAt
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
            product.confidence ??
            50
          )
        )
      ),
    };

    logTimeline(
      `✅ PRODUCT_OVERVIEW FINISHED — ${formatDuration(
        performance.now() -
        overviewStartedAt
      )}`,
      analysisStartedAt
    );

    /*
     * PRODUCT SPECIFICATIONS
     */

   logTimeline(
  "⏭️ SPECIFICATIONS_AGENT SKIPPED FOR FAST RESPONSE",
  analysisStartedAt
);

const specifications:
  ProductSpecifications =
    product.specs ?? {};

    console.log(
      "SPECIFICATIONS_AGENT_RAW:",
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
                specifications?:
                  ProductSpecifications;
              }
            ).specifications ??
            {}
          : (
              specifications as
                ProductSpecifications
            ) ?? {};

    console.log(
      "SPECIFICATIONS_NORMALISED:",
      JSON.stringify(
        normalisedSpecifications,
        null,
        2
      )
    );

    /*
     * DECISION
     */

    const decision =
      await measureAgent(
        "DECISION_AGENT",
        analysisStartedAt,
        async () =>
          decisionAgent(
            pricing,
            reviews,
            retailers,
            alternatives
          )
      );

    /*
     * ENRICH PRODUCT
     */

    const enrichStartedAt =
      performance.now();

    logTimeline(
      "➡️ PRODUCT_ENRICHMENT STARTED",
      analysisStartedAt
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

    logTimeline(
      `✅ PRODUCT_ENRICHMENT FINISHED — ${formatDuration(
        performance.now() -
        enrichStartedAt
      )}`,
      analysisStartedAt
    );

    console.log(
      "ENRICHED_PRODUCT:",
      JSON.stringify(
        enrichedProduct,
        null,
        2
      )
    );

    /*
     * FINAL RECOMMENDATION
     */

    const report =
      await measureAgent(
        "RECOMMENDATION_AGENT",
        analysisStartedAt,
        async () =>
          recommendationAgent({
            product:
              enrichedProduct,
            pricing,
            reviews,
            retailers,
            alternatives,
            decision,
          })
      );

    console.log(
      "RECOMMENDATION_PRODUCT:",
      JSON.stringify(
        report.product,
        null,
        2
      )
    );

    /*
     * FINAL RESPONSE ASSEMBLY
     */

    const assemblyStartedAt =
      performance.now();

    logTimeline(
      "➡️ FINAL_REPORT_ASSEMBLY STARTED",
      analysisStartedAt
    );

    const finalReport: DealReport = {
      ...report,

      product:
        enrichedProduct,

      productOverview,

      specifications:
        normalisedSpecifications,
    };

    logTimeline(
      `✅ FINAL_REPORT_ASSEMBLY FINISHED — ${formatDuration(
        performance.now() -
        assemblyStartedAt
      )}`,
      analysisStartedAt
    );

    const totalDuration =
      performance.now() -
      analysisStartedAt;

    console.log(
      "=================================================="
    );

    console.log(
      `🏁 BLINLX ANALYSIS COMPLETE — ${formatDuration(
        totalDuration
      )}`
    );

    console.log(
      "==================================================\n\n"
    );

    return finalReport;
  } catch (error) {
    const totalDuration =
      performance.now() -
      analysisStartedAt;

    console.error(
      "=================================================="
    );

    console.error(
      `💥 BLINLX ANALYSIS FAILED AFTER ${formatDuration(
        totalDuration
      )}`
    );

    console.error(
      "ANALYSIS_ERROR:",
      error
    );

    console.error(
      "==================================================\n\n"
    );

    throw error;
  }
}