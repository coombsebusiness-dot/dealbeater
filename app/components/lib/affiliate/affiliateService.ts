import { retailers } from "./retailers";

export function getRetailerConfig(retailer: string) {
  return retailers[retailer.toLowerCase()];
}

export function getAffiliateLink(
  retailer: string,
  normalUrl: string
) {
  const config = getRetailerConfig(retailer);

  if (!config) {
    return normalUrl;
  }

  if (!config.enabled) {
    return normalUrl;
  }

  if (!config.affiliateUrl) {
    return normalUrl;
  }

  return config.affiliateUrl;
}