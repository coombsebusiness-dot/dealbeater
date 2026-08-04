import type {
  KnowledgeContext,
} from "../../knowledge/KnowledgeContext";

import type {
  EditorialGoal,
} from "../EditorialGoal";

import type {
  EditorialTechnique,
} from "./EditorialTechnique";

export class OpenWithEmpathy
  implements EditorialTechnique {

  readonly id =
    "open-with-empathy";

  write(
    context: KnowledgeContext,
    _goal: EditorialGoal,
  ): string {

    return `Buying ${context.topic.toLowerCase()} can feel confusing because there is so much conflicting advice and marketing. The good news is that making the right decision is usually much simpler once you understand which features genuinely matter and which ones rarely make a meaningful difference.`;

  }

}