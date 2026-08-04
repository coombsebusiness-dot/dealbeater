import type {
  KnowledgeContext,
  KnowledgeFact,
} from "../knowledge/KnowledgeContext";

import type {
  ExplainedKnowledge,
} from "./explainer";

import type {
  EditorialGoal,
} from "./EditorialGoal";

export interface ComposeIntroductionInput {
  context:
    KnowledgeContext;

  goal:
    EditorialGoal;

  opening:
    string;

  concept:
    string;

  confidence:
    string;

  selectedFacts:
    KnowledgeFact[];

  selectedTradeOffs:
    KnowledgeFact[];

  explainedFacts:
    ExplainedKnowledge[];
}

export interface ComposedIntroduction {
  introduction:
    string;

  paragraphs:
    string[];

  takeaway:
    string;

  knowledgeUsed:
    string[];
}

interface KnowledgeParagraphResult {
  value:
    string | null;

  knowledgeUsed:
    string[];
}

function normaliseForComparison(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/g, "");
}

function removeDuplicateParagraphs(
  values: string[],
): string[] {
  const seen =
    new Set<string>();

  return values.filter(
    (value) => {
      const normalised =
        normaliseForComparison(
          value,
        );

      if (
        !normalised ||
        seen.has(normalised)
      ) {
        return false;
      }

      seen.add(normalised);

      return true;
    },
  );
}

function createKnowledgeParagraph(
  selectedFacts:
    KnowledgeFact[],
  selectedTradeOffs:
    KnowledgeFact[],
  explainedFacts:
    ExplainedKnowledge[],
): KnowledgeParagraphResult {
  const primaryFact =
    selectedFacts[0] ??
    null;

  const primaryTradeOff =
    selectedTradeOffs[0] ??
    null;

  const explainedFact =
    primaryFact
      ? explainedFacts.find(
          (item) =>
            item.title ===
            primaryFact.title,
        ) ?? null
      : null;

  if (
    !primaryFact &&
    !primaryTradeOff
  ) {
    return {
      value:
        null,

      knowledgeUsed:
        [],
    };
  }

  if (
    explainedFact &&
    primaryTradeOff
  ) {
    return {
      value: [
        explainedFact.paragraph,
        primaryTradeOff
          .explanation,
      ].join(" "),

      knowledgeUsed: [
        explainedFact.title,
        primaryTradeOff.title,
      ],
    };
  }

  if (explainedFact) {
    return {
      value:
        explainedFact.paragraph,

      knowledgeUsed: [
        explainedFact.title,
      ],
    };
  }

  if (primaryTradeOff) {
    return {
      value:
        primaryTradeOff
          .explanation,

      knowledgeUsed: [
        primaryTradeOff.title,
      ],
    };
  }

  return {
    value:
      primaryFact
        ?.explanation ??
      null,

    knowledgeUsed:
      primaryFact
        ? [primaryFact.title]
        : [],
  };
}

function createTakeaway(
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
    return `For ${audience.toLowerCase()}, the aim is not to find the camera with the longest specification list. It is to find the option that fits how it will actually be used and leaves room in the budget for the rest of the setup.`;
  }

  return `The aim is to understand what genuinely matters when comparing ${topic}, then remove anything that charges more without solving a real buying need.`;
}

export function composeIntroduction({
  context,
  goal,
  opening,
  concept,
  confidence,
  selectedFacts,
  selectedTradeOffs,
  explainedFacts,
}: ComposeIntroductionInput):
  ComposedIntroduction {
  const knowledgeParagraph =
    createKnowledgeParagraph(
      selectedFacts,
      selectedTradeOffs,
      explainedFacts,
    );

  const takeaway =
    createTakeaway(
      context,
      goal,
    );

  const paragraphs =
    removeDuplicateParagraphs([
      concept,

      ...(knowledgeParagraph.value
        ? [
            knowledgeParagraph.value,
          ]
        : []),

      confidence,

      takeaway,
    ]).filter(
      (paragraph) =>
        normaliseForComparison(
          paragraph,
        ) !==
        normaliseForComparison(
          opening,
        ),
    );

  return {
    introduction:
      opening,

    paragraphs,

    takeaway,

    knowledgeUsed:
      knowledgeParagraph
        .knowledgeUsed,
  };
}