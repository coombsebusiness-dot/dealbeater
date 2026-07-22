export function extractAsin(
  url: string
): string | null {
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

export function canonicalAmazonUrl(
  asin: string
): string {
  return `https://www.amazon.co.uk/dp/${asin}`;
}

export function parsePrice(
  price: string
): number | null {
  const cleaned = price
    .replace(/[^\d.,]/g, "")
    .replace(/,/g, "");

  if (!cleaned) {
    return null;
  }

  const value = Number.parseFloat(cleaned);

  return Number.isFinite(value)
    ? value
    : null;
}

export function cleanAmazonTitle(
  title: string
): string {
  return title
    .replace(/\s+/g, " ")
    .trim();
}