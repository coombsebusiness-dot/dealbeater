import {
  SuitabilityBrain,
} from "./suitability/SuitabilityBrain";
import {
  ValueBrain,
} from "./value/ValueBrain";

import type {
  ValueAdjustment,
} from "./value/ValueAdjustment";

import type {
  ValueAnalysis,
} from "./value/ValueAnalysis";

import type {
  ValueInput,
} from "./value/ValueInput";
import type {
  Evidence,
  EvidenceType,
} from "./evidence/Evidence";
import {
  SuitabilityAnalysis,
} from "./SuitabilityAnalysis";

import {
  SuitabilityInput,
} from "./SuitabilityInput";

import {
  EvidenceEngine,
} from "./evidence/EvidenceEngine";

export class BuyingBrain {
  private readonly suitabilityBrain =
    new SuitabilityBrain();

    private readonly evidenceEngine =
  new EvidenceEngine();

  private readonly valueBrain =
  new ValueBrain();

 analyseSuitability(
  input: SuitabilityInput,
): SuitabilityAnalysis {

    

  const evidence =
    this.evidenceEngine.analyse({
      strengths:
        input.strengths,

      weaknesses:
        input.weaknesses,

      warnings:
        input.warnings,

      principles:
        input.principles,

      wisdom:
        input.wisdom,

      mistakes:
        input.mistakes,

     

      upgradeStrategies:
        input.upgradeStrategies,
    });
    
   const warningPenalty =
  this.calculateEvidencePenalty(
    evidence.collection.items,
    "WARNING",
    4,
    20,
  );

const mistakePenalty =
  this.calculateEvidencePenalty(
    evidence.collection.items,
    "MISTAKE",
    3,
    15,
  );
     const strengthBonus =
  this.calculateEvidenceBonus(
    evidence.collection.items,
    "STRENGTH",
    2,
    10,
  );

const principleBonus =
  this.calculateEvidenceBonus(
    evidence.collection.items,
    "PRINCIPLE",
    1.5,
    8,
  );

const adjustedScore =
  Math.max(
    0,
    Math.min(
      100,
      input.score +
        strengthBonus +
        principleBonus -
        warningPenalty -
        mistakePenalty,
    ),
  );

  const confidence =
  input.confidence > 0
    ? Math.round(
        (
          input.confidence +
          evidence.confidence
        ) / 2,
      )
    : evidence.confidence;

 return this.suitabilityBrain.analyse({
  ...input,
  score: adjustedScore,
  confidence,
});
}

analyseValue(
  input: ValueInput,
): ValueAnalysis {
  const evidence =
    this.evidenceEngine.analyse({
      strengths:
        input.strengths,

      weaknesses:
        input.weaknesses,

      warnings:
        input.warnings,

      principles:
        input.principles,

      wisdom:
        input.wisdom,

      mistakes:
        input.mistakes,
    });

  const confidence =
    input.confidence > 0
      ? Math.round(
          (
            input.confidence +
            evidence.confidence
          ) / 2,
        )
      : evidence.confidence;

      const warningPenalty =
  this.calculateEvidencePenalty(
    evidence.collection.items,
    "WARNING",
    3,
    15,
  );

const mistakePenalty =
  this.calculateEvidencePenalty(
    evidence.collection.items,
    "MISTAKE",
    2,
    10,
  );

const strengthBonus =
  this.calculateEvidenceBonus(
    evidence.collection.items,
    "STRENGTH",
    1.5,
    8,
  );

const principleBonus =
  this.calculateEvidenceBonus(
    evidence.collection.items,
    "PRINCIPLE",
    1,
    5,
  );

  const adjustedProductScore =
  Math.max(
    0,
    Math.min(
      100,
      input.productScore +
        strengthBonus +
        principleBonus -
        warningPenalty -
        mistakePenalty,
    ),
    
  );
  const adjustment: ValueAdjustment = {
  originalProductScore:
    input.productScore,

  adjustedProductScore,

  strengthBonus,

  principleBonus,

  warningPenalty,

  mistakePenalty,
};

 return this.valueBrain.analyse({
  ...input,

  productScore:
    adjustedProductScore,

  confidence,

  adjustment,
});
}
private calculateEvidencePenalty(
  items: Evidence[],
  type: EvidenceType,
  pointsPerItem: number,
  maximumPenalty: number,
): number {
  const penalty =
    items
      .filter(
        (item) =>
          item.type === type,
      )
      .reduce(
        (total, item) =>
          total +
          pointsPerItem *
            (
              Math.max(
                0,
                Math.min(
                  100,
                  item.confidence,
                ),
              ) / 100
            ),
        0,
      );

  return Math.min(
    maximumPenalty,
    Math.round(penalty),
  );
}
private calculateEvidenceBonus(
  items: Evidence[],
  type: EvidenceType,
  pointsPerItem: number,
  maximumBonus: number,
): number {
  const bonus =
    items
      .filter(
        (item) =>
          item.type === type,
      )
      .reduce(
        (total, item) =>
          total +
          pointsPerItem *
            (
              Math.max(
                0,
                Math.min(
                  100,
                  item.confidence,
                ),
              ) / 100
            ),
        0,
      );

  return Math.min(
    maximumBonus,
    Math.round(bonus),
  );
}

}