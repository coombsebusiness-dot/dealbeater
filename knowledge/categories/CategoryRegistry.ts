import type {
  Category,
} from "./Category";

const categories: Category[] = [
  {
    id:
      "cameras",

    slug:
      "cameras",

    name:
      "Cameras",

    description:
      "Explore mirrorless cameras, beginner cameras and enthusiast bodies researched by the Blinlx Product Brain.",

    overview: {
      heading:
        "Find the right camera for the way you shoot",

      summary:
        "Blinlx helps you compare cameras by real buying needs rather than headline specifications alone. Explore beginner-friendly models, enthusiast bodies and specialist options for travel, wildlife, family photography and video.",

      buyingAdvice:
        "Choose a camera system based on autofocus, handling, lens availability and the photography you actually want to do. A balanced camera-and-lens setup is usually a better investment than spending everything on the body.",
    },

    featuredProductIds: [
      "sony-a6700",
      "canon-eos-r50",
      "canon-eos-r7",
      "nikon-z50-ii",
    ],

    supportedBrands: [
      "Sony",
      "Canon",
      "Nikon",
    ],

    seo: {
      title:
        "Cameras, Buying Guides and Expert Recommendations | Blinlx",

      description:
        "Explore mirrorless cameras, beginner cameras, product comparisons and expert buying advice from Blinlx.",

      canonicalPath:
        "/cameras",
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
      "lenses",

    slug:
      "lenses",

    name:
      "Lenses",

    description:
      "Explore Sony E, Canon RF and Nikon Z lenses researched and linked to compatible cameras by the Blinlx Product Brain.",

    overview: {
      heading:
        "Choose lenses that match your photography",

      summary:
        "The right lens often changes your photography more than a newer camera body. Browse everyday zooms, compact primes, travel lenses and telephoto options across the Sony E, Canon RF and Nikon Z systems.",

      buyingAdvice:
        "Start with the focal lengths you genuinely use. A practical zoom is often the best first lens, while a bright prime or telephoto lens should solve a specific need such as low-light photography, portraits or wildlife.",
    },

    featuredProductIds: [
      "sony-e-70-350mm-f4-5-6-3-g-oss",
      "canon-rf-s-18-150mm-f3-5-6-3-is-stm",
      "canon-rf-100-400mm-f5-6-8-is-usm",
      "nikkor-z-dx-18-140mm-f3-5-6-3-vr",
    ],

    supportedBrands: [
      "Sony",
      "Canon",
      "Nikon",
      "NIKKOR",
    ],

    seo: {
      title:
        "Camera Lenses, Compatibility and Buying Advice | Blinlx",

      description:
        "Explore Sony E, Canon RF and Nikon Z lenses, compatibility information and expert buying advice from Blinlx.",

      canonicalPath:
        "/lenses",
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
      "batteries",

    slug:
      "batteries",

    name:
      "Camera Batteries",

    description:
      "Explore official camera batteries, compatibility information and buying advice from the Blinlx Product Brain.",

    overview: {
      heading:
        "Find the correct battery for your camera",

      summary:
        "Camera batteries can look similar while supporting different bodies and charging systems. Blinlx links battery products to compatible cameras so you can avoid buying the wrong model.",

      buyingAdvice:
        "Check the exact battery code before buying. Official batteries usually offer the most dependable compatibility and performance, while reputable third-party options may provide better value for spare use.",
    },

    featuredProductIds: [
      "sony-np-fw50-battery",
      "sony-np-fz100-battery",
    ],

    supportedBrands: [
      "Sony",
    ],

    seo: {
      title:
        "Camera Batteries and Compatibility Guides | Blinlx",

      description:
        "Explore camera batteries, compatible camera models and practical buying advice from Blinlx.",

      canonicalPath:
        "/batteries",
    },

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },
];

export function getAllCategories():
  Category[] {
  return categories.filter(
    (category) =>
      category.isPublished,
  );
}

export function getCategoryBySlug(
  slug: string,
): Category | undefined {
  const normalisedSlug =
    slug
      .trim()
      .toLowerCase();

  return categories.find(
    (category) =>
      category.isPublished &&
      category.slug ===
        normalisedSlug,
  );
}

export function getCategoryById(
  id: string,
): Category | undefined {
  return categories.find(
    (category) =>
      category.isPublished &&
      category.id === id,
  );
}