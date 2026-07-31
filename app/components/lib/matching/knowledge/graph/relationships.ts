/**
 * Describes how two knowledge nodes are connected.
 *
 * Keep these relationships generic so the same graph can support
 * laptops, processors, cameras, software, workloads and future categories.
 */
export type KnowledgeRelationshipType =
  | "contains"
  | "manufacturedBy"
  | "belongsToCategory"

  | "supports"
  | "runs"
  | "uses"
  | "requires"
  | "provides"

  | "recommendedFor"
  | "suitableFor"
  | "compatibleWith"

  | "benefitsFrom"

  | "alternativeTo"
  | "successorTo"
  | "predecessorTo"
  | "partOf"

  // Negative reasoning

  | "notRecommendedFor"
  | "notCompatibleWith"

  | "limitedFor"
  | "bottleneckFor"

  // Trade-offs

  | "betterThan"
  | "worseThan"

  // Performance

  | "fasterThan"
  | "slowerThan"

  // Price

  | "betterValueThan"
  | "moreExpensiveThan";