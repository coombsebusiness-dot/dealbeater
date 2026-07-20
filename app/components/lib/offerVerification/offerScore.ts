import { OfferAnalysis } from "./types";
import { calculateConfidence } from "./confidenceEngine";

export function calculateOfferScore(
  analysis: Omit<
    OfferAnalysis,
    "overallScore" | "confidence" | "verdict"
  >
): OfferAnalysis {

  const confidenceResult = calculateConfidence([
    {
  score: analysis.retailerTrust * 0.30,
  confidence: analysis.retailerConfidence,
},
    {
  score: analysis.sellerTrust * 0.20,
  confidence: analysis.sellerConfidence,
},
   {
  score: analysis.conditionScore * 0.20,
  confidence: analysis.conditionConfidence,
},
   {
  score: analysis.warrantyScore * 0.10,
  confidence: analysis.warrantyConfidence,
},
    {
       score: analysis.returnsScore * 0.10,
  confidence: analysis.returnsConfidence,
    },
    {
     score: analysis.deliveryScore * 0.10,
  confidence: analysis.deliveryConfidence,
    },
  ]);

  const overallScore = confidenceResult.overallScore;
  const confidence = confidenceResult.overallConfidence;

  let verdict: OfferAnalysis["verdict"];

  if (overallScore >= 90)
    verdict = "Excellent";
  else if (overallScore >= 75)
    verdict = "Good";
  else if (overallScore >= 60)
    verdict = "Fair";
  else
    verdict = "Poor";

  return {
    ...analysis,
    overallScore: Math.round(overallScore),
    confidence: Math.round(confidence),
    verdict,
  };
}