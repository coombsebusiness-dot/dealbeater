import type {
  Brand,
} from "./Brand";

const brands: Brand[] = [
  {
    id:
      "sony",

    slug:
      "sony",

    name:
      "Sony",

    description:
      "Explore Sony cameras, lenses, batteries and buying advice from the Blinlx Product Brain.",

    overview: {
      heading:
        "Sony cameras, lenses and accessories",

      summary:
        "Sony offers one of the most established mirrorless camera systems, with a broad range of APS-C and full-frame bodies, lenses and accessories for beginners, enthusiasts and professionals.",

      buyingAdvice:
        "Sony is a particularly strong choice when autofocus performance, compact mirrorless bodies and a broad lens ecosystem matter most.",
    },

    featuredProductIds: [
      "sony-a6700",
      "sony-a6400",
      "sony-e-70-350mm-f4-5-6-3-g-oss",
    ],

    supportedCategories: [
      "CAMERAS",
      "LENSES",
      "BATTERIES",
    ],

    seo: {
      title:
        "Sony Cameras, Lenses and Buying Guides | Blinlx",

      description:
        "Explore Sony cameras, lenses, batteries, product pages and expert buying advice from Blinlx.",

      canonicalPath:
        "/brands/sony",
    },

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },

  {
    id:
      "canon",

    slug:
      "canon",

    name:
      "Canon",

    description:
      "Explore Canon cameras, RF lenses and buying advice from the Blinlx Product Brain.",

    overview: {
      heading:
        "Canon cameras and RF lenses",

      summary:
        "Canon's EOS R system covers beginner-friendly, enthusiast and professional mirrorless cameras, supported by RF and RF-S lenses for photography and video.",

      buyingAdvice:
        "Canon is a strong choice for buyers who value approachable controls, reliable autofocus and an expanding native RF lens system.",
    },

    featuredProductIds: [
      "canon-eos-r50",
      "canon-eos-r10",
      "canon-eos-r7",
    ],

    supportedCategories: [
      "CAMERAS",
      "LENSES",
    ],

    seo: {
      title:
        "Canon Cameras, RF Lenses and Buying Guides | Blinlx",

      description:
        "Explore Canon EOS R cameras, RF lenses, product pages and expert buying advice from Blinlx.",

      canonicalPath:
        "/brands/canon",
    },

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },

  {
    id:
      "nikon",

    slug:
      "nikon",

    name:
      "Nikon",

    description:
      "Explore Nikon cameras, NIKKOR Z lenses and buying advice from the Blinlx Product Brain.",

    overview: {
      heading:
        "Nikon cameras and NIKKOR Z lenses",

      summary:
        "Nikon's Z system combines compact DX mirrorless bodies with an expanding range of native NIKKOR Z lenses for beginners, travel photographers and enthusiasts.",

      buyingAdvice:
        "Nikon is a particularly attractive option for buyers who value comfortable handling, strong image quality and compact DX lens combinations.",
    },

    featuredProductIds: [
      "nikon-z50-ii",
      "nikon-z50",
      "nikkor-z-dx-18-140mm-f3-5-6-3-vr",
    ],

    supportedCategories: [
      "CAMERAS",
      "LENSES",
    ],

    seo: {
      title:
        "Nikon Cameras, NIKKOR Z Lenses and Buying Guides | Blinlx",

      description:
        "Explore Nikon Z cameras, NIKKOR Z lenses, product pages and expert buying advice from Blinlx.",

      canonicalPath:
        "/brands/nikon",
    },

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },
];

export function getAllBrands():
  Brand[] {
  return brands.filter(
    (brand) =>
      brand.isPublished,
  );
}

export function getBrandBySlug(
  slug: string,
): Brand | undefined {
  const normalisedSlug =
    slug
      .trim()
      .toLowerCase();

  return brands.find(
    (brand) =>
      brand.isPublished &&
      brand.slug ===
        normalisedSlug,
  );
}

export function getBrandById(
  id: string,
): Brand | undefined {
  return brands.find(
    (brand) =>
      brand.isPublished &&
      brand.id === id,
  );
}