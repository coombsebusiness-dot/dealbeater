import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import { analyseDeal } from "./orchestrator";
import type { DealReport } from "../types";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing from the server environment."
    );
  }

  return new OpenAI({
    apiKey,
  });
}

const BetterAlternativeSchema = z.object({
  name: z.string(),
  reason: z.string(),
  price: z.string(),
  rating: z.number().min(0).max(5),
  saving: z.string(),
  verdict: z.string(),
});

const ScoreBreakdownSchema = z.object({
  productQuality: z.number().min(0).max(100),
  priceValue: z.number().min(0).max(100),
  reviewQuality: z.number().min(0).max(100),
  retailerTrust: z.number().min(0).max(100),
  warrantySupport: z.number().min(0).max(100),
});

export const DealAIReportSchema = z.object({
  productName: z.string(),
  retailerName: z.string(),
  price: z.string(),
  productImage: z.string().optional(),
retailerUrl: z.string().optional(),
saving: z.string(),
checkedAt: z.string(),

  marketPosition: z.enum([
    "BEST_PRICE",
    "BELOW_AVERAGE",
    "AVERAGE",
    "ABOVE_AVERAGE",
  ]),

  score: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),

  verdict: z.enum([
    "BUY",
    "GOOD DEAL",
    "CONSIDER",
    "WAIT",
    "AVOID",
  ]),

  headline: z.string(),
  recommendation: z.string(),
  summary: z.string(),

  priceAnalysis: z.string(),
  reviewAnalysis: z.string(),
  retailerAnalysis: z.string(),

  positives: z.array(z.string()),
  warnings: z.array(z.string()),

  scoreBreakdown: ScoreBreakdownSchema,

  betterAlternatives: z
    .array(BetterAlternativeSchema)
    .max(3),

  ifItWasOurMoney: z.string(),
});

export type DealAIReport = z.infer<
  typeof DealAIReportSchema
>;

export interface AnalyseDealInput {
  mode: "link" | "describe" | "upload";
  userInput: string;
  scrapedContent?: string;
  imageUrl?: string;
}

/*
 * GPT is now responsible only for explaining the
 * evidence produced by Deal Beater's agent pipeline.
 *
 * It must not calculate scores, choose the verdict,
 * identify prices or create alternatives.
 */
const NarrativeSchema = z.object({
  headline: z.string(),
  recommendation: z.string(),
  summary: z.string(),

  priceAnalysis: z.string(),
  reviewAnalysis: z.string(),
  retailerAnalysis: z.string(),

  positives: z.array(z.string()).max(6),
  warnings: z.array(z.string()).max(6),

  ifItWasOurMoney: z.string(),
});

type NarrativeResult = z.infer<
  typeof NarrativeSchema
>;

const SYSTEM_PROMPT = `
You are DBI, the independent buying intelligence voice behind Deal Beater.

Deal Beater's promise is:

"DON'T BUY UNTIL WE'VE CHECKED IT."

The Deal Beater analysis engine has already examined the product and produced
a structured evidence report.

Your job is ONLY to explain that report clearly to a UK consumer.

You are not the decision maker.

Strict rules:

1. Use only the evidence contained in the structured DealReport.
2. Never invent or estimate a price.
3. Never invent ratings, review counts, warranties or retailer policies.
4. Never change the supplied verdict, score or confidence.
5. Never add an alternative that is not present in the evidence.
6. Clearly explain when evidence is incomplete.
7. Use clear UK English.
8. Avoid technical jargon.
9. Be direct, independent and customer-focused.
10. Affiliate commission must never influence the wording.
11. The ifItWasOurMoney field must begin exactly with:
    "💚 If it was our money..."
12. Do not claim that information is verified unless the evidence explicitly
    supports that claim.
13. Positives and warnings must be based only on the supplied strengths,
    concerns and evidence.
`;

export async function analyseDealWithAI(
  input: AnalyseDealInput
): Promise<DealAIReport> {
  const cleanInput = input.userInput.trim();

  if (!cleanInput) {
    throw new Error(
      "A product link or description is required."
    );
  }

  /*
   * This is the important connection.
   *
   * The structured agent pipeline now performs the
   * product, pricing, review, retailer, alternative
   * and decision analysis.
   */
  console.log("🧠 DEAL BEATER ENGINE STARTED");

  const engineReport = await analyseDeal(cleanInput);

  console.log(
    "✅ DEAL BEATER ENGINE COMPLETE:",
    {
      product: engineReport.product.name,
      recommendation:
        engineReport.recommendation,
      score: engineReport.dealScore,
      confidence: engineReport.confidence,
    }
  );

  const narrative = await generateNarrative(
    input,
    engineReport
  );

  return buildFinalReport(
    engineReport,
    narrative
  );
}

async function generateNarrative(
  input: AnalyseDealInput,
  engineReport: DealReport
): Promise<NarrativeResult> {
  const openai = getOpenAIClient();

  const supportingPageEvidence =
    input.scrapedContent
      ? `
Additional product-page evidence collected by the API route:

${input.scrapedContent}
`
      : `
No product-page evidence was available because the retailer page
could not be read or did not provide usable evidence.
`;

  const userPrompt = `
Customer input:

${input.userInput}

Input mode:

${input.mode}

Structured Deal Beater engine report (this is authoritative and must not be contradicted):

${JSON.stringify(engineReport, null, 2)}

${supportingPageEvidence}

Write the customer-facing explanation.

The DealReport is authoritative.

Do not contradict it.

Do not recalculate the score.

Do not change the recommendation.

Do not invent prices.

Do not invent retailers.

Do not invent review counts.

If currentPrice and bestRetailer exist, treat them as verified evidence.

If pricing.recommendation is WAIT, explain why.

If pricing.recommendation is BUY_NOW, explain why.

Only mention uncertainty when the DealReport itself indicates uncertainty.
`;

  try {
    const response =
      await openai.responses.parse({
        model: "gpt-5.6",
        input: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        text: {
          format: zodTextFormat(
            NarrativeSchema,
            "deal_beater_narrative"
          ),
        },
      });

    if (!response.output_parsed) {
      throw new Error(
        "OpenAI did not return a valid narrative."
      );
    }

    return {
      ...response.output_parsed,
      ifItWasOurMoney:
        ensureMoneyPrefix(
          response.output_parsed
            .ifItWasOurMoney
        ),
    };
  } catch (error) {
    /*
     * The evidence report is still useful even if
     * GPT cannot produce the narrative.
     */
    console.warn(
      "Narrative generation failed. Using the engine report directly:",
      error
    );

    return createFallbackNarrative(
      engineReport
    );
  }
}

function buildFinalReport(
  report: DealReport,
  narrative: NarrativeResult
): DealAIReport {
 return {
  productName:
    report.product.name ||
    buildProductName(report),
    

  retailerName:
    report.pricing.bestRetailer ||
    findBestRetailerName(
      report.retailers,
      report.pricing
    ),

  price:
    findDisplayPrice(report.pricing),

  productImage:
  report.product.imageUrl,

  retailerUrl: undefined,

  saving:
    formatSaving(
      report.pricing.savings
    ),

  checkedAt: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date()),

  marketPosition:
  report.pricing.pricePosition,

  score: clampScore(report.dealScore),

    confidence: clampScore(
      report.confidence
    ),

    verdict: mapRecommendation(
      report.recommendation
    ),

    headline: narrative.headline,

    recommendation:
      narrative.recommendation,

    summary:
      narrative.summary ||
      report.summary,

    priceAnalysis:
      narrative.priceAnalysis,

    reviewAnalysis:
      narrative.reviewAnalysis,

    retailerAnalysis:
      narrative.retailerAnalysis,

    positives:
      narrative.positives.length > 0
        ? narrative.positives
        : report.strengths,

    warnings:
      narrative.warnings.length > 0
        ? narrative.warnings
        : report.concerns,

    scoreBreakdown: {
      /*
       * Map the engine's existing breakdown into
       * the fields already expected by the UI.
       */
      productQuality: clampScore(
        report.scoreBreakdown.value
      ),

      priceValue: clampScore(
        report.scoreBreakdown.price
      ),

      reviewQuality: clampScore(
        report.scoreBreakdown.reviews
      ),

      retailerTrust: clampScore(
        report.scoreBreakdown.retailer
      ),

      warrantySupport: clampScore(
        report.scoreBreakdown.warranty
      ),
    },

    betterAlternatives:
      mapAlternatives(
        report.betterAlternatives
      ),

    ifItWasOurMoney:
      ensureMoneyPrefix(
        narrative.ifItWasOurMoney ||
          report.ifItWasOurMoney
      ),
  };
}

function mapRecommendation(
  recommendation:
    | "BUY"
    | "WAIT"
    | "NEGOTIATE"
    | "WALK_AWAY"
): DealAIReport["verdict"] {
  switch (recommendation) {
    case "BUY":
      return "BUY";

    case "NEGOTIATE":
      return "CONSIDER";

    case "WALK_AWAY":
      return "AVOID";

    case "WAIT":
    default:
      return "WAIT";
  }
  
}

function mapAlternatives(
  alternatives: DealReport["betterAlternatives"]
): DealAIReport["betterAlternatives"] {
  return alternatives
    .map((alternative) => {
      const record = asRecord(alternative);

      const name = readString(record, [
        "name",
        "productName",
        "title",
      ]);

      if (!name) {
        return null;
      }

      return {
        name,

        reason:
          readString(record, [
            "reason",
            "summary",
            "why",
            "recommendation",
          ]) ||
          "Included by Deal Beater's alternative analysis.",

        price:
          formatPrice(
            readValue(record, [
              "price",
              "currentPrice",
              "lowestPrice",
            ])
          ),

        rating: clampRating(
          readNumber(record, [
            "rating",
            "averageRating",
            "reviewRating",
          ])
        ),

        saving:
          formatSaving(
            readValue(record, [
              "saving",
              "savings",
              "priceDifference",
            ])
          ),

        verdict:
          readString(record, [
            "verdict",
            "recommendation",
          ]) ||
          "Compare before buying",
      };
    })
    .filter(
      (
        alternative
      ): alternative is DealAIReport["betterAlternatives"][number] =>
        alternative !== null
    )
    .slice(0, 3);
}

function findBestRetailerName(
  retailers: DealReport["retailers"],
  pricing: DealReport["pricing"]
): string {
  if (pricing.bestRetailer?.trim()) {
    return pricing.bestRetailer.trim();
  }

  if (retailers.length === 0) {
    return "Retailer not verified";
  }

  const retailersWithValidPrice =
    retailers.filter(
      (retailer) =>
        Number.isFinite(retailer.price)
    );

  if (
    retailersWithValidPrice.length > 0
  ) {
    const cheapestRetailer =
      [...retailersWithValidPrice].sort(
        (first, second) =>
          first.price - second.price
      )[0];

    return cheapestRetailer.name;
  }

  const mostTrustedRetailer =
    [...retailers].sort(
      (first, second) =>
        second.retailScore -
        first.retailScore
    )[0];

  return (
    mostTrustedRetailer?.name ||
    "Retailer not verified"
  );
}

function findDisplayPrice(
  pricing: DealReport["pricing"]
): string {
  const record = asRecord(pricing);

  const value = readValue(record, [
    "currentPrice",
    "submittedPrice",
    "price",
    "lowestPrice",
    "marketAverage",
  ]);

  return formatPrice(value);
}

function createFallbackNarrative(
  report: DealReport
): NarrativeResult {
  return {
    headline:
      `${mapRecommendation(
        report.recommendation
      )}: ${report.product.name}`,

    recommendation:
      report.summary ||
      "Deal Beater has completed its structured analysis.",

    summary:
      report.summary ||
      "The available evidence has been assessed by the Deal Beater engine.",

    priceAnalysis:
      extractSummary(
        report.pricing,
        "Live pricing evidence was limited."
      ),

    reviewAnalysis:
      extractSummary(
        report.reviews,
        "Reliable review evidence was limited."
      ),

    retailerAnalysis:
      report.retailers.length > 0
        ? "Retailer information was included in the Deal Beater analysis."
        : "The retailer could not be reliably verified.",

    positives: report.strengths,

    warnings: report.concerns,

    ifItWasOurMoney:
      ensureMoneyPrefix(
        report.ifItWasOurMoney ||
          "we would wait until stronger evidence is available."
      ),
  };
}

function extractSummary(
  value: unknown,
  fallback: string
): string {
  const record = asRecord(value);

  return (
    readString(record, [
      "marketSummary",
      "reviewSummary",
      "summary",
      "analysis",
      "recommendation",
    ]) || fallback
  );
}

function buildProductName(
  report: DealReport
): string {
  return [
    report.product.brand,
    report.product.model,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() || "Product not identified";
}

function ensureMoneyPrefix(
  value: string
): string {
  const cleanValue = value.trim();

  if (
    cleanValue
      .toLowerCase()
      .startsWith(
        "💚 if it was our money..."
      )
  ) {
    return cleanValue;
  }

  return `💚 If it was our money... ${cleanValue}`;
}

function clampScore(
  value: number
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function clampRating(
  value: number | null
): number {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(5, value)
  );
}

function formatPrice(
  value: unknown
): string {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return new Intl.NumberFormat(
      "en-GB",
      {
        style: "currency",
        currency: "GBP",
      }
    ).format(value);
  }

  if (typeof value === "string") {
    const cleanValue = value.trim();

    if (!cleanValue) {
      return "Not verified";
    }

    if (
      cleanValue.startsWith("£") ||
      /not verified/i.test(cleanValue)
    ) {
      return cleanValue;
    }

    const numericValue = Number(
      cleanValue.replace(
        /[^0-9.-]/g,
        ""
      )
    );

    if (Number.isFinite(numericValue)) {
      return new Intl.NumberFormat(
        "en-GB",
        {
          style: "currency",
          currency: "GBP",
        }
      ).format(numericValue);
    }

    return cleanValue;
  }

  return "Not verified";
}

function formatSaving(
  value: unknown
): string {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    if (value <= 0) {
      return "No saving verified";
    }

    return new Intl.NumberFormat(
      "en-GB",
      {
        style: "currency",
        currency: "GBP",
      }
    ).format(value);
  }

  if (
    typeof value === "string" &&
    value.trim()
  ) {
    return value.trim();
  }

  return "Saving not verified";
}

function asRecord(
  value: unknown
): Record<string, unknown> {
  if (
    typeof value === "object" &&
    value !== null
  ) {
    return value as Record<
      string,
      unknown
    >;
  }

  return {};
}

function readValue(
  record: Record<string, unknown>,
  keys: string[]
): unknown {
  for (const key of keys) {
    if (
      record[key] !== undefined &&
      record[key] !== null
    ) {
      return record[key];
    }
  }

  return undefined;
}

function readString(
  record: Record<string, unknown>,
  keys: string[]
): string | null {
  const value = readValue(record, keys);

  return typeof value === "string" &&
    value.trim()
    ? value.trim()
    : null;
}

function readNumber(
  record: Record<string, unknown>,
  keys: string[]
): number | null {
  const value = readValue(record, keys);

  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(
      value.replace(/[^0-9.-]/g, "")
    );

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}