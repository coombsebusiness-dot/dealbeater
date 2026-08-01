import type {
  Evidence,
  EvidenceCollection,
} from "./Evidence";

declare module "./Evidence" {
  interface EvidenceCollection {
    principleCount: number;
    wisdomCount: number;
    mistakeCount: number;
    upgradeStrategyCount: number;
  }
}

import type {
  EvidenceAnalysis,
} from "./EvidenceAnalysis";

import type {
  BuyingPrinciple,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingPrinciple";

import type {
  BuyingWisdom,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingWisdom";

import type {
  BuyingMistake,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingMistake";

import type {
  UpgradeStrategy,
} from "@/app/components/lib/matching/knowledge/engines/common/UpgradeStrategy";

export interface EvidenceInput {
  facts?: Evidence[];

  strengths?: string[];

  weaknesses?: string[];

  warnings?: string[];

  principles?: BuyingPrinciple[];

  wisdom?: BuyingWisdom[];

  mistakes?: BuyingMistake[];

  upgradeStrategies?: UpgradeStrategy[];
}

export class EvidenceEngine {
  collect(
    input: EvidenceInput,
  ): EvidenceCollection {
    const items =
      this.removeDuplicates([
        ...(input.facts ?? []),

        ...this.createTextEvidence(
          input.strengths,
          "STRENGTH",
        ),

        ...this.createTextEvidence(
          input.weaknesses,
          "WEAKNESS",
        ),

        ...this.createTextEvidence(
          input.warnings,
          "WARNING",
        ),

        ...this.createPrincipleEvidence(
          input.principles,
        ),

        ...this.createWisdomEvidence(
          input.wisdom,
        ),

        ...this.createMistakeEvidence(
          input.mistakes,
        ),

        ...this.createUpgradeStrategyEvidence(
          input.upgradeStrategies,
        ),
      ]);

    return {
      items,

      totalCount:
        items.length,

      factCount:
        this.countByType(
          items,
          "FACT",
        ),

      strengthCount:
        this.countByType(
          items,
          "STRENGTH",
        ),

      weaknessCount:
        this.countByType(
          items,
          "WEAKNESS",
        ),

      warningCount:
        this.countByType(
          items,
          "WARNING",
        ),

      principleCount:
        this.countByType(
          items,
          "PRINCIPLE",
        ),

      wisdomCount:
        this.countByType(
          items,
          "WISDOM",
        ),

      mistakeCount:
        this.countByType(
          items,
          "MISTAKE",
        ),

      upgradeStrategyCount:
        this.countByType(
          items,
          "UPGRADE_STRATEGY",
        ),

      averageConfidence:
        this.calculateAverageConfidence(
          items,
        ),
    };
  }

  analyse(
    input: EvidenceInput,
  ): EvidenceAnalysis {
    const collection =
      this.collect(input);

    const strongestEvidence =
      [...collection.items]
        .sort(
          (first, second) =>
            second.confidence -
            first.confidence,
        )
        .slice(0, 5);

    const weakestEvidence =
      [...collection.items]
        .sort(
          (first, second) =>
            first.confidence -
            second.confidence,
        )
        .slice(0, 5);

    return {
      collection,

      strongestEvidence,

      weakestEvidence,

      confidence:
        collection.averageConfidence,
    };
  }

  private createTextEvidence(
    values: string[] | undefined,
    type:
      | "STRENGTH"
      | "WEAKNESS"
      | "WARNING",
  ): Evidence[] {
    return (values ?? []).map(
      (value, index) => ({
        id:
          `${type.toLowerCase()}-${index}-${this.createId(value)}`,

        category:
          "Product Intelligence",

        label:
          type,

        value,

        type,

        confidence: 80,
      }),
    );
  }

  private createPrincipleEvidence(
    principles:
      | BuyingPrinciple[]
      | undefined,
  ): Evidence[] {
    return (principles ?? []).map(
      (principle) => ({
        id:
          principle.id,

        category:
          "Buying Principle",

        label:
          principle.title,

        value:
          principle.principle,

        type:
          "PRINCIPLE",

        confidence:
          this.getImportanceConfidence(
            principle.importance,
          ),
      }),
    );
  }

  private createWisdomEvidence(
    wisdom:
      | BuyingWisdom[]
      | undefined,
  ): Evidence[] {
    return (wisdom ?? []).map(
      (item) => ({
        id:
          item.id,

        category:
          "Buying Wisdom",

        label:
          item.title,

        value:
          item.wisdom,

        type:
          "WISDOM",

        confidence:
          this.getImportanceConfidence(
            item.importance,
          ),
      }),
    );
  }

  private createMistakeEvidence(
    mistakes:
      | BuyingMistake[]
      | undefined,
  ): Evidence[] {
    return (mistakes ?? []).map(
      (mistake) => ({
        id:
          mistake.id,

        category:
          "Buying Mistake",

        label:
          mistake.title,

        value:
          `${mistake.mistake} ${mistake.consequence}`,

        type:
          "MISTAKE",

        confidence:
          this.getImportanceConfidence(
            mistake.importance,
          ),
      }),
    );
  }

  private createUpgradeStrategyEvidence(
    strategies:
      | UpgradeStrategy[]
      | undefined,
  ): Evidence[] {
    return (strategies ?? []).map(
      (strategy) => ({
        id:
          strategy.id,

        category:
          "Upgrade Strategy",

        label:
          strategy.title,

        value:
          strategy.strategy,

        type:
          "UPGRADE_STRATEGY",

        confidence:
          this.getImportanceConfidence(
            strategy.importance,
          ),
      }),
    );
  }

  private getImportanceConfidence(
    importance:
      | "low"
      | "medium"
      | "high"
      | "critical",
  ): number {
    switch (importance) {
      case "critical":
        return 100;

      case "high":
        return 90;

      case "medium":
        return 75;

      case "low":
      default:
        return 60;
    }
  }

  private removeDuplicates(
    evidence: Evidence[],
  ): Evidence[] {
    const seen =
      new Set<string>();

    return evidence.filter(
      (item) => {
        const key = [
          item.type,
          item.category,
          item.label,
          String(item.value),
        ].join("|");

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);

        return true;
      },
    );
  }

  private countByType(
    evidence: Evidence[],
    type: Evidence["type"],
  ): number {
    return evidence.filter(
      (item) =>
        item.type === type,
    ).length;
  }

  private calculateAverageConfidence(
    evidence: Evidence[],
  ): number {
    if (evidence.length === 0) {
      return 0;
    }

    return Math.round(
      evidence.reduce(
        (sum, item) =>
          sum + item.confidence,
        0,
      ) / evidence.length,
    );
  }

  private createId(
    value: string,
  ): string {
    return value
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      )
      .slice(
        0,
        60,
      );
  }
}