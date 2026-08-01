export type EvidenceType =
  | "FACT"
  | "STRENGTH"
  | "WEAKNESS"
  | "WARNING"
  | "PRINCIPLE"
  | "WISDOM"
  | "MISTAKE"
  | "UPGRADE_STRATEGY";

export interface Evidence {
  id: string;

  category: string;

  label: string;

  value: string | number | boolean;

  type: EvidenceType;

  confidence: number;

  description?: string;

  source?: string;

  tags?: string[];
}
export interface EvidenceCollection {
  items: Evidence[];

  totalCount: number;

  factCount: number;

  strengthCount: number;

  weaknessCount: number;

  warningCount: number;

  averageConfidence: number;

  principleCount: number;

wisdomCount: number;

mistakeCount: number;

upgradeStrategyCount: number;
}