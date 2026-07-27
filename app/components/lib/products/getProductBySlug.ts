import { supabaseAdmin } from "@/app/components/lib/supabase/admin";

function parseNumericValue(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^\d.-]/g, ""));

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  const breakdown = data.score_breakdown ?? {};

  return {
    ...data,

    dealScore: parseNumericValue(data.score),
    confidence: parseNumericValue(data.confidence),

    scoreBreakdown: {
      price: parseNumericValue(
        breakdown.price ?? breakdown.priceValue
      ),
      reviews: parseNumericValue(
        breakdown.reviews ?? breakdown.reviewQuality
      ),
      retailer: parseNumericValue(
        breakdown.retailer ?? breakdown.retailerTrust
      ),
      warranty: parseNumericValue(
        breakdown.warranty ?? breakdown.warrantySupport
      ),
      value: parseNumericValue(
        breakdown.value ?? breakdown.productQuality
      ),
    },

    scoreExplanation: data.score_explanation ?? undefined,
  };
}