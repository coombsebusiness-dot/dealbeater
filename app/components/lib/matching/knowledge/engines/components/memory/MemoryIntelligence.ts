export type MemoryCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface MemoryCapability {
  score: number;
  level: MemoryCapabilityLevel;
  explanation: string;
}

export interface MemoryIntelligenceScores {
  overall: number;

  capacity: number;
  bandwidth: number;
  efficiency: number;

  multitasking: number;

  creativeWork: number;
  softwareDevelopment: number;
  aiWorkloads: number;

  longevity: number;

  upgradeability: number;
}

export interface MemoryIntelligence {
  memoryName: string;

  confidence: number;

  scores: MemoryIntelligenceScores;

  capabilities: {

    everydayUse: MemoryCapability;

    officeWork: MemoryCapability;

    multitasking: MemoryCapability;

    photoEditing: MemoryCapability;

    videoEditing: MemoryCapability;

    softwareDevelopment: MemoryCapability;

    aiWorkloads: MemoryCapability;

  };

  strengths: string[];

  weaknesses: string[];

  warnings: string[];
}