import {
  AmazonProduct,
  AmazonSearchResult,
} from "./types";


import {
  canonicalAmazonUrl,
  cleanAmazonTitle,
  parsePrice,
} from "./utils";

interface SerpApiAmazonResult {
  asin?: string;
  title?: string;
  link?: string;
  link_clean?: string;
  thumbnail?: string;
  rating?: number;
  reviews?: number;
  price?: string;
  extracted_price?: number;
  delivery?: string[];
  prime?: boolean;
  amazon_prime?: boolean;
}

interface SerpApiAmazonResponse {
  organic_results?: SerpApiAmazonResult[];

  error?: string;
}

function normaliseAmazonResult(
  result: SerpApiAmazonResult
): AmazonProduct | null {
  const asin = result.asin?.trim().toUpperCase();

  const title = result.title?.trim();

  if (!asin || !title) {
    return null;
  }

  const price =
    typeof result.extracted_price === "number" &&
    Number.isFinite(result.extracted_price)
      ? result.extracted_price
      : result.price
        ? parsePrice(result.price)
        : null;

  return {
    asin,

    title: cleanAmazonTitle(title),

    price,

    image:
      result.thumbnail ?? null,

    canonicalUrl:
      canonicalAmazonUrl(asin),

    rating:
      typeof result.rating === "number"
        ? result.rating
        : null,

    reviewCount:
      typeof result.reviews === "number"
        ? result.reviews
        : null,

    availability:
      result.delivery ?? null,

    isPrime:
      result.prime === true ||
      result.amazon_prime === true,
  };
}

export async function searchAmazonProducts(
  query: string
): Promise<AmazonSearchResult> {
  const apiKey =
    process.env.SERPAPI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "SERPAPI_API_KEY is missing from the environment."
    );
  }

  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return {
      products: [],
      total: 0,
    };
  }

  const params = new URLSearchParams({
    engine: "amazon",
    amazon_domain: "amazon.co.uk",
    k: cleanedQuery,
    api_key: apiKey,
  });

  const response = await fetch(
    `https://serpapi.com/search.json?${params.toString()}`,
    {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Amazon search failed with status ${response.status}.`
    );
  }

  const data =
    (await response.json()) as SerpApiAmazonResponse;

  if (data.error) {
    throw new Error(
      `SerpApi Amazon error: ${data.error}`
    );
  }

  const products = (
    data.organic_results ?? []
  )
    .map(normaliseAmazonResult)
    .filter(
      (
        product
      ): product is AmazonProduct =>
        product !== null
    );

  return {
    products,
    total: products.length,
  };
}