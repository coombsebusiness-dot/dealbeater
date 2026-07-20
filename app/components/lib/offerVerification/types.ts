export interface OfferAnalysis {
  retailer: string;

  retailerTrust: number;
  retailerConfidence: number;

  sellerTrust: number;
  sellerConfidence: number;

  conditionScore: number;
  conditionConfidence: number;

  warrantyScore: number;
  warrantyConfidence: number;

  returnsScore: number;
  returnsConfidence: number;

  deliveryScore: number;
  deliveryConfidence: number;

  overallScore: number;

  confidence: number;

  verdict:
    | "Excellent"
    | "Good"
    | "Fair"
    | "Poor";

  warnings: string[];

  positives: string[];
}