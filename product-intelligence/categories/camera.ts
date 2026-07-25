import type { FingerprintPatch } from "../types";

function normaliseCameraModel(model: string): string {
  return model
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase()
    .replace(/\bMARK\s+([IVX]+)\b/i, "Mark $1")
    .replace(/\bMK\s*([IVX]+)\b/i, "Mark $1");
}

function extractCameraModel(
  title: string
): string | null {
  const patterns: RegExp[] = [
    // Sony
    /\b(A7R?\s*[IVX]+)\b/i,
    /\b(A7S\s*[IVX]+)\b/i,
    /\b(A9\s*[IVX]*)\b/i,
    /\b(A1)\b/i,
    /\b(A6\d{3})\b/i,
    /\b(ZV-E\d{1,2}(?:\s+(?:II|III|IV|V))?)\b/i,
    /\b(ZV-1(?:F| II)?)\b/i,
    /\b(FX\d{1,2})\b/i,

    // Canon
    /\b(EOS\s+R\d{1,2}(?:\s+MARK\s+[IVX]+)?)\b/i,
    /\b(EOS\s+RP)\b/i,
    /\b(EOS\s+\d{1,4}D(?:\s+MARK\s+[IVX]+)?)\b/i,
    /\b(POWERSHOT\s+[A-Z0-9-]+)\b/i,

    // Nikon
    /\b(Z\s?\d{1,2}(?:\s+(?:II|III|IV|V))?)\b/i,
    /\b(Z\s?F)\b/i,
    /\b(Z\s?FC)\b/i,
    /\b(D\d{3,4})\b/i,

    // Fujifilm
    /\b(X-T\d{1,2})\b/i,
    /\b(X-H\d[A-Z]?)\b/i,
    /\b(X-S\d{1,2})\b/i,
    /\b(X-PRO\d)\b/i,
    /\b(X100(?:V|VI|F|T|S)?)\b/i,
    /\b(GFX\s?\d{2,3}[A-Z]*(?:\s+(?:II|III|IV|V))?)\b/i,

    // Panasonic
    /\b(LUMIX\s+S\d[A-Z]*(?:\s+(?:II|III|IV|V))?)\b/i,
/\b(LUMIX\s+GH\d[A-Z]*(?:\s+(?:II|III|IV|V))?)\b/i,
/\b(LUMIX\s+G\d{1,3}[A-Z]*(?:\s+(?:II|III|IV|V))?)\b/i,

    // OM System / Olympus
    /\b(OM-\d)\b/i,
    /\b(E-M\d{1,2}(?:\s+MARK\s+[IVX]+)?)\b/i,

    // Leica
    /\b(LEICA\s+[QMS]\d(?:\s+MONOCHROM)?)\b/i,

    // Generic manufacturer-style model codes
    /\b([A-Z]{1,4}-?\d{2,5}[A-Z]{0,4})\b/,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match?.[1]) {
      return normaliseCameraModel(match[1]);
    }
  }

  return null;
}

function extractSensorSize(
  title: string
): string | null {
  const value = title.toLowerCase();

  if (
    /\b(full[-\s]?frame|35mm full frame)\b/.test(
      value
    )
  ) {
    return "Full Frame";
  }

  if (/\b(aps[-\s]?c|crop sensor)\b/.test(value)) {
    return "APS-C";
  }

  if (
    /\b(micro four thirds|micro 4\/3|mft)\b/.test(
      value
    )
  ) {
    return "Micro Four Thirds";
  }

  if (/\b(medium format)\b/.test(value)) {
    return "Medium Format";
  }

  if (/\b1-inch sensor\b/.test(value)) {
    return "1-inch";
  }

  return null;
}

function extractCameraMount(
  title: string
): string | null {
  const value = title.toLowerCase();

  if (/\bsony e[-\s]?mount\b/.test(value)) {
    return "Sony E";
  }

  if (/\bcanon rf[-\s]?mount\b/.test(value)) {
    return "Canon RF";
  }

  if (/\bcanon ef[-\s]?mount\b/.test(value)) {
    return "Canon EF";
  }

  if (/\bnikon z[-\s]?mount\b/.test(value)) {
    return "Nikon Z";
  }

  if (/\bnikon f[-\s]?mount\b/.test(value)) {
    return "Nikon F";
  }

  if (
    /\bfuji(?:film)? x[-\s]?mount\b/.test(value)
  ) {
    return "Fujifilm X";
  }

  if (
    /\bfuji(?:film)? g[-\s]?mount\b/.test(value)
  ) {
    return "Fujifilm G";
  }

  if (
    /\b(leica|panasonic|sigma) l[-\s]?mount\b/.test(
      value
    )
  ) {
    return "L-Mount";
  }

  if (
    /\bmicro four thirds mount\b/.test(value)
  ) {
    return "Micro Four Thirds";
  }

  return null;
}

function extractMegapixels(
  title: string
): string | null {
  const match = title.match(
    /\b(\d{1,3}(?:\.\d+)?)\s*(?:mp|megapixels?)\b/i
  );

  return match ? `${Number(match[1])}MP` : null;
}

function extractVideoResolution(
  title: string
): string | null {
  const value = title.toLowerCase();

  const resolutionMatch = value.match(
    /\b(8k|6k|5\.7k|5\.3k|5k|4k)\s*(?:at|@)?\s*(\d{2,3})?\s*(?:fps|p)?\b/
  );

  if (!resolutionMatch) {
    return null;
  }

  const resolution =
    resolutionMatch[1].toUpperCase();

  const frameRate = resolutionMatch[2];

  return frameRate
    ? `${resolution}${frameRate}`
    : resolution;
}

function extractCameraBundle(
  title: string
): string | null {
  const normalised = title.trim();

  // Body-only listings are not bundles
  if (/\b(?:body only|body-only|camera body)\b/i.test(normalised)) {
    return null;
  }

  // Capture the actual kit-lens focal range first
  const kitLensMatch = normalised.match(
    /\b(?:with\s+)?(\d{1,3}(?:-\d{1,3})?mm)\s+(?:kit\s+)?lens\b/i
  );

  if (kitLensMatch?.[1]) {
    return `${kitLensMatch[1]} Kit Lens`;
  }

  // Generic bundle descriptions only run after detailed extraction
  if (/\btwin lens kit\b/i.test(normalised)) {
    return "Twin Lens Kit";
  }

  if (/\b(?:kit lens|lens kit)\b/i.test(normalised)) {
    return "Kit Lens";
  }

  if (/\bcamera kit\b/i.test(normalised)) {
    return "Camera Kit";
  }

  return null;
}


  export function parseCameraFingerprint(
  title: string
): FingerprintPatch {

 const cameraBundle = extractCameraBundle(title);

return {
  model: {
    base: extractCameraModel(title),
  },

  specs: {
    sensorSize: extractSensorSize(title),
    mount: extractCameraMount(title),
    megapixels: extractMegapixels(title),
    videoResolution: extractVideoResolution(title),
  },

  bundle: cameraBundle
    ? {
        isBundle: true,
        items: [cameraBundle],
      }
    : undefined,
};
}