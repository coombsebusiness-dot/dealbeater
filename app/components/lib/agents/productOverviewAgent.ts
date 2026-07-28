import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import type { ProductData } from "@/app/components/lib/ai/productAgent";

const ProductOverviewSchema = z.object({
  shortDescription: z.string(),

  bestFor: z
    .array(z.string())
    .max(6),

  strengths: z
    .array(z.string())
    .max(6),

  considerations: z
    .array(z.string())
    .max(6),

  confidence: z
    .number()
    .min(0)
    .max(100),
});

export type ProductOverview =
  z.infer<typeof ProductOverviewSchema>;

function getOpenAIClient() {
  const apiKey =
    process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing from the server environment."
    );
  }

  return new OpenAI({
    apiKey,
  });
}

const SYSTEM_PROMPT = `
You are the Product Knowledge Agent for Blinlx.

Your task is to create a concise, factual overview of a product.

This is product knowledge, not deal analysis.

Strict rules:

1. Describe what the product is and what it is designed to do.
2. Do not discuss whether the current price is good.
3. Do not mention retailers, offers, discounts or savings.
4. Do not include review counts or retailer counts.
5. Do not give a BUY, WAIT or AVOID verdict.
6. Do not invent specifications or capabilities.
7. Use only the supplied product information and reliable,
   widely established knowledge associated with the exact model.
8. When the exact product cannot be identified confidently,
   keep the overview cautious and general.
9. Use clear UK English.
10. Each list item should be concise and useful.
11. "bestFor" must describe suitable users or use cases.
12. "strengths" must describe product characteristics.
13. "considerations" must describe practical limitations,
    compatibility issues or things a buyer should know.
`;

export async function productOverviewAgent(
  product: ProductData
): Promise<ProductOverview> {
 const openai = getOpenAIClient();

 
  

  const productEvidence = {
    name: product.name,
    brand: product.brand,
    model: product.model,
    category: product.category,
    colour: product.colour,
    variant: product.variant,
    specs: product.specs,
    mpn: product.mpn,
    sku: product.sku,
    description: product.description,
  };

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
            content: `
Create a factual Product Overview from the following product evidence:

${JSON.stringify(
  productEvidence,
  null,
  2
)}

Do not include pricing, retailer information, review totals or a buying verdict.

If the exact model is unclear, reduce the confidence score and avoid specific claims.
`,
          },
        ],

        text: {
          format: zodTextFormat(
            ProductOverviewSchema,
            "product_overview"
          ),
        },
      });

    if (!response.output_parsed) {
      throw new Error(
        "No valid product overview was returned."
      );
    }

    return {
  ...response.output_parsed,
  confidence: Math.max(
  0,
  Math.min(
    100,
    Math.round(product.confidence)
  )
),
};
  } catch (error) {
    console.warn(
      "Product Overview generation failed:",
      error
    );

    return createFallbackOverview(product);
  }
}

function createFallbackOverview(
  product: ProductData
): ProductOverview {
  const productName =
    product.name ||
    [
      product.brand,
      product.model,
    ]
      .filter(Boolean)
      .join(" ");

  const category =
    product.category &&
    product.category !== "General product"
      ? product.category.toLowerCase()
      : "product";

  return {
    shortDescription:
      `${productName} is a ${category}. ` +
      "Blinlx currently has limited verified product information for this exact model.",

    bestFor: [],

    strengths: [],

    considerations: [
      "Confirm the exact model and specifications before purchasing.",
    ],

    confidence: Math.max(
      20,
      Math.min(
        60,
        Math.round(product.confidence)
      )
    ),
  };
  function normaliseConfidence(
  value: unknown
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 50;
  }

  const percentage =
    value >= 0 && value <= 1
      ? value * 100
      : value;

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(percentage)
    )
  );
}
}