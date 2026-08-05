export interface CategorySeo {
  title: string;

  description: string;

  canonicalPath: string;
}

export interface CategoryOverview {
  heading: string;

  summary: string;

  buyingAdvice?: string;
}

export interface Category {
  id: string;

  slug: string;

  name: string;

  description: string;

  overview: CategoryOverview;

  featuredProductIds?: string[];

  supportedBrands?: string[];

  seo: CategorySeo;

  publishedAt: string;

  updatedAt: string;

  isPublished: boolean;
}