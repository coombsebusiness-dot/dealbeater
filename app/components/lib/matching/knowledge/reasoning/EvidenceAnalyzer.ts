import type { KnowledgeGraphPath } from "../graph/types";
import { relationshipWeights } from "./relationshipScore";

export interface EvidenceAnalysis {
  positiveScore: number;
  negativeScore: number;
  overallScore: number;

  strengths: string[];
  concerns: string[];
}
export class EvidenceAnalyzer {
  analyse(paths: KnowledgeGraphPath[]): EvidenceAnalysis {
    let positiveScore = 0;
    let negativeScore = 0;

    const strengths: string[] = [];
    const concerns: string[] = [];

    for (const path of paths) {
      for (const edge of path.edges) {
        const weight =
          relationshipWeights[edge.relationship] ?? 0;

        if (weight > 0) {
          positiveScore += weight;

          if (edge.reason) {
            strengths.push(edge.reason);
          }
        }

        if (weight < 0) {
          negativeScore += Math.abs(weight);

          if (edge.reason) {
            concerns.push(edge.reason);
          }
        }
      }
    }

    return {
      positiveScore,
      negativeScore,
      overallScore: positiveScore - negativeScore,
      strengths: [...new Set(strengths)],
      concerns: [...new Set(concerns)],
    };
  }
}