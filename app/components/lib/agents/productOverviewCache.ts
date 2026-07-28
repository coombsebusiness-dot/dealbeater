import { supabaseAdmin } from "@/app/components/lib/supabase/admin";
import { productOverviewAgent } from "./productOverviewAgent";

type ProductOverview = Awaited<
  ReturnType<typeof productOverviewAgent>
>;

type ProductForOverview = Parameters<
  typeof productOverviewAgent
>[0];

type StoredAnalysis = {
  productOverview?: ProductOverview;
};

export async function getOrCreateProductOverview(
  product: ProductForOverview
): Promise<ProductOverview> {
  const productName = getProductName(product);
  const slug = createProductSlug(productName);

  const cachedOverview =
    await getCachedProductOverview(slug);

  if (cachedOverview) {
    console.info(
      "PRODUCT_OVERVIEW_CACHE_HIT:",
      productName
    );

    return cachedOverview;
  }

  console.info(
    "PRODUCT_OVERVIEW_CACHE_MISS:",
    productName
  );

  /*
   * The final saveProductAnalysis() call will persist this overview
   * inside the complete report after analysis finishes.
   */
  return productOverviewAgent(product);
}

async function getCachedProductOverview(
  slug: string
): Promise<ProductOverview | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("analysis")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn(
      "Unable to check Product Overview cache:",
      error.message
    );

    return null;
  }

  const analysis =
    data?.analysis as StoredAnalysis | null;

  const overview = analysis?.productOverview;

  if (!isValidProductOverview(overview)) {
    return null;
  }

  return overview;
}

function isValidProductOverview(
  value: ProductOverview | undefined
): value is ProductOverview {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    typeof value.shortDescription === "string" &&
    value.shortDescription.trim().length > 0 &&
    Array.isArray(value.bestFor) &&
    Array.isArray(value.strengths) &&
    Array.isArray(value.considerations)
  );
}

function getProductName(
  product: ProductForOverview
): string {
  const possibleProduct = product as {
    name?: string;
    productName?: string;
    title?: string;
  };

  const productName =
    possibleProduct.name?.trim() ||
    possibleProduct.productName?.trim() ||
    possibleProduct.title?.trim();

  if (!productName) {
    throw new Error(
      "Unable to cache Product Overview because the product name is missing."
    );
  }

  return productName;
}

function createProductSlug(
  productName: string
): string {
  const slug = productName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  if (!slug) {
    throw new Error(
      "Unable to create Product Overview cache key."
    );
  }

  return slug;
}