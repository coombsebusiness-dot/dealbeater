export interface ExtractedProduct {
  sourceUrl: string;
  hostname: string;

  title: string;
  brand: string | null;
  model: string | null;

  sku: string | null;
  mpn: string | null;
  gtin: string | null;

  price: number | null;
  currency: string | null;
  availability: string | null;

  image: string | null;
  description: string | null;

  searchQuery: string;
  confidence: number;
}

interface JsonLdProduct {
  "@type"?: string | string[];
  name?: unknown;
  brand?: unknown;
  model?: unknown;
  sku?: unknown;
  mpn?: unknown;
  gtin?: unknown;
  gtin8?: unknown;
  gtin12?: unknown;
  gtin13?: unknown;
  gtin14?: unknown;
  image?: unknown;
  description?: unknown;
  offers?: unknown;
  productID?: unknown;
}

interface JsonLdOffer {
  price?: unknown;
  lowPrice?: unknown;
  priceCurrency?: unknown;
  availability?: unknown;
}

const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; DealBeater/1.0; +https://dealbeater.co.uk)",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

export function isProductUrl(
  value: string
): boolean {
  try {
    const url = new URL(value.trim());

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

export async function extractProductFromUrl(
  inputUrl: string
): Promise<ExtractedProduct> {
  const url = normaliseUrl(inputUrl);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: DEFAULT_HEADERS,
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new Error(
      `Could not read product page: ${response.status} ${response.statusText}`
    );
  }

  const html = await response.text();

  if (!html.trim()) {
    throw new Error(
      "The retailer returned an empty product page."
    );
  }

  const jsonLdProducts =
    extractJsonLdProducts(html);

  const jsonLdProduct =
    chooseBestJsonLdProduct(jsonLdProducts);

  const metadata = extractMetadata(html);

 const title = decodeHtmlEntities(
  readString(jsonLdProduct?.name) ??
    metadata.ogTitle ??
    ""
);

  if (!title) {
    throw new Error(
      "DBI could not identify the product title from this page."
    );
  }

  const description = decodeHtmlEntities(
    readString(jsonLdProduct?.description) ??
      metadata.ogDescription ??
      metadata.metaDescription ??
      ""
  );

  const descriptionModel =
    description.match(
      /Model\s*Number\s*:\s*([A-Z0-9-]+)/i
    )?.[1] ?? null;

  const descriptionPartNumber =
    description.match(
      /Part\s*Number\s*:\s*([A-Z0-9-]+)/i
    )?.[1] ?? null;

  const brand =
    extractBrand(jsonLdProduct?.brand) ??
    metadata.productBrand ??
    inferBrandFromTitle(title);

  const model =
    descriptionModel ??
    readString(jsonLdProduct?.model) ??
    null;

  const sku =
    readString(jsonLdProduct?.sku) ??
    metadata.productSku;

  const mpn =
    descriptionPartNumber ??
    readString(jsonLdProduct?.mpn) ??
    metadata.productMpn;

  const gtin =
    readString(jsonLdProduct?.gtin14) ??
    readString(jsonLdProduct?.gtin13) ??
    readString(jsonLdProduct?.gtin12) ??
    readString(jsonLdProduct?.gtin8) ??
    readString(jsonLdProduct?.gtin) ??
    extractGtinFromProductId(
      jsonLdProduct?.productID
    );

  const offer = extractBestOffer(
    jsonLdProduct?.offers
  );

  const price =
    parsePrice(offer?.price) ??
    parsePrice(offer?.lowPrice) ??
    parsePrice(metadata.productPrice);

  const currency =
    readString(offer?.priceCurrency) ??
    metadata.productCurrency ??
    inferCurrencyFromPage(html);

  const availability =
    simplifyAvailability(
      readString(offer?.availability) ??
        metadata.productAvailability
    );

  const image =
    extractImage(jsonLdProduct?.image) ??
    metadata.ogImage ??
    metadata.twitterImage;

  const cleanedTitle = title
    .replace(/\s*[;|]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const titleWithoutBrand = brand
    ? cleanedTitle.replace(
        new RegExp(
          `^${escapeRegExp(brand)}\\s+`,
          "i"
        ),
        ""
      )
    : cleanedTitle;

  const searchQuery = [
    brand,
    titleWithoutBrand,
    model &&
    !titleWithoutBrand
      .toLowerCase()
      .includes(model.toLowerCase())
      ? model
      : null,
  ]
    .filter(
      (value): value is string =>
        Boolean(value?.trim())
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const confidence = calculateConfidence({
    title,
    brand,
    model,
    sku,
    mpn,
    gtin,
    price,
    hasJsonLd: Boolean(jsonLdProduct),
  });

  return {
    sourceUrl:
      response.url || url.toString(),

    hostname: new URL(
      response.url || url.toString()
    ).hostname,

    title,
    brand,
    model,
    sku,
    mpn,
    gtin,
    price,
    currency,
    availability,
    image,
    description,
    searchQuery,
    confidence,
  };
}

  
function decodeHtmlEntities(value?: string | null): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(
        Number.parseInt(hex, 16)
      )
    )
    .replace(/&#(\d+);/g, (_, decimal) =>
      String.fromCodePoint(
        Number.parseInt(decimal, 10)
      )
    )
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&trade;/gi, "™")
    .replace(/\s+/g, " ")
    .trim();

    
}

function normaliseUrl(value: string): URL {
  const trimmed = value.trim();

  const withProtocol = /^https?:\/\//i.test(
    trimmed
  )
    ? trimmed
    : `https://${trimmed}`;

  const url = new URL(withProtocol);

  if (
    url.protocol !== "https:" &&
    url.protocol !== "http:"
  ) {
    throw new Error(
      "Only HTTP and HTTPS product URLs are supported."
    );
  }

  return url;
}

function extractJsonLdProducts(
  html: string
): JsonLdProduct[] {
  const products: JsonLdProduct[] = [];

  const scriptPattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(
    scriptPattern
  )) {
    const rawJson = decodeHtmlEntities(
      match[1]?.trim() ?? ""
    );

    if (!rawJson) {
      continue;
    }

    try {
      const parsed = JSON.parse(rawJson);
      collectJsonLdProducts(parsed, products);
    } catch {
      console.warn(
        "⚠️ DBI skipped malformed JSON-LD data."
      );
    }
  }

  return products;
}

function collectJsonLdProducts(
  value: unknown,
  products: JsonLdProduct[]
): void {
  if (Array.isArray(value)) {
    value.forEach((item) =>
      collectJsonLdProducts(item, products)
    );

    return;
  }

  if (!isRecord(value)) {
    return;
  }

  if (isProductType(value["@type"])) {
    products.push(value as JsonLdProduct);
  }

  const graph = value["@graph"];

  if (Array.isArray(graph)) {
    graph.forEach((item) =>
      collectJsonLdProducts(item, products)
    );
  }

  const mainEntity = value.mainEntity;

  if (mainEntity) {
    collectJsonLdProducts(
      mainEntity,
      products
    );
  }
}

function chooseBestJsonLdProduct(
  products: JsonLdProduct[]
): JsonLdProduct | null {
  if (products.length === 0) {
    return null;
  }

  return [...products].sort(
    (first, second) =>
      scoreJsonLdProduct(second) -
      scoreJsonLdProduct(first)
  )[0];
}

function scoreJsonLdProduct(
  product: JsonLdProduct
): number {
  let score = 0;

  if (readString(product.name)) score += 5;
  if (extractBrand(product.brand)) score += 3;
  if (readString(product.model)) score += 3;
  if (readString(product.sku)) score += 2;
  if (readString(product.mpn)) score += 3;
  if (product.offers) score += 4;
  if (product.image) score += 1;

  return score;
}

function extractMetadata(html: string) {
  return {
    ogTitle: readMeta(
      html,
      "property",
      "og:title"
    ),
    ogDescription: readMeta(
      html,
      "property",
      "og:description"
    ),
    ogImage: readMeta(
      html,
      "property",
      "og:image"
    ),

    twitterTitle: readMeta(
      html,
      "name",
      "twitter:title"
    ),
    twitterImage: readMeta(
      html,
      "name",
      "twitter:image"
    ),

    metaDescription: readMeta(
      html,
      "name",
      "description"
    ),

    productBrand:
      readMeta(
        html,
        "property",
        "product:brand"
      ) ??
      readMeta(
        html,
        "name",
        "product:brand"
      ),

    productModel:
      readMeta(
        html,
        "property",
        "product:model"
      ) ??
      readMeta(
        html,
        "name",
        "product:model"
      ),

    productPrice:
      readMeta(
        html,
        "property",
        "product:price:amount"
      ) ??
      readMeta(
        html,
        "name",
        "product:price:amount"
      ),

    productCurrency:
      readMeta(
        html,
        "property",
        "product:price:currency"
      ) ??
      readMeta(
        html,
        "name",
        "product:price:currency"
      ),

    productAvailability:
      readMeta(
        html,
        "property",
        "product:availability"
      ) ??
      readMeta(
        html,
        "name",
        "product:availability"
      ),

    productSku:
      readMeta(
        html,
        "property",
        "product:retailer_item_id"
      ) ??
      readMeta(html, "name", "sku"),

    productMpn:
      readMeta(html, "name", "mpn"),

    documentTitle: extractDocumentTitle(html),
  };
}

function readMeta(
  html: string,
  attributeName: "name" | "property",
  attributeValue: string
): string | null {
  const escaped = escapeRegExp(attributeValue);

  const firstPattern = new RegExp(
    `<meta\\b[^>]*${attributeName}=["']${escaped}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i"
  );

  const secondPattern = new RegExp(
    `<meta\\b[^>]*content=["']([^"']*)["'][^>]*${attributeName}=["']${escaped}["'][^>]*>`,
    "i"
  );

  const match =
    html.match(firstPattern) ??
    html.match(secondPattern);

  return cleanText(
    match?.[1]
      ? decodeHtmlEntities(match[1])
      : null
  );
}

function extractDocumentTitle(
  html: string
): string | null {
  const match = html.match(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i
  );

  return cleanText(
    match?.[1]
      ? decodeHtmlEntities(match[1])
      : null
  );
}

function extractBrand(
  value: unknown
): string | null {
  const direct = readString(value);

  if (direct) {
    return direct;
  }

  if (isRecord(value)) {
    return (
      readString(value.name) ??
      readString(value["@id"])
    );
  }

  return null;
}

function extractImage(
  value: unknown
): string | null {
  const direct = readString(value);

  if (direct) {
    return direct;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const image = extractImage(item);

      if (image) {
        return image;
      }
    }
  }

  if (isRecord(value)) {
    return (
      readString(value.url) ??
      readString(value.contentUrl)
    );
  }

  return null;
}

function extractBestOffer(
  value: unknown
): JsonLdOffer | null {
  if (Array.isArray(value)) {
    const offers = value.filter(isRecord);

    if (offers.length === 0) {
      return null;
    }

    const pricedOffer = offers.find(
      (offer) =>
        parsePrice(offer.price) !== null ||
        parsePrice(offer.lowPrice) !== null
    );

    return (pricedOffer ??
      offers[0]) as JsonLdOffer;
  }

  if (!isRecord(value)) {
    return null;
  }

  return value as JsonLdOffer;
}

function buildProductSearchQuery(input: {
  title: string;
  brand: string | null;
  model: string | null;
  sku: string | null;
  mpn: string | null;
}): string {
  const parts: string[] = [];

  addUniquePart(parts, input.brand);
  addUniquePart(parts, input.model);

  const cleanedTitle =
    cleanRetailerNoiseFromTitle(input.title);

  addUniquePart(parts, cleanedTitle);

  if (!input.model) {
    addUniquePart(parts, input.mpn);
  }

  if (
    !input.model &&
    !input.mpn
  ) {
    addUniquePart(parts, input.sku);
  }

  return parts
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function addUniquePart(
  parts: string[],
  value: string | null
): void {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return;
  }

  const normalisedValue =
    normaliseForComparison(cleaned);

  const alreadyIncluded = parts.some((part) => {
    const normalisedPart =
      normaliseForComparison(part);

    return (
      normalisedPart.includes(normalisedValue) ||
      normalisedValue.includes(normalisedPart)
    );
  });

  if (!alreadyIncluded) {
    parts.push(cleaned);
  }
}

function cleanRetailerNoiseFromTitle(
  title: string
): string {
  return title
    .replace(
      /\s*[|–—-]\s*(official\s+)?(online\s+)?store.*$/i,
      ""
    )
    .replace(
      /\s*[|–—-]\s*(buy|shop|order)\s+online.*$/i,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

function inferBrandFromTitle(
  title: string
): string | null {
  const knownBrands = [
    "ASUS",
    "Acer",
    "Apple",
    "Samsung",
    "Sony",
    "Microsoft",
    "Dell",
    "Lenovo",
    "HP",
    "LG",
    "Google",
    "Nintendo",
    "Canon",
    "Nikon",
    "Fujifilm",
    "Panasonic",
    "Bosch",
    "Dyson",
  ];

  const normalisedTitle =
    normaliseForComparison(title);

  return (
    knownBrands.find((brand) =>
      normalisedTitle.includes(
        normaliseForComparison(brand)
      )
    ) ?? null
  );
}

function inferModelFromTitle(
  title: string,
  brand: string | null
): string | null {
  let candidate = title;

  if (brand) {
    candidate = candidate.replace(
      new RegExp(
        `\\b${escapeRegExp(brand)}\\b`,
        "i"
      ),
      ""
    );
  }

  const modelPatterns = [
    /\b[A-Z]{1,5}[- ]?\d{2,}[A-Z0-9-]*\b/i,
    /\b[A-Z0-9]{2,}-[A-Z0-9-]{3,}\b/i,
    /\b(?:G|GX|GZ|GA|FX|UX|X|M|A)\d{3,4}[A-Z0-9-]*\b/i,
  ];

  for (const pattern of modelPatterns) {
    const match = candidate.match(pattern);

    if (match?.[0]) {
      return match[0].trim();
    }
  }

  return null;
}

function calculateConfidence(input: {
  title: string;
  brand: string | null;
  model: string | null;
  sku: string | null;
  mpn: string | null;
  gtin: string | null;
  price: number | null;
  hasJsonLd: boolean;
}): number {
  let confidence = 25;

  if (input.title.length >= 8) confidence += 15;
  if (input.brand) confidence += 10;
  if (input.model) confidence += 20;
  if (input.sku) confidence += 8;
  if (input.mpn) confidence += 12;
  if (input.gtin) confidence += 15;
  if (input.price !== null) confidence += 5;
  if (input.hasJsonLd) confidence += 10;

  return Math.min(confidence, 100);
}

function extractGtinFromProductId(
  value: unknown
): string | null {
  const productId = readString(value);

  if (!productId) {
    return null;
  }

  const match = productId.match(
    /\b\d{8,14}\b/
  );

  return match?.[0] ?? null;
}

function parsePrice(
  value: unknown
): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) &&
      value > 0
      ? value
      : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const match = value.match(
    /[\d,.]+/
  );

  if (!match) {
    return null;
  }

  const normalised = match[0]
    .replace(/,/g, "");

  const parsed = Number(normalised);

  return Number.isFinite(parsed) &&
    parsed > 0
    ? parsed
    : null;
}

function simplifyAvailability(
  value: string | null
): string | null {
  if (!value) {
    return null;
  }

  const finalPart =
    value.split("/").pop() ?? value;

  return finalPart
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function inferCurrencyFromPage(
  html: string
): string | null {
  if (
    html.includes("£") ||
    /GBP/i.test(html)
  ) {
    return "GBP";
  }

  if (
    html.includes("€") ||
    /EUR/i.test(html)
  ) {
    return "EUR";
  }

  if (
    html.includes("$") ||
    /USD/i.test(html)
  ) {
    return "USD";
  }

  return null;
}

function isProductType(
  value: unknown
): boolean {
  if (typeof value === "string") {
    return value
      .toLowerCase()
      .includes("product");
  }

  if (Array.isArray(value)) {
    return value.some(isProductType);
  }

  return false;
}

function readString(
  value: unknown
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  return cleanText(value);
}

function cleanText(
  value: string | null | undefined
): string | null {
  if (!value) {
    return null;
  }

  const cleaned = decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || null;
}



function normaliseForComparison(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function escapeRegExp(
  value: string
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}
