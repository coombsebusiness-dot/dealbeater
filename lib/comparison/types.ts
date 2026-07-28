export interface ComparisonResult {
  winner: "A" | "B" | "DRAW";

  overallScoreA: number;
  overallScoreB: number;

  categories: {
    price: "A" | "B" | "DRAW";
    value: "A" | "B" | "DRAW";
    performance: "A" | "B" | "DRAW";
    features: "A" | "B" | "DRAW";
    retailerTrust: "A" | "B" | "DRAW";
  };

  summary: string;

  reasonsA: string[];
  reasonsB: string[];

  bestFor: {
    productA: string[];
    productB: string[];
  };
}