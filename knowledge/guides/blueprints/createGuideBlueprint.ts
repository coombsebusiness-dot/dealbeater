import type {
  GuideBlueprint,
  GuideBlueprintCategory,
  GuideBlueprintStatus,
  GuideBlueprintType,
} from "./GuideBlueprint";

interface BaseBlueprintInput {
  id?: string;

  slug?: string;

  title: string;

  category:
    GuideBlueprintCategory;

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

interface CreateBlueprintInput
  extends BaseBlueprintInput {
  type:
    GuideBlueprintType;

  searchIntent:
    GuideBlueprint["searchIntent"];
}

function createSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/£/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createBlueprintId(
  category: GuideBlueprintCategory,
  slug: string,
): string {
  return [
    createSlug(category),
    slug,
  ].join("-");
}

export function createGuideBlueprint(
  input: CreateBlueprintInput,
): GuideBlueprint {
  const slug =
    input.slug?.trim() ||
    createSlug(input.title);

  return {
    id:
      input.id?.trim() ||
      createBlueprintId(
        input.category,
        slug,
      ),

    slug,

    title:
      input.title.trim(),

    category:
      input.category,

    topic:
      input.topic.trim(),

    type:
      input.type,

    primaryKeyword:
      input.primaryKeyword
        .trim()
        .toLowerCase(),

    secondaryKeywords: Array.from(
      new Set(
        (
          input.secondaryKeywords ??
          []
        )
          .map((keyword) =>
            keyword
              .trim()
              .toLowerCase(),
          )
          .filter(Boolean),
      ),
    ),

    audience:
      input.audience?.trim(),

    searchIntent:
      input.searchIntent,

    recommendationTopic:
      input.recommendationTopic
        ?.trim(),

    status:
      input.status ??
      "PLANNED",

    priority:
      input.priority ?? 3,
  };
}

export function createBuyingGuideBlueprint(
  input: BaseBlueprintInput,
): GuideBlueprint {
  return createGuideBlueprint({
    ...input,

    type:
      "BUYING_GUIDE",

    searchIntent:
      "COMMERCIAL",
  });
}

export function createComparisonBlueprint(
  input: BaseBlueprintInput,
): GuideBlueprint {
  return createGuideBlueprint({
    ...input,

    type:
      "COMPARISON",

    searchIntent:
      "COMPARISON",
  });
}

export function createBestForBlueprint(
  input: BaseBlueprintInput,
): GuideBlueprint {
  return createGuideBlueprint({
    ...input,

    type:
      "BEST_FOR",

    searchIntent:
      "COMMERCIAL",
  });
}

export function createExplainerBlueprint(
  input: BaseBlueprintInput,
): GuideBlueprint {
  return createGuideBlueprint({
    ...input,

    type:
      "EXPLAINER",

    searchIntent:
      "INFORMATIONAL",
  });
}

export function createBudgetGuideBlueprint(
  input: BaseBlueprintInput,
): GuideBlueprint {
  return createGuideBlueprint({
    ...input,

    type:
      "BUDGET_GUIDE",

    searchIntent:
      "COMMERCIAL",
  });
}

export function createMistakesBlueprint(
  input: BaseBlueprintInput,
): GuideBlueprint {
  return createGuideBlueprint({
    ...input,

    type:
      "MISTAKES",

    searchIntent:
      "INFORMATIONAL",
  });
}