export interface BrandSeo {
  title: string;

  description: string;

  canonicalPath: string;
}

export interface BrandOverview {
  heading: string;

  summary: string;

  buyingAdvice?: string;
}

export interface Brand {
  id: string;

  slug: string;

  name: string;

  description: string;

  logo?: {
    src: string;

    alt: string;
  };

  heroImage?: {
    src: string;

    alt: string;
  };

  overview: BrandOverview;

  featuredProductIds?: string[];

  supportedCategories: string[];

  seo: BrandSeo;

  publishedAt: string;

  updatedAt: string;

  isPublished: boolean;
}