export function normaliseStorage(
  storage: string | null
): string | null {

  if (!storage) {
    return null;
  }

  return storage
    .toLowerCase()
    .replace(/ssd/g, "")
    .replace(/\s+/g, "")
    .trim();
}