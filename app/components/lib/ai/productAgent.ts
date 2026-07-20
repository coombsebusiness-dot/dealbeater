import { scrapeCurrys } from "../scrapers/currys";
import type { ProductInfo } from "../scrapers/types";


export type ProductData = ProductInfo & {
  confidence: number;
  retailer?: string;
  colour?: string;
  variant?: string;
};

export async function productAgent(
  input: string
): Promise<ProductData> {
  const cleanInput = input.trim();

  console.log("========================================");
  console.log("🚀 PRODUCT AGENT START");
  console.log("Input:", cleanInput);
  console.log("========================================");

  if (!cleanInput) {
    throw new Error(
      "A product link or description is required."
    );
  }

  if (!isValidUrl(cleanInput)) {
    console.log("📝 Input is a description");

    return productFromDescription(cleanInput);
  }

  const url = new URL(cleanInput);
  const hostname = url.hostname.replace(/^www\./, "");

  console.log("🌍 URL detected:", hostname);

  if (
    hostname === "currys.co.uk" ||
    hostname.endsWith(".currys.co.uk")
  ) {
    try {
      console.log("🛒 Attempting Currys scrape...");

      const scrapedProduct = await scrapeCurrys(
        cleanInput
      );

      console.log(
        "📦 Currys returned:",
        scrapedProduct
      );

      if (
        scrapedProduct.price !== null &&
        Number.isFinite(scrapedProduct.price) &&
        scrapedProduct.price > 0
      ) {
        console.log(
          "✅ Using Currys scraped product"
        );

        

        return {
  ...scrapedProduct,
  confidence: 98,
  retailer: "Currys",
  colour: extractColour(
    `${scrapedProduct.name} ${scrapedProduct.model}`
  ),
  variant: extractVariant(
    `${scrapedProduct.name} ${scrapedProduct.model}`
  ),
};
      }

      console.warn(
        "⚠️ Currys returned an invalid price. Falling back to URL parsing."
      );

      return productFromUrl(url, "Currys");
    } catch (error) {
      console.warn(
        "❌ Currys scrape failed. Falling back to URL parsing."
      );

      console.error(error);

      return productFromUrl(url, "Currys");
    }
  }

  console.log(
    "🔄 Non-Currys URL. Using URL parser."
  );

  return productFromUrl(
  url,
  identifyRetailer(hostname)
);
}

function productFromUrl(
  url: URL,
  retailer?: string
): ProductData {
  const finalPathSegment =
    url.pathname
      .split("/")
      .filter(Boolean)
      .pop() ?? "";

  const slug = finalPathSegment
    .replace(/\.(html?|php)$/i, "")
    .replace(/-\d+$/, "");

  const words = slug
    .split(/[-_]/)
    .filter(Boolean)
    .map(capitaliseWord);

  const name =
    words.length > 0
      ? words.join(" ")
      : "Product awaiting identification";

  const price = extractPrice(url.toString());

  console.log("========================================");
  console.log("🔎 URL PARSER");
  console.log("Slug:", slug);
  console.log("Product:", name);
  console.log("Retailer:", retailer);
  console.log("Extracted price:", price);
  console.log("========================================");

  return {
    name,
    brand: words[0] ?? "Not identified",
    model:
      words.length > 1
        ? words.slice(1, 5).join(" ")
        : "Not identified",
    category: identifyCategory(name),
    price,
    specs: {},
    confidence: words.length >= 2 ? 70 : 45,
    retailer,
    colour: extractColour(name),
    variant: extractVariant(name),
  };

}

function productFromDescription(
  description: string
): ProductData {
  const words = description
    .split(/\s+/)
    .filter(Boolean);

  const price = extractPrice(description);

  console.log("========================================");
  console.log("📝 DESCRIPTION PARSER");
  console.log("Description:", description);
  console.log("Extracted price:", price);
  console.log("========================================");

  const product: ProductData = {
  name: description,
  brand: words[0] ?? "Not identified",
  model:
    words.length > 1
      ? words.slice(1, 5).join(" ")
      : "Not identified",
  category: identifyCategory(description),
  price,
  specs: {},
  confidence: words.length >= 2 ? 55 : 35,
  colour: extractColour(description),
  variant: extractVariant(description),
};



return product;
}

function identifyCategory(name: string): string {
  const value = name.toLowerCase();

  if (value.includes("laptop")) {
    return "Laptop";
  }

  if (
    value.includes("tv") ||
    value.includes("television")
  ) {
    return "Television";
  }

  if (
    value.includes("vacuum") ||
    value.includes("shark")
  ) {
    return "Floor care";
  }

  if (value.includes("fridge")) {
    return "Fridge";
  }

  if (value.includes("washing machine")) {
    return "Washing machine";
  }

  if (value.includes("camera")) {
    return "Camera";
  }

  if (
    value.includes("phone") ||
    value.includes("iphone") ||
    value.includes("galaxy")
  ) {
    return "Mobile phone";
  }

  if (
    value.includes("headphone") ||
    value.includes("earbud") ||
    value.includes("airpods")
  ) {
    return "Headphones";
  }

  if (
    value.includes("tablet") ||
    value.includes("ipad")
  ) {
    return "Tablet";
  }

  return "General product";
}

function capitaliseWord(word: string): string {
  const upperCaseWords = new Set([
    "tv",
    "oled",
    "qled",
    "uhd",
    "hd",
    "ssd",
    "ram",
    "ai",
    "usb",
    "led",
    "hdr",
    "wifi",
  ]);

  const lowerCaseWord = word.toLowerCase();

  if (upperCaseWords.has(lowerCaseWord)) {
    return lowerCaseWord.toUpperCase();
  }

  return (
    word.charAt(0).toUpperCase() +
    word.slice(1)
  );
}

function extractPrice(
  value: string
): number | null {
  const decodedValue = decodeURIComponent(value);

  const pricePatterns = [
    /£\s*([\d,]+(?:\.\d{1,2})?)/i,
    /(?:price|cost)[-_\s:=]*([\d,]+(?:\.\d{1,2})?)/i,
    /([\d,]+(?:\.\d{1,2})?)[-_\s]*(?:gbp|pounds?)/i,
  ];

  console.log(
    "💷 Looking for price in:",
    decodedValue
  );

  for (const pattern of pricePatterns) {
    const match = decodedValue.match(pattern);

    if (!match?.[1]) {
      continue;
    }

    const parsedPrice = Number(
      match[1].replace(/,/g, "")
    );

    console.log("💷 Regex matched:", match[1]);
    console.log("💷 Parsed price:", parsedPrice);

    if (
      Number.isFinite(parsedPrice) &&
      parsedPrice > 0
    ) {
      return parsedPrice;
    }
  }

  console.log("⚠️ No price found");

  return null;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}
function identifyRetailer(
  hostname: string
): string | undefined {
  const retailerMap: Record<string, string> = {
    "amazon.co.uk": "Amazon",
    "currys.co.uk": "Currys",
    "johnlewis.com": "John Lewis",
    "argos.co.uk": "Argos",
    "very.co.uk": "Very",
    "ao.com": "AO",
    "ebay.co.uk": "eBay",
    "samsung.com": "Samsung",
    "apple.com": "Apple",
  };

  const matchedDomain = Object.keys(
    retailerMap
  ).find(
    domain =>
      hostname === domain ||
      hostname.endsWith(`.${domain}`)
  );

  return matchedDomain
    ? retailerMap[matchedDomain]
    : undefined;
}

function extractColour(
  value: string
): string | undefined {
  const colours = [
    "Black",
    "White",
    "Silver",
    "Grey",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Gold",
    "Pink",
    "Purple",
    "Orange",
    "Cream",
    "Beige",
    "Graphite",
    "Titanium",
    "Midnight",
  ];

  const matchedColour = colours.find(colour =>
    new RegExp(`\\b${colour}\\b`, "i").test(value)
  );

  if (matchedColour === "Gray") {
    return "Grey";
  }

  return matchedColour;
}

function extractVariant(
  value: string
): string | undefined {
  const storageMatch = value.match(
    /\b(\d+(?:\.\d+)?)\s*(TB|GB)\b/i
  );

  if (storageMatch) {
    return `${storageMatch[1]}${storageMatch[2].toUpperCase()}`;
  }

  const sizeMatch = value.match(
    /\b(\d+(?:\.\d+)?)\s*(inch|inches|")\b/i
  );

  if (sizeMatch) {
    return `${sizeMatch[1]}-inch`;
  }

  const generationMatch = value.match(
    /\b(\d+(?:st|nd|rd|th)?\s+generation)\b/i
  );

  if (generationMatch) {
    return generationMatch[1];
  }

  return undefined;
}