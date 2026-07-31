import type { KnowledgeRelationshipType } from "../graph/relationships";

export const relationshipWeights: Record<
  KnowledgeRelationshipType,
  number
> = {
  contains: 0,

  manufacturedBy: 0,

  belongsToCategory: 0,

  supports: 3,

  runs: 3,

  uses: 2,

  requires: 2,

  provides: 2,

  suitableFor: 5,

  recommendedFor: 5,

  compatibleWith: 4,

  benefitsFrom: 2,

  alternativeTo: 0,

  successorTo: 1,

  predecessorTo: -1,

  partOf: 0,

  // Negative

  notRecommendedFor: -5,

  notCompatibleWith: -5,

  limitedFor: -3,

  bottleneckFor: -4,

  // Comparison

  betterThan: 2,

  worseThan: -2,

  fasterThan: 2,

  slowerThan: -2,

  betterValueThan: 3,

  moreExpensiveThan: -2,
};