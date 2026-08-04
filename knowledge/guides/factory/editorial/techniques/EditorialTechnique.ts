import type {
  KnowledgeContext,
} from "../../knowledge/KnowledgeContext";

import type {
  EditorialGoal,
} from "../EditorialGoal";

export interface EditorialTechnique {
  readonly id: string;

  write(
    context: KnowledgeContext,
    goal: EditorialGoal,
  ): string;
}