import * as cheerio from "cheerio";
import type { ProductInfo } from "./types";

type JsonLdValue = Record<string, unknown>;

export async function scrapeCurrys(url: string): Promise<ProductInfo> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/150 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Currys returned ${response.status} ${response.statusText}`
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const productJson = findProductJsonLd($);

  const name =
    readString(productJson?.name) ||
    readMeta($, 'meta[property="og:title"]') ||
    $("h1").first().text().trim();

  const image =
    readImage(productJson?.image) ||
    readMeta($, 'meta[property="og:image"]');

  const brand =
    readNestedString(productJson?.brand, "name") ||
    guessBrand(name);

  const model =
    readString(productJson?.model) ||
    readString(productJson?.sku) ||
    extractModelFromName(name);

  const category =
    readString(productJson?.category) ||
    readMeta($, 'meta[property="product:category"]') ||
    "Unknown";

  const price =
    readPrice(productJson?.offers) ??
    readNumber(readMeta($, 'meta[property="product:price:amount"]'));

  if (!name) {
    throw new Error(
      "Deal Beater could not identify the product on this Currys page."
    );
  }

  return {
    name: cleanProductName(name),
    brand: brand || "Unknown",
    model: model || "Unknown",
    category,
    price: price ?? 0,
    image: image || undefined,
    specs: extractSpecifications($),
  };
}

function findProductJsonLd(
  $: cheerio.CheerioAPI
): JsonLdValue | null {
  let product: JsonLdValue | null = null;

  $('script[type="application/ld+json"]').each((_, element) => {
    if (product) {
      return;
    }

    const rawJson = $(element).html();

    if (!rawJson) {
      return;
    }

    try {
      const parsed = JSON.parse(rawJson) as unknown;
      const possibleProducts = flattenJsonLd(parsed);

      const match = possibleProducts.find((item) => {
        const type = item["@type"];

        return (
          type === "Product" ||
          (Array.isArray(type) && type.includes("Product"))
        );
      });

      if (match) {
        product = match;
      }
    } catch {
      // Ignore malformed JSON-LD and continue searching.
    }
  });

  return product;
}

function flattenJsonLd(value: unknown): JsonLdValue[] {
  if (Array.isArray(value)) {
    return value.flatMap(flattenJsonLd);
  }

  if (!isRecord(value)) {
    return [];
  }

  const values = [value];

  if (Array.isArray(value["@graph"])) {
    values.push(...value["@graph"].flatMap(flattenJsonLd));
  }

  return values;
}

function extractSpecifications(
  $: cheerio.CheerioAPI
): Record<string, string> {
  const specifications: Record<string, string> = {};

  $("table tr").each((_, row) => {
    const cells = $(row).find("th, td");

    if (cells.length < 2) {
      return;
    }

    const key = $(cells[0]).text().replace(/\s+/g, " ").trim();
    const value = $(cells[1]).text().replace(/\s+/g, " ").trim();

    if (key && value && !specifications[key]) {
      specifications[key] = value;
    }
  });

  $("dl").each((_, list) => {
    const terms = $(list).find("dt");

    terms.each((_, term) => {
      const key = $(term).text().replace(/\s+/g, " ").trim();
      const value = $(term)
        .next("dd")
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (key && value && !specifications[key]) {
        specifications[key] = value;
      }
    });
  });

  return specifications;
}

function readPrice(offers: unknown): number | null {
  if (Array.isArray(offers)) {
    for (const offer of offers) {
      const price = readPrice(offer);

      if (price !== null) {
        return price;
      }
    }

    return null;
  }

  if (!isRecord(offers)) {
    return null;
  }

  return (
    readNumber(offers.price) ??
    readNumber(offers.lowPrice) ??
    readNumber(offers.highPrice)
  );
}

function readImage(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const firstImage = value.find(
      (item): item is string => typeof item === "string"
    );

    return firstImage ?? "";
  }

  if (isRecord(value)) {
    return readString(value.url);
  }

  return "";
}

function readNestedString(
  value: unknown,
  key: string
): string {
  if (typeof value === "string") {
    return value;
  }

  if (!isRecord(value)) {
    return "";
  }

  return readString(value[key]);
}

function readMeta(
  $: cheerio.CheerioAPI,
  selector: string
): string {
  return $(selector).attr("content")?.trim() ?? "";
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number.parseFloat(
    value.replace(/[£,\s]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : null;
}

function guessBrand(name: string): string {
  return name.split(/\s+/)[0] ?? "";
}

function extractModelFromName(name: string): string {
  const parts = name
    .replace(/\s*[-|]\s*Currys.*$/i, "")
    .split(/\s+/)
    .filter(Boolean);

  return parts.slice(1, 4).join(" ");
}

function cleanProductName(name: string): string {
  return name
    .replace(/\s*[-|]\s*Currys.*$/i, "")
    .replace(/\s+/g, " ")
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