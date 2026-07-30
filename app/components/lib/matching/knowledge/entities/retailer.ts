import type { BrainEntity } from "./entity";

export interface RetailerEntity
  extends BrainEntity {

  type: "retailer";

  trustScore?: number;

}