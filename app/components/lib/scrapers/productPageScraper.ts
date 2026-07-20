import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { load } from "cheerio";

const REQUEST_TIMEOUT_MS = 4_000;
const MAX_RESPONSE_BYTES = 2_000_000;
const MAX_VISIBLE_TEXT_LENGTH = 12_000;
const MAX_REDIRECTS = 4;

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
]);

const PRODUCT_TEXT_SELECTORS = [
  "main",
  "[role='main']",
  "[itemtype*='Product']",
  "[data-testid*='product']",
  "[class*='product-detail']",
  "[class*='productDetail']",
  "[class*='product-info']",
  "[class*='productInfo']",
  "#product",
  ".product",
];

interface ProductJsonLd {
  name?: unknown;
  description?: unknown;
  sku?: unknown;
  mpn?: unknown;
  gtin?: unknown;
  gtin8?: unknown;
  gtin12?: unknown;
  gtin13?: unknown;
  gtin14?: unknown;
  brand?: unknown;
  offers?: unknown;
  aggregateRating?: unknown;
}

interface OfferJsonLd {
  price?: unknown;
  lowPrice?: unknown;
  highPrice?: unknown;
  priceCurrency?: unknown;
  availability?: unknown;
  url?: unknown;
  seller?: unknown;
}

interface RatingJsonLd {
  ratingValue?: unknown;
  reviewCount?: unknown;
  ratingCount?: unknown;
}

export interface ScrapedProductPage {
  requestedUrl: string;
  finalUrl: string;
  retailer: string;
  title?: string;
  productName?: string;
  description?: string;
  image?: string;
  brand?: string;
  model?: string;
  sku?: string;
  price?: string;
  currency?: string;
  availability?: string;
  rating?: string;
  reviewCount?: string;
  visibleText?: string;
  evidence: string;
}

export async function scrapeProductPage(
  rawUrl: string
): Promise<ScrapedProductPage> {
  const requestedUrl = normaliseUrl(rawUrl);

  await assertSafeUrl(requestedUrl);

  const response = await fetchWithSafeRedirects(requestedUrl);

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

  if (
    !contentType.includes("text/html") &&
    !contentType.includes("application/xhtml+xml")
  ) {
    throw new Error(
      "That link did not return a readable product webpage."
    );
  }

  const html = await readLimitedResponse(response);
  const finalUrl = response.url || requestedUrl.toString();

  const $ = load(html);

  $("script:not([type='application/ld+json'])").remove();
  $("style, noscript, iframe, svg, canvas").remove();
  $("nav, footer, header, aside").remove();

  const jsonLdObjects = extractJsonLd($);
  const productJsonLd = findProductJsonLd(jsonLdObjects);
  const offerJsonLd = extractOffer(productJsonLd?.offers);
  const ratingJsonLd = extractRating(productJsonLd?.aggregateRating);

  const title = firstUsefulString([
    getMetaContent($, "meta[property='og:title']"),
    getMetaContent($, "meta[name='twitter:title']"),
    $("title").first().text(),
  ]);

  const productName = firstUsefulString([
    asString(productJsonLd?.name),
    getMetaContent($, "meta[property='product:name']"),
    $("h1").first().text(),
    title,
  ]);

  const description = firstUsefulString([
    asString(productJsonLd?.description),
    getMetaContent($, "meta[property='og:description']"),
    getMetaContent($, "meta[name='description']"),
  ]);

  const image = firstUsefulString([
  getMetaContent($, "meta[property='og:image']"),
  getMetaContent($, "meta[name='twitter:image']"),
  $("img[itemprop='image']").first().attr("src"),
]);

  const brand = firstUsefulString([
    extractBrand(productJsonLd?.brand),
    getMetaContent($, "meta[property='product:brand']"),
    findLabelValue($, ["brand", "manufacturer"]),
  ]);

  const model = firstUsefulString([
    asString(productJsonLd?.mpn),
    findLabelValue($, [
      "model",
      "model number",
      "product code",
      "manufacturer part number",
    ]),
  ]);

  const sku = firstUsefulString([
    asString(productJsonLd?.sku),
    asString(productJsonLd?.gtin),
    asString(productJsonLd?.gtin8),
    asString(productJsonLd?.gtin12),
    asString(productJsonLd?.gtin13),
    asString(productJsonLd?.gtin14),
    findLabelValue($, ["sku", "product code", "item number"]),
  ]);

  const price = firstUsefulString([
    formatStructuredPrice(offerJsonLd),
    getMetaContent($, "meta[property='product:price:amount']"),
    getMetaContent($, "meta[itemprop='price']"),
    $("[itemprop='price']").first().attr("content"),
    $("[itemprop='price']").first().text(),
    findVisiblePrice($),
  ]);

  const currency = firstUsefulString([
    asString(offerJsonLd?.priceCurrency),
    getMetaContent($, "meta[property='product:price:currency']"),
    $("[itemprop='priceCurrency']").first().attr("content"),
    inferCurrency(price),
  ]);

  const availability = firstUsefulString([
    cleanAvailability(asString(offerJsonLd?.availability)),
    getMetaContent($, "meta[property='product:availability']"),
    $("[itemprop='availability']").first().attr("href"),
    $("[itemprop='availability']").first().text(),
  ]);

  const rating = firstUsefulString([
    asString(ratingJsonLd?.ratingValue),
    $("[itemprop='ratingValue']").first().attr("content"),
    $("[itemprop='ratingValue']").first().text(),
  ]);

  const reviewCount = firstUsefulString([
    asString(ratingJsonLd?.reviewCount),
    asString(ratingJsonLd?.ratingCount),
    $("[itemprop='reviewCount']").first().attr("content"),
    $("[itemprop='ratingCount']").first().attr("content"),
  ]);

  const visibleText = extractRelevantVisibleText($);

  const retailer = getRetailerName(new URL(finalUrl));

  const evidence = buildEvidence({
    requestedUrl: requestedUrl.toString(),
    finalUrl,
    retailer,
    title,
    productName,
    description,
    image,
    brand,
    model,
    sku,
    price,
    currency,
    availability,
    rating,
    reviewCount,
    visibleText,
  });
console.log("SCRAPER IMAGE:", image);
  return {
    requestedUrl: requestedUrl.toString(),
    finalUrl,
    retailer,
    title,
    image,
    productName,
    description,
    brand,
    model,
    sku,
    price,
    currency,
    availability,
    rating,
    reviewCount,
    visibleText,
    evidence,
  };
}

function normaliseUrl(rawUrl: string): URL {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    throw new Error("A product link is required.");
  }

  let url: URL;

  try {
    url = new URL(trimmed);
  } catch {
    try {
      url = new URL(`https://${trimmed}`);
    } catch {
      throw new Error("Please enter a valid product link.");
    }
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS product links are supported.");
  }

  url.username = "";
  url.password = "";

  return url;
}

async function assertSafeUrl(url: URL): Promise<void> {
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");

  if (
    !hostname ||
    BLOCKED_HOSTNAMES.has(hostname) ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error("That address cannot be accessed.");
  }

  if (isIP(hostname)) {
    if (isPrivateAddress(hostname)) {
      throw new Error("Private network addresses are not supported.");
    }

    return;
  }

  let addresses: Array<{
  address: string;
  family: number;
}>;

  try {
    addresses = await lookup(hostname, {
      all: true,
      verbatim: true,
    });
  } catch {
    throw new Error("The retailer address could not be resolved.");
  }

  if (!addresses.length) {
    throw new Error("The retailer address could not be resolved.");
  }

  if (addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Private network addresses are not supported.");
  }
}

async function fetchWithSafeRedirects(
  initialUrl: URL
): Promise<Response> {
  let currentUrl = initialUrl;

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount++) {
    await assertSafeUrl(currentUrl);

    const response = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
        "Cache-Control": "no-cache",
        "User-Agent":
          "Mozilla/5.0 (compatible; DealBeaterBot/1.0; +https://dealbeater.co.uk)",
      },
    });

    if (isRedirect(response.status)) {
      const location = response.headers.get("location");

      if (!location) {
        throw new Error("The retailer returned an invalid redirect.");
      }

      currentUrl = new URL(location, currentUrl);
      continue;
    }

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error(
          "This retailer blocked automated product-page access."
        );
      }

      throw new Error(
        `The retailer returned an error (${response.status}).`
      );
    }

    const declaredLength = Number(
      response.headers.get("content-length") ?? "0"
    );

    if (
      Number.isFinite(declaredLength) &&
      declaredLength > MAX_RESPONSE_BYTES
    ) {
      throw new Error("The retailer page was too large to analyse safely.");
    }

    return response;
  }

  throw new Error("The retailer link redirected too many times.");
}

async function readLimitedResponse(response: Response): Promise<string> {
  if (!response.body) {
    return response.text();
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let html = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      received += value.byteLength;

      if (received > MAX_RESPONSE_BYTES) {
        await reader.cancel();

        throw new Error(
          "The retailer page was too large to analyse safely."
        );
      }

      html += decoder.decode(value, {
        stream: true,
      });
    }

    html += decoder.decode();

    return html;
  } finally {
    reader.releaseLock();
  }
}

function extractJsonLd(
  $: ReturnType<typeof load>
): unknown[] {
  const objects: unknown[] = [];

  $("script[type='application/ld+json']").each((_, element) => {
    const raw = $(element).text().trim();

    if (!raw) {
      return;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      flattenJsonLd(parsed, objects);
    } catch {
      // Some retailer JSON-LD blocks are malformed.
      // Ignore the broken block and continue using other evidence.
    }
  });

  return objects;
}

function flattenJsonLd(value: unknown, output: unknown[]): void {
  if (Array.isArray(value)) {
    value.forEach((item) => flattenJsonLd(item, output));
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  output.push(value);

  if (Array.isArray(value["@graph"])) {
    value["@graph"].forEach((item) => flattenJsonLd(item, output));
  }
}

function findProductJsonLd(
  objects: unknown[]
): ProductJsonLd | undefined {
  for (const object of objects) {
    if (!isRecord(object)) {
      continue;
    }

    const type = object["@type"];
    const types = Array.isArray(type) ? type : [type];

    if (
      types.some(
        (item) =>
          typeof item === "string" &&
          item.toLowerCase() === "product"
      )
    ) {
      return object as ProductJsonLd;
    }
  }

  return undefined;
}

function extractOffer(value: unknown): OfferJsonLd | undefined {
  const first = Array.isArray(value) ? value[0] : value;

  if (!isRecord(first)) {
    return undefined;
  }

  if (isRecord(first.offers)) {
    return first.offers as OfferJsonLd;
  }

  return first as OfferJsonLd;
}

function extractRating(value: unknown): RatingJsonLd | undefined {
  const first = Array.isArray(value) ? value[0] : value;

  return isRecord(first)
    ? (first as RatingJsonLd)
    : undefined;
}

function extractBrand(value: unknown): string | undefined {
  if (typeof value === "string") {
    return cleanText(value);
  }

  if (isRecord(value)) {
    return firstUsefulString([
      asString(value.name),
      asString(value["@id"]),
    ]);
  }

  return undefined;
}

function formatStructuredPrice(
  offer: OfferJsonLd | undefined
): string | undefined {
  if (!offer) {
    return undefined;
  }

  const price = firstUsefulString([
    asString(offer.price),
    asString(offer.lowPrice),
    asString(offer.highPrice),
  ]);

  if (!price) {
    return undefined;
  }

  const currency = asString(offer.priceCurrency);

  return currency ? `${currency} ${price}` : price;
}

function findVisiblePrice(
  $: ReturnType<typeof load>
): string | undefined {
  const selectors = [
    "[data-testid*='price']",
    "[class*='price-current']",
    "[class*='current-price']",
    "[class*='sale-price']",
    "[class*='product-price']",
    "[class*='productPrice']",
    "[class~='price']",
  ];

  for (const selector of selectors) {
    const values = $(selector)
      .map((_, element) => cleanText($(element).text()))
      .get()
      .filter(Boolean);

    for (const value of values) {
      const match = value.match(
        /(?:£|GBP\s*)\s?\d{1,6}(?:[,.]\d{2})?/
      );

      if (match) {
        return match[0];
      }
    }
  }

  return undefined;
}

function findLabelValue(
  $: ReturnType<typeof load>,
  labels: string[]
): string | undefined {
  const wantedLabels = labels.map((label) => label.toLowerCase());

  const candidates = $("dt, th, [class*='label'], [class*='spec']")
    .toArray();

  for (const element of candidates) {
    const label = cleanText($(element).text()).toLowerCase();

    if (!wantedLabels.some((wanted) => label === wanted || label.includes(wanted))) {
      continue;
    }

    const value = firstUsefulString([
      $(element).next("dd").text(),
      $(element).next("td").text(),
      $(element).next().text(),
    ]);

    if (value && value.toLowerCase() !== label) {
      return value;
    }
  }

  return undefined;
}

function extractRelevantVisibleText(
  $: ReturnType<typeof load>
): string | undefined {
  let text = "";

  for (const selector of PRODUCT_TEXT_SELECTORS) {
    const candidate = cleanText($(selector).first().text());

    if (candidate.length > text.length) {
      text = candidate;
    }
  }

  if (!text) {
    text = cleanText($("body").text());
  }

  if (!text) {
    return undefined;
  }

  return text.slice(0, MAX_VISIBLE_TEXT_LENGTH);
}

function buildEvidence(
  page: Omit<ScrapedProductPage, "evidence">
): string {
  const lines = [
    "VERIFIED RETAILER PAGE EVIDENCE",
    "",
    `Requested URL: ${page.requestedUrl}`,
    `Final URL: ${page.finalUrl}`,
    `Retailer/domain: ${page.retailer}`,
    `Page title: ${page.title ?? "Not found"}`,
    `Product name: ${page.productName ?? "Not found"}`,
    `Brand: ${page.brand ?? "Not found"}`,
    `Model/MPN: ${page.model ?? "Not found"}`,
    `SKU/GTIN: ${page.sku ?? "Not found"}`,
    `Price: ${page.price ?? "Not found"}`,
    `Currency: ${page.currency ?? "Not found"}`,
    `Availability: ${page.availability ?? "Not found"}`,
    `Rating: ${page.rating ?? "Not found"}`,
    `Review count: ${page.reviewCount ?? "Not found"}`,
    `Description: ${page.description ?? "Not found"}`,
  ];

  if (page.visibleText) {
    lines.push(
      "",
      "Relevant visible product-page text:",
      page.visibleText
    );
  }

  lines.push(
    "",
    "Treat only the information above as verified page evidence.",
    "Anything marked 'Not found' remains unknown and must not be invented."
  );

  return lines.join("\n");
}

function getMetaContent(
  $: ReturnType<typeof load>,
  selector: string
): string | undefined {
  return firstUsefulString([
    $(selector).first().attr("content"),
  ]);
}

function getRetailerName(url: URL): string {
  return url.hostname
    .replace(/^www\./i, "")
    .split(".")[0]
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function cleanAvailability(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const cleaned = value
    .replace(/^https?:\/\/schema\.org\//i, "")
    .replace(/^https?:\/\/www\.schema\.org\//i, "");

  return cleanText(cleaned);
}

function inferCurrency(price: string | undefined): string | undefined {
  if (!price) {
    return undefined;
  }

  if (price.includes("£") || /\bGBP\b/i.test(price)) {
    return "GBP";
  }

  if (price.includes("€") || /\bEUR\b/i.test(price)) {
    return "EUR";
  }

  if (price.includes("$") || /\bUSD\b/i.test(price)) {
    return "USD";
  }

  return undefined;
}

function firstUsefulString(
  values: Array<string | undefined | null>
): string | undefined {
  for (const value of values) {
    const cleaned = cleanText(value);

    if (cleaned) {
      return cleaned;
    }
  }

  return undefined;
}

function cleanText(value: string | undefined | null): string {
  return (value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function asString(value: unknown): string | undefined {
  if (typeof value === "string" || typeof value === "number") {
    return cleanText(String(value));
  }

  return undefined;
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

function isRedirect(status: number): boolean {
  return [301, 302, 303, 307, 308].includes(status);
}

function isPrivateAddress(address: string): boolean {
  const normalised = address.toLowerCase();

  if (normalised === "::1" || normalised === "::") {
    return true;
  }

  if (normalised.startsWith("::ffff:")) {
    return isPrivateAddress(normalised.slice(7));
  }

  if (
    normalised.startsWith("fc") ||
    normalised.startsWith("fd") ||
    normalised.startsWith("fe8") ||
    normalised.startsWith("fe9") ||
    normalised.startsWith("fea") ||
    normalised.startsWith("feb")
  ) {
    return true;
  }

  const parts = normalised.split(".").map(Number);

  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isInteger(part))
  ) {
    return false;
  }

  const [a, b] = parts;

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}