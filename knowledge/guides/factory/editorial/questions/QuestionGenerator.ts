import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

export type GeneratedQuestionIntent =
  | "BEST"
  | "VALUE"
  | "BUDGET"
  | "USED"
  | "FEATURES"
  | "MISTAKES";

export interface GeneratedQuestion {
  id:
    string;

  question:
    string;

  intent:
    GeneratedQuestionIntent;
}

function cleanTopic(
  value: string,
): string {
  return value
    .trim()
    .replace(
      /\s+/g,
      " ",
    );
}

function lowerFirstCharacter(
  value: string,
): string {
  const cleaned =
    cleanTopic(
      value,
    );

  if (!cleaned) {
    return "";
  }

  return [
    cleaned
      .charAt(0)
      .toLowerCase(),

    cleaned.slice(
      1,
    ),
  ].join("");
}

function createQuestionId(
  intent:
    GeneratedQuestionIntent,
): string {
  return `faq-${intent.toLowerCase()}`;
}

function createBudgetQuestion(
  topic: string,
): string {
  const budgetMatch =
    topic.match(
      /under\s+£[\d,]+/i,
    );

  if (budgetMatch) {
    return `Is ${budgetMatch[0].replace(
      /^under/i,
      "",
    ).trim()} enough for a good ${topic
      .replace(
        budgetMatch[0],
        "",
      )
      .trim()
      .replace(
        /\s+/g,
        " ",
      )}?`;
  }

  return `How much should I spend on ${lowerFirstCharacter(
    topic,
  )}?`;
}

function createBestQuestion(
  topic: string,
): string {
  return `What's the best ${lowerFirstCharacter(
    topic,
  )}?`;
}

function createValueQuestion(
  topic: string,
): string {
  return `Which ${lowerFirstCharacter(
    topic,
  )} offers the best value?`;
}

function createUsedQuestion(
  topic: string,
): string {
  return `Is it better to buy ${lowerFirstCharacter(
    topic,
  )} new or used?`;
}

function createFeaturesQuestion(
  topic: string,
): string {
  return `Which features matter most when buying ${lowerFirstCharacter(
    topic,
  )}?`;
}

function createMistakesQuestion(
  topic: string,
): string {
  return `What mistakes should I avoid when buying ${lowerFirstCharacter(
    topic,
  )}?`;
}

function removeDuplicateQuestions(
  questions:
    GeneratedQuestion[],
): GeneratedQuestion[] {
  const seen =
    new Set<string>();

  return questions.filter(
    (question) => {
      const normalised =
        question.question
          .trim()
          .toLowerCase()
          .replace(
            /\s+/g,
            " ",
          );

      if (
        seen.has(
          normalised,
        )
      ) {
        return false;
      }

      seen.add(
        normalised,
      );

      return true;
    },
  );
}

function createBudgetGuideQuestions(
  topic: string,
): GeneratedQuestion[] {
  return [
    {
      id:
        createQuestionId(
          "BEST",
        ),

      question:
        createBestQuestion(
          topic,
        ),

      intent:
        "BEST",
    },

    {
      id:
        createQuestionId(
          "BUDGET",
        ),

      question:
        createBudgetQuestion(
          topic,
        ),

      intent:
        "BUDGET",
    },

    {
      id:
        createQuestionId(
          "VALUE",
        ),

      question:
        createValueQuestion(
          topic,
        ),

      intent:
        "VALUE",
    },

    {
      id:
        createQuestionId(
          "USED",
        ),

      question:
        createUsedQuestion(
          topic,
        ),

      intent:
        "USED",
    },

    {
      id:
        createQuestionId(
          "FEATURES",
        ),

      question:
        createFeaturesQuestion(
          topic,
        ),

      intent:
        "FEATURES",
    },

    {
      id:
        createQuestionId(
          "MISTAKES",
        ),

      question:
        createMistakesQuestion(
          topic,
        ),

      intent:
        "MISTAKES",
    },
  ];
}

function createDefaultQuestions(
  topic: string,
): GeneratedQuestion[] {
  return [
    {
      id:
        createQuestionId(
          "BEST",
        ),

      question:
        createBestQuestion(
          topic,
        ),

      intent:
        "BEST",
    },

    {
      id:
        createQuestionId(
          "VALUE",
        ),

      question:
        createValueQuestion(
          topic,
        ),

      intent:
        "VALUE",
    },

    {
      id:
        createQuestionId(
          "FEATURES",
        ),

      question:
        createFeaturesQuestion(
          topic,
        ),

      intent:
        "FEATURES",
    },

    {
      id:
        createQuestionId(
          "MISTAKES",
        ),

      question:
        createMistakesQuestion(
          topic,
        ),

      intent:
        "MISTAKES",
    },
  ];
}

export function generateQuestions(
  blueprint:
    GuideBlueprint,

  knowledge:
    KnowledgeContext,
): GeneratedQuestion[] {
  const topic =
    cleanTopic(
      knowledge.topic ||
      blueprint.topic,
    );

  const questions =
    blueprint.type ===
    "BUDGET_GUIDE"
      ? createBudgetGuideQuestions(
          topic,
        )
      : createDefaultQuestions(
          topic,
        );

  return removeDuplicateQuestions(
    questions,
  );
}