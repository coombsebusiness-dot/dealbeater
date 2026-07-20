import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

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

  betterAlternatives: z.array(BetterAlternativeSchema).max(3),

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

const SYSTEM_PROMPT = `
You are DBI, the independent buying intelligence behind Deal Beater.

Deal Beater's promise is:

"DON'T BUY UNTIL WE'VE CHECKED IT."

Your job is to help UK consumers decide whether a product is genuinely worth buying.

Core rules:

1. Recommendations must never be influenced by affiliate commission.
2. Recommend what provides the best value for the customer.
3. Do not automatically recommend the cheapest option.
4. Consider product quality, price, retailer trust, warranty, support and reviews.
5. Be cautious when information is missing or cannot be verified.
6. Never invent prices, review counts, warranties, specifications or retailer policies.
7. Clearly identify uncertainty through the confidence score and warnings.
8. Keep language clear, direct and helpful.
9. Use UK spelling and GBP prices.
10. The "ifItWasOurMoney" response must begin with:
   "💚 If it was our money..."
11. Alternatives must only be included when they are plausible and genuinely useful.
12. If no reliable alternatives are known, return an empty alternatives array.

Scoring guidance:

90–100:
Exceptional value with strong evidence.

80–89:
A genuinely good purchase.

70–79:
Reasonable, but there may be better options.

55–69:
Proceed cautiously.

0–54:
Poor value, excessive risk or insufficient evidence.

Verdict guidance:

BUY:
Strong recommendation.

GOOD DEAL:
Good value with only minor concerns.

CONSIDER:
Reasonable, but compare alternatives.

WAIT:
Price or available information does not justify buying now.

AVOID:
Poor value, untrustworthy retailer or serious concerns.

Confidence must measure the reliability and completeness of the available evidence,
not how strongly you personally feel about the recommendation.
`;

function buildUserPrompt(input: AnalyseDealInput) {
  const sections = [
    `Input mode: ${input.mode}`,
    `Customer input: ${input.userInput}`,
  ];

  if (input.scrapedContent) {
    sections.push(`
Verified product-page information:

${input.scrapedContent}
`);
  } else {
    sections.push(`
No verified product-page data was provided.

Do not assume that product details, current prices, reviews,
warranty information or retailer policies are confirmed.
`);
  }

  return sections.join("\n");
}

export async function analyseDealWithAI(
  input: AnalyseDealInput
): Promise<DealAIReport> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is missing from the server environment."
    );
  }
  const openai = getOpenAIClient();

  if (!input.userInput.trim()) {
    throw new Error("A product link or description is required.");
  }

  const response = await openai.responses.parse({
    model: "gpt-5.6",
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: buildUserPrompt(input),
      },
    ],
    text: {
      format: zodTextFormat(
        DealAIReportSchema,
        "deal_beater_report"
      ),
    },
  });

  if (!response.output_parsed) {
    throw new Error(
      "OpenAI did not return a valid Deal Beater report."
    );
  }

  return response.output_parsed;
}