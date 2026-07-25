import type { FingerprintPatch } from "../types";

function extractDdrGeneration(title: string): string | null {
  const match = title.match(/\bDDR\s*([3-5])\b/i);

  return match ? `DDR${match[1]}` : null;
}

function extractMemorySpeed(title: string): string | null {
  const match = title.match(/\b(\d{4,5})\s*MHz\b/i);

  return match ? `${match[1]}MHz` : null;
}

function extractModuleCount(title: string): number | null {
  const kitMatch = title.match(/\b(\d+)\s*[x×]\s*\d+\s*GB\b/i);

  if (kitMatch) {
    return Number(kitMatch[1]);
  }

  if (
    /\b(?:RAM|memory)\s+(?:module|stick)\b/i.test(title) ||
    /\b(?:DIMM|SODIMM|SO-DIMM|RDIMM)\b/i.test(title)
  ) {
    return 1;
  }

  return null;
}

function extractMemoryFormFactor(title: string): string | null {
  if (/\bR\s*-?\s*DIMM\b/i.test(title) || /\bRDIMM\b/i.test(title)) {
    return "RDIMM";
  }

  if (
    /\bSO\s*-?\s*DIMM\b/i.test(title) ||
    /\bSODIMM\b/i.test(title)
  ) {
    return "SODIMM";
  }

  if (/\bDIMM\b/i.test(title)) {
    return "DIMM";
  }

  if (/\bdesktop\b/i.test(title)) {
    return "DIMM";
  }

  if (/\blaptop\b/i.test(title)) {
    return "SODIMM";
  }
  if (
  /\b(ram kit|memory kit|desktop ram|desktop memory)\b/i.test(
    title
  ) ||
  /\b\d+\s*x\s*\d+\s*gb\s+ddr[3-5]\b/i.test(
    title
  )
) {
  return "DIMM";
}

  return null;
}

function extractLatency(title: string): string | null {
  const match = title.match(/\bCL\s*(\d{2,3})\b/i);

  return match ? `CL${match[1]}` : null;
}

export function parseRamFingerprint(title: string): FingerprintPatch {
  return {
    productType: "memory",

    specs: {
      ddrGeneration: extractDdrGeneration(title),
      memorySpeed: extractMemorySpeed(title),
      moduleCount: extractModuleCount(title),
      memoryFormFactor: extractMemoryFormFactor(title),
      latency: extractLatency(title),
    },
  };
}