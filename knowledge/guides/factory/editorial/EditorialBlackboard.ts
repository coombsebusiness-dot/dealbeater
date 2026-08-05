import {
  EditorialMemory,
} from "./memory";

import type {
  EditorialKnowledgeKind,
} from "./memory";

import type {
  EditorialContext,
  EditorialCoverageItem,
  EditorialExample,
  EditorialNote,
  EditorialRecommendationReference,
} from "./EditorialContext";

export class EditorialBlackboard<
  TBlueprint = unknown,
  TContentPlan = unknown,
  TSection = unknown,
  TKnowledge = unknown,
> {
  private readonly context: EditorialContext<
    TBlueprint,
    TContentPlan,
    TSection,
    TKnowledge
  >;

  private readonly memory:
    EditorialMemory;

  constructor(
    context: EditorialContext<
      TBlueprint,
      TContentPlan,
      TSection,
      TKnowledge
    >,
    memory =
      new EditorialMemory(),
  ) {
    this.context =
      context;

    this.memory =
      memory;
  }

  getContext(): EditorialContext<
    TBlueprint,
    TContentPlan,
    TSection,
    TKnowledge
  > {
    return this.context;
  }

  getMemory():
    EditorialMemory {
    return this.memory;
  }

  getWrittenSections():
    TSection[] {
    return [
      ...this.context
        .writtenSections,
    ];
  }

  addWrittenSection(
    section: TSection,
  ): void {
    this.context
      .writtenSections
      .push(
        section,
      );
  }

  setCoverage(
    coverage:
      EditorialCoverageItem[],
  ): void {
    this.context.coverage =
      coverage.map(
        (item) => ({
          ...item,

          notes:
            item.notes
              ? [
                  ...item.notes,
                ]
              : undefined,
        }),
      );
  }

  getCoverage():
    EditorialCoverageItem[] {
    return this.context
      .coverage
      .map(
        (item) => ({
          ...item,

          notes:
            item.notes
              ? [
                  ...item.notes,
                ]
              : undefined,
        }),
      );
  }

  getPendingCoverage():
    EditorialCoverageItem[] {
    return this.context
      .coverage
      .filter(
        (item) =>
          item.status ===
            "PENDING" ||
          item.status ===
            "ASSIGNED",
      );
  }

  getCoverageForSection(
    sectionId: string,
  ): EditorialCoverageItem[] {
    return this.context
      .coverage
      .filter(
        (item) =>
          item.assignedSectionId ===
          sectionId,
      );
  }

  hasCovered(
    topicOrId: string,
  ): boolean {
    const normalizedValue =
      normalizeValue(
        topicOrId,
      );

    const coveredByCoverage =
      this.context
        .coverage
        .some(
          (item) =>
            item.status ===
              "COVERED" &&
            (
              normalizeValue(
                item.id,
              ) ===
                normalizedValue ||
              normalizeValue(
                item.topic,
              ) ===
                normalizedValue
            ),
        );

    if (coveredByCoverage) {
      return true;
    }

    return this.memory
      .hasCoveredTitle(
        topicOrId,
      );
  }

  assignCoverage(
    coverageId: string,
    sectionId: string,
  ): boolean {
    const item =
      this.findCoverageItem(
        coverageId,
      );

    if (!item) {
      return false;
    }

    if (
      item.status ===
        "COVERED" ||
      item.status ===
        "SKIPPED"
    ) {
      return false;
    }

    item.status =
      "ASSIGNED";

    item.assignedSectionId =
      sectionId;

    return true;
  }

  markCoverageCovered(
    coverageId: string,
    sectionId: string,
    detail?: string,
  ): boolean {
    const item =
      this.findCoverageItem(
        coverageId,
      );

    if (!item) {
      return false;
    }

    item.status =
      "COVERED";

    item.coveredBySectionId =
      sectionId;

    if (
      !item.assignedSectionId
    ) {
      item.assignedSectionId =
        sectionId;
    }

    this.memory.remember({
      key:
        `coverage:${item.id}`,

      kind:
        "IDEA",

      title:
        item.topic,

      sectionId,

      detail:
        detail?.trim() ||
        item.description,
    });

    return true;
  }

  skipCoverage(
    coverageId: string,
    note?: string,
  ): boolean {
    const item =
      this.findCoverageItem(
        coverageId,
      );

    if (!item) {
      return false;
    }

    item.status =
      "SKIPPED";

    if (note?.trim()) {
      item.notes = [
        ...(item.notes ?? []),

        note.trim(),
      ];
    }

    return true;
  }

  rememberKnowledge({
    kind,
    title,
    sectionId,
    detail,
  }: {
    kind:
      EditorialKnowledgeKind;

    title: string;

    sectionId: string;

    detail?: string;
  }): void {
    this.memory.remember({
      kind,

      title,

      sectionId,

      detail,
    });
  }

  hasUsedKnowledge(
    kind:
      EditorialKnowledgeKind,
    title: string,
  ): boolean {
    return this.memory.hasCovered(
      kind,
      title,
    );
  }

  hasUsedTitle(
    title: string,
  ): boolean {
    return this.memory
      .hasCoveredTitle(
        title,
      );
  }

  addExample(
    example:
      EditorialExample,
  ): void {
    const exists =
      this.context
        .examplesUsed
        .some(
          (
            existingExample,
          ) =>
            existingExample.id ===
            example.id,
        );

    if (!exists) {
      this.context
        .examplesUsed
        .push({
          ...example,
        });
    }

    this.memory.remember({
      key:
        `example:${example.id}`,

      kind:
        "IDEA",

      title:
        example.description,

      sectionId:
        example.sectionId,

      detail:
        example.productId
          ? `Product: ${example.productId}`
          : undefined,
    });
  }

  hasUsedExample(
    exampleId: string,
  ): boolean {
    return this.context
      .examplesUsed
      .some(
        (example) =>
          example.id ===
          exampleId,
      );
  }

  getExamplesUsed():
    EditorialExample[] {
    return this.context
      .examplesUsed
      .map(
        (example) => ({
          ...example,
        }),
      );
  }

  addRecommendation(
    recommendation:
      EditorialRecommendationReference,
  ): void {
    const exists =
      this.context
        .recommendationsUsed
        .some(
          (
            existingRecommendation,
          ) =>
            existingRecommendation.id ===
              recommendation.id ||
            (
              existingRecommendation
                .productId ===
                recommendation.productId &&
              existingRecommendation
                .sectionId ===
                recommendation.sectionId
            ),
        );

    if (!exists) {
      this.context
        .recommendationsUsed
        .push({
          ...recommendation,
        });
    }

    this.memory.remember({
      key:
        `recommendation:${recommendation.productId}`,

      kind:
        "RECOMMENDATION",

      title:
        recommendation.productId,

      sectionId:
        recommendation.sectionId,

      detail:
        recommendation.reason,
    });
  }

  hasUsedRecommendation(
    productId: string,
  ): boolean {
    return this.memory
      .hasCovered(
        "RECOMMENDATION",
        productId,
      );
  }

  getRecommendationsUsed():
    EditorialRecommendationReference[] {
    return this.context
      .recommendationsUsed
      .map(
        (recommendation) => ({
          ...recommendation,
        }),
      );
  }

  addNote(
    note: EditorialNote,
  ): void {
    this.context
      .editorialNotes
      .push({
        ...note,
      });
  }

  getNotes():
    EditorialNote[] {
    return this.context
      .editorialNotes
      .map(
        (note) => ({
          ...note,
        }),
      );
  }

  private findCoverageItem(
    coverageId: string,
  ):
    | EditorialCoverageItem
    | undefined {
    return this.context
      .coverage
      .find(
        (item) =>
          item.id ===
          coverageId,
      );
  }
}

function normalizeValue(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      " ",
    );
}