import {
  bootstrapGuideBlueprints,
  getPublishableBlueprints,
} from "@/knowledge/guides/blueprints";

import {
  getAllComparisons,
} from "@/knowledge/comparisons/ComparisonRegistry";

import {
  cameraProducts,
  toProductRecommendation,
} from "@/knowledge/products";

import {
  lensProducts,
} from "@/knowledge/products/lenses";

import type {
  PublishingPlan,
  PublishingQueueItem,
} from "./PublishingTypes";

function createProductItems():
  PublishingQueueItem[] {
  const products = [
    ...cameraProducts,
    ...lensProducts,
  ];

  return products.map(
    (product) => {
      const recommendation =
        toProductRecommendation(
          product,
        );

      const slug =
        recommendation.slug ??
        product.slug;

      return {
        id:
          `product:${product.id}`,

        slug,

        title:
          product.fullName,

        type:
          "PRODUCT",

        status:
          "READY",

        href:
          `/products/${slug}`,
      };
    },
  );
}

function createBuyingGuideItems():
  PublishingQueueItem[] {
  bootstrapGuideBlueprints();

  return getPublishableBlueprints()
    .map(
      (blueprint) => ({
        id:
          `guide:${blueprint.id}`,

        slug:
          blueprint.slug,

        title:
          blueprint.title,

        type:
          "BUYING_GUIDE",

        status:
          "READY",

        href:
          `/blog/${blueprint.slug}`,
      }),
    );
}

function createComparisonItems():
  PublishingQueueItem[] {
  return getAllComparisons()
    .map(
      (comparison) => ({
        id:
          `comparison:${comparison.slug}`,

        slug:
          comparison.slug,

        title:
          comparison.title,

        type:
          "COMPARISON",

        status:
          "READY",

        href:
          `/comparisons/${comparison.slug}`,
      }),
    );
}

function removeDuplicateItems(
  items:
    PublishingQueueItem[],
): PublishingQueueItem[] {
  const itemsById =
    new Map<
      string,
      PublishingQueueItem
    >();

  items.forEach(
    (item) => {
      if (
        !itemsById.has(
          item.id,
        )
      ) {
        itemsById.set(
          item.id,
          item,
        );
      }
    },
  );

  return Array.from(
    itemsById.values(),
  );
}

export class PublishingPlanner {
  build():
    PublishingPlan {
    const items =
      removeDuplicateItems([
        ...createProductItems(),
        ...createBuyingGuideItems(),
        ...createComparisonItems(),
      ]);

    const products =
      items.filter(
        (item) =>
          item.type ===
          "PRODUCT",
      ).length;

    const buyingGuides =
      items.filter(
        (item) =>
          item.type ===
          "BUYING_GUIDE",
      ).length;

    const comparisons =
      items.filter(
        (item) =>
          item.type ===
          "COMPARISON",
      ).length;

    const ready =
      items.filter(
        (item) =>
          item.status ===
          "READY",
      ).length;

    const blocked =
      items.filter(
        (item) =>
          item.status ===
          "BLOCKED",
      ).length;

    return {
      items,

      summary: {
        products,

        buyingGuides,

        comparisons,

        ready,

        blocked,

        total:
          items.length,
      },
    };
  }
}

export const publishingPlanner =
  new PublishingPlanner();