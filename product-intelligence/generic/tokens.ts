import {
  normaliseTitle,
  unique,
} from "../utils";

export function createTokens(
  title: string
): string[] {
  return unique(
    normaliseTitle(title)
      .split(" ")
      .map(token => token.trim())
      .filter(token => token.length > 1)
  );
}