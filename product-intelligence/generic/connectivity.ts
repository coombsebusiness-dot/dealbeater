import { CONNECTIVITY_TERMS } from "../knowledge/connectivity";
import { escapeRegExp } from "../utils";

export function extractConnectivity(
  title: string
): string[] {
  const matches: Array<{
    value: string;
    index: number;
  }> = [];

  for (const term of CONNECTIVITY_TERMS) {
    const pattern = new RegExp(
      `\\b${escapeRegExp(term)}\\b`,
      "i"
    );

    const match = pattern.exec(title);

    if (!match) {
      continue;
    }

    matches.push({
      value: term,
      index: match.index,
    });
  }

  return matches
    .sort((a, b) => a.index - b.index)
    .map(match => match.value);
}