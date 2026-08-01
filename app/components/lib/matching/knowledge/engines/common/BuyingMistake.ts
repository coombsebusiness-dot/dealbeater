import {
  Importance,
} from "./Importance";

export interface BuyingMistake {
  id: string;

  title: string;

  mistake: string;

  consequence: string;

  importance: Importance;
}