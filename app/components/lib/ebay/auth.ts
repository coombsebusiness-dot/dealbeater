type EbayTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export async function getEbayAccessToken() {
  const clientId = process.env.EBAY_CLIENT_ID!;
  const clientSecret = process.env.EBAY_CLIENT_SECRET!;

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://api.ebay.com/identity/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = (await response.json()) as EbayTokenResponse;

  return data.access_token;
}