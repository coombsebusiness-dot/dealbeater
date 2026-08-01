export interface CategoryCapability {
  id: string;

  label: string;

  score: number;

  confidence: number;
}

export interface CategoryIntelligence {
  category: string;

  capabilities: CategoryCapability[];

  strengths: string[];

  weaknesses: string[];

  warnings: string[];
}