export interface ProductInfo {
  name: string;
  brand: string;
  model: string;
  category: string;

  price: number | null;

  image?: string;

  specs: Record<string, string>;
}