import type { ProductType } from "../types";

const SKU_PATTERNS: RegExp[] = [
  // Apple-style part numbers:
  // MRYN3B/A, MXD13LL/A, MQKW3ZE/A
  /\b([A-Z0-9]{5,12}\/[A-Z])\b/i,

  // Manufacturer codes containing letters, numbers and hyphens:
  // M1607KA-MB148W, A2681, SM-S928B
  /\b([A-Z]{1,5}\d[A-Z0-9]*(?:-[A-Z0-9]+)+)\b/i,

  // Codes such as ILCE-7M4, DSC-RX100M7
  /\b([A-Z]{2,8}-[A-Z0-9-]{2,20})\b/i,
];

const EXCLUDED_SKU_VALUES = new Set([
  "WI-FI",
  "USB-C",
  "HDMI-2",
  "BODY-ONLY",
  "OPEN-BOX",
]);

function cleanSku(value: string): string {
  return value
    .trim()
    .replace(/[.,;:]+$/, "")
    .toUpperCase();
}

function extractKnownCategorySku(
  title: string,
  productType: ProductType
): string | null {
  switch (productType) {
    case "phone": {
      const samsungModel = title.match(
        /\b(SM-[A-Z0-9]{4,12})\b/i
      );

      if (samsungModel) {
        return cleanSku(samsungModel[1]);
      }

      break;
    }

    case "camera": {
      const sonyModel = title.match(
        /\b(ILCE-[A-Z0-9-]+|DSC-[A-Z0-9-]+)\b/i
      );

      if (sonyModel) {
        return cleanSku(sonyModel[1]);
      }

      break;
    }

    case "laptop": {
      const laptopSku = title.match(
        /\b([A-Z0-9]{3,12}-[A-Z0-9]{3,12})\b/i
      );

      if (laptopSku) {
        const value = cleanSku(laptopSku[1]);

        if (!EXCLUDED_SKU_VALUES.has(value)) {
          return value;
        }
      }

      break;
    }
  }

  return null;
}

export function extractSku(
  title: string,
  productType: ProductType
): string | null {
  const categorySku = extractKnownCategorySku(
    title,
    productType
  );

  if (categorySku) {
    return categorySku;
  }

  for (const pattern of SKU_PATTERNS) {
    const match = title.match(pattern);

    if (!match) {
      continue;
    }

    const value = cleanSku(match[1]);

    if (!EXCLUDED_SKU_VALUES.has(value)) {
      return value;
    }
  }

  return null;
}