import type { BrainEntity } from "./entity";

export interface ChipEntity
  extends BrainEntity {

  type: "chip";

  generation: number;

  manufacturer: string;

}