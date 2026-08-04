import type {
  KnowledgeContext,
} from "../../knowledge/KnowledgeContext";

import type {
  EditorialGoal,
} from "../EditorialGoal";

import type {
  EditorialTechnique,
} from "./EditorialTechnique";

export class BuildConfidence
  implements EditorialTechnique {
  readonly id =
    "build-confidence";

  write(
    context: KnowledgeContext,
    goal: EditorialGoal,
  ): string {
    const audience =
      goal.audience.trim();

    const topic =
      context.topic
        .trim()
        .toLowerCase();

    if (audience) {
      return `You do not need to understand every technical term before making a sensible choice. For ${audience.toLowerCase()}, a clear shortlist based on real use, total cost and the available lens system is far more useful than trying to compare every specification.`;
    }

    return `You do not need to master every technical detail before comparing ${topic}. Start with intended use, total cost and the compromises you are genuinely willing to accept.`;
  }
}