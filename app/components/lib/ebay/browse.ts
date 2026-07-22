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

function parseMoney(value?: string): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : null;
}

function getShippingPrice(item: EbayItemSummary): number {
  const shippingValue =
    item.shippingOptions?.[0]?.shippingCost?.value;

  return parseMoney(shippingValue) ?? 0;
}

function normaliseItem(item: EbayItemSummary): EbayOffer | null {
  const price = parseMoney(item.price?.value);

  if (
    !item.itemId ||
    !item.title ||
    price === null ||
    !item.itemWebUrl
  ) {
    return null;
  }

  const shippingPrice = getShippingPrice(item);

  return {
    source: "ebay",
    itemId: item.itemId,
    retailer: "eBay",
    title: item.title,
    price,
    shippingPrice,
    totalPrice: price + shippingPrice,
    currency: item.price?.currency ?? "GBP",
    condition: item.condition ?? null,
    sellerName: item.seller?.username ?? null,
    sellerFeedbackPercentage:
      parseMoney(item.seller?.feedbackPercentage),
    sellerFeedbackScore:
      item.seller?.feedbackScore ?? null,
    buyingOptions: item.buyingOptions ?? [],
    imageUrl: item.image?.imageUrl ?? null,
    itemUrl:
      item.itemAffiliateWebUrl ??
      item.itemWebUrl,
  };
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

  const token = await getEbayAccessToken();

  const params = new URLSearchParams({
    q: trimmedQuery,
    limit: String(safeLimit),
    filter:
      "buyingOptions:{FIXED_PRICE},conditions:{NEW}",
  });

  const response = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_GB",
        "X-EBAY-C-ENDUSERCTX":
          "contextualLocation=country%3DGB",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `eBay Browse search failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data =
    (await response.json()) as EbaySearchResponse;

  return (data.itemSummaries ?? [])
    .map(normaliseItem)
    .filter(
      (offer): offer is EbayOffer =>
        offer !== null
    );
}