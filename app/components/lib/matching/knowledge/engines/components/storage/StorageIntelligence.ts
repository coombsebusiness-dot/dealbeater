export type StorageCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "FAIR"
  | "LIMITED"
  | "UNKNOWN";

export interface StorageCapability {
  score: number;

  level: StorageCapabilityLevel;

  explanation: string;
}

export interface StorageIntelligenceScores {
  overall: number;

  capacity: number;

  performance: number;

  responsiveness: number;

  creativeWork: number;

  softwareDevelopment: number;

  gaming: number;

  aiWorkloads: number;

  longevity: number;

  upgradeability: number;
}

export interface StorageIntelligence {
  storageName: string;

  confidence: number;

  scores: StorageIntelligenceScores;

  capabilities: {
    everydayUse: StorageCapability;

    officeWork: StorageCapability;

    photoEditing: StorageCapability;

    videoEditing: StorageCapability;

    softwareDevelopment: StorageCapability;

    gaming: StorageCapability;

    aiWorkloads: StorageCapability;
  };

  strengths: string[];

  weaknesses: string[];

  warnings: string[];
}