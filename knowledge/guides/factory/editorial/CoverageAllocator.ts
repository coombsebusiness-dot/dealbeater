import type {
  EditorialCoverageItem,
} from "./EditorialContext";

export interface CoverageSection {
  id: string;

  heading?: string;
}

export interface CoverageAllocationInput {
  coverage: EditorialCoverageItem[];

  sections: CoverageSection[];
}

export interface CoverageAllocationResult {
  coverage: EditorialCoverageItem[];

  unassignedCoverage: EditorialCoverageItem[];
}

export class CoverageAllocator {
  allocate({
    coverage,
    sections,
  }: CoverageAllocationInput): CoverageAllocationResult {
    const availableSectionIds =
      new Set(
        sections.map(
          (section) => section.id,
        ),
      );

    const allocatedCoverage:
  EditorialCoverageItem[] =
    coverage.map(
      (
        item,
      ): EditorialCoverageItem => {
        const preferredSectionId =
          item.assignedSectionId;

        if (
          preferredSectionId &&
          availableSectionIds.has(
            preferredSectionId,
          )
        ) {
          return {
            ...item,

            status:
              item.status === "COVERED" ||
              item.status === "SKIPPED"
                ? item.status
                : "ASSIGNED",
          };
        }

        const fallbackSectionId =
          this.findFallbackSection(
            item,
            sections,
          );

        if (!fallbackSectionId) {
          return {
            ...item,

            assignedSectionId:
              undefined,

            status:
              item.status === "COVERED" ||
              item.status === "SKIPPED"
                ? item.status
                : "PENDING",
          };
        }

        return {
          ...item,

          assignedSectionId:
            fallbackSectionId,

          status:
            item.status === "COVERED" ||
            item.status === "SKIPPED"
              ? item.status
              : "ASSIGNED",
        };
      });

    return {
      coverage:
        allocatedCoverage,

      unassignedCoverage:
        allocatedCoverage.filter(
          (item) =>
            !item.assignedSectionId,
        ),
    };
  }

  private findFallbackSection(
    item: EditorialCoverageItem,
    sections: CoverageSection[],
  ): string | undefined {
    const preferredSectionIds =
      this.getPreferredSectionIds(
        item.id,
      );

    const preferredMatch =
      preferredSectionIds.find(
        (sectionId) =>
          sections.some(
            (section) =>
              section.id ===
              sectionId,
          ),
      );

    if (preferredMatch) {
      return preferredMatch;
    }

    const keywordMatch =
      this.findKeywordMatch(
        item,
        sections,
      );

    if (keywordMatch) {
      return keywordMatch;
    }

    return sections[0]?.id;
  }

  private getPreferredSectionIds(
    coverageId: string,
  ): string[] {
    const map:
      Record<string, string[]> = {
        "buying-problem": [
          "introduction",
        ],

        need: [
          "do-you-need-it",
          "introduction",
        ],

        "ideal-user": [
          "who-is-it-for",
        ],

        "poor-fit": [
          "who-is-it-for",
          "alternatives",
        ],

        "essential-features": [
          "what-to-look-for",
        ],

        compatibility: [
          "what-to-look-for",
          "before-you-buy",
        ],

        "trade-offs": [
          "what-to-look-for",
          "budget",
        ],

        budget: [
          "budget",
        ],

        "ownership-cost": [
          "budget",
          "before-you-buy",
        ],

        "common-mistakes": [
          "common-mistakes",
        ],

        recommendations: [
          "recommendations",
        ],

        alternatives: [
          "alternatives",
        ],

        "used-buying": [
          "alternatives",
          "before-you-buy",
        ],

        "final-checklist": [
          "before-you-buy",
        ],

        verdict: [
          "final-verdict",
        ],

        "category-context": [
          "introduction",
          "what-to-look-for",
        ],
      };

    return map[coverageId] ?? [];
  }

  private findKeywordMatch(
    item: EditorialCoverageItem,
    sections: CoverageSection[],
  ): string | undefined {
    const coverageText =
      normalizeText(
        [
          item.id,
          item.topic,
          item.description,
        ]
          .filter(Boolean)
          .join(" "),
      );

    let bestMatch:
      | {
          sectionId: string;

          score: number;
        }
      | undefined;

    sections.forEach((section) => {
      const sectionText =
        normalizeText(
          [
            section.id,
            section.heading,
          ]
            .filter(Boolean)
            .join(" "),
        );

      const score =
        calculateOverlapScore(
          coverageText,
          sectionText,
        );

      if (
        score > 0 &&
        (!bestMatch ||
          score > bestMatch.score)
      ) {
        bestMatch = {
          sectionId:
            section.id,

          score,
        };
      }
    });

    return bestMatch?.sectionId;
  }
}

function normalizeText(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");
}

function calculateOverlapScore(
  left: string,
  right: string,
): number {
  const leftWords =
    new Set(
      left
        .split(" ")
        .filter(
          (word) =>
            word.length > 2,
        ),
    );

  const rightWords =
    new Set(
      right
        .split(" ")
        .filter(
          (word) =>
            word.length > 2,
        ),
    );

  let score = 0;

  leftWords.forEach((word) => {
    if (rightWords.has(word)) {
      score += 1;
    }
  });

  return score;
}