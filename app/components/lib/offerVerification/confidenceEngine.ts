export interface Evidence {
  score: number;
  confidence: number;
}

export interface ConfidenceEngineResult {
  overallScore: number;
  overallConfidence: number;
}

export function calculateConfidence(
  evidence: Evidence[]
): ConfidenceEngineResult {

  if (evidence.length === 0) {
    return {
      overallScore: 0,
      overallConfidence: 0,
    };
  }

  let weightedTotal = 0;
  let confidenceTotal = 0;

  for (const item of evidence) {
    weightedTotal +=
      (item.score * item.confidence) / 100;

    confidenceTotal += item.confidence;
  }

  return {
    overallScore:
      weightedTotal / evidence.length,

    overallConfidence:
      confidenceTotal / evidence.length,
  };
}