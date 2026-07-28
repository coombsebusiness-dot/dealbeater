const BRAND_ALIASES: Record<string, string> = {
  apple: "Apple",
  "apple inc": "Apple",
  macbook: "Apple",
  iphone: "Apple",
  ipad: "Apple",
  imac: "Apple",

  sony: "Sony",
  canon: "Canon",
  nikon: "Nikon",
  fujifilm: "Fujifilm",
  panasonic: "Panasonic",
  olympus: "OM System",
  omsystem: "OM System",
  dji: "DJI",

  samsung: "Samsung",
  google: "Google",
  oneplus: "OnePlus",
  xiaomi: "Xiaomi",

  dell: "Dell",
  hp: "HP",
  lenovo: "Lenovo",
  asus: "ASUS",
  asustek: "ASUS",
  acer: "Acer",
  msi: "MSI",

  corsair: "Corsair",
  kingston: "Kingston",
  crucial: "Crucial",
  westerndigital: "Western Digital",
  "western digital": "Western Digital",
  sandisk: "SanDisk",
  seagate: "Seagate",

  intel: "Intel",
  amd: "AMD",
  nvidia: "NVIDIA",

  bose: "Bose",
  sennheiser: "Sennheiser",
  jbl: "JBL",
  sonos: "Sonos",
};

export function normalizeBrand(
  input?: string | null
): string | null {
  if (!input) return null;

  const key = input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();

  return BRAND_ALIASES[key] ?? input.trim();
}