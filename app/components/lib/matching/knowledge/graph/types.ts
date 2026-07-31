import type { KnowledgeEntityType } from "../types";
import type { KnowledgeRelationshipType } from "./relationships";

export type KnowledgeNodeMetadataValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | number[];

export interface KnowledgeNode {
  id: string;
  name: string;
  type: KnowledgeEntityType;

  aliases?: string[];
  description?: string;

  metadata?: Record<string, KnowledgeNodeMetadataValue>;
}

export interface KnowledgeEdge {
  id: string;

  from: string;
  to: string;

  relationship: KnowledgeRelationshipType;

  confidence?: number;
  reason?: string;
  source?: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export interface KnowledgeGraphNeighbour {
  node: KnowledgeNode;
  edge: KnowledgeEdge;
  direction: "outgoing" | "incoming";
}

export interface KnowledgeGraphPath {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}