import type { AffiliateResult, Merchant } from "./types";

interface AwinGenerateResponse {
  url?: string;
  shortUrl?: string;
  description?: string;
}

function getAwinConfig() {
  const token = process.env.AWIN_API_TOKEN;
  const publisherId = process.env.AWIN_PUBLISHER_ID;

  if (!token) {
    throw new Error("Missing AWIN_API_TOKEN");
  }

  if (!publisherId) {
    throw new Error("Missing AWIN_PUBLISHER_ID");
  }

  return {
    token,
    publisherId,
  };
}

export async function generateAwinAffiliateLink(
  destinationUrl: string,
  merchant: Merchant,
  clickRef?: string
): Promise<AffiliateResult> {
  const isExistingAwinLink =
    destinationUrl.includes("awin1.com/cread.php") &&
    destinationUrl.includes("awinaffid=");

  if (isExistingAwinLink) {
    return {
      success: true,
      affiliateUrl: destinationUrl,
      network: "awin",
      retailer: merchant.retailer,
    };
  }

  if (!merchant.advertiserId) {
    console.warn(
      `AWIN advertiser ID is missing for ${merchant.retailer}`
    );

    return {
      success: false,
      affiliateUrl: destinationUrl,
      network: "none",
      retailer: merchant.retailer,
    };
  }

  try {
    const { token, publisherId } = getAwinConfig();

    const response = await fetch(
      `https://api.awin.com/publishers/${publisherId}/linkbuilder/generate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          advertiserId: Number(merchant.advertiserId),
          destinationUrl,
          parameters: clickRef
            ? {
                clickref: clickRef,
              }
            : undefined,
          shorten: false,
        }),
        cache: "no-store",
      }
    );

    const result =
      (await response.json()) as AwinGenerateResponse;

    console.log("AWIN RAW RESPONSE:", result);
    console.log("AWIN STATUS:", response.status);

    if (!response.ok || !result.url) {
      console.error("AWIN LINK ERROR:", {
        retailer: merchant.retailer,
        status: response.status,
        result,
      });

      return {
        success: false,
        affiliateUrl: destinationUrl,
        network: "none",
        retailer: merchant.retailer,
      };
    }

    console.log("AWIN AFFILIATE LINK:", {
      retailer: merchant.retailer,
      advertiserId: merchant.advertiserId,
      destinationUrl,
      affiliateUrl: result.url,
    });

    return {
      success: true,
      affiliateUrl: result.url,
      network: "awin",
      retailer: merchant.retailer,
    };
  } catch (error) {
    console.error("AWIN PROVIDER ERROR:", error);

    return {
      success: false,
      affiliateUrl: destinationUrl,
      network: "none",
      retailer: merchant.retailer,
    };
  }
}