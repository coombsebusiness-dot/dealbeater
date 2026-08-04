import {
  createHash,
} from "node:crypto";

import {
  readFile,
} from "node:fs/promises";

import path from "node:path";

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

import type {
  ProductImageService,
  UploadProductImageInput,
} from "./ProductImageService";

const BUCKET_NAME =
  "product-media";

const TABLE_NAME =
  "product_images";

interface ProductImageRow {
  id: string;

  product_id: string;

  image_type: string;

  storage_path: string;

  public_url: string;

  alt_text: string;

  width: number | null;

  height: number | null;

  dominant_color: string | null;

  blur_data_url: string | null;

  checksum: string | null;

  source: string | null;

  license: string | null;

  is_primary: boolean;

  sort_order: number;

  category: string | null;

  brand: string | null;

  created_at: string;

  updated_at: string;
}

function normalisePathSegment(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function getContentType(
  filePath: string,
): string {
  const extension =
    path.extname(
      filePath,
    )
      .toLowerCase();

  switch (extension) {
    case ".webp":
      return "image/webp";

    case ".png":
      return "image/png";

    case ".jpg":
    case ".jpeg":
      return "image/jpeg";

    case ".avif":
      return "image/avif";

    default:
      throw new Error(
        `Unsupported image extension: ${extension}`,
      );
  }
}

function createChecksum(
  file: Buffer,
): string {
  return createHash(
    "sha256",
  )
    .update(
      file,
    )
    .digest(
      "hex",
    );
}

function mapRow(
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

export class SupabaseImageService
  implements ProductImageService {
  async upload(
    input: UploadProductImageInput,
  ): Promise<ProductImage> {
    const product =
      defaultProductBrain
        .findKnowledge(
          input.productId,
        );

    if (!product) {
      throw new Error(
        `No canonical product was found for "${input.productId}".`,
      );
    }

    const file =
      await readFile(
        input.filePath,
      );

    const checksum =
      createChecksum(
        file,
      );

    const existingImage =
      await this.findByChecksum(
        checksum,
      );

    if (existingImage) {
      return existingImage;
    }

    const extension =
      path.extname(
        input.filePath,
      )
        .toLowerCase();

    const category =
      normalisePathSegment(
        product.category,
      );

    const brand =
      normalisePathSegment(
        product.brand,
      );

    const type =
      input.type
        .toLowerCase();

    const sortOrder =
      input.sortOrder ??
      0;

    const fileName =
      `${input.productId}-${type}-${sortOrder}${extension}`;

    const storagePath =
      [
        category,
        brand,
        input.productId,
        fileName,
      ].join("/");

    if (
      input.isPrimary
    ) {
      await this.clearPrimaryForProduct(
        input.productId,
      );
    }

    const {
      error: uploadError,
    } =
      await supabaseAdmin
        .storage
        .from(
          BUCKET_NAME,
        )
        .upload(
          storagePath,
          file,
          {
            contentType:
              getContentType(
                input.filePath,
              ),

            cacheControl:
              "31536000",

            upsert:
              true,
          },
        );

    if (uploadError) {
      throw new Error(
        `Unable to upload product image: ${uploadError.message}`,
      );
    }

    const {
      data: publicUrlData,
    } =
      supabaseAdmin
        .storage
        .from(
          BUCKET_NAME,
        )
        .getPublicUrl(
          storagePath,
        );

    const {
      data,
      error: insertError,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .insert({
          product_id:
            input.productId,

          image_type:
            input.type,

          storage_path:
            storagePath,

          public_url:
            publicUrlData.publicUrl,

          alt_text:
            input.alt,

          checksum,

          is_primary:
            input.isPrimary ??
            false,

          sort_order:
            sortOrder,

          category:
            product.category,

          brand:
            product.brand,
        })
        .select("*")
        .single();

    if (
      insertError ||
      !data
    ) {
      await supabaseAdmin
        .storage
        .from(
          BUCKET_NAME,
        )
        .remove([
          storagePath,
        ]);

      throw new Error(
        `Unable to save product-image metadata: ${
          insertError?.message ??
          "Unknown database error"
        }`,
      );
    }

    return mapRow(
      data as ProductImageRow,
    );
  }

  async uploadMany(
    images:
      UploadProductImageInput[],
  ): Promise<ProductImage[]> {
    const uploaded:
      ProductImage[] = [];

    for (
      const image of images
    ) {
      uploaded.push(
        await this.upload(
          image,
        ),
      );
    }

    return uploaded;
  }

  async getPrimary(
    productId: string,
  ): Promise<ProductImage | null> {
    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select("*")
        .eq(
          "product_id",
          productId,
        )
        .eq(
          "is_primary",
          true,
        )
        .order(
          "sort_order",
          {
            ascending:
              true,
          },
        )
        .limit(
          1,
        )
        .maybeSingle();

    if (error) {
      throw new Error(
        `Unable to load the primary product image: ${error.message}`,
      );
    }

    if (!data) {
      return null;
    }

    return mapRow(
      data as ProductImageRow,
    );
  }

  async getGallery(
    productId: string,
  ): Promise<ProductImage[]> {
    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select("*")
        .eq(
          "product_id",
          productId,
        )
        .neq(
          "image_type",
          "THUMBNAIL",
        )
        .order(
          "is_primary",
          {
            ascending:
              false,
          },
        )
        .order(
          "sort_order",
          {
            ascending:
              true,
          },
        )
        .order(
          "created_at",
          {
            ascending:
              true,
          },
        );

    if (error) {
      throw new Error(
        `Unable to load the product gallery: ${error.message}`,
      );
    }

    return (
      data ??
      []
    ).map(
      (row) =>
        mapRow(
          row as ProductImageRow,
        ),
    );
  }

  async getByType(
  productId: string,
  type: ProductImageType,
): Promise<ProductImage[]> {
    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select("*")
        .eq(
          "product_id",
          productId,
        )
        .eq(
          "image_type",
          type,
        )
        .order(
          "sort_order",
          {
            ascending:
              true,
          },
        )
        .order(
          "created_at",
          {
            ascending:
              true,
          },
        );

    if (error) {
      throw new Error(
        `Unable to load ${type.toLowerCase()} images: ${error.message}`,
      );
    }

    return (
      data ??
      []
    ).map(
      (row) =>
        mapRow(
          row as ProductImageRow,
        ),
    );
  }

  async setPrimary(
    imageId: string,
  ): Promise<void> {
    const {
      data: image,
      error: imageError,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select(
          "id, product_id",
        )
        .eq(
          "id",
          imageId,
        )
        .maybeSingle();

    if (imageError) {
      throw new Error(
        `Unable to find the product image: ${imageError.message}`,
      );
    }

    if (!image) {
      throw new Error(
        `No product image was found for "${imageId}".`,
      );
    }

    await this.clearPrimaryForProduct(
      image.product_id,
    );

    const {
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .update({
          is_primary:
            true,

          image_type:
            "HERO",
        })
        .eq(
          "id",
          imageId,
        );

    if (error) {
      throw new Error(
        `Unable to set the primary product image: ${error.message}`,
      );
    }
  }

  async delete(
    imageId: string,
  ): Promise<void> {
    const {
      data: image,
      error: lookupError,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select(
          "storage_path",
        )
        .eq(
          "id",
          imageId,
        )
        .maybeSingle();

    if (lookupError) {
      throw new Error(
        `Unable to find the product image: ${lookupError.message}`,
      );
    }

    if (!image) {
      return;
    }

    const {
      error: storageError,
    } =
      await supabaseAdmin
        .storage
        .from(
          BUCKET_NAME,
        )
        .remove([
          image.storage_path,
        ]);

    if (storageError) {
      throw new Error(
        `Unable to remove the stored image: ${storageError.message}`,
      );
    }

    const {
      error: databaseError,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .delete()
        .eq(
          "id",
          imageId,
        );

    if (databaseError) {
      throw new Error(
        `Unable to delete product-image metadata: ${databaseError.message}`,
      );
    }
  }

  async replace(
    imageId: string,
    filePath: string,
  ): Promise<ProductImage> {
    const {
      data: existing,
      error: lookupError,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select("*")
        .eq(
          "id",
          imageId,
        )
        .maybeSingle();

    if (lookupError) {
      throw new Error(
        `Unable to find the product image: ${lookupError.message}`,
      );
    }

    if (!existing) {
      throw new Error(
        `No product image was found for "${imageId}".`,
      );
    }

    const existingImage =
      existing as ProductImageRow;

    const file =
      await readFile(
        filePath,
      );

    const checksum =
      createChecksum(
        file,
      );

    const {
      error: uploadError,
    } =
      await supabaseAdmin
        .storage
        .from(
          BUCKET_NAME,
        )
        .upload(
          existingImage.storage_path,
          file,
          {
            contentType:
              getContentType(
                filePath,
              ),

            cacheControl:
              "31536000",

            upsert:
              true,
          },
        );

    if (uploadError) {
      throw new Error(
        `Unable to replace the stored image: ${uploadError.message}`,
      );
    }

    const {
      data,
      error: updateError,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .update({
          checksum,
        })
        .eq(
          "id",
          imageId,
        )
        .select("*")
        .single();

    if (
      updateError ||
      !data
    ) {
      throw new Error(
        `Unable to update product-image metadata: ${
          updateError?.message ??
          "Unknown database error"
        }`,
      );
    }

    return mapRow(
      data as ProductImageRow,
    );
  }

  async findMissingImages():
    Promise<string[]> {
    const products =
      defaultProductBrain
        .getAllKnowledge();

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select(
          "product_id",
        )
        .eq(
          "is_primary",
          true,
        );

    if (error) {
      throw new Error(
        `Unable to check missing product images: ${error.message}`,
      );
    }

    const productsWithImages =
      new Set(
        (
          data ??
          []
        ).map(
          (row) =>
            row.product_id,
        ),
      );

    return products
      .filter(
        (product) =>
          !productsWithImages.has(
            product.id,
          ),
      )
      .map(
        (product) =>
          product.id,
      );
  }

  async regenerateThumbnails():
    Promise<void> {
    /*
     * Thumbnail generation will be connected to
     * ThumbnailGenerator once its output contract
     * and image sizes are finalised.
     *
     * Keeping this explicit prevents the service
     * from silently claiming that thumbnails were
     * regenerated when no files were created.
     */
    throw new Error(
      "Thumbnail regeneration has not been connected to ThumbnailGenerator yet.",
    );
  }

  private async findByChecksum(
    checksum: string,
  ): Promise<ProductImage | null> {
    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .select("*")
        .eq(
          "checksum",
          checksum,
        )
        .maybeSingle();

    if (error) {
      throw new Error(
        `Unable to check for duplicate images: ${error.message}`,
      );
    }

    if (!data) {
      return null;
    }

    return mapRow(
      data as ProductImageRow,
    );
  }

  private async clearPrimaryForProduct(
    productId: string,
  ): Promise<void> {
    const {
      error,
    } =
      await supabaseAdmin
        .from(
          TABLE_NAME,
        )
        .update({
          is_primary:
            false,
        })
        .eq(
          "product_id",
          productId,
        )
        .eq(
          "is_primary",
          true,
        );

    if (error) {
      throw new Error(
        `Unable to clear the existing primary image: ${error.message}`,
      );
    }
  }
}