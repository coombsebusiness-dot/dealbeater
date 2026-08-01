export type DiscoveryItemType =
  | "merchant"
  | "guide"
  | "app"
  | "deal"
  | "assistant"
  | "category";

export interface DiscoveryItem {
  id: string;

  type: DiscoveryItemType;

  priority: number;

  title: string;

  description: string;

  href: string;

  image?: string;

  badge?: string;

  tags?: string[];

  category?: string;

  visible?: boolean;
}

export interface DiscoveryContext {
  category: string;

  guideSlug?: string;

  productType?: string;

  brand?: string;
}