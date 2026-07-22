const AMAZON_HOSTS = [
  "amazon.co.uk",
  "www.amazon.co.uk",
  "smile.amazon.co.uk",
];

export function isAmazonUrl(value?: string | null): boolean {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    return AMAZON_HOSTS.some(
      (host) =>
        url.hostname === host ||
        url.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

export function addAmazonAffiliateTag(
  value?: string | null
): string | undefined {
  if (!value) {
    return undefined;
  }

  const associateTag =
    process.env.AMAZON_ASSOCIATE_TAG?.trim();

  if (!associateTag || !isAmazonUrl(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    url.searchParams.set(
      "tag",
      associateTag
    );

    return url.toString();
  } catch {
    return value;
  }
}