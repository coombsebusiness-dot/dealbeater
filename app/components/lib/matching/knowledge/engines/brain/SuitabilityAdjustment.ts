export interface SuitabilityAdjustment {
  originalScore: number;

  adjustedScore: number;

  strengthBonus: number;

  principleBonus: number;

  warningPenalty: number;

  mistakePenalty: number;
}