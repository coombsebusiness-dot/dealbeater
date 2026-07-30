import { samsungPhones } from "./phones";

import type {
  SamsungPhoneKnowledge
} from "./types";

/**
 * Normalises Samsung model text so retailer formatting differences
 * do not prevent a successful lookup.
 *
 * Examples:
 *
 * "Samsung Galaxy S24 Ultra"
 * "Galaxy S24Ultra"
 * "S24 Ultra 256GB"
 *
 * all become easier to compare consistently.
 */
function normaliseSamsungModel(
  value: string
): string {

  return value
    .toLowerCase()
    .replace(/\bsamsung\b/g, "")
    .replace(/\bgalaxy\b/g, "")
    .replace(/\+/g, " plus ")
    .replace(/\bultra\b/g, " ultra ")
    .replace(/\bplus\b/g, " plus ")
    .replace(/\bfe\b/g, " fe ")
    .replace(/\bfold\b/g, " fold ")
    .replace(/\bflip\b/g, " flip ")
    .replace(/\b\d+\s?(gb|tb)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}

/**
 * Produces the normalised searchable identity for one stored phone.
 */
function createPhoneSearchKey(
  phone: SamsungPhoneKnowledge
): string {

  return normaliseSamsungModel(
    [
      phone.name,
      phone.slug,
      phone.family,
      phone.generation,
      phone.tier
    ].join(" ")
  );

}

/**
 * Finds structured Samsung phone knowledge from a model name,
 * variant or retailer product title.
 *
 * Returns null when the model cannot be identified safely.
 */
export function getSamsungPhoneKnowledge(
  model: string | null | undefined
): SamsungPhoneKnowledge | null {

  if (!model) {

    return null;

  }

  const normalisedModel =
    normaliseSamsungModel(
      model
    );

  if (!normalisedModel) {

    return null;

  }

  /**
   * Exact normalised name or slug match.
   */
  const exactMatch =
    samsungPhones.find(
      (phone) => {

        const normalisedName =
          normaliseSamsungModel(
            phone.name
          );

        const normalisedSlug =
          normaliseSamsungModel(
            phone.slug
          );

        return (
          normalisedModel === normalisedName ||
          normalisedModel === normalisedSlug
        );

      }
    );

  if (exactMatch) {

    return exactMatch;

  }

  /**
   * Search-key match handles longer retailer titles containing
   * storage, colour, network or promotional wording.
   *
   * Longer model keys are checked first so:
   *
   * "S24 Ultra" is not accidentally matched as "S24".
   */
  const orderedPhones =
    [...samsungPhones].sort(
      (first, second) => {

        const firstKey =
          createPhoneSearchKey(
            first
          );

        const secondKey =
          createPhoneSearchKey(
            second
          );

        return (
          secondKey.length -
          firstKey.length
        );

      }
    );

  for (const phone of orderedPhones) {

    const searchKey =
      createPhoneSearchKey(
        phone
      );

    const normalisedName =
      normaliseSamsungModel(
        phone.name
      );

    const normalisedSlug =
      normaliseSamsungModel(
        phone.slug
      );

    if (
      normalisedModel.includes(
        normalisedName
      ) ||
      normalisedModel.includes(
        normalisedSlug
      ) ||
      normalisedModel.includes(
        searchKey
      )
    ) {

      return phone;

    }

  }

  return null;

}