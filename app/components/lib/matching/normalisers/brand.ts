export function normaliseBrand(
  brand: string | null
): string | null {

  if (!brand) {
    return null;
  }

  return brand
    .trim()
    .toLowerCase();
}