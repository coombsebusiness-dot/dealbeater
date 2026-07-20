export interface AnalysisResult {
  score: number;
  confidence: number;
  positives: string[];
  warnings: string[];
}