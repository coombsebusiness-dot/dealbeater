export type ReasoningVerdict =
  | "EXCELLENT_FIT"
  | "GOOD_FIT"
  | "MIXED_FIT"
  | "LIMITED_FIT"
  | "POOR_FIT"
  | "UNKNOWN";

export interface ReasoningPoint {
  category: string;

  title: string;

  description: string;

  score?: number;

  confidence?: number;

  evidenceLabels?: string[];
}

export interface WorkloadReasoning {
  workload: string;

  score: number;

  confidence: number;

  verdict: ReasoningVerdict;

  summary: string;

  strengths: ReasoningPoint[];

  tradeOffs: ReasoningPoint[];

  concerns: ReasoningPoint[];
}

export interface ReasoningIntelligence {
  overallScore: number;

  confidence: number;

  verdict: ReasoningVerdict;

  summary: string;

  suitableFor: string[];

  notIdealFor: string[];

  bestFeatures: ReasoningPoint[];

  tradeOffs: ReasoningPoint[];

  concerns: ReasoningPoint[];

  workloads: WorkloadReasoning[];
}