export type CpuCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface CpuCapability {
  score: number;
  level: CpuCapabilityLevel;
  explanation: string;
}

export interface CpuIntelligenceScores {
  overall: number;

  singleCore: number;
  multiCore: number;
  efficiency: number;
  creativeWork: number;
  softwareDevelopment: number;
  aiWorkloads: number;
  longevity: number;
}

export interface CpuIntelligence {
  processorId?: string;
  processorName: string;

  confidence: number;

  scores: CpuIntelligenceScores;

  capabilities: {
    everydayUse: CpuCapability;
    officeWork: CpuCapability;
    photoEditing: CpuCapability;
    videoEditing: CpuCapability;
    softwareDevelopment: CpuCapability;
    multitasking: CpuCapability;
    aiWorkloads: CpuCapability;
  };

  strengths: string[];
  weaknesses: string[];
  warnings: string[];
}