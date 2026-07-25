import type { ProductType } from "../types";
import { ACCESSORY_TERMS } from "../knowledge/accessories";

export function detectProductType(
  title: string
): ProductType {
  const value = title.toLowerCase();

  // Motherboards often mention DDR4/DDR5,
  // so identify them before memory.
  if (/\b(motherboard|mainboard)\b/.test(value)) {
    return "motherboard";
  }

  // Strong evidence that the listing itself is RAM.
  const isMemoryProduct =
    /\b(laptop memory|laptop ram|desktop memory|desktop ram|server memory|memory module|ram module|memory kit|ram kit|sodimm|so-dimm|rdimm)\b/.test(
      value
    ) ||
    /\b\d+\s*x\s*\d+\s*gb\s+ddr[3-5]\b/.test(
      value
    );

  if (isMemoryProduct) {
    return "memory";
  }

  // Complete products come next.
  if (
    /\b(macbook|laptop|notebook|chromebook|vivobook|thinkpad|surface laptop|xps)\b/.test(
      value
    )
  ) {
    return "laptop";
  }

  if (
    /\b(iphone|smartphone|mobile phone|galaxy s\d+|galaxy z|pixel \d|phone)\b/.test(
      value
    )
  ) {
    return "phone";
  }

  if (
    /\b(ipad|tablet|galaxy tab|surface pro)\b/.test(
      value
    )
  ) {
    return "tablet";
  }

  if (
    /\b(camera|mirrorless|dslr|camcorder|body only|body-only|camera body)\b/.test(
      value
    )
  ) {
    return "camera";
  }

  if (
    /\b(lens|zoom lens|prime lens|\d+(?:-\d+)?mm\s+f\/?\d)\b/.test(
      value
    )
  ) {
    return "lens";
  }

  if (/\b(monitor|display)\b/.test(value)) {
    return "monitor";
  }

  if (
    /\b(television|smart tv|oled tv|qled tv|\btv\b)\b/.test(
      value
    )
  ) {
    return "tv";
  }

  if (
    /\b(playstation|ps5|ps4|xbox|nintendo switch|games console|console)\b/.test(
      value
    )
  ) {
    return "console";
  }

// Watches
if (
  /\b(apple watch|galaxy watch|pixel watch|smartwatch|fitness watch)\b/.test(value)
) {
  return "watch";
}

// Motherboards BEFORE memory because they often mention DDR4/DDR5
if (/\b(motherboard|mainboard)\b/.test(value)) {
  return "motherboard";
}

// Memory BEFORE laptop because RAM often says "Laptop Memory"
if (
  /\b(?:RAM|MEMORY|DIMM|SODIMM|SO-DIMM|RDIMM|MEMORY KIT|RAM KIT)\b/i.test(title)
) {
  return "memory";
}

// Graphics cards
if (
  /\b(rtx\s?\d{4}|gtx\s?\d{3,4}|radeon rx|graphics card|\bgpu\b)\b/.test(value)
) {
  return "gpu";
}

// CPUs
if (
  /\b(ryzen\s?\d|intel core|core i[3579]|processor|\bcpu\b)\b/.test(value)
) {
  return "cpu";
}

  if (/\b(motherboard|mainboard)\b/.test(value)) {
    return "motherboard";
  }

  if (
    /\b(ssd|hard drive|hdd|nvme|solid state drive)\b/.test(
      value
    )
  ) {
    return "storage";
  }

if (
  /\b(?:RAM|MEMORY|DIMM|SODIMM|SO-DIMM|RDIMM|MEMORY KIT|RAM KIT)\b/i.test(title)
) {
  return "memory";
}

  if (
    ACCESSORY_TERMS.some(term =>
      value.includes(term)
    )
  ) {
    return "accessory";
  }
  if (
  /\b(headphones|headphone|earphones|earphone|earbuds|earbud|airpods|headset|galaxy buds)\b/.test(
    value
  )
) {
  return "headphones";
}

  return "unknown";
}