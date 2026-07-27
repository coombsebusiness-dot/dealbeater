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
    throw new Error(
      "A product link or description is required."
    );
  }

  const product = await productAgent(cleanInput);

  const [pricing, reviews, retailers, alternatives] =
    await Promise.all([
      priceAgent(product),
      reviewAgent(product),
      retailerAgent(product),
      alternativeAgent(product),
    ]);

 console.log("ORCHESTRATOR PRICING:", {
  pricing,
  topOffers: pricing.topOffers,
  bestRetailer: pricing.bestRetailer,
  bestRetailerUrl: pricing.bestRetailerUrl,
  productImage: pricing.productImage,
});

const decision = decisionAgent(
    pricing,
    reviews,
    retailers,
    alternatives
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
    pricing.bestRetailerUrl || product.ctaUrl
      ? "Buy Now"
      : undefined,
};

  return recommendationAgent({
    product: enrichedProduct,
    pricing,
    reviews,
    retailers,
    alternatives,
    decision,
    
  });
}