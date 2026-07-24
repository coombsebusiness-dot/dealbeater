import { generateAwinAffiliateLink } from "./awin";
import { getMerchantByUrl } from "./registry";
import type { AffiliateResult } from "./types";

export async function getAffiliateLink(
  retailerUrl: string,
  clickRef?: string
): Promise<AffiliateResult> {
  const merchant = getMerchantByUrl(retailerUrl);

  if (!merchant || !merchant.enabled) {
    return {
      success: false,
      affiliateUrl: retailerUrl,
      network: "none",
      retailer: merchant?.retailer ?? "Unknown",
    };
  }

  switch (merchant.network) {
    case "amazon":
      return {
        success: true,
        affiliateUrl: retailerUrl,
        network: "amazon",
        retailer: merchant.retailer,
      };

    case "ebay":
      return {
        success: true,
        affiliateUrl: retailerUrl,
        network: "ebay",
        retailer: merchant.retailer,
      };

    case "awin":
      return generateAwinAffiliateLink(
        retailerUrl,
        merchant,
        clickRef
      );

    case "cj":
    case "partnerize":
    default:
      return {
        success: false,
        affiliateUrl: retailerUrl,
        network: "none",
        retailer: merchant.retailer,
      };
  }
}