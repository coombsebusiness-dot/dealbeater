import type {
  ProductImage,
  ProductImageType,
} from "./ProductImage";

export interface UploadProductImageInput {
  productId: string;

  filePath: string;

  type: ProductImageType;

  alt: string;

  isPrimary?: boolean;

  sortOrder?: number;
}

export interface ProductImageService {
  upload(
    input: UploadProductImageInput,
  ): Promise<ProductImage>;

  uploadMany(
    images: UploadProductImageInput[],
  ): Promise<ProductImage[]>;

  getPrimary(
    productId: string,
  ): Promise<ProductImage | null>;

  getGallery(
    productId: string,
  ): Promise<ProductImage[]>;

  getByType(
    productId: string,
    type: ProductImageType,
  ): Promise<ProductImage[]>;

  setPrimary(
    imageId: string,
  ): Promise<void>;

  delete(
    imageId: string,
  ): Promise<void>;

  replace(
    imageId: string,
    filePath: string,
  ): Promise<ProductImage>;

  findMissingImages(): Promise<
    string[]
  >;

  regenerateThumbnails(): Promise<
    void
  >;
}