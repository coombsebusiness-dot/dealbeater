export function normaliseColour(
  colour: string | null
): string | null {

  if (!colour) {
    return null;
  }

  return colour
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}