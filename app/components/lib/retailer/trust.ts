export interface RetailerTrustResult {
  trustScore: number;

  recommendation:
    | "Highly Recommended"
    | "Recommended"
    | "Acceptable"
    | "Use Caution";

  officialRetailer: boolean;

  buyerProtection: boolean;

  secureCheckout: boolean;

  returnDays?: number;

  deliveryEstimate?: string;
}

export function calculateRetailerTrust(
  retailer: string
): RetailerTrustResult {

  const name = retailer.toLowerCase();

  if (name.includes("amazon")) {
    return {
      trustScore: 96,
      recommendation: "Highly Recommended",
      officialRetailer: true,
      buyerProtection: true,
      secureCheckout: true,
      returnDays: 30,
      deliveryEstimate: "Next day",
    };
  }

  if (name.includes("john lewis")) {
    return {
      trustScore: 97,
      recommendation: "Highly Recommended",
      officialRetailer: true,
      buyerProtection: true,
      secureCheckout: true,
      returnDays: 35,
      deliveryEstimate: "1–2 days",
    };
  }

  if (name.includes("currys")) {
    return {
      trustScore: 95,
      recommendation: "Highly Recommended",
      officialRetailer: true,
      buyerProtection: true,
      secureCheckout: true,
      returnDays: 30,
      deliveryEstimate: "1–2 days",
    };
  }

  if (name.includes("argos")) {
    return {
      trustScore: 94,
      recommendation: "Highly Recommended",
      officialRetailer: true,
      buyerProtection: true,
      secureCheckout: true,
      returnDays: 30,
      deliveryEstimate: "Same day / Next day",
    };
  }

  if (name.includes("ao")) {
    return {
      trustScore: 93,
      recommendation: "Recommended",
      officialRetailer: true,
      buyerProtection: true,
      secureCheckout: true,
      returnDays: 30,
      deliveryEstimate: "Next day",
    };
  }

  return {
    trustScore: 70,
    recommendation: "Acceptable",
    officialRetailer: false,
    buyerProtection: false,
    secureCheckout: true,
  };
}