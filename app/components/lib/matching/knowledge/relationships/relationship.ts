export type BrainRelationshipType =
  | "made-by"
  | "powered-by"
  | "better-than"
  | "alternative-to"
  | "compatible-with"
  | "accessory-for"
  | "upgrade-from"
  | "successor-of"
  | "recommended-for";

export interface BrainRelationship {
  id: string;

  from: string;

  to: string;

  type: BrainRelationshipType;

  confidence: number;

  reason?: string;
}