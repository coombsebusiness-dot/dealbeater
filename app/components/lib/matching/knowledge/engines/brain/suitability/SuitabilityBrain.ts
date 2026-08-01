import {
  SuitabilityAnalysis,
} from "../SuitabilityAnalysis";

import type {
  SuitabilityGrade,
} from "../SuitabilityGrade";

import {
  SuitabilityInput,
} from "../SuitabilityInput";

import type {
  SuitabilityAdjustment,
} from "../SuitabilityAdjustment";

export class SuitabilityBrain {
  analyse(
    input: SuitabilityInput,
  ): SuitabilityAnalysis {
    const score =
      this.normaliseScore(
        input.score,
      );

    const confidence =
      this.normaliseScore(
        input.confidence,
      );

    const threshold =
      this.getSuitabilityThreshold(
        input.threshold,
      );

    const suitable =
      score >= threshold;

      const grade =
  this.calculateGrade(score);

    return {
      score,

      confidence,

      threshold,

      suitable,

      grade,

      summary:
  this.createSummary(
    suitable,
    score,
    input.adjustment,
  ),

      reasons:
        this.createReasons(input),

      concerns:
        this.createConcerns(input),

        adjustment:
  input.adjustment ??
  this.createDefaultAdjustment(score),
    };
  }

  private getSuitabilityThreshold(
    threshold?: number,
  ): number {
    if (
      threshold === undefined ||
      !Number.isFinite(threshold)
    ) {
      return 70;
    }

    return this.normaliseScore(
      threshold,
    );
  }

  private createSummary(
  suitable: boolean,
  score: number,
  adjustment?: SuitabilityAdjustment,
): string {
  const originalScore =
    adjustment?.originalScore ?? score;

  const changed =
    originalScore !== score;

  const adjustmentText =
    changed
      ? ` The evidence adjusted the suitability score from ${originalScore} to ${score}.`
      : "";

  if (score >= 90) {
    return (
      "This product appears exceptionally suitable." +
      adjustmentText
    );
  }

  if (score >= 80) {
    return (
      "This product appears highly suitable." +
      adjustmentText
    );
  }

  if (suitable) {
    return (
      "This product appears suitable." +
      adjustmentText
    );
  }

  if (score >= 50) {
    return (
      "This product has mixed suitability and may involve important trade-offs." +
      adjustmentText
    );
  }

  return (
    "This product may not be suitable." +
    adjustmentText
  );
}

  private createReasons(
    input: SuitabilityInput,
  ): string[] {
    const reasons: string[] = [];

    input.principles?.forEach(
      (principle) => {
        reasons.push(
          principle.principle,
        );
      },
    );

    input.wisdom?.forEach(
      (wisdom) => {
        reasons.push(
          wisdom.wisdom,
        );
      },
    );

    input.strengths?.forEach(
      (strength) => {
        reasons.push(strength);
      },
    );

    return Array.from(
      new Set(reasons),
    );
  }

  private createConcerns(
    input: SuitabilityInput,
  ): string[] {
    const concerns: string[] = [];

    input.mistakes?.forEach(
      (mistake) => {
        concerns.push(
          `${mistake.mistake} ${mistake.consequence}`,
        );
      },
    );

    input.weaknesses?.forEach(
      (weakness) => {
        concerns.push(weakness);
      },
    );

    input.warnings?.forEach(
      (warning) => {
        concerns.push(warning);
      },
    );

    return Array.from(
      new Set(concerns),
    );
  }

  private normaliseScore(
    score: number,
  ): number {
    if (!Number.isFinite(score)) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(
        100,
        Math.round(score),
      ),
    );
  }
  private createDefaultAdjustment(
  score: number,
): SuitabilityAdjustment {
  return {
    originalScore: score,

    adjustedScore: score,

    strengthBonus: 0,

    principleBonus: 0,

    warningPenalty: 0,

    mistakePenalty: 0,
  };
}
private calculateGrade(
  score: number,
): SuitabilityGrade {
  if (score >= 90) {
    return "EXCEPTIONAL";
  }

  if (score >= 80) {
    return "HIGH";
  }

  if (score >= 70) {
    return "SUITABLE";
  }

  if (score >= 50) {
    return "MIXED";
  }

  return "POOR";
}
}