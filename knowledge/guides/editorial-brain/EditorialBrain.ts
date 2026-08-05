import {
  EvidenceEngine,
} from "./EvidenceEngine";

import {
  ParagraphComposer,
} from "./ParagraphComposer";

import {
  QualityEngine,
} from "./QualityEngine";

import {
  QuestionEngine,
} from "./QuestionEngine";

import type {
  EditorialBrainInput,
  EditorialParagraph,
  EditorialSectionResult,
} from "./EditorialTypes";

function createIntroduction(
  paragraphs:
    EditorialParagraph[],
): string {
  const opening =
    paragraphs.find(
      (paragraph) =>
        paragraph.role ===
        "OPENING",
    );

  return (
    opening?.text ??
    paragraphs[0]?.text ??
    ""
  ).trim();
}

function createBodyParagraphs(
  paragraphs:
    EditorialParagraph[],
): EditorialParagraph[] {
  const openingIndex =
    paragraphs.findIndex(
      (paragraph) =>
        paragraph.role ===
        "OPENING",
    );

  if (
    openingIndex === -1
  ) {
    return paragraphs;
  }

  return paragraphs.filter(
    (
      _paragraph,
      index,
    ) =>
      index !== openingIndex,
  );
}

function createTakeaway(
  paragraphs:
    EditorialParagraph[],
): string {
  const preferred =
    [
      "VERDICT",
      "NEXT_STEP",
      "RECOMMENDATION",
    ] as const;

  for (
    const role of preferred
  ) {
    const matchingParagraph =
      [...paragraphs]
        .reverse()
        .find(
          (paragraph) =>
            paragraph.role ===
            role,
        );

    if (
      matchingParagraph
    ) {
      return matchingParagraph
        .text
        .trim();
    }
  }

  return (
    paragraphs.at(
      -1,
    )?.text ??
    ""
  ).trim();
}

function getKnowledgeUsed(
  paragraphs:
    EditorialParagraph[],
): string[] {
  return Array.from(
    new Set(
      paragraphs.flatMap(
        (paragraph) =>
          paragraph.knowledgeUsed,
      ),
    ),
  );
}

function calculateConfidence(
  evidenceConfidence:
    number[],
): number {
  if (
    evidenceConfidence.length ===
    0
  ) {
    return 0.4;
  }

  const total =
    evidenceConfidence.reduce(
      (
        sum,
        confidence,
      ) =>
        sum + confidence,
      0,
    );

  return Math.max(
    0,
    Math.min(
      1,
      total /
        evidenceConfidence.length,
    ),
  );
}

export class EditorialBrain {
  private readonly questions =
    new QuestionEngine();

  private readonly evidence =
    new EvidenceEngine();

  private readonly composer =
    new ParagraphComposer();

  private readonly quality =
    new QualityEngine();

  writeSection({
    blueprint,
    knowledge,
    sectionKind,
    heading,
  }: EditorialBrainInput):
    EditorialSectionResult {
    const question =
      this.questions.resolve(
        blueprint,
        sectionKind,
      );

    const evidence =
      this.evidence.select(
        knowledge,
        sectionKind,
      );

    const composedParagraphs =
      this.composer.compose({
        blueprint,
        sectionKind,
        question,
        evidence,
      });

    const introduction =
      createIntroduction(
        composedParagraphs,
      );

    const paragraphs =
      createBodyParagraphs(
        composedParagraphs,
      );

    const takeaway =
      createTakeaway(
        paragraphs,
      );

    const quality =
      this.quality.inspect({
        sectionKind,
        introduction,
        paragraphs,
        takeaway,
        evidence,
      });

    const evidenceConfidence = [
      ...evidence.facts.map(
        (item) =>
          item.confidence,
      ),

      ...evidence.tradeOffs.map(
        (item) =>
          item.confidence,
      ),

      ...evidence.warnings.map(
        (item) =>
          item.confidence,
      ),

      ...evidence.products.map(
        (product) =>
          product.confidence,
      ),
    ];

    return {
      sectionKind,

      heading,

      introduction,

      paragraphs,

      takeaway,

      knowledgeUsed:
        getKnowledgeUsed(
          composedParagraphs,
        ),

      confidence:
        calculateConfidence(
          evidenceConfidence,
        ),

      publishable:
        quality.publishable,

      qualityIssues:
        quality.issues,
    };
  }
}