import type { KnowledgeRelationshipType } from "./relationships";
import type { KnowledgeEdge, KnowledgeNode } from "./types";

function createSafeGraphId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createKnowledgeNode(
  node: KnowledgeNode,
): KnowledgeNode {
  return node;
}

export interface CreateKnowledgeEdgeInput {
  from: string;
  to: string;
  relationship: KnowledgeRelationshipType;

  id?: string;
  confidence?: number;
  reason?: string;
  source?: string;
}

export function createKnowledgeEdge(
  input: CreateKnowledgeEdgeInput,
): KnowledgeEdge {
  const generatedId = [
    createSafeGraphId(input.from),
    createSafeGraphId(input.relationship),
    createSafeGraphId(input.to),
  ].join("__");

  return {
    id: input.id ?? generatedId,
    from: input.from,
    to: input.to,
    relationship: input.relationship,
    confidence: input.confidence,
    reason: input.reason,
    source: input.source,
  };
}