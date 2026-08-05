export const RECOMMENDATION_CATEGORIES = [
  "BEST_OVERALL",
  "BEST_BEGINNER",
  "BEST_VALUE",
  "BEST_BUDGET",
  "BEST_PRIME",
  "BEST_ZOOM",
  "BEST_USED",
  "BEST_UPGRADE",
  "BEST_TRAVEL",
  "BEST_STREET",
  "BEST_PORTRAIT",
  "BEST_WILDLIFE",
  "BEST_SPORTS",
  "BEST_VIDEO",
  "SPECIALIST",
  "ALTERNATIVE",
] as const;

export type RecommendationCategory =
  typeof RECOMMENDATION_CATEGORIES[number];

export const RECOMMENDATION_CATEGORY_LABELS:
  Record<
    RecommendationCategory,
    string
  > = {
  BEST_OVERALL:
    "Best Overall",

  BEST_BEGINNER:
    "Best for Beginners",

  BEST_VALUE:
    "Best Value",

  BEST_BUDGET:
    "Best Budget Choice",

  BEST_PRIME:
    "Best Prime",

  BEST_ZOOM:
    "Best Zoom",

  BEST_USED:
    "Best Used Choice",

  BEST_UPGRADE:
    "Best Upgrade",

  BEST_TRAVEL:
    "Best for Travel",

  BEST_STREET:
    "Best for Street Photography",

  BEST_PORTRAIT:
    "Best for Portraits",

  BEST_WILDLIFE:
    "Best for Wildlife",

  BEST_SPORTS:
    "Best for Sports",

  BEST_VIDEO:
    "Best for Video",

  SPECIALIST:
    "Specialist Choice",

  ALTERNATIVE:
    "Alternative Choice",
};

export function isRecommendationCategory(
  value:
    string,
): value is RecommendationCategory {
  return (
    RECOMMENDATION_CATEGORIES as
      readonly string[]
  ).includes(
    value,
  );
}

export function getRecommendationCategoryLabel(
  category:
    RecommendationCategory,
): string {
  return RECOMMENDATION_CATEGORY_LABELS[
    category
  ];
}