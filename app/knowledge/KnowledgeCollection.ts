import type {
  KnowledgeArticleType,
} from "./KnowledgeArticle";

export interface KnowledgeCollectionQuery {
  articleIds?: string[];

  tags?: string[];

  categories?: string[];

  types?: KnowledgeArticleType[];

  minimumConfidence?: number;

  includeRelated?: boolean;

  relatedLimit?: number;

  limit?: number;
}

export interface KnowledgeCollection {
  id: string;

  title: string;

  description: string;

  query: KnowledgeCollectionQuery;

  tags?: string[];

  categories?: string[];

  active?: boolean;
}