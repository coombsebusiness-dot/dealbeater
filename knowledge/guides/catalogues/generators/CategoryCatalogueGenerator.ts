import type {
  GuideBlueprintCategory,
} from "@/knowledge/guides/blueprints";

import type {
  GuideCatalogueItem,
} from "../GuideCatalogue";

export interface CategoryTopicSeed {
  id: string;

  label: string;

  topic: string;

  productLabel: string;

  audience: string;

  recommendationTopic?: string;

  budgetAmount?: number;

  comparisonLabel?: string;

  comparisonTopic?: string;

  comparisonKeyword?: string;

  secondaryKeywords?: string[];

  priority?: 1 | 2 | 3 | 4 | 5;
}

export interface GenerateCategoryCatalogueInput {
  category:
    GuideBlueprintCategory;

  seeds:
    CategoryTopicSeed[];

  defaultPriority?:
    1 | 2 | 3 | 4 | 5;
}

function normaliseKeyword(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}

function createSecondaryKeywords(
  seed: CategoryTopicSeed,
  extras: string[],
): string[] {
  return Array.from(
    new Set(
      [
        ...(
          seed.secondaryKeywords ??
          []
        ),
        ...extras,
      ]
        .map(normaliseKeyword)
        .filter(Boolean),
    ),
  );
}

function createBuyingGuideItem(
  seed: CategoryTopicSeed,
  priority: 1 | 2 | 3 | 4 | 5,
): GuideCatalogueItem {
  return {
    id:
      `${seed.id}-buying-guide`,

    title:
      `The Complete ${seed.label} Buying Guide`,

    topic:
      seed.topic,

    type:
      "BUYING_GUIDE",

    primaryKeyword:
      `${seed.topic} buying guide`,

    secondaryKeywords:
      createSecondaryKeywords(
        seed,
        [
          `${seed.productLabel} buying advice`,
          `how to choose ${seed.productLabel}`,
          `${seed.productLabel} for beginners`,
        ],
      ),

    audience:
      seed.audience,

    recommendationTopic:
      seed.recommendationTopic,

    priority,
  };
}

function createBestForItem(
  seed: CategoryTopicSeed,
  priority: 1 | 2 | 3 | 4 | 5,
): GuideCatalogueItem {
  return {
    id:
      `${seed.id}-best-for-beginners`,

    title:
      `Best ${seed.productLabel} for Beginners`,

    topic:
      `${seed.topic} for beginners`,

    type:
      "BEST_FOR",

    primaryKeyword:
      `best ${seed.productLabel.toLowerCase()} for beginners`,

    secondaryKeywords:
      createSecondaryKeywords(
        seed,
        [
          `beginner ${seed.productLabel}`,
          `best starter ${seed.productLabel}`,
          `easy ${seed.productLabel} for beginners`,
        ],
      ),

    audience:
      seed.audience,

    recommendationTopic:
      seed.recommendationTopic,

    priority,
  };
}

function createBudgetItem(
  seed: CategoryTopicSeed,
  priority: 1 | 2 | 3 | 4 | 5,
): GuideCatalogueItem {
  const budgetAmount =
    seed.budgetAmount ??
    500;

  return {
    id:
      `${seed.id}-budget-${budgetAmount}`,

    title:
      `Best ${seed.productLabel} Under £${budgetAmount.toLocaleString(
        "en-GB",
      )}`,

    topic:
      `${seed.topic} under £${budgetAmount}`,

    type:
      "BUDGET_GUIDE",

    primaryKeyword:
      `best ${seed.productLabel.toLowerCase()} under £${budgetAmount}`,

    secondaryKeywords:
      createSecondaryKeywords(
        seed,
        [
          `budget ${seed.productLabel}`,
          `affordable ${seed.productLabel}`,
          `${seed.productLabel} under £${budgetAmount}`,
        ],
      ),

    audience:
      seed.audience,

    recommendationTopic:
      seed.recommendationTopic,

    priority,
  };
}

function createUsedBuyingGuideItem(
  seed: CategoryTopicSeed,
  priority: 1 | 2 | 3 | 4 | 5,
): GuideCatalogueItem {
  return {
    id:
      `${seed.id}-used-buying-guide`,

    title:
      `The Complete Guide to Buying Used ${seed.productLabel}`,

    topic:
      `Used ${seed.topic}`,

    type:
      "BUYING_GUIDE",

    primaryKeyword:
      `buying used ${seed.productLabel.toLowerCase()}`,

    secondaryKeywords:
      createSecondaryKeywords(
        seed,
        [
          `used ${seed.productLabel} checklist`,
          `second-hand ${seed.productLabel}`,
          `how to inspect used ${seed.productLabel}`,
        ],
      ),

    audience:
      seed.audience,

    recommendationTopic:
      seed.recommendationTopic,

    priority,
  };
}

function createMistakesItem(
  seed: CategoryTopicSeed,
  priority: 1 | 2 | 3 | 4 | 5,
): GuideCatalogueItem {
  return {
    id:
      `${seed.id}-buying-mistakes`,

    title:
      `The Biggest ${seed.label} Buying Mistakes`,

    topic:
      `${seed.topic} buying mistakes`,

    type:
      "MISTAKES",

    primaryKeyword:
      `${seed.topic} buying mistakes`,

    secondaryKeywords:
      createSecondaryKeywords(
        seed,
        [
          `${seed.productLabel} mistakes`,
          `what to avoid when buying ${seed.productLabel}`,
          `common ${seed.productLabel} buying errors`,
        ],
      ),

    audience:
      seed.audience,

    recommendationTopic:
      seed.recommendationTopic,

    priority,
  };
}

function createComparisonItem(
  seed: CategoryTopicSeed,
  priority: 1 | 2 | 3 | 4 | 5,
): GuideCatalogueItem {
  const comparisonLabel =
    seed.comparisonLabel ??
    `${seed.label}: Budget vs Premium`;

  const comparisonTopic =
    seed.comparisonTopic ??
    `${seed.topic} budget vs premium`;

  const comparisonKeyword =
    seed.comparisonKeyword ??
    `budget vs premium ${seed.productLabel.toLowerCase()}`;

  return {
    id:
      `${seed.id}-comparison`,

    title:
      comparisonLabel,

    topic:
      comparisonTopic,

    type:
      "COMPARISON",

    primaryKeyword:
      comparisonKeyword,

    secondaryKeywords:
      createSecondaryKeywords(
        seed,
        [
          `${seed.productLabel} comparison`,
          `cheap vs expensive ${seed.productLabel}`,
          `which ${seed.productLabel} should I buy`,
        ],
      ),

    audience:
      seed.audience,

    recommendationTopic:
      seed.recommendationTopic,

    priority,
  };
}

export function generateCategoryCatalogueItems(
  input: GenerateCategoryCatalogueInput,
): GuideCatalogueItem[] {
  const items:
    GuideCatalogueItem[] = [];

  input.seeds.forEach(
    (seed) => {
      const priority =
        seed.priority ??
        input.defaultPriority ??
        3;

      items.push(
        createBuyingGuideItem(
          seed,
          priority,
        ),

        createBestForItem(
          seed,
          priority,
        ),

        createBudgetItem(
          seed,
          priority,
        ),

        createUsedBuyingGuideItem(
          seed,
          priority,
        ),

        createMistakesItem(
          seed,
          priority,
        ),

        createComparisonItem(
          seed,
          priority,
        ),
      );
    },
  );

  const seenIds =
    new Set<string>();

  items.forEach(
    (item) => {
      if (!item.id) {
        return;
      }

      if (
        seenIds.has(item.id)
      ) {
        throw new Error(
          `Duplicate generated catalogue item ID: "${item.id}".`,
        );
      }

      seenIds.add(item.id);
    },
  );

  return items;
}