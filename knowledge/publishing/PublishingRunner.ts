import {
  publishingPlanner,
} from "./PublishingPlanner";

import type {
  PublishingPlan,
  PublishingQueueItem,
} from "./PublishingTypes";

export type PublishingRunItemStatus =
  | "PASSED"
  | "FAILED";

export interface PublishingRunItem {
  item:
    PublishingQueueItem;

  status:
    PublishingRunItemStatus;

  errors:
    string[];
}

export interface PublishingRunSummary {
  planned:
    number;

  passed:
    number;

  failed:
    number;

  products:
    number;

  buyingGuides:
    number;

  comparisons:
    number;
}

export interface PublishingRunResult {
  plan:
    PublishingPlan;

  results:
    PublishingRunItem[];

  passed:
    PublishingRunItem[];

  failed:
    PublishingRunItem[];

  summary:
    PublishingRunSummary;
}

function validateRoute(
  item:
    PublishingQueueItem,
): string[] {
  const errors:
    string[] = [];

  const expectedPrefixByType:
    Record<
      PublishingQueueItem["type"],
      string
    > = {
    PRODUCT:
      "/products/",

    BUYING_GUIDE:
      "/blog/",

    COMPARISON:
      "/comparisons/",
  };

  const expectedPrefix =
    expectedPrefixByType[
      item.type
    ];

  if (
    !item.href.startsWith(
      expectedPrefix,
    )
  ) {
    errors.push(
      [
        `Invalid route for ${item.type}.`,
        `Expected "${expectedPrefix}".`,
        `Received "${item.href}".`,
      ].join(
        " ",
      ),
    );
  }

  return errors;
}

function validateItem(
  item:
    PublishingQueueItem,
): string[] {
  const errors:
    string[] = [];

  if (!item.id.trim()) {
    errors.push(
      "Publishing item is missing an ID.",
    );
  }

  if (!item.slug.trim()) {
    errors.push(
      "Publishing item is missing a slug.",
    );
  }

  if (!item.title.trim()) {
    errors.push(
      "Publishing item is missing a title.",
    );
  }

  if (!item.href.trim()) {
    errors.push(
      "Publishing item is missing an href.",
    );
  }

  if (
    item.status !==
    "READY"
  ) {
    errors.push(
      item.reason?.trim() ||
      "Publishing item is blocked.",
    );
  }

  errors.push(
    ...validateRoute(
      item,
    ),
  );

  return errors;
}

function findDuplicateErrors(
  items:
    PublishingQueueItem[],
): Map<
  string,
  string[]
> {
  const errorsByItemId =
    new Map<
      string,
      string[]
    >();

  const ids =
    new Map<
      string,
      PublishingQueueItem[]
    >();

  const slugs =
    new Map<
      string,
      PublishingQueueItem[]
    >();

  const hrefs =
    new Map<
      string,
      PublishingQueueItem[]
    >();

  function registerValue(
    collection:
      Map<
        string,
        PublishingQueueItem[]
      >,

    value:
      string,

    item:
      PublishingQueueItem,
  ): void {
    const existing =
      collection.get(
        value,
      ) ??
      [];

    collection.set(
      value,
      [
        ...existing,
        item,
      ],
    );
  }

  items.forEach(
    (item) => {
      registerValue(
        ids,
        item.id,
        item,
      );

      registerValue(
        slugs,
        item.slug,
        item,
      );

      registerValue(
        hrefs,
        item.href,
        item,
      );
    },
  );

  function addDuplicateErrors(
    collection:
      Map<
        string,
        PublishingQueueItem[]
      >,

    label:
      string,
  ): void {
    collection.forEach(
      (
        matchingItems,
        value,
      ) => {
        if (
          matchingItems.length <=
          1
        ) {
          return;
        }

        matchingItems.forEach(
          (item) => {
            const existingErrors =
              errorsByItemId.get(
                item.id,
              ) ??
              [];

            errorsByItemId.set(
              item.id,
              [
                ...existingErrors,

                `Duplicate ${label}: "${value}".`,
              ],
            );
          },
        );
      },
    );
  }

  addDuplicateErrors(
    ids,
    "publishing ID",
  );

  addDuplicateErrors(
    slugs,
    "slug",
  );

  addDuplicateErrors(
    hrefs,
    "route",
  );

  return errorsByItemId;
}

function createRunItem(
  item:
    PublishingQueueItem,

  duplicateErrors:
    string[],
): PublishingRunItem {
  const errors = [
    ...validateItem(
      item,
    ),

    ...duplicateErrors,
  ];

  return {
    item,

    status:
      errors.length ===
        0
        ? "PASSED"
        : "FAILED",

    errors,
  };
}

function createSummary(
  plan:
    PublishingPlan,

  results:
    PublishingRunItem[],
): PublishingRunSummary {
  const passed =
    results.filter(
      (result) =>
        result.status ===
        "PASSED",
    ).length;

  const failed =
    results.length -
    passed;

  return {
    planned:
      results.length,

    passed,

    failed,

    products:
      plan.summary
        .products,

    buyingGuides:
      plan.summary
        .buyingGuides,

    comparisons:
      plan.summary
        .comparisons,
  };
}

export class PublishingRunner {
  run(
    plan:
      PublishingPlan =
        publishingPlanner.build(),
  ): PublishingRunResult {
    const duplicateErrors =
      findDuplicateErrors(
        plan.items,
      );

    const results =
      plan.items.map(
        (item) =>
          createRunItem(
            item,

            duplicateErrors.get(
              item.id,
            ) ??
              [],
          ),
      );

    const passed =
      results.filter(
        (result) =>
          result.status ===
          "PASSED",
      );

    const failed =
      results.filter(
        (result) =>
          result.status ===
          "FAILED",
      );

    return {
      plan,

      results,

      passed,

      failed,

      summary:
        createSummary(
          plan,
          results,
        ),
    };
  }

  createReport(
    result:
      PublishingRunResult,
  ): string {
    const lines = [
      "Blinlx Publishing Report",
      "────────────────────────",
      `Products: ${result.summary.products}`,
      `Buying guides: ${result.summary.buyingGuides}`,
      `Comparisons: ${result.summary.comparisons}`,
      `Total planned: ${result.summary.planned}`,
      `Passed: ${result.summary.passed}`,
      `Failed: ${result.summary.failed}`,
    ];

    if (
      result.failed.length >
      0
    ) {
      lines.push(
        "",
        "Failed pages:",
      );

      result.failed.forEach(
        (failure) => {
          lines.push(
            `- ${failure.item.title}`,
          );

          failure.errors.forEach(
            (error) => {
              lines.push(
                `  • ${error}`,
              );
            },
          );
        },
      );
    }

    return lines.join(
      "\n",
    );
  }
}

export const publishingRunner =
  new PublishingRunner();