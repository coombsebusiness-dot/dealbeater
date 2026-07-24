export type AffiliateNetwork =
  | "amazon"
  | "ebay"
  | "awin"
  | "cj"
  | "partnerize";

export interface Merchant {
  retailer: string;

  domains: string[];

  network: AffiliateNetwork;

  advertiserId?: string;

  enabled: boolean;
}

export interface AffiliateResult {
  success: boolean;

  affiliateUrl: string;

  network: AffiliateNetwork | "none";

  retailer: string;
}