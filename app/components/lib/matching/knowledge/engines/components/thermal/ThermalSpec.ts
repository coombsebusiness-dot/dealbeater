export type CoolingDesign =
  | "PASSIVE"
  | "SINGLE_FAN"
  | "DUAL_FAN"
  | "TRIPLE_FAN"
  | "VAPOR_CHAMBER"
  | "LIQUID_METAL"
  | "HEAT_PIPE"
  | "UNKNOWN";

export interface ThermalSpec {
  coolingDesign?: CoolingDesign[];

  fanCount?: number;

  heatPipeCount?: number;

  vaporChamber?: boolean;

  liquidMetal?: boolean;

  passiveCooling?: boolean;

  sustainedPowerWatts?: number;

  peakPowerWatts?: number;

  throttlingPercent?: number;

  idleNoiseDb?: number;

  loadNoiseDb?: number;

  keyboardTemperatureC?: number;

  undersideTemperatureC?: number;

  exhaustTemperatureC?: number;

  chassisMaterial?:
    | "ALUMINIUM"
    | "MAGNESIUM"
    | "PLASTIC"
    | "CARBON_FIBRE"
    | "MIXED"
    | string;

  ventPlacement?: string[];

  userServiceableCooling?: boolean;
}