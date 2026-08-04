import type {
  GuideBlueprintCategory,
  GuideBlueprintStatus,
  GuideBlueprintType,
} from "@/knowledge/guides/blueprints";

export interface GuideCatalogueDefaults {
  category:
    GuideBlueprintCategory;

  audience?: string;

  recommendationTopic?: string;

  status?:
    GuideBlueprintStatus;

  priority?:
    1 | 2 | 3 | 4 | 5;
}

export interface GuideCatalogueItem {
  id?: string;

  slug?: string;

  title: string;

  topic: string;

  type:
    GuideBlueprintType;

  primaryKeyword: string;

  secondaryKeywords?: string[];

  audience?: string;

  recommendationTopic?: string;

  status?:
    GuideBlueprintStatus;

  priority?:
    1 | 2 | 3 | 4 | 5;
}

export interface GuideCatalogue {
  id: string;

  name: string;

  defaults:
    GuideCatalogueDefaults;

  items:
    GuideCatalogueItem[];
}