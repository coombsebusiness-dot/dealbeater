import { getEbayAccessToken } from "./auth";

type EbayAmount = {
  value?: string;
  currency?: string;
};

type EbayImage = {
  imageUrl?: string;
};

type EbaySeller = {
  username?: string;
  feedbackPercentage?: string;
  feedbackScore?: number;
};

type EbayShippingOption = {
  shippingCost?: EbayAmount;
};

type EbayItemSummary = {
  itemId?: string;
  title?: string;
  price?: EbayAmount;
  image?: EbayImage;
  itemWebUrl?: string;
  itemAffiliateWebUrl?: string;
  condition?: string;
  buyingOptions?: string[];
  seller?: EbaySeller;
  shippingOptions?: EbayShippingOption[];
};

type EbaySearchResponse = {
  total?: number;
  itemSummaries?: EbayItemSummary[];
};

type EbayLegacyItemResponse = {
  itemId?: string;
  title?: string;
  price?: EbayAmount;
  image?: EbayImage;
  itemWebUrl?: string;
  itemAffiliateWebUrl?: string;
  condition?: string;
  seller?: EbaySeller;
  buyingOptions?: string[];
};

export type EbayOffer = {
  source: "ebay";
  itemId: string;
  retailer: "eBay";
  title: string;
  price: number;
  shippingPrice: number;
  totalPrice: number;
  currency: string;
  condition: string | null;
  sellerName: string | null;
  sellerFeedbackPercentage: number | null;
  sellerFeedbackScore: number | null;
  buyingOptions: string[];
  imageUrl: string | null;
  itemUrl: string;
};

export type EbayResolvedItem = {
  itemId: string | null;
  legacyItemId: string;
  title: string;
  price: number | null;
  currency: string;
  condition: string | null;
  imageUrl: string | null;
  itemUrl: string | null;
};

function parseMoney(
  value?: string
): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed)
    ? parsed
    : null;
}

function getShippingPrice(
  item: EbayItemSummary
): number {
  const shippingValue =
    item.shippingOptions?.[0]
      ?.shippingCost?.value;

  return parseMoney(shippingValue) ?? 0;
}

function getEbayEndUserContext(): string {
  const campaignId =
    process.env.EBAY_CAMPAIGN_ID?.trim();

  if (!campaignId) {
    throw new Error(
      "EBAY_CAMPAIGN_ID is missing from the environment."
    );
  }

  return [
    `affiliateCampaignId=${campaignId}`,
    "affiliateReferenceId=dealbeater",
    "contextualLocation=country%3DGB",
  ].join(",");
}

function getEbayRequestHeaders(
  token: string
): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "X-EBAY-C-MARKETPLACE-ID": "EBAY_GB",
    "X-EBAY-C-ENDUSERCTX":
      getEbayEndUserContext(),
    Accept: "application/json",
  };
}

function normaliseItem(
  item: EbayItemSummary
): EbayOffer | null {
  const price =
    parseMoney(item.price?.value);

  const itemUrl =
    item.itemAffiliateWebUrl ??
    item.itemWebUrl;

  if (
    !item.itemId ||
    !item.title ||
    price === null ||
    !itemUrl
  ) {
    return null;
  }

  const shippingPrice =
    getShippingPrice(item);

  // console.log("🧾 EBAY URL FIELDS:", {
  //   itemId: item.itemId,
  //   standardUrl: item.itemWebUrl,
  //   affiliateUrl:
  //     item.itemAffiliateWebUrl,
  //   selectedUrl: itemUrl,
  // });

  return {
    source: "ebay",
    itemId: item.itemId,
    retailer: "eBay",
    title: item.title,
    price,
    shippingPrice,
    totalPrice:
      price + shippingPrice,
    currency:
      item.price?.currency ?? "GBP",
    condition:
      item.condition ?? null,
    sellerName:
      item.seller?.username ?? null,
    sellerFeedbackPercentage:
      parseMoney(
        item.seller
          ?.feedbackPercentage
      ),
    sellerFeedbackScore:
      item.seller
        ?.feedbackScore ?? null,
    buyingOptions:
      item.buyingOptions ?? [],
    imageUrl:
      item.image?.imageUrl ?? null,
    itemUrl,
  };
}
const PHONE_QUERY_TERMS = [
  "iphone",
  "samsung galaxy",
  "galaxy s",
  "google pixel",
  "smartphone",
  "mobile phone",
];

const PHONE_ACCESSORY_TERMS = [
  "case",
  "cover",
  "screen protector",
  "tempered glass",
  "charger",
  "charging cable",
  "usb cable",
  "adapter",
  "holder",
  "mount",
  "wallet",
  "skin",
  "bumper",
  "replacement",
  "replacement part",
  "spare part",
  "charging port",
  "connector",
  "connector flex",
  "flex cable",
  "charging flex",
  "port flex",
  "lcd",
  "display assembly",
  "replacement screen",
  "battery replacement",
  "back glass",
  "housing",
  "camera lens glass",
  "Blacklist Supported",
  "BLACKLIST REMOVAL / IMEI CLEANING SERVICE",
];
function containsPhoneAccessoryTerm(
  value: string
): boolean {
  const normalised = value.toLowerCase();

  return PHONE_ACCESSORY_TERMS.some(
    (term) => normalised.includes(term)
  );
}

function looksLikePhoneQuery(text: string): boolean {
  const normalised = text.toLowerCase();

  return PHONE_QUERY_TERMS.some((term) =>
    normalised.includes(term)
  );
}

function isPhoneAccessoryListing(
  title: string
): boolean {
  const normalised = title.toLowerCase();

  return PHONE_ACCESSORY_TERMS.some((term) =>
    normalised.includes(term)
  );
}

export async function searchEbay(
  query: string,
  limit = 20
): Promise<EbayOffer[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const safeLimit = Math.min(
    Math.max(limit, 1),
    200
  );

  const token =
    await getEbayAccessToken();

  const params =
    new URLSearchParams({
      q: trimmedQuery,
      limit: String(safeLimit),
      filter:
        "buyingOptions:{FIXED_PRICE},conditions:{NEW}",
    });

  const response = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`,
    {
      method: "GET",
      headers:
        getEbayRequestHeaders(token),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `eBay Browse search failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data =
    (await response.json()) as EbaySearchResponse;

 const phoneSearch =
  looksLikePhoneQuery(trimmedQuery);

return (data.itemSummaries ?? [])
  .map(normaliseItem)
  .filter(
    (
      offer
    ): offer is EbayOffer =>
      offer !== null
  )
  .filter((offer) => {
    if (
      phoneSearch &&
      isPhoneAccessoryListing(
        offer.title
      )
    ) {
      console.log(
        `🚫 eBay phone accessory rejected: ${offer.title}`
      );

      return false;
    }

    return true;
  });
}

export async function getEbayItemByLegacyId(
  legacyItemId: string
): Promise<EbayResolvedItem | null> {
  const trimmedId =
    legacyItemId.trim();

  if (!/^\d{9,15}$/.test(trimmedId)) {
    throw new Error(
      "The eBay item number is invalid."
    );
  }

  const token =
    await getEbayAccessToken();

  const params =
    new URLSearchParams({
      legacy_item_id: trimmedId,
    });

  const response = await fetch(
    `https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id?${params.toString()}`,
    {
      method: "GET",
      headers:
        getEbayRequestHeaders(token),
      cache: "no-store",
    }
  );

if (!response.ok) {
  const errorBody = await response.text();

  let ebayErrorId: number | null = null;

  try {
    const parsed = JSON.parse(errorBody) as {
      errors?: Array<{
        errorId?: number;
        message?: string;
      }>;
    };

    ebayErrorId =
      parsed.errors?.[0]?.errorId ?? null;
  } catch {
    // Leave ebayErrorId as null when the body is not JSON.
  }

  if (response.status === 400 && ebayErrorId === 11006) {
    console.warn(
      `⚠️ eBay ID ${trimmedId} is an item-group ID, not a legacy item ID. Skipping legacy lookup.`
    );

    return null;
  }

  console.error("❌ eBay listing lookup failed:", {
    status: response.status,
    statusText: response.statusText,
    errorBody,
    requestUrl: response.url,
  });

  return null;
}
  const item =
    (await response.json()) as EbayLegacyItemResponse;

  console.log(
    "🧾 EBAY LEGACY URL FIELDS:",
    {
      legacyItemId: trimmedId,
      standardUrl:
        item.itemWebUrl,
      affiliateUrl:
        item.itemAffiliateWebUrl,
      selectedUrl:
        item.itemAffiliateWebUrl ??
        item.itemWebUrl ??
        null,
    }
  );

  if (!item.title) {
    throw new Error(
      "eBay returned the listing, but its product title was unavailable."
    );
  }

  return {
    itemId:
      item.itemId ?? null,
    legacyItemId:
      trimmedId,
    title:
      item.title,
    price:
      parseMoney(
        item.price?.value
      ),
    currency:
      item.price?.currency ??
      "GBP",
    condition:
      item.condition ?? null,
    imageUrl:
      item.image?.imageUrl ??
      null,
    itemUrl:
      item.itemAffiliateWebUrl ??
      item.itemWebUrl ??
      null,
  };
}