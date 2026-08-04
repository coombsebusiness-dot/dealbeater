import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  createBestForBlueprint,
  createBudgetGuideBlueprint,
  createBuyingGuideBlueprint,
  createComparisonBlueprint,
  createExplainerBlueprint,
  createMistakesBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  GuideCatalogue,
  GuideCatalogueItem,
} from "./GuideCatalogue";

function createBlueprintFromItem(
  catalogue: GuideCatalogue,
  item: GuideCatalogueItem,
): GuideBlueprint {
  const sharedInput = {
    id:
      item.id,

    slug:
      item.slug,

    title:
      item.title,

    category:
      catalogue.defaults.category,

    topic:
      item.topic,

    primaryKeyword:
      item.primaryKeyword,

    secondaryKeywords:
      item.secondaryKeywords,

    audience:
      item.audience ??
      catalogue.defaults.audience,

    recommendationTopic:
      item.recommendationTopic ??
      catalogue.defaults
        .recommendationTopic,

    status:
      item.status ??
      catalogue.defaults.status,

    priority:
      item.priority ??
      catalogue.defaults.priority,
  };

  switch (item.type) {
    case "BUYING_GUIDE":
      return createBuyingGuideBlueprint(
        sharedInput,
      );

    case "COMPARISON":
      return createComparisonBlueprint(
        sharedInput,
      );

    case "BEST_FOR":
      return createBestForBlueprint(
        sharedInput,
      );

    case "EXPLAINER":
      return createExplainerBlueprint(
        sharedInput,
      );

    case "BUDGET_GUIDE":
      return createBudgetGuideBlueprint(
        sharedInput,
      );

    case "MISTAKES":
      return createMistakesBlueprint(
        sharedInput,
      );
  }
}

export function createBlueprintsFromCatalogue(
  catalogue: GuideCatalogue,
): GuideBlueprint[] {
  const seenSlugs =
    new Set<string>();

  const blueprints =
    catalogue.items.map(
      (item) =>
        createBlueprintFromItem(
          catalogue,
          item,
        ),
    );

  blueprints.forEach(
    (blueprint) => {
      if (
        seenSlugs.has(
          blueprint.slug,
        )
      ) {
        throw new Error(
          `Duplicate slug in catalogue "${catalogue.id}": "${blueprint.slug}".`,
        );
      }

      seenSlugs.add(
        blueprint.slug,
      );
    },
  );

  return blueprints;
}