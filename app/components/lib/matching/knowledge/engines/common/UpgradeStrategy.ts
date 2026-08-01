import {
  Importance,
} from "./Importance";

export interface UpgradeStrategy {
  id: string;

  title: string;

  strategy: string;

  importance: Importance;
}