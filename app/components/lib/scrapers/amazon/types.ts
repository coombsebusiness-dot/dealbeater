export interface AmazonProduct {
  asin: string;

  title: string;

  price: number | null;

  image: string | null;

  canonicalUrl: string;

  rating: number | null;

  reviewCount: number | null;

  availability: string[] | null;

  isPrime: boolean;
}

export interface AmazonSearchOptions {
  limit?: number;
}

export interface AmazonSearchResult {
  products: AmazonProduct[];

  total: number;
}