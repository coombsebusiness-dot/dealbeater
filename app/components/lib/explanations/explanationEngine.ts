import { OfferAnalysis } from "../offerVerification/types";

export interface DealExplanation {
  headline: string;
  recommendation: string;
  confidenceStatement: string;
  summary: string;
  positives: string[];
  warnings: string[];
  ifItWasOurMoney: string;
}

function buildRecommendation(
  analysis: OfferAnalysis
): string {
  switch (analysis.verdict) {
    case "Excellent":
      return "BUY";
    case "Good":
      return "GOOD DEAL";
    case "Fair":
      return "PROCEED WITH CAUTION";
    case "Poor":
      return "AVOID";
  }
}

function buildHeadline(
  analysis: OfferAnalysis
): string {
  switch (analysis.verdict) {
    case "Excellent":
      return "This looks like a strong offer.";
    case "Good":
      return "This appears to be a good offer.";
    case "Fair":
      return "This offer may be worth considering, but check the details.";
    case "Poor":
      return "We would be cautious about this offer.";
  }
}

function buildConfidenceStatement(
  confidence: number
): string {
  if (confidence >= 90) {
    return "We have very high confidence in this assessment.";
  }

  if (confidence >= 75) {
    return "We have good confidence in this assessment.";
  }

  if (confidence >= 50) {
    return "Some important details could not be fully verified.";
  }

  return "There is not enough verified information to be highly confident.";
}

function buildSummary(
  analysis: OfferAnalysis
): string {
  const positiveCount = analysis.positives.length;
  const warningCount = analysis.warnings.length;

  if (analysis.verdict === "Excellent") {
    return warningCount === 0
      ? "The retailer, product condition and offer protections all appear strong."
      : `The offer has ${positiveCount} positive signals, with ${warningCount} detail${
          warningCount === 1 ? "" : "s"
        } worth checking.`;
  }

  if (analysis.verdict === "Good") {
    return `The offer has several strong signals, but ${
      warningCount > 0
        ? `${warningCount} point${warningCount === 1 ? "" : "s"} should be checked before buying.`
        : "we would still compare it with the best available alternative."
    }`;
  }

  if (analysis.verdict === "Fair") {
    return `The offer is mixed. We found ${positiveCount} positive signal${
      positiveCount === 1 ? "" : "s"
    } and ${warningCount} warning${
      warningCount === 1 ? "" : "s"
    }.`;
  }

  return warningCount > 0
    ? `We found ${warningCount} warning${
        warningCount === 1 ? "" : "s"
      } that make this a higher-risk purchase.`
    : "The overall offer score is too weak for us to recommend buying confidently.";
}

function buildIfItWasOurMoney(
  analysis: OfferAnalysis
): string {
  if (
    analysis.verdict === "Excellent" &&
    analysis.confidence >= 85
  ) {
    return "We would be comfortable buying this offer.";
  }

  if (
    analysis.verdict === "Good" &&
    analysis.confidence >= 70
  ) {
    return "We would consider buying it, but we would quickly compare the warranty, returns and seller details first.";
  }

  if (analysis.verdict === "Fair") {
    return "We would hold off until the unclear details were verified or a safer alternative was found.";
  }

  return "We would not spend our money on this offer in its current form.";
}

function deduplicate(items: string[]): string[] {
  return [...new Set(
    items
      .map((item) => item.trim())
      .filter(Boolean)
  )];
}

export function buildDealExplanation(
  analysis: OfferAnalysis
): DealExplanation {
  return {
    headline: buildHeadline(analysis),
    recommendation: buildRecommendation(analysis),
    confidenceStatement:
      buildConfidenceStatement(analysis.confidence),
    summary: buildSummary(analysis),
    positives: deduplicate(analysis.positives),
    warnings: deduplicate(analysis.warnings),
    ifItWasOurMoney: buildIfItWasOurMoney(analysis),
  };
}