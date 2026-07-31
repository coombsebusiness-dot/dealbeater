import {
  AmazonSearchOptions,
  AmazonSearchResult,
} from "./types";

import {
  searchAmazonProducts,
} from "./search";

import {
  sortAmazonMatches,
} from "./matcher";

const CAMERA_QUERY_TERMS = [
  "canon",
  "nikon",
  "sony",
  "fujifilm",
  "panasonic",
  "lumix",
  "olympus",
  "om system",
  "leica",
  "pentax",
  "camera",
  "mirrorless",
  "dslr",
];

const CAMERA_REJECTION_TERMS = [
  // Books and guides
  "book",
  "paperback",
  "hardback",
  "hardcover",
  "kindle",
  "ebook",
  "manual",
  "user guide",
  "field guide",
  "photography guide",
  "camera guide",
  "handbook",
  "mastering",
  "for beginners",

  // Accessories
  "battery",
  "battery pack",
  "battery grip",
  "charger",
  "strap",
  "camera strap",
  "case",
  "camera case",
  "camera bag",
  "cage",
  "camera cage",
  "data cable",
  "rig",
  "tripod",
  "monopod",
  "memory card",
  "card reader",
  "screen protector",
  "body cap",
  "lens cap",
  "eyecup",
  "remote control",
  "dummy battery",
  "hot shoe",

  // Repairs, parts and services
  "repair service",
  "repair manual",
  "replacement part",
  "spare part",
  "parts only",
];

function normaliseText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsTerm(
  value: string,
  terms: string[]
): string | null {
  const normalisedValue =
    normaliseText(value);

  return (
    terms.find((term) =>
      normalisedValue.includes(
        normaliseText(term)
      )
    ) ?? null
  );
}

function looksLikeCameraQuery(
  query: string
): boolean {
  return containsTerm(
    query,
    CAMERA_QUERY_TERMS
  ) !== null;
}

export async function searchAmazon(
  query: string,
  options: AmazonSearchOptions = {}
): Promise<AmazonSearchResult> {
  const result =
    await searchAmazonProducts(query);

  const limit =
    typeof options.limit === "number" &&
    options.limit > 0
      ? Math.floor(options.limit)
      : 10;

  const cameraSearch =
    looksLikeCameraQuery(query);

  const sortedProducts =
    sortAmazonMatches(
      query,
      result.products
    );

  const filteredProducts =
    sortedProducts.filter((product) => {
      if (!cameraSearch) {
        return true;
      }

      const rejectedTerm =
        containsTerm(
          product.title,
          CAMERA_REJECTION_TERMS
        );

      if (rejectedTerm) {
        console.log(
          "🚫 AMAZON CAMERA LISTING REJECTED",
          {
            query,
            title: product.title,
            rejectedTerm,
          }
        );

        return false;
      }

      return true;
    });

  const products =
    filteredProducts.slice(0, limit);

  return {
    products,
    total: products.length,
  };
}