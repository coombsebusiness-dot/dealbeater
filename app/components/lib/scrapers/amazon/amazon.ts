import {
  AmazonSearchOptions,
  AmazonSearchResult,
} from "./types";

import {
  searchAmazonProducts,
} from "./search";

import {
  sortAmazonMatches,
} from "./matcher";

export async function searchAmazon(
  query: string,
  options: AmazonSearchOptions = {}
): Promise<AmazonSearchResult> {
  const result =
    await searchAmazonProducts(query);

  const limit =
    typeof options.limit === "number" &&
    options.limit > 0
      ? Math.floor(options.limit)
      : 10;

  const products = sortAmazonMatches(
    query,
    result.products
  ).slice(0, limit);

  return {
    products,
    total: products.length,
  };
}