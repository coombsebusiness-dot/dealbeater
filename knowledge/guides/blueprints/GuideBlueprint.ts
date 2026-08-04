export type GuideBlueprintCategory =
  | "Photography"
  | "Laptops"
  | "Phones"
  | "TVs";

export type GuideBlueprintType =
  | "BUYING_GUIDE"
  | "COMPARISON"
  | "BEST_FOR"
  | "EXPLAINER"
  | "BUDGET_GUIDE"
  | "MISTAKES";

export type GuideBlueprintStatus =
  | "PLANNED"
  | "DRAFT"
  | "REVIEW"
  | "READY"
  | "PUBLISHED";

export interface GuideBlueprint {
  id: string;

  slug: string;

  title: string;

  category:
    GuideBlueprintCategory;

  topic: string;

  type:
    GuideBlueprintType;

  primaryKeyword: string;

  secondaryKeywords?: string[];

  audience?: string;

  searchIntent:
    | "INFORMATIONAL"
    | "COMMERCIAL"
    | "COMPARISON";

  recommendationTopic?: string;

  status:
    GuideBlueprintStatus;

  priority:
    1 | 2 | 3 | 4 | 5;
}