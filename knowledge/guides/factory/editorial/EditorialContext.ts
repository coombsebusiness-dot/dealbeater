export type EditorialCoverageStatus =
  | "PENDING"
  | "ASSIGNED"
  | "COVERED"
  | "SKIPPED";

export interface EditorialCoverageItem {
  id: string;

  topic: string;

  description?: string;

  status: EditorialCoverageStatus;

  assignedSectionId?: string;

  coveredBySectionId?: string;

  importance?: number;

  notes?: string[];
}

export interface EditorialExample {
  id: string;

  description: string;

  sectionId: string;

  productId?: string;
}

export interface EditorialRecommendationReference {
  id: string;

  productId: string;

  sectionId: string;

  reason?: string;
}

export interface EditorialNote {
  id: string;

  message: string;

  sectionId?: string;

  severity?:
    | "INFO"
    | "WARNING"
    | "ERROR";
}

export interface EditorialContext<
  TBlueprint = unknown,
  TContentPlan = unknown,
  TSection = unknown,
  TKnowledge = unknown,
> {
  blueprint: TBlueprint;

  contentPlan: TContentPlan;

  knowledge: TKnowledge;

  writtenSections: TSection[];

  coverage: EditorialCoverageItem[];

  examplesUsed: EditorialExample[];

  recommendationsUsed:
    EditorialRecommendationReference[];

  editorialNotes: EditorialNote[];
}

export function createEditorialContext<
  TBlueprint,
  TContentPlan,
  TSection,
  TKnowledge,
>({
  blueprint,
  contentPlan,
  knowledge,
}: {
  blueprint: TBlueprint;

  contentPlan: TContentPlan;

  knowledge: TKnowledge;
}): EditorialContext<
  TBlueprint,
  TContentPlan,
  TSection,
  TKnowledge
> {
  return {
    blueprint,

    contentPlan,

    knowledge,

    writtenSections: [],

    coverage: [],

    examplesUsed: [],

    recommendationsUsed: [],

    editorialNotes: [],
  };
}