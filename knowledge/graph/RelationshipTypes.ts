export interface RelationshipScoreBreakdown {
  sameCategory: number;
  sameTopic: number;
  sharedKeywords: number;
  titleOverlap: number;
  manualBoost: number;
}

export interface RelationshipScoreResult {
  score: number;

  reasons: string[];

  breakdown:
    RelationshipScoreBreakdown;
}

export interface RelationshipScoringOptions {
  manualBoost?: number;
}