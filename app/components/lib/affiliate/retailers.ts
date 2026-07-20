export interface RetailerConfig {
  name: string;
  network: "awin" | "cj" | "partnerize" | "direct";
  enabled: boolean;
  affiliateUrl?: string;
}

export const retailers: Record<string, RetailerConfig> = {
  amazon: {
    name: "Amazon",
    network: "direct",
    enabled: false,
  },

  currys: {
    name: "Currys",
    network: "awin",
    enabled: false,
  },

  johnlewis: {
    name: "John Lewis",
    network: "awin",
    enabled: false,
  },

  ao: {
    name: "AO",
    network: "awin",
    enabled: false,
  },

  argos: {
    name: "Argos",
    network: "awin",
    enabled: false,
  },

  dell: {
    name: "Dell",
    network: "cj",
    enabled: false,
  },

  lenovo: {
    name: "Lenovo",
    network: "partnerize",
    enabled: false,
  },
};