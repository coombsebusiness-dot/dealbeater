export interface BrainEntity {

  id: string;

  name: string;

  type:
    | "product"
    | "chip"
    | "brand"
    | "retailer"
    | "category";

}