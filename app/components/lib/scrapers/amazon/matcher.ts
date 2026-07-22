import { AmazonProduct } from "./types";

const PENALTY_TERMS = [
  "renewed",
  "refurbished",
  "used",
  "pre-owned",
  "preowned",
  "earbuds",
  "replacement",
  "case only",
  "parts only",
  "for parts",
];

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function scoreAmazonMatch(
  query: string,
  product: AmazonProduct
): number {
  const normalisedQuery =
    normalise(query);

  const normalisedTitle =
    normalise(product.title);

  const queryWords =
    normalisedQuery.split(" ");

  let score = 0;

  for (const word of queryWords) {
    if (!word) {
      continue;
    }

    if (normalisedTitle.includes(word)) {
      score += 10;
    } else {
      score -= 15;
    }
  }

  if (
    normalisedTitle.includes(
      normalisedQuery
    )
  ) {
    score += 50;
  }

  for (const term of PENALTY_TERMS) {
    if (
      normalisedTitle.includes(
        normalise(term)
      )
    ) {
      score -= 100;
    }
  }

  if (product.price !== null) {
    score += 5;
  }

  if (product.rating !== null) {
    score += product.rating;
  }

  if (product.reviewCount !== null) {
    score += Math.min(
      product.reviewCount / 1000,
      10
    );
  }

  return score;
}

export function sortAmazonMatches(
  query: string,
  products: AmazonProduct[]
): AmazonProduct[] {
  return [...products].sort(
    (a, b) =>
      scoreAmazonMatch(query, b) -
      scoreAmazonMatch(query, a)
  );
}