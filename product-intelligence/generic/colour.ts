import { COLOURS } from "../knowledge/colours";
import { escapeRegExp } from "../utils";

export function extractColour(
  title: string
): string | null {
  const sortedColours = [...COLOURS].sort(
    (a, b) => b.length - a.length
  );

  for (const colour of sortedColours) {
    const pattern = new RegExp(
      `\\b${escapeRegExp(colour)}\\b`,
      "i"
    );

    if (pattern.test(title)) {
      return colour;
    }
  }

  return null;
}