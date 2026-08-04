import {
  SupabaseImageService,
} from "./SupabaseImageService";

import type {
  ProductImage,
  ProductImageType,
} from "./ProductImage";

import type {
  UploadProductImageInput,
} from "./ProductImageService";

export class ProductMediaRegistry {
  constructor(
    private readonly images =
      new SupabaseImageService(),
  ) {}

  upload(
    input: UploadProductImageInput,
  ): Promise<ProductImage> {
    return this.images.upload(
      input,
    );
  }

  uploadMany(
    input: UploadProductImageInput[],
  ): Promise<ProductImage[]> {
    return this.images.uploadMany(
      input,
    );
  }

  getHero(
    productId: string,
  ): Promise<ProductImage | null> {
    return this.images.getPrimary(
      productId,
    );
  }

  getGallery(
    productId: string,
  ): Promise<ProductImage[]> {
    return this.images.getGallery(
      productId,
    );
  }

  getByType(
    productId: string,
    type: ProductImageType,
  ): Promise<ProductImage[]> {
    return this.images.getByType(
      productId,
      type,
    );
  }

  setHero(
    imageId: string,
  ): Promise<void> {
    return this.images.setPrimary(
      imageId,
    );
  }

  delete(
    imageId: string,
  ): Promise<void> {
    return this.images.delete(
      imageId,
    );
  }

  replace(
    imageId: string,
    filePath: string,
  ): Promise<ProductImage> {
    return this.images.replace(
      imageId,
      filePath,
    );
  }

  findMissingImages() {
    return this.images.findMissingImages();
  }

  regenerateThumbnails() {
    return this.images.regenerateThumbnails();
  }
}

export const media =
  new ProductMediaRegistry();