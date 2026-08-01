import {
  IntelligenceEvidence,
} from "../common/IntelligenceEvidence";

export type ThermalCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface ThermalCapability {
  score: number;
  level: ThermalCapabilityLevel;
  confidence: number;
  explanation: string;
}

export interface ThermalScores {
  overall: number;
  cooling: number;
  sustainedPerformance: number;
  noise: number;
  surfaceTemperatures: number;
  gaming: number;
  creativeWork: number;
  softwareDevelopment: number;
  aiWorkloads: number;
  longevity: number;
}

export interface ThermalCapabilities {
  everydayUse: ThermalCapability;
  sustainedWorkloads: ThermalCapability;
  gaming: ThermalCapability;
  creativeWork: ThermalCapability;
  softwareDevelopment: ThermalCapability;
  aiWorkloads: ThermalCapability;
}

export interface ThermalIntelligence {
  component: "thermal";

  name: string;

  confidence: number;

  scores: ThermalScores;

  capabilities: ThermalCapabilities;

  strengths: string[];

  weaknesses: string[];

  warnings: string[];

  evidence: IntelligenceEvidence[];
}