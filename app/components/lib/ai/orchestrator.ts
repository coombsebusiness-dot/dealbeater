import type { DealReport } from "../types";
import { productAgent } from "./productAgent";
import { priceAgent } from "./priceAgent";
import { reviewAgent } from "./reviewAgent";
import { retailerAgent } from "./retailerAgent";
import { alternativeAgent } from "./alternativeAgent";
import { decisionAgent } from "@/app/components/lib/agents/decisionAgent";
import { recommendationAgent } from "./recommendationAgent";

export async function analyseDeal(
  input: string
): Promise<DealReport> {
  const cleanInput = input.trim();

  if (!cleanInput) {
    throw new Error("A product link or description is required.");
  }

  const product = await productAgent(cleanInput);

  const [pricing, reviews, retailers, alternatives] =
    await Promise.all([
      priceAgent(product),
      reviewAgent(product),
      retailerAgent(product),
      alternativeAgent(product),
    ]);

  const decision = decisionAgent(
    pricing,
    reviews,
    retailers,
    alternatives
  );

  return recommendationAgent({
    product,
    pricing,
    reviews,
    retailers,
    alternatives,
    decision,
  });
}