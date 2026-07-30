import type {
  BrainKnowledgeResponse,
} from "../knowledge/brain";
import type { BrainRelationship } from "../knowledge/relationships/relationship";

export type ReasoningSignalType =
  | "knowledge-found"
  | "relationship-found"
  | "high-confidence"
  | "limited-knowledge"
  | "missing-product"
  | "missing-brand";

export type ReasoningSignalImpact =
  | "positive"
  | "neutral"
  | "negative";

export interface ReasoningSignal {
  id: string;
  type: ReasoningSignalType;
  impact: ReasoningSignalImpact;
  confidence: number;
  message: string;
  relationship?: BrainRelationship;
}

export interface ReasoningResult {
  signals: ReasoningSignal[];
  confidence: number;
  hasEnoughKnowledge: boolean;
}

export function reason(
  brain: BrainKnowledgeResponse
): ReasoningResult {
  const signals: ReasoningSignal[] = [];

  const productEntity = brain.graph.entities.find(
    (entity) => entity.type === "product"
  );

  const brandEntity = brain.graph.entities.find(
    (entity) => entity.type === "brand"
  );

  if (productEntity) {
    signals.push({
      id: `${productEntity.id}>knowledge-found`,
      type: "knowledge-found",
      impact: "positive",
      confidence: 100,
      message: `Product knowledge was found for ${productEntity.name}.`,
    });
  } else {
    signals.push({
      id: "product>missing",
      type: "missing-product",
      impact: "negative",
      confidence: 100,
      message:
        "The product could not be identified with enough confidence.",
    });
  }

  if (brandEntity) {
    signals.push({
      id: `${brandEntity.id}>brand-found`,
      type: "knowledge-found",
      impact: "positive",
      confidence: 100,
      message: `The product brand was identified as ${brandEntity.name}.`,
    });
  } else {
    signals.push({
      id: "brand>missing",
      type: "missing-brand",
      impact: "negative",
      confidence: 100,
      message:
        "The product brand could not be identified.",
    });
  }

  for (const relationship of brain.graph.relationships) {
    signals.push(
      createRelationshipSignal(relationship)
    );
  }

  if (brain.chip) {
    signals.push({
      id: `${brain.chip.id}>chip-knowledge`,
      type: "knowledge-found",
      impact: "positive",
      confidence: 100,
      message: `Verified chip knowledge was found for ${brain.chip.displayName}.`,
    });
  }

  const confidence = calculateReasoningConfidence(
    signals
  );

  const hasEnoughKnowledge =
    Boolean(productEntity) &&
    confidence >= 60;

  if (!hasEnoughKnowledge) {
    signals.push({
      id: "brain>limited-knowledge",
      type: "limited-knowledge",
      impact: "negative",
      confidence: 100,
      message:
        "Blinlx does not yet have enough verified knowledge to make a strong recommendation.",
    });
  }

  return {
    signals,
    confidence,
    hasEnoughKnowledge,
  };
}

function createRelationshipSignal(
  relationship: BrainRelationship
): ReasoningSignal {
  return {
    id: `${relationship.id}>reasoning`,
    type: "relationship-found",
    impact: getRelationshipImpact(
      relationship.type
    ),
    confidence: relationship.confidence,
    message:
      relationship.reason ??
      `A ${relationship.type} relationship was found between ${relationship.from} and ${relationship.to}.`,
    relationship,
  };
}

function getRelationshipImpact(
  type: BrainRelationship["type"]
): ReasoningSignalImpact {
  switch (type) {
    case "made-by":
    case "powered-by":
    case "compatible-with":
    case "successor-of":
    case "recommended-for":
      return "positive";

    case "better-than":
    case "alternative-to":
    case "accessory-for":
    case "upgrade-from":
      return "neutral";

    default:
      return "neutral";
  }
}

function calculateReasoningConfidence(
  signals: ReasoningSignal[]
): number {
  if (signals.length === 0) {
    return 0;
  }

  const confidenceTotal = signals.reduce(
    (total, signal) =>
      total + signal.confidence,
    0
  );

  return Math.round(
    confidenceTotal / signals.length
  );
}