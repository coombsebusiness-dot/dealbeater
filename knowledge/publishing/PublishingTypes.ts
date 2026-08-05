export type PublishingPageType =
  | "PRODUCT"
  | "BUYING_GUIDE"
  | "COMPARISON";

export type PublishingItemStatus =
  | "READY"
  | "BLOCKED";

export interface PublishingQueueItem {
  id:
    string;

  slug:
    string;

  title:
    string;

  type:
    PublishingPageType;

  status:
    PublishingItemStatus;

  href:
    string;

  reason?:
    string;
}

export interface PublishingPlanSummary {
  products:
    number;

  buyingGuides:
    number;

  comparisons:
    number;

  ready:
    number;

  blocked:
    number;

  total:
    number;
}

export interface PublishingPlan {
  items:
    PublishingQueueItem[];

  summary:
    PublishingPlanSummary;
}