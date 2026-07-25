import type {
  ProductModelFingerprint,
} from "../types";

function normaliseCpuModel(
  value: string
): string {
  return value
    .replace(/\s+/g, " ")
    .trim();
}

function extractIntelModel(
  title: string
): string | null {
  const coreUltraMatch = title.match(
    /\b(Core\s+Ultra\s+[3579]\s+\d{3}[A-Z]{0,2})\b/i
  );

  if (coreUltraMatch) {
    return normaliseCpuModel(
      coreUltraMatch[1]
    );
  }

  const coreMatch = title.match(
    /\b(Core\s+i[3579]-\d{4,5}[A-Z]{0,3})\b/i
  );

  if (coreMatch) {
    return normaliseCpuModel(
      coreMatch[1]
    );
  }

  return null;
}

function extractAmdModel(
  title: string
): string | null {
  const match = title.match(
    /\b(Ryzen\s+[3579]\s+\d{4}[A-Z0-9]{0,4})\b/i
  );

  if (!match) {
    return null;
  }

  return normaliseCpuModel(match[1]);
}

function extractGeneration(
  title: string
): string | null {
  const match = title.match(
    /\b(\d{1,2}(?:st|nd|rd|th)\s+Gen(?:eration)?)\b/i
  );

  if (!match) {
    return null;
  }

  return match[1]
    .replace(/generation/i, "Gen")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCpuVariant(
  title: string
): string | null {
  if (/\btray\b/i.test(title)) {
    return "Tray";
  }

  if (/\bboxed\b/i.test(title)) {
    return "Boxed";
  }

  if (/\boem\b/i.test(title)) {
    return "OEM";
  }

  return null;
}

export function parseCpuModel(
  title: string
): Partial<ProductModelFingerprint> {
  return {
    base:
      extractIntelModel(title) ??
      extractAmdModel(title),

    revision: extractGeneration(title),

    variant: extractCpuVariant(title),
  };
}