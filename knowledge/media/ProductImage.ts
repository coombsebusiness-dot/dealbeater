export type ProductImageType =
  | "HERO"
  | "GALLERY"
  | "LIFESTYLE"
  | "IN_USE"
  | "PACKAGING"
  | "DETAIL"
  | "COMPARISON"
  | "THUMBNAIL";

export interface ProductImage {
  id: string;

  productId: string;

  type: ProductImageType;

  storagePath: string;

  publicUrl: string;

  alt: string;

  width?: number;

  height?: number;

  dominantColor?: string;

  blurDataUrl?: string;

  isPrimary: boolean;

  sortOrder: number;

  source?: string;

  license?: string;

  checksum?: string;

  createdAt: string;

  updatedAt: string;
}