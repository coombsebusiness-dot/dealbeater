import type {
  KnowledgeContext,
} from "../../knowledge/KnowledgeContext";

import type {
  EditorialGoal,
} from "../EditorialGoal";

import type {
  EditorialTechnique,
} from "./EditorialTechnique";

export class ExplainConcept
  implements EditorialTechnique {

  readonly id =
    "explain-concept";

  write(
    context: KnowledgeContext,
    _goal: EditorialGoal,
  ): string {

    return `Rather than concentrating on long specification lists, start by thinking about how you'll actually use ${context.topic.toLowerCase()}. Matching the product to your needs nearly always produces a better buying decision than chasing the highest specifications.`;

  }

}