import type {
  Product,
} from "@/types/product";

import {
  loadProductPage,
} from "@/knowledge/products/loadProductPage";

import {
  compareProducts,
} from "@/lib/comparison/compareProducts";

import type {
  ComparisonResult,
} from "@/lib/comparison/types";

import type {
  ComparisonDefinition,
} from "./ComparisonRegistry";

import {
  getComparisonBySlug,
} from "./ComparisonRegistry";

export interface ComparisonPageData {
  definition:
    ComparisonDefinition;

  productA:
    Product;

  productB:
    Product;

  comparison:
    ComparisonResult;
}

export async function loadComparisonPage(
  comparisonSlug: string,
): Promise<
  ComparisonPageData | null
> {
  const definition =
    getComparisonBySlug(
      comparisonSlug,
    );

  if (!definition) {
    return null;
  }

  const [
    productA,
    productB,
  ] = await Promise.all([
    loadProductPage(
      definition.productAId,
    ),

    loadProductPage(
      definition.productBId,
    ),
  ]);

  if (
    !productA ||
    !productB
  ) {
    return null;
  }

  return {
    definition,

    productA,

    productB,

    comparison:
      compareProducts(
        productA,
        productB,
      ),
  };
}