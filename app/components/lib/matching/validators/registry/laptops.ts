import type { ProductValidator } from "../types";

import { defaultValidators } from "./default";

export const laptopValidators: ProductValidator[] = [
  ...defaultValidators,
];