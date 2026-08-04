import type {
  GuideBlueprint,
  GuideBlueprintCategory,
  GuideBlueprintStatus,
} from "./GuideBlueprint";

import {
  createBestForBlueprint,
  createBudgetGuideBlueprint,
  createBuyingGuideBlueprint,
  createComparisonBlueprint,
  createExplainerBlueprint,
  createMistakesBlueprint,
} from "./createGuideBlueprint";

type BlueprintFactory =
  | typeof createBuyingGuideBlueprint
  | typeof createComparisonBlueprint
  | typeof createBestForBlueprint
  | typeof createExplainerBlueprint
  | typeof createBudgetGuideBlueprint
  | typeof createMistakesBlueprint;

export interface BlueprintBatchDefaults {
  category:
    GuideBlueprintCategory;

  audience?: string;

  recommendationTopic?: string;

  status?:
    GuideBlueprintStatus;

  priority?:
    1 | 2 | 3 | 4 | 5;
}

export interface BlueprintBatchItem {
  id?: string;

  slug?: string;

  title: string;

  topic: string;

  primaryKeyword: string;

  secondaryKeywords?: string[];

  audience?: string;

  recommendationTopic?: string;

  status?:
    GuideBlueprintStatus;

  priority?:
    1 | 2 | 3 | 4 | 5;
}

function createBatch(
  factory: BlueprintFactory,
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return items.map(
    (item) =>
      factory({
        ...defaults,
        ...item,

        audience:
          item.audience ??
          defaults.audience,

        recommendationTopic:
          item.recommendationTopic ??
          defaults.recommendationTopic,

        status:
          item.status ??
          defaults.status,

        priority:
          item.priority ??
          defaults.priority,
      }),
  );
}

export function createBuyingGuideBlueprintBatch(
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return createBatch(
    createBuyingGuideBlueprint,
    defaults,
    items,
  );
}

export function createComparisonBlueprintBatch(
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return createBatch(
    createComparisonBlueprint,
    defaults,
    items,
  );
}

export function createBestForBlueprintBatch(
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return createBatch(
    createBestForBlueprint,
    defaults,
    items,
  );
}

export function createExplainerBlueprintBatch(
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return createBatch(
    createExplainerBlueprint,
    defaults,
    items,
  );
}

export function createBudgetGuideBlueprintBatch(
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return createBatch(
    createBudgetGuideBlueprint,
    defaults,
    items,
  );
}

export function createMistakesBlueprintBatch(
  defaults: BlueprintBatchDefaults,
  items: BlueprintBatchItem[],
): GuideBlueprint[] {
  return createBatch(
    createMistakesBlueprint,
    defaults,
    items,
  );
}