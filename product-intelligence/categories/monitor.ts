import type { FingerprintPatch } from "../types";

function extractMonitorModel(title: string): string | null {
  const brandedModels: RegExp[] = [
    /\b(ODYSSEY\s+G\d{1,2})\b/i,
    /\b(THINKVISION\s+M\d{1,3})\b/i,
  ];

  for (const pattern of brandedModels) {
    const match = title.match(pattern);

    if (match) {
      return match[1]
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\bOdyssey\b/i, "Odyssey")
        .replace(/\bThinkVision\b/i, "ThinkVision");
    }
  }

  const modelPatterns: RegExp[] = [
    /\b([A-Z]{2}\d{2}[A-Z]\d[A-Z]{2})\b/i,
    /\b(\d{2}[A-Z]{2}\d{2}[A-Z]-[A-Z0-9])\b/i,
    /\b([A-Z]{1,4}\d{3,6}[A-Z]{0,5})\b/i,
    /\b([A-Z]{1,4}\d{2}[A-Z]{1,4}\d{0,4})\b/i,
  ];

  for (const pattern of modelPatterns) {
    const match = title.match(pattern);

    if (match) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

function extractResolution(title: string): string | null {
  const explicitResolution = title.match(
    /\b(\d{3,4})\s*[xX×]\s*(\d{3,4})\b/
  );

  if (explicitResolution) {
    return `${explicitResolution[1]}x${explicitResolution[2]}`;
  }

  if (/\b(?:DUAL\s+QHD|DQHD)\b/i.test(title)) {
    return "5120x1440";
  }

  if (/\b(?:5K2K)\b/i.test(title)) {
    return "5120x2160";
  }

  if (/\b(?:4K|UHD|4K\s+UHD|2160P)\b/i.test(title)) {
    return "3840x2160";
  }

  if (/\b(?:UWQHD|ULTRAWIDE\s+QHD)\b/i.test(title)) {
    return "3440x1440";
  }

  if (/\b(?:QHD|WQHD|1440P)\b/i.test(title)) {
    return "2560x1440";
  }

  if (/\b(?:FULL\s+HD|FHD|1080P)\b/i.test(title)) {
    return "1920x1080";
  }

  return null;
}

function extractRefreshRate(title: string): string | null {
  const match = title.match(/\b(\d{2,3})\s*HZ\b/i);

  return match ? `${match[1]}Hz` : null;
}

function extractPanelType(title: string): string | null {
  if (/\bQD[-\s]?OLED\b/i.test(title)) {
    return "QD-OLED";
  }

  if (/\bOLED\b/i.test(title)) {
    return "OLED";
  }

  if (/\bMINI[-\s]?LED\b/i.test(title)) {
    return "Mini LED";
  }

  if (/\bIPS\b/i.test(title)) {
    return "IPS";
  }

  if (/\bVA\b/i.test(title)) {
    return "VA";
  }

  if (/\bTN\b/i.test(title)) {
    return "TN";
  }

  return null;
}

function extractAspectRatio(title: string): string | null {
  const explicitRatio = title.match(
    /\b(32:9|21:9|16:10|16:9|4:3)\b/
  );

  if (explicitRatio) {
    return explicitRatio[1];
  }

  if (/\b(?:DUAL\s+QHD|DQHD)\b/i.test(title)) {
    return "32:9";
  }

  if (/\b(?:UWQHD|ULTRAWIDE)\b/i.test(title)) {
    return "21:9";
  }

  return "16:9";
}

export function parseMonitorFingerprint(
  title: string
): FingerprintPatch {
  return {
    productType: "monitor",

    model: {
      base: extractMonitorModel(title),
      revision: null,
      variant: null,
      sku: null,
    },

    specs: {
      resolution: extractResolution(title),
      refreshRate: extractRefreshRate(title),
      panelType: extractPanelType(title),
      aspectRatio: extractAspectRatio(title),
    },
  };
}