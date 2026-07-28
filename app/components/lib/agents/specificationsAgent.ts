import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { normalizeBrand } from "@/lib/product-intelligence/brand-normalizer";
import type { ProductData } from "@/app/components/lib/ai/productAgent";
import { extractProductIdentity } from "@/lib/product-intelligence/product-identity";

const SpecificationValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

const SpecificationItemSchema = z.object({
  label: z.string(),
  value: SpecificationValueSchema,
});

const ProductSpecificationsSchema = z.object({
  specifications: z
    .array(SpecificationItemSchema)
    .max(20),
});

type ProductSpecificationsResponse =
  z.infer<typeof ProductSpecificationsSchema>;

export type ProductSpecifications = Record<
  string,
  string | number | boolean | null
>;

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
You are the Product Specifications Agent for Blinlx.

Your task is to return structured, factual specifications
for the exact product supplied.

Strict rules:

1. Return specifications only.
2. Do not include prices, retailers, discounts or savings.
3. Do not include opinions, buying advice or review summaries.
4. Do not invent specifications.
5. Omit any specification that is uncertain.
6. Use clear consumer-friendly labels.
7. Keep specification values concise.
8. Include units inside the value where appropriate.
9. Use clear UK English.
10. Return between 6 and 20 useful specifications when
    the exact product is confidently identified.
11. Do not include empty values.
12. Do not include generic marketing claims.
13. Only include specifications belonging to the exact model.
14. If the exact model cannot be identified confidently,
    return fewer specifications rather than guessing.
`;

export async function specificationsAgent(
  product: ProductData
): Promise<ProductSpecifications> {
  const productName =
    product.name ||
    [
      product.brand,
      product.model,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

  console.info(
    "SPECIFICATIONS_AGENT_STARTED:",
    productName
  );
const identity = extractProductIdentity(product.name);
console.log(
  "PRODUCT_IDENTITY:",
  JSON.stringify(identity, null, 2)
);

console.log(
  "ORIGINAL_PRODUCT_NAME:",
  product.name
);

const productEvidence = {
  name: product.name,
 brand: identity.brand ?? normalizeBrand(product.brand),
model: identity.model ?? product.model,
category: identity.category ?? product.category,
  colour: product.colour,
  variant: product.variant,
  existingSpecs: product.specs,
  mpn: product.mpn,
  sku: product.sku,
  description: product.description,
  confidence: product.confidence,
};

  console.info(
    "SPECIFICATIONS_AGENT_EVIDENCE:",
    JSON.stringify(
      productEvidence,
      null,
      2
    )
  );

  try {
    const openai =
      getOpenAIClient();

    console.info(
      "SPECIFICATIONS_AGENT_OPENAI_REQUEST:",
      productName
    );

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
Create structured specifications for the following product:

${JSON.stringify(
  productEvidence,
  null,
  2
)}

Return the result using this structure:

{
  "specifications": [
    {
      "label": "Sensor",
      "value": "24.2 MP full-frame CMOS"
    },
    {
      "label": "Lens mount",
      "value": "Sony E"
    },
    {
      "label": "Video resolution",
      "value": "4K UHD"
    }
  ]
}

Only include specifications that are confidently associated
with this exact product.

Do not invent missing information.
`,
          },
        ],

        text: {
          format: zodTextFormat(
            ProductSpecificationsSchema,
            "product_specifications"
          ),
        },
      });

    console.info(
      "SPECIFICATIONS_AGENT_RESPONSE_RECEIVED:",
      Boolean(
        response.output_parsed
      )
    );

    if (!response.output_parsed) {
      console.error(
        "SPECIFICATIONS_AGENT_NO_PARSED_OUTPUT:",
        productName
      );

      return {};
    }

    const parsed =
      response.output_parsed as ProductSpecificationsResponse;

    console.info(
      "SPECIFICATIONS_AGENT_PARSED:",
      JSON.stringify(
        parsed,
        null,
        2
      )
    );

    const cleaned =
      cleanSpecifications(
        parsed.specifications
      );

    console.info(
      "SPECIFICATIONS_AGENT_RESULT:",
      JSON.stringify(
        cleaned,
        null,
        2
      )
    );

    return cleaned;
  } catch (error) {
    console.error(
      "SPECIFICATIONS_AGENT_FAILED:",
      error
    );

    return {};
  }
}

function cleanSpecifications(
  specifications: ProductSpecificationsResponse["specifications"]
): ProductSpecifications {
  return Object.fromEntries(
    specifications
      .map(({ label, value }) => {
        const cleanedLabel =
          label.trim();

        const cleanedValue =
          typeof value === "string"
            ? value.trim()
            : value;

        return [
          cleanedLabel,
          cleanedValue,
        ] as const;
      })
      .filter(
        ([label, value]) =>
          Boolean(label) &&
          value !== null &&
          value !== ""
      )
      .slice(0, 20)
  );
}