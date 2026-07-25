import type {
  FingerprintPatch,
  ProductBundleFingerprint,
} from "../types";

function extractLensModel(title: string): string | null {
  const cleaned = title
    .replace(
      /^(sony|canon|nikon|nikkor|fujifilm|fuji|sigma|tamron|leica|olympus|om system|panasonic)\s+/i,
      ""
    )
    .replace(/\s+lens\b.*$/i, "")
    .trim();

  const patterns = [
    /\bFE\s+\d{1,3}(?:-\d{1,3})?mm\s+F\d(?:\.\d+)?(?:-\d(?:\.\d+)?)?(?:\s+[A-Z0-9-]+)*\b/i,
    /\bRF(?:-S)?\s+\d{1,3}(?:-\d{1,3})?mm\s+F\d(?:\.\d+)?(?:-\d(?:\.\d+)?)?(?:\s+[A-Z0-9-]+)*\b/i,
    /\bEF(?:-S)?\s+\d{1,3}(?:-\d{1,3})?mm\s+F\d(?:\.\d+)?(?:-\d(?:\.\d+)?)?(?:\s+[A-Z0-9-]+)*\b/i,
    /\bNIKKOR\s+Z\s+\d{1,3}(?:-\d{1,3})?mm\s+F\/?\d(?:\.\d+)?(?:-\d(?:\.\d+)?)?(?:\s+[A-Z0-9-]+)*\b/i,
    /\b(?:XF|XC)\s+\d{1,3}(?:-\d{1,3})?mm\s+F\d(?:\.\d+)?(?:-\d(?:\.\d+)?)?(?:\s+[A-Z0-9-]+)*\b/i,
    /\b(?:Summilux|Summicron|Elmarit|Elmar|Noctilux)-?[A-Z]?\s+\d{1,3}mm\s+F\/?\d(?:\.\d+)?\b/i,
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);

    if (match?.[0]) {
      return match[0]
        .replace(/\s+/g, " ")
        .trim();
    }
  }

  return null;
}

function extractFocalLength(title: string): string | null {
  const match = title.match(
    /\b(\d{1,3}(?:-\d{1,3})?)\s*mm\b/i
  );

  return match?.[1]
    ? `${match[1]}mm`
    : null;
}

function extractMaximumAperture(
  title: string
): string | null {
  const match = title.match(
    /\bf\/?\s*(\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?)/i
  );

  return match?.[1]
    ? `f/${match[1]}`
    : null;
}

function extractLensMount(title: string): string | null {
  const value = title.toLowerCase();

  if (
    /\bsony\s+e(?:-mount)?\b/.test(value) ||
    /\bfe\b/.test(value)
  ) {
    return "Sony E";
  }

  if (/\bcanon\s+rf\b/.test(value) || /\brf-s\b/.test(value)) {
    return "Canon RF";
  }

  if (/\bcanon\s+ef-s\b/.test(value)) {
    return "Canon EF-S";
  }

  if (/\bcanon\s+ef\b/.test(value)) {
    return "Canon EF";
  }

  if (
    /\bnikon\s+z\b/.test(value) ||
    /\bnikkor\s+z\b/.test(value)
  ) {
    return "Nikon Z";
  }

  if (
    /\bfujifilm\s+x\b/.test(value) ||
    /\bfuji\s+x\b/.test(value) ||
    /\bxf\b/.test(value) ||
    /\bxc\b/.test(value)
  ) {
    return "Fujifilm X";
  }

  if (
    /\bmicro four thirds\b/.test(value) ||
    /\bmft\b/.test(value)
  ) {
    return "Micro Four Thirds";
  }

  if (
    /\bleica\s+l\b/.test(value) ||
    /\bl-mount\b/.test(value)
  ) {
    return "Leica L";
  }

  if (/\bleica\s+m\b/.test(value)) {
    return "Leica M";
  }
  if (
  /\bleica\s+m\b/.test(value) ||
  /\b(?:summilux|summicron|elmarit|elmar|noctilux)-m\b/.test(value)
) {
  return "Leica M";
}

  return null;
}

function extractLensStabilisation(
  title: string
): string | null {
  const value = title.toLowerCase();

  if (/\b(?:oss|ois|is|vr|vc|os)\b/.test(value)) {
    return "Optical";
  }

  return null;
}

function extractLensBundle(
  title: string
): ProductBundleFingerprint | undefined {
  const value = title.toLowerCase();

  if (/\blens only\b/.test(value)) {
    return undefined;
  }

  const items: string[] = [];

  if (/\bwith lens hood\b/.test(value)) {
    items.push("Lens Hood");
  }

  if (/\bwith case\b/.test(value)) {
    items.push("Case");
  }

  if (/\bwith filter\b/.test(value)) {
    items.push("Filter");
  }

  if (/\bwith caps\b/.test(value)) {
    items.push("Lens Caps");
  }

  if (items.length === 0) {
    return undefined;
  }

  return {
    isBundle: true,
    items,
  };
}

export function parseLens(
  title: string
): FingerprintPatch {
  return {
    model: {
      base: extractLensModel(title),
    },

    specs: {
      mount: extractLensMount(title),
      focalLength: extractFocalLength(title),
      maximumAperture:
        extractMaximumAperture(title),
      stabilisation:
        extractLensStabilisation(title),
    },

    bundle: extractLensBundle(title),
  };
}