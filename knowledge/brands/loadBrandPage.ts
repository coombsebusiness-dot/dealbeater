import {
  defaultProductBrain,
} from "@/knowledge/products/defaultProductBrain";

import {
  getAllComparisons,
} from "@/knowledge/comparisons/ComparisonRegistry";

import type {
  ComparisonDefinition,
} from "@/knowledge/comparisons/ComparisonRegistry";

import type {
  CanonicalProduct,
} from "@/knowledge/products/CanonicalProduct";

import {
  media,
} from "@/knowledge/media/ProductMediaRegistry";

import {
  getAllBuyingGuides,
} from "@/knowledge/guides/GuideRegistry";

import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import type {
  ProductImage,
} from "@/knowledge/media/ProductImage";

import type {
  Brand,
} from "./Brand";

import {
  getBrandBySlug,
} from "./BrandRegistry";

export interface BrandPageProduct {
  id: string;

  slug: string;

  name: string;

  brand: string;

  category: string;

  productType: string;

  description: string;

  image:
    ProductImage | null;

  isFeatured: boolean;
}

export interface BrandPageData {
  brand: Brand;

  products:
    BrandPageProduct[];

  cameras:
    BrandPageProduct[];

  lenses:
    BrandPageProduct[];

  batteries:
    BrandPageProduct[];

  featuredProducts:
    BrandPageProduct[];

  guides:
    BuyingGuide[];

  totalProducts:
    number;

    comparisons:
  ComparisonDefinition[];
}

function normaliseValue(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}

function productBelongsToBrand(
  product:
    CanonicalProduct,
  brand:
    Brand,
): boolean {
  const productBrand =
    normaliseValue(
      product.brand,
    );

  const brandId =
    normaliseValue(
      brand.id,
    );

  if (
    productBrand ===
    brandId
  ) {
    return true;
  }

  /*
   * NIKKOR is Nikon's lens brand, so those products
   * belong on the Nikon brand hub.
   */
  if (
    brandId ===
      "nikon" &&
    productBrand ===
      "nikkor"
  ) {
    return true;
  }

  return false;
}

function isCategory(
  product:
    BrandPageProduct,
  category:
    string,
): boolean {
  return (
    normaliseValue(
      product.category,
    ) ===
    normaliseValue(
      category,
    )
  );
}

function guideMentionsBrand(
  guide: BuyingGuide,
  brand: Brand,
): boolean {
  const searchText =
    [
      guide.title,
      guide.subtitle,
      guide.category,
      guide.topic,
      guide.seo.title,
      guide.seo.description,
      ...(guide.seo.keywords ?? []),
    ]
      .filter(
        (
          value,
        ): value is string =>
          typeof value ===
            "string" &&
          value.trim().length >
            0,
      )
      .join(" ")
      .toLowerCase();

  return searchText.includes(
    brand.name
      .trim()
      .toLowerCase(),
  );
}

async function createBrandProduct(
  product:
    CanonicalProduct,
  featuredProductIds:
    Set<string>,
): Promise<BrandPageProduct> {
  let image:
    ProductImage | null =
    null;

  try {
    image =
      await media.getHero(
        product.id,
      );
  } catch (error) {
    console.error(
      `Unable to load brand-page image for ${product.id}:`,
      error,
    );
  }

  return {
    id:
      product.id,

    slug:
      product.slug,

    name:
      product.fullName,

    brand:
      product.brand,

    category:
      product.category,

    productType:
      product.productType,

    description:
      product.description,

    image,

    isFeatured:
      featuredProductIds.has(
        product.id,
      ),
  };
}
function comparisonBelongsToBrand(
  comparison: ComparisonDefinition,
  productIds: Set<string>,
): boolean {
  return (
    productIds.has(
      comparison.productAId,
    ) ||
    productIds.has(
      comparison.productBId,
    )
  );
}

export async function loadBrandPage(
  brandSlug: string,
): Promise<
  BrandPageData | null
> {
  const brand =
    getBrandBySlug(
      brandSlug,
    );

  if (!brand) {
    return null;
  }

  const featuredProductIds =
    new Set(
      brand.featuredProductIds ??
        [],
    );

  const canonicalProducts =
    defaultProductBrain
      .getAllKnowledge()
      .filter(
        (product) =>
          productBelongsToBrand(
            product,
            brand,
          ),
      );

  const products =
    await Promise.all(
      canonicalProducts.map(
        (product) =>
          createBrandProduct(
            product,
            featuredProductIds,
          ),
      ),
    );

  products.sort(
    (
      first,
      second,
    ) => {
      if (
        first.isFeatured !==
        second.isFeatured
      ) {
        return first.isFeatured
          ? -1
          : 1;
      }

      const categoryOrder:
        Record<
          string,
          number
        > = {
        CAMERAS:
          1,

        LENSES:
          2,

        BATTERIES:
          3,
      };

      const firstCategory =
        categoryOrder[
          first.category
        ] ??
        99;

      const secondCategory =
        categoryOrder[
          second.category
        ] ??
        99;

      if (
        firstCategory !==
        secondCategory
      ) {
        return (
          firstCategory -
          secondCategory
        );
      }

      return first.name
        .localeCompare(
          second.name,
        );
    },
  );

  const cameras =
    products.filter(
      (product) =>
        isCategory(
          product,
          "CAMERAS",
        ),
    );

  const lenses =
    products.filter(
      (product) =>
        isCategory(
          product,
          "LENSES",
        ),
    );

  const batteries =
    products.filter(
      (product) =>
        isCategory(
          product,
          "BATTERIES",
        ),
    );

  const featuredProducts =
    products.filter(
      (product) =>
        product.isFeatured,
    );

    const productIds =
  new Set(
    products.map(
      (product) =>
        product.id,
    ),
  );

const comparisons =
  getAllComparisons()
    .filter(
      (comparison) =>
        comparisonBelongsToBrand(
          comparison,
          productIds,
        ),
    )
    .sort(
      (
        first,
        second,
      ) =>
        new Date(
          second.updatedAt,
        ).getTime() -
        new Date(
          first.updatedAt,
        ).getTime(),
    );

  const guides =
    getAllBuyingGuides()
      .filter(
        (guide) =>
          guideMentionsBrand(
            guide,
            brand,
          ),
      )
      .sort(
        (
          first,
          second,
        ) =>
          new Date(
            second.updatedAt,
          ).getTime() -
          new Date(
            first.updatedAt,
          ).getTime(),
      );

return {
  brand,

  products,

  cameras,

  lenses,

  batteries,

  featuredProducts,

  guides,

  comparisons,

  totalProducts:
    products.length,
};
}