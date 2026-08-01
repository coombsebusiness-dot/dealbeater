import type {
  ValueAnalysis,
  ValueGrade,
} from "./ValueAnalysis";

import type {
  ValueAdjustment,
} from "./ValueAdjustment";

import type {
  ValueInput,
} from "./ValueInput";

export class ValueBrain {
  analyse(
    input: ValueInput,
  ): ValueAnalysis {
    const currentPrice =
      this.normalisePrice(
        input.currentPrice,
      );

    const productScore =
      this.normaliseScore(
        input.productScore,
      );

    const confidence =
      this.normaliseScore(
        input.confidence,
      );

    const score =
      this.calculateValueScore(
        currentPrice,
        input.fairPrice,
        input.lowestVerifiedPrice,
        productScore,
      );

    const grade =
      this.calculateGrade(score);

    const goodValue =
      score >= 70;

   return {
  score,

  confidence,

  grade,

  goodValue,

  summary:
    this.createSummary(
      grade,
    ),

  reasons:
    this.createReasons(
      input,
      currentPrice,
    ),

  concerns:
    this.createConcerns(
      input,
      currentPrice,
    ),

  adjustment:
    input.adjustment ??
    this.createDefaultAdjustment(
      productScore,
    ),
};
  }

  private calculateValueScore(
    currentPrice: number,
    fairPrice: number | undefined,
    lowestVerifiedPrice:
      | number
      | undefined,
    productScore: number,
  ): number {
    let priceScore = 50;

    const safeFairPrice =
      this.normaliseOptionalPrice(
        fairPrice,
      );

    const safeLowestPrice =
      this.normaliseOptionalPrice(
        lowestVerifiedPrice,
      );

    if (
      safeFairPrice !== undefined &&
      safeFairPrice > 0
    ) {
      const fairPriceRatio =
        currentPrice /
        safeFairPrice;

      if (fairPriceRatio <= 0.8) {
        priceScore = 100;
      } else if (
        fairPriceRatio <= 0.9
      ) {
        priceScore = 90;
      } else if (
        fairPriceRatio <= 1
      ) {
        priceScore = 80;
      } else if (
        fairPriceRatio <= 1.1
      ) {
        priceScore = 65;
      } else if (
        fairPriceRatio <= 1.2
      ) {
        priceScore = 45;
      } else {
        priceScore = 25;
      }
    }

    if (
      safeLowestPrice !== undefined &&
      safeLowestPrice > 0
    ) {
      const lowestPriceRatio =
        currentPrice /
        safeLowestPrice;

      if (lowestPriceRatio <= 1.03) {
        priceScore += 8;
      } else if (
        lowestPriceRatio >= 1.2
      ) {
        priceScore -= 10;
      }
    }

    return this.normaliseScore(
      priceScore * 0.65 +
      productScore * 0.35,
    );
  }

  private calculateGrade(
    score: number,
  ): ValueGrade {
    if (score >= 90) {
      return "EXCEPTIONAL";
    }

    if (score >= 75) {
      return "GOOD";
    }

    if (score >= 55) {
      return "FAIR";
    }

    if (score > 0) {
      return "POOR";
    }

    return "UNKNOWN";
  }

  private createSummary(
    grade: ValueGrade,
  ): string {
    switch (grade) {
      case "EXCEPTIONAL":
        return "This product appears to offer exceptional value.";

      case "GOOD":
        return "This product appears to offer good value.";

      case "FAIR":
        return "This product appears fairly priced for what it offers.";

      case "POOR":
        return "This product appears to offer poor value at the current price.";

      case "UNKNOWN":
      default:
        return "There is not enough reliable pricing information to judge value.";
    }
  }

  private createReasons(
    input: ValueInput,
    currentPrice: number,
  ): string[] {
    const reasons: string[] = [];

    const fairPrice =
      this.normaliseOptionalPrice(
        input.fairPrice,
      );

    const lowestPrice =
      this.normaliseOptionalPrice(
        input.lowestVerifiedPrice,
      );

    if (
      fairPrice !== undefined &&
      currentPrice <= fairPrice
    ) {
      reasons.push(
        "The current price is at or below the estimated fair price.",
      );
    }

    if (
      lowestPrice !== undefined &&
      currentPrice <=
        lowestPrice * 1.03
    ) {
      reasons.push(
        "The current price is close to the lowest verified price.",
      );
    }

    if (
      input.productScore >= 80
    ) {
      reasons.push(
        "The product offers strong overall capability for the money.",
      );
    }

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
    input: ValueInput,
    currentPrice: number,
  ): string[] {
    const concerns: string[] = [];

    const fairPrice =
      this.normaliseOptionalPrice(
        input.fairPrice,
      );

    const lowestPrice =
      this.normaliseOptionalPrice(
        input.lowestVerifiedPrice,
      );

    if (
      fairPrice !== undefined &&
      currentPrice >
        fairPrice * 1.1
    ) {
      concerns.push(
        "The current price is above the estimated fair price.",
      );
    }

    if (
      lowestPrice !== undefined &&
      currentPrice >
        lowestPrice * 1.2
    ) {
      concerns.push(
        "The current price is significantly above the lowest verified price.",
      );
    }

    if (
      input.productScore < 60
    ) {
      concerns.push(
        "The product's overall capability may not justify the asking price.",
      );
    }

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

  private normalisePrice(
    price: number,
  ): number {
    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      return 0;
    }

    return price;
  }

  private normaliseOptionalPrice(
    price: number | undefined,
  ): number | undefined {
    if (
      price === undefined ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return undefined;
    }

    return price;
  }
  private createDefaultAdjustment(
  productScore: number,
): ValueAdjustment {
  return {
    originalProductScore:
      productScore,

    adjustedProductScore:
      productScore,

    strengthBonus: 0,

    principleBonus: 0,

    warningPenalty: 0,

    mistakePenalty: 0,
  };
}
}