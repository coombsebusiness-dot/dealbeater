type EbayTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type EbayPrice = {
  value: string;
  currency: string;
};

type EbayItemSummary = {
  itemId: string;
  legacyItemId?: string;
  title: string;
  price?: EbayPrice;
  itemWebUrl?: string;
  itemAffiliateWebUrl?: string;
};

type EbaySearchResponse = {
  itemSummaries?: EbayItemSummary[];
};

export type EbayAffiliateResult = {
  itemId: string;
  legacyItemId: string | null;
  title: string;
  price: number | null;
  currency: string | null;
  affiliateUrl: string;
};

let cachedToken: {
  value: string;
  expiresAt: number;
} | null = null;

async function getEbayAccessToken(): Promise<string> {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing eBay API credentials.");
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://api.ebay.com/identity/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `eBay token request failed: ${response.status} ${errorBody}`
    );
  }

  const data = (await response.json()) as EbayTokenResponse;

  cachedToken = {
    value: data.access_token,

    // Refresh five minutes before expiry.
    expiresAt: Date.now() + Math.max(data.expires_in - 300, 60) * 1000,
  };

  return data.access_token;
}

export async function findEbayAffiliateListing(
  query: string,
  expectedPrice?: number
): Promise<EbayAffiliateResult | null> {
  const campaignId = process.env.EBAY_CAMPAIGN_ID;

  if (!campaignId) {
    throw new Error("Missing EBAY_CAMPAIGN_ID.");
  }

  const accessToken = await getEbayAccessToken();

  const params = new URLSearchParams({
    q: query,
    limit: "10",
    filter: "buyingOptions:{FIXED_PRICE}",
  });

  const response = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_GB",

        // This tells eBay to return itemAffiliateWebUrl.
        "X-EBAY-C-ENDUSERCTX": `affiliateCampaignId=${campaignId}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error(
      "eBay search failed:",
      response.status,
      errorBody
    );

    return null;
  }

  const data = (await response.json()) as EbaySearchResponse;

  const candidates = (data.itemSummaries ?? []).filter(
    (item) => item.itemAffiliateWebUrl
  );

  if (candidates.length === 0) {
    return null;
  }

  const selected = chooseClosestPrice(candidates, expectedPrice);

  if (!selected?.itemAffiliateWebUrl) {
    return null;
  }

  return {
    itemId: selected.itemId,
    legacyItemId: selected.legacyItemId ?? null,
    title: selected.title,
    price: selected.price ? Number(selected.price.value) : null,
    currency: selected.price?.currency ?? null,
    affiliateUrl: selected.itemAffiliateWebUrl,
  };
}

function chooseClosestPrice(
  items: EbayItemSummary[],
  expectedPrice?: number
): EbayItemSummary | null {
  if (items.length === 0) {
    return null;
  }

  if (
    expectedPrice === undefined ||
    !Number.isFinite(expectedPrice)
  ) {
    return items[0];
  }

  return [...items].sort((a, b) => {
    const aPrice = a.price
      ? Number(a.price.value)
      : Number.POSITIVE_INFINITY;

    const bPrice = b.price
      ? Number(b.price.value)
      : Number.POSITIVE_INFINITY;

    return (
      Math.abs(aPrice - expectedPrice) -
      Math.abs(bPrice - expectedPrice)
    );
  })[0];
}