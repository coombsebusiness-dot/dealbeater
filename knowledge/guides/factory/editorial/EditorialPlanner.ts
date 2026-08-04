import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  GeneratedSectionBlueprint,
} from "@/knowledge/guides/factory/content";

export interface EditorialPlan {
  readerQuestion: string;

  objective: string;

  openingGoal: string;

  keyPoints: string[];

  tradeOffs: string[];

  finishWith: string;

  tone: string;

  avoid: string[];
}

export interface EditorialPlanningInput {
  blueprint: GuideBlueprint;

  section: GeneratedSectionBlueprint;
}

function createReaderQuestion(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string {
  switch (section.id) {
    case "introduction":
      return `Is ${blueprint.topic.toLowerCase()} worth buying and what should I realistically expect?`;

    case "recommendations":
      return "Which option should I actually buy?";

    case "mistakes":
      return "What expensive mistakes do people make?";

    case "new-vs-used":
      return "Would buying used actually be the smarter decision?";

    case "best-value":
      return "Where is my money best spent?";

    default:
      return `What should I know about ${blueprint.topic.toLowerCase()}?`;
  }
}

function createObjective(
  section: GeneratedSectionBlueprint,
): string {
  return section.purpose;
}

function createOpeningGoal(
  section: GeneratedSectionBlueprint,
): string {
  switch (section.id) {
    case "introduction":
      return "Reassure the reader and simplify the decision.";

    case "mistakes":
      return "Highlight a common buying error immediately.";

    case "recommendations":
      return "Explain how recommendations are chosen before naming products.";

    default:
      return "Start with the reader's problem rather than product specifications.";
  }
}

export function createEditorialPlan({
  blueprint,
  section,
}: EditorialPlanningInput): EditorialPlan {
  return {
    readerQuestion:
      createReaderQuestion(
        blueprint,
        section,
      ),

    objective:
      createObjective(
        section,
      ),

    openingGoal:
      createOpeningGoal(
        section,
      ),

    keyPoints: [
      "Teach first.",
      "Explain why.",
      "Use practical examples.",
      "Avoid unnecessary jargon.",
      "Help the reader make a confident decision.",
    ],

    tradeOffs: [
      "Explain what the buyer gains.",
      "Explain what the buyer gives up.",
      "Say when spending more is worthwhile.",
      "Say when spending more is unnecessary.",
    ],

    finishWith:
      "Leave the reader knowing exactly what to do next.",

    tone:
      "Experienced, honest, calm and conversational.",

    avoid: [
      "Marketing language",
      "Corporate wording",
      "Over-selling",
      "Unverified claims",
      "Spec-sheet dumping",
    ],
  };
}