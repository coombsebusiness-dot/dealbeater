export type RetailerType =
  | "manufacturer"
  | "major-retailer"
  | "marketplace"
  | "specialist"
  | "unknown";

export type RetailerRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "unknown";

export interface RetailerTrustResult {
  retailer: string;
  canonicalName: string;
  type: RetailerType;
  trustScore: number;
  confidence: number;
  riskLevel: RetailerRiskLevel;
  isMarketplace: boolean;
  requiresSellerVerification: boolean;
  reasons: string[];
}

interface RetailerProfile {
  canonicalName: string;
  aliases: string[];
  type: RetailerType;
  trustScore: number;
  reasons: string[];
}

const RETAILER_PROFILES: RetailerProfile[] = [
  {
    canonicalName: "Apple",
    aliases: [
      "apple",
      "apple store",
      "apple uk",
    ],
    type: "manufacturer",
    trustScore: 100,
    reasons: [
      "Manufacturer-direct retailer",
      "Manufacturer warranty expected",
      "Official product supply",
    ],
  },
  {
    canonicalName: "Samsung",
    aliases: [
      "samsung",
      "samsung uk",
      "samsung store",
    ],
    type: "manufacturer",
    trustScore: 100,
    reasons: [
      "Manufacturer-direct retailer",
      "Manufacturer warranty expected",
      "Official product supply",
    ],
  },
  {
    canonicalName: "John Lewis",
    aliases: [
      "john lewis",
      "john lewis & partners",
      "johnlewis",
    ],
    type: "major-retailer",
    trustScore: 98,
    reasons: [
      "Established UK retailer",
      "Strong customer-service reputation",
      "Clear returns and warranty processes expected",
    ],
  },
  {
    canonicalName: "Currys",
    aliases: [
      "currys",
      "currys pc world",
      "pc world",
    ],
    type: "major-retailer",
    trustScore: 96,
    reasons: [
      "Established UK electronics retailer",
      "Physical stores and online support",
      "Clear retail returns process expected",
    ],
  },
  {
    canonicalName: "Argos",
    aliases: [
      "argos",
    ],
    type: "major-retailer",
    trustScore: 95,
    reasons: [
      "Established UK retailer",
      "Physical collection and returns network",
      "Direct retail purchase expected",
    ],
  },
  {
    canonicalName: "AO",
    aliases: [
      "ao",
      "ao.com",
    ],
    type: "major-retailer",
    trustScore: 95,
    reasons: [
      "Established UK electrical retailer",
      "Direct delivery and support",
      "Clear returns process expected",
    ],
  },
  {
    canonicalName: "Richer Sounds",
    aliases: [
      "richer sounds",
      "richersounds",
    ],
    type: "specialist",
    trustScore: 98,
    reasons: [
      "Established specialist retailer",
      "Strong after-sales support reputation",
      "Clear warranty offering expected",
    ],
  },
  {
    canonicalName: "Costco",
    aliases: [
      "costco",
      "costco wholesale",
    ],
    type: "major-retailer",
    trustScore: 97,
    reasons: [
      "Established retailer",
      "Strong returns process expected",
      "Direct retail supply",
    ],
  },
  {
    canonicalName: "Very",
    aliases: [
      "very",
      "very.co.uk",
    ],
    type: "major-retailer",
    trustScore: 90,
    reasons: [
      "Established UK retailer",
      "Direct purchase and returns process",
    ],
  },
  {
    canonicalName: "Amazon",
    aliases: [
      "amazon",
      "amazon.co.uk",
    ],
    type: "marketplace",
    trustScore: 88,
    reasons: [
      "Large established marketplace",
      "Offer quality depends on the individual seller",
      "Seller identity must be verified",
    ],
  },
  {
    canonicalName: "eBay",
    aliases: [
      "ebay",
      "ebay uk",
      "ebay.co.uk",
    ],
    type: "marketplace",
    trustScore: 60,
    reasons: [
      "Marketplace listing",
      "Condition and warranty may vary",
      "Seller reputation must be checked",
    ],
  },
  {
    canonicalName: "OnBuy",
    aliases: [
      "onbuy",
      "onbuy.com",
    ],
    type: "marketplace",
    trustScore: 65,
    reasons: [
      "Marketplace listing",
      "Offer quality depends on the seller",
      "Seller and returns information must be checked",
    ],
  },
];

export function evaluateRetailerTrust(
  retailerName: string
): RetailerTrustResult {
  const cleanRetailer =
    retailerName.trim() || "Unknown retailer";

  const normalisedRetailer =
    normaliseRetailerName(cleanRetailer);

  const profile = RETAILER_PROFILES.find(
    (candidate) =>
      candidate.aliases.some((alias) =>
        retailerMatches(
          normalisedRetailer,
          normaliseRetailerName(alias)
        )
      )
  );

  if (!profile) {
    return {
      retailer: cleanRetailer,
      canonicalName: cleanRetailer,
      type: "unknown",
      trustScore: 45,
      confidence: 25,
      riskLevel: "unknown",
      isMarketplace: false,
      requiresSellerVerification: true,
      reasons: [
        "Retailer is not yet in the Deal Beater trust directory",
        "Warranty and returns have not been verified",
        "Manual or live verification is required",
      ],
    };
  }

  const isMarketplace =
    profile.type === "marketplace";

  return {
    retailer: cleanRetailer,
    canonicalName: profile.canonicalName,
    type: profile.type,
    trustScore: profile.trustScore,
    confidence: 80,
    riskLevel: getRiskLevel(
      profile.trustScore,
      isMarketplace
    ),
    isMarketplace,
    requiresSellerVerification: isMarketplace,
    reasons: profile.reasons,
  };
}

function getRiskLevel(
  trustScore: number,
  isMarketplace: boolean
): RetailerRiskLevel {
  if (isMarketplace) {
    return trustScore >= 75
      ? "medium"
      : "high";
  }

  if (trustScore >= 90) {
    return "low";
  }

  if (trustScore >= 70) {
    return "medium";
  }

  return "high";
}

function retailerMatches(
  retailer: string,
  alias: string
): boolean {
  return (
    retailer === alias ||
    retailer.startsWith(`${alias} `) ||
    retailer.endsWith(` ${alias}`) ||
    retailer.includes(` ${alias} `)
  );
}

function normaliseRetailerName(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/\.(co\.uk|com|uk)$/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}