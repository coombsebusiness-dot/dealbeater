import {
  defaultProductBrain,
} from "@/knowledge/products/defaultProductBrain";

import type {
  CanonicalProduct,
} from "@/knowledge/products/CanonicalProduct";

import {
  getAllComparisons,
} from "@/knowledge/comparisons/ComparisonRegistry";

import type {
  ComparisonDefinition,
} from "@/knowledge/comparisons/ComparisonRegistry";

import {
  media,
} from "@/knowledge/media/ProductMediaRegistry";

import type {
  ProductImage,
} from "@/knowledge/media/ProductImage";

import {
  getAllBuyingGuides,
} from "@/knowledge/guides/GuideRegistry";

import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import type {
  Category,
} from "./Category";

import {
  getCategoryBySlug,
} from "./CategoryRegistry";

export interface CategoryPageProduct {
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

export interface CategoryBrandGroup {
  brand: string;

  slug: string;

  products:
    CategoryPageProduct[];

  totalProducts: number;
}

export interface CategoryPageData {
  category: Category;

  products:
    CategoryPageProduct[];

  featuredProducts:
    CategoryPageProduct[];

  brandGroups:
    CategoryBrandGroup[];

  guides:
    BuyingGuide[];

  totalProducts: number;

  totalBrands: number;

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

function createUrlSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function productBelongsToCategory(
  product: CanonicalProduct,
  category: Category,
): boolean {
  return (
    normaliseValue(
      product.category,
    ) ===
    normaliseValue(
      category.id,
    )
  );
}

function guideMentionsCategory(
  guide: BuyingGuide,
  category: Category,
): boolean {
  const categoryTerms =
    new Set([
      normaliseValue(
        category.id,
      ),

      normaliseValue(
        category.slug,
      ),

      normaliseValue(
        category.name,
      ),

      ...category.supportedBrands?.map(
        normaliseValue,
      ) ??
        [],
    ]);

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
      .join(
        " ",
      )
      .toLowerCase();

  return Array.from(
    categoryTerms,
  ).some(
    (term) =>
      searchText.includes(
        term,
      ),
  );
}

async function createCategoryProduct(
  product: CanonicalProduct,
  featuredProductIds: Set<string>,
): Promise<CategoryPageProduct> {
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
      `Unable to load category-page image for ${product.id}:`,
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

function createBrandGroups(
  products:
    CategoryPageProduct[],
): CategoryBrandGroup[] {
  const groups =
    new Map<
      string,
      CategoryPageProduct[]
    >();

  for (const product of products) {
    const displayBrand =
      normaliseValue(
        product.brand,
      ) === "nikkor"
        ? "Nikon"
        : product.brand;

    const current =
      groups.get(
        displayBrand,
      ) ?? [];

    current.push(
      product,
    );

    groups.set(
      displayBrand,
      current,
    );
  }

  return Array.from(
    groups.entries(),
  )
    .map(
      (
        [
          brand,
          brandProducts,
        ],
      ): CategoryBrandGroup => ({
        brand,

        slug:
          createUrlSlug(
            brand,
          ),

        products:
          brandProducts.sort(
            (
              first,
              second,
            ) =>
              first.name.localeCompare(
                second.name,
              ),
          ),

        totalProducts:
          brandProducts.length,
      }),
    )
    .sort(
      (
        first,
        second,
      ) =>
        first.brand.localeCompare(
          second.brand,
        ),
    );
}
function comparisonBelongsToCategory(
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

export async function loadCategoryPage(
  categorySlug: string,
): Promise<
  CategoryPageData | null
> {
  const category =
    getCategoryBySlug(
      categorySlug,
    );

  if (!category) {
    return null;
  }

  const featuredProductIds =
    new Set(
      category.featuredProductIds ??
        [],
    );

    

  const canonicalProducts =
    defaultProductBrain
      .getAllKnowledge()
      .filter(
        (product) =>
          productBelongsToCategory(
            product,
            category,
          ),
      );

  const products =
    await Promise.all(
      canonicalProducts.map(
        (product) =>
          createCategoryProduct(
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

      const brandComparison =
        first.brand.localeCompare(
          second.brand,
        );

      if (
        brandComparison !== 0
      ) {
        return brandComparison;
      }

      return first.name.localeCompare(
        second.name,
      );
    },
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
        comparisonBelongsToCategory(
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
  const brandGroups =
    createBrandGroups(
      products,
    );

  const guides =
    getAllBuyingGuides()
      .filter(
        (guide) =>
          guideMentionsCategory(
            guide,
            category,
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
  category,

  products,

  featuredProducts,

  brandGroups,

  guides,

  comparisons,

  totalProducts:
    products.length,

  totalBrands:
    brandGroups.length,
};
}