export function normaliseMemory(
  memory: string | null
): string | null {

  if (!memory) {
    return null;
  }

  return memory
    .toLowerCase()
    .replace(/unified memory/g, "")
    .replace(/ram/g, "")
    .replace(/\s+/g, "")
    .trim();
}