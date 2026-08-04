import type {
  CanonicalProduct,
} from "./CanonicalProduct";

export interface BatteryProduct
  extends CanonicalProduct {
  category:
    "BATTERIES";

  productType:
    "BATTERY";

  battery: {
    chemistry:
      string;

    rechargeable:
      boolean;

    capacityWh?:
      number;

    capacityMah?:
      number;

    voltage?:
      number;
  };

  compatibleProducts:
    string[];
}