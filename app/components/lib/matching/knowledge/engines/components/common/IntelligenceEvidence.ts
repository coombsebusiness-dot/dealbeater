export interface IntelligenceEvidence {
  category: string;

  label: string;

  value: string | number | boolean;

  confidence?: number;

  description?: string;
}