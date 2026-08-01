import type {
  Evidence,
  EvidenceCollection,
} from "./Evidence";

export interface EvidenceAnalysis {
  collection: EvidenceCollection;

  strongestEvidence: Evidence[];

  weakestEvidence: Evidence[];

  confidence: number;
}