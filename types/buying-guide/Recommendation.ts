export interface Recommendation {
  id: string;

  title: string;

  description: string;

  reasons: string[];

  image?: string;

  href?: string;

  badge?: string;
}