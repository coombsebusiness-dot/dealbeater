import type {
  ProcessorKnowledge,
  RegistryMatch,
} from "./types";

export function normaliseRegistryValue(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function findRegistryMatch<
  T extends ProcessorKnowledge
>(
  values: Array<string | null>,
  registry: T[]
): RegistryMatch<T> | null {
  const searchableValues = values
    .filter(
      (value): value is string =>
        Boolean(value?.trim())
    )
    .map((value) => ({
      original: value,
      normalised:
        normaliseRegistryValue(value),
    }));

  /*
   * Search values are checked first so the most
   * specific fingerprint value wins.
   *
   * Example:
   * M1-Pro is checked before M1.
   */
  for (const value of searchableValues) {
    for (const entry of registry) {
      const normalisedId =
        normaliseRegistryValue(
          entry.id
        );

      if (
  value.normalised ===
  normalisedId
) {
  return {
    entry,
    confidence: 100,
    matchedBy: "exact-id",
    matchedAlias: null as any,
  };
}

      const normalisedName =
        normaliseRegistryValue(
          entry.name
        );

     if (
  value.normalised ===
  normalisedName
) {
  return {
    entry,
    confidence: 100,
    matchedBy: "exact-name",
    matchedAlias: null as any,
  };
}
      const matchedAlias =
        entry.aliases.find(
          (alias) =>
            normaliseRegistryValue(
              alias
            ) === value.normalised
        );

      if (matchedAlias) {
        return {
          entry,
          confidence: 98,
          matchedBy: "alias",
          matchedAlias,
        };
      }
    }
  }

  return null;
}