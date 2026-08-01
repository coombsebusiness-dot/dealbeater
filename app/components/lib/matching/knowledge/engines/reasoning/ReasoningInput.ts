export interface ReasoningCapabilityInput {
  id: string;

  label: string;

  score: number;

  confidence: number;
}

export interface ReasoningInput {
  category: string;

  capabilities: ReasoningCapabilityInput[];

  strengths: string[];

  weaknesses: string[];

  warnings: string[];
}