import {
  CONNECTIVITY_DEFINITIONS,
} from "../knowledge/connectivity";

import { escapeRegExp } from "../utils";

interface ConnectivityMatch {
  value: string;
  index: number;
}

export function extractConnectivity(
  title: string
): string[] {
  const matches: ConnectivityMatch[] = [];

  for (const definition of CONNECTIVITY_DEFINITIONS) {
    let earliestIndex: number | null = null;

    for (const alias of definition.aliases) {
      const pattern = new RegExp(
        `\\b${escapeRegExp(alias)}\\b`,
        "i"
      );

      const match = pattern.exec(title);

      if (!match) {
        continue;
      }

      if (
        earliestIndex === null ||
        match.index < earliestIndex
      ) {
        earliestIndex = match.index;
      }
    }

    if (earliestIndex === null) {
      continue;
    }

    matches.push({
      value: definition.value,
      index: earliestIndex,
    });
  }

  return matches
    .sort((a, b) => a.index - b.index)
    .map(match => match.value);
}