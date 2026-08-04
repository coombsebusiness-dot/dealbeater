import {
  supabaseAdmin,
} from "@/app/components/lib/supabase/admin";

import {
  defaultProductBrain,
} from "@/knowledge/products/defaultProductBrain";

import type {
  ProductImage,
  ProductImageType,
} from "./ProductImage";

export interface AdminMediaProduct {
  id: string;

  slug: string;

  name: string;

  category: string;

  brand: string;

  heroImage:
    ProductImage | null;

  images:
    ProductImage[];

  missingHero:
    boolean;
}

interface ProductImageRow {
  id: string;

  product_id: string;

  image_type: string;

  storage_path: string;

  public_url: string;

  alt_text: string;

  width: number | null;

  height: number | null;

  dominant_color:
    string | null;

  blur_data_url:
    string | null;

  checksum:
    string | null;

  source:
    string | null;

  license:
    string | null;

  is_primary:
    boolean;

  sort_order:
    number;

  created_at:
    string;

  updated_at:
    string;
}

function mapImage(
  row: ProductImageRow,
): ProductImage {
  return {
    id:
      row.id,

    productId:
      row.product_id,

    type:
      row.image_type as ProductImageType,

    storagePath:
      row.storage_path,

    publicUrl:
      row.public_url,

    alt:
      row.alt_text,

    width:
      row.width ??
      undefined,

    height:
      row.height ??
      undefined,

    dominantColor:
      row.dominant_color ??
      undefined,

    blurDataUrl:
      row.blur_data_url ??
      undefined,

    checksum:
      row.checksum ??
      undefined,

    source:
      row.source ??
      undefined,

    license:
      row.license ??
      undefined,

    isPrimary:
      row.is_primary,

    sortOrder:
      row.sort_order,

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,
  };
}

export async function loadAdminMediaLibrary():
  Promise<AdminMediaProduct[]> {
  const products =
    defaultProductBrain
      .getAllKnowledge();

  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from(
        "product_images",
      )
      .select("*")
      .order(
        "product_id",
        {
          ascending:
            true,
        },
      )
      .order(
        "sort_order",
        {
          ascending:
            true,
        },
      );

  if (error) {
    throw new Error(
      `Unable to load the media library: ${error.message}`,
    );
  }

  const imagesByProduct =
    new Map<
      string,
      ProductImage[]
    >();

  for (
    const row of
    data ?? []
  ) {
    const image =
      mapImage(
        row as ProductImageRow,
      );

    const current =
      imagesByProduct.get(
        image.productId,
      ) ?? [];

    current.push(
      image,
    );

    imagesByProduct.set(
      image.productId,
      current,
    );
  }

  return products
    .map(
      (
        product,
      ): AdminMediaProduct => {
        const images =
          imagesByProduct.get(
            product.id,
          ) ?? [];

        const heroImage =
          images.find(
            (image) =>
              image.isPrimary,
          ) ??
          images.find(
            (image) =>
              image.type ===
              "HERO",
          ) ??
          null;

        return {
          id:
            product.id,

          slug:
            product.slug,

          name:
            product.fullName,

          category:
            product.category,

          brand:
            product.brand,

          heroImage,

          images,

          missingHero:
            !heroImage,
        };
      },
    )
    .sort(
      (
        first,
        second,
      ) =>
        first.category.localeCompare(
          second.category,
        ) ||
        first.brand.localeCompare(
          second.brand,
        ) ||
        first.name.localeCompare(
          second.name,
        ),
    );
}