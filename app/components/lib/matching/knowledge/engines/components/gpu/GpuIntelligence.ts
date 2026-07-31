export type GpuCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface GpuCapability {
  score: number;
  level: GpuCapabilityLevel;
  explanation: string;
}

export interface GpuIntelligenceScores {
  overall: number;

  gaming: number;
  creativeWork: number;
  videoEditing: number;
  aiWorkloads: number;
  rayTracing: number;
  efficiency: number;
  longevity: number;
}

export interface GpuIntelligence {
  gpuId?: string;
  gpuName: string;

  confidence: number;

  scores: GpuIntelligenceScores;

  capabilities: {
    casualGaming: GpuCapability;
    competitiveGaming: GpuCapability;
    aaaGaming: GpuCapability;

    photoEditing: GpuCapability;
    videoEditing: GpuCapability;
    graphicDesign: GpuCapability;

    aiWorkloads: GpuCapability;
  };

  strengths: string[];
  weaknesses: string[];
  warnings: string[];
}