import { ImageResponse } from "next/og";

import { getProductBySlug } from "@/app/components/lib/products/getProductBySlug";

export const alt =
  "Blinlx verified product buying report";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{
    category: string;
    brand: string;
    model: string;
  }>;
};

function normaliseSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toOptionalNumber(
  value: unknown
): number | undefined {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue)
    ? parsedValue
    : undefined;
}

function formatPrice(
  value: unknown
): string | null {
  const price = toOptionalNumber(value);

  if (
    price === undefined ||
    price <= 0
  ) {
    return null;
  }

  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits:
        Number.isInteger(price)
          ? 0
          : 2,
    }
  ).format(price);
}

function formatVerdict(
  value: unknown
): string {
  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    return "VIEW REPORT";
  }

  return value
    .replace(/_/g, " ")
    .trim()
    .toUpperCase();
}

function getVerdictColour(
  verdict: string
): string {
  if (
    verdict.includes("BUY") ||
    verdict.includes("EXCELLENT")
  ) {
    return "#35ef73";
  }

  if (
    verdict.includes("WAIT") ||
    verdict.includes("NEGOTIATE")
  ) {
    return "#ffcf4a";
  }

  if (
    verdict.includes("WALK") ||
    verdict.includes("AVOID")
  ) {
    return "#ff6577";
  }

  return "#35ef73";
}

function cleanProductName(
  value: string
): string {
  return value
    .replace(
      /\bsony a1\b/i,
      "Sony Alpha 1"
    )
    .replace(
      /\bcamera body only\b/i,
      "Mirrorless Camera Body"
    )
    .replace(/\s+/g, " ")
    .trim();
}

export default async function Image({
  params,
}: OpenGraphImageProps) {
  const {
    category,
    brand,
    model,
  } = await params;

  const normalisedModel =
    normaliseSlug(model);

  const fullSlug =
    normaliseSlug(`${brand}-${model}`);

  const storedProduct =
    (await getProductBySlug(fullSlug)) ??
    (await getProductBySlug(
      normalisedModel
    ));

  const rawProductName =
    storedProduct?.name ??
    model.replace(/[-_]+/g, " ");

  const productName =
    cleanProductName(rawProductName);

  const verdict = formatVerdict(
    storedProduct?.verdict ??
      storedProduct?.verdictLabel
  );

  const verdictColour =
    getVerdictColour(verdict);

  const score =
    toOptionalNumber(
      storedProduct?.blinlxScore ??
        storedProduct?.dealScore
    ) ?? 0;

  const roundedScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(score)
    )
  );

  const currentPrice = formatPrice(
    storedProduct?.currentPrice
  );

  const fairPrice = formatPrice(
    storedProduct?.fairPrice
  );

  const retailer =
    storedProduct
      ?.primaryOfferRetailer ??
    storedProduct?.topOffers?.[0]
      ?.retailer ??
    null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #142736 0%, #0d1923 50%, #071018 100%)",
          color: "#ffffff",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            top: "-250px",
            left: "-170px",
            borderRadius: "999px",
            background:
              "rgba(53, 239, 115, 0.15)",
            filter: "blur(65px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "460px",
            height: "460px",
            right: "-180px",
            bottom: "-230px",
            borderRadius: "999px",
            background:
              "rgba(68, 130, 255, 0.14)",
            filter: "blur(70px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "28px",
            display: "flex",
            border:
              "1px solid rgba(255,255,255,0.14)",
            borderRadius: "34px",
            background:
              "rgba(255,255,255,0.025)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding:
              "58px 70px 52px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #35ef73, #17b858)",
                  color: "#07140d",
                  fontSize: "31px",
                  fontWeight: 950,
                  boxShadow:
                    "0 14px 38px rgba(53,239,115,0.25)",
                }}
              >
                B
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "35px",
                    fontWeight: 950,
                    letterSpacing:
                      "-0.04em",
                  }}
                >
                  BLINLX
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: "2px",
                    color:
                      "rgba(255,255,255,0.52)",
                    fontSize: "15px",
                    fontWeight: 800,
                    letterSpacing:
                      "0.14em",
                  }}
                >
                  VERIFIED BUYING REPORT
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding:
                  "13px 20px",
                border:
                  "1px solid rgba(53,239,115,0.3)",
                borderRadius: "999px",
                background:
                  "rgba(53,239,115,0.08)",
                color: "#74f59b",
                fontSize: "15px",
                fontWeight: 900,
                letterSpacing:
                  "0.08em",
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: "10px",
                  height: "10px",
                  borderRadius:
                    "999px",
                  background:
                    "#35ef73",
                  boxShadow:
                    "0 0 16px rgba(53,239,115,0.8)",
                }}
              />

              BLINLX VERIFIED
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "48px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                maxWidth: "790px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color:
                    "rgba(255,255,255,0.48)",
                  fontSize: "16px",
                  fontWeight: 800,
                  letterSpacing:
                    "0.12em",
                  textTransform:
                    "uppercase",
                }}
              >
                {category.replace(
                  /[-_]+/g,
                  " "
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "14px",
                  fontSize:
                    productName.length >
                    45
                      ? "45px"
                      : "54px",
                  lineHeight: 1.04,
                  fontWeight: 950,
                  letterSpacing:
                    "-0.045em",
                }}
              >
                {productName}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "27px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding:
                      "12px 22px",
                    borderRadius:
                      "999px",
                    border: `1px solid ${verdictColour}66`,
                    background: `${verdictColour}18`,
                    color:
                      verdictColour,
                    fontSize: "20px",
                    fontWeight: 950,
                    letterSpacing:
                      "0.04em",
                  }}
                >
                  {verdict}
                </div>

                {retailer && (
                  <div
                    style={{
                      display: "flex",
                      color:
                        "rgba(255,255,255,0.52)",
                      fontSize: "17px",
                      fontWeight: 700,
                    }}
                  >
                    Checked at{" "}
                    {retailer}
                  </div>
                )}
              </div>

              {(currentPrice ||
                fairPrice) && (
                <div
                  style={{
                    display: "flex",
                    gap: "38px",
                    marginTop: "34px",
                  }}
                >
                  {currentPrice && (
                    <div
                      style={{
                        display:
                          "flex",
                        flexDirection:
                          "column",
                      }}
                    >
                      <span
                        style={{
                          display:
                            "flex",
                          color:
                            "rgba(255,255,255,0.46)",
                          fontSize:
                            "14px",
                          fontWeight:
                            800,
                          letterSpacing:
                            "0.11em",
                        }}
                      >
                        CURRENT PRICE
                      </span>

                      <span
                        style={{
                          display:
                            "flex",
                          marginTop:
                            "6px",
                          fontSize:
                            "32px",
                          fontWeight:
                            950,
                        }}
                      >
                        {currentPrice}
                      </span>
                    </div>
                  )}

                  {fairPrice && (
                    <div
                      style={{
                        display:
                          "flex",
                        flexDirection:
                          "column",
                      }}
                    >
                      <span
                        style={{
                          display:
                            "flex",
                          color:
                            "rgba(255,255,255,0.46)",
                          fontSize:
                            "14px",
                          fontWeight:
                            800,
                          letterSpacing:
                            "0.11em",
                        }}
                      >
                        FAIR PRICE
                      </span>

                      <span
                        style={{
                          display:
                            "flex",
                          marginTop:
                            "6px",
                          color:
                            "#9cb0bd",
                          fontSize:
                            "32px",
                          fontWeight:
                            900,
                        }}
                      >
                        {fairPrice}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                width: "230px",
                height: "230px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:
                  "center",
                borderRadius: "999px",
                border:
                  "8px solid rgba(53,239,115,0.85)",
                background:
                  "radial-gradient(circle, rgba(53,239,115,0.16), rgba(53,239,115,0.035) 65%, transparent 66%)",
                boxShadow:
                  "0 0 0 14px rgba(53,239,115,0.055), 0 24px 70px rgba(0,0,0,0.32)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "flex-end",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    color: "#ffffff",
                    fontSize: "72px",
                    lineHeight: 0.9,
                    fontWeight: 950,
                    letterSpacing:
                      "-0.06em",
                  }}
                >
                  {roundedScore}
                </span>

                <span
                  style={{
                    display: "flex",
                    marginLeft: "5px",
                    marginBottom:
                      "7px",
                    color:
                      "rgba(255,255,255,0.5)",
                    fontSize: "22px",
                    fontWeight: 800,
                  }}
                >
                  /100
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "13px",
                  color: "#72f599",
                  fontSize: "15px",
                  fontWeight: 900,
                  letterSpacing:
                    "0.1em",
                }}
              >
                BLINLX SCORE
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              paddingTop: "22px",
              borderTop:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                color:
                  "rgba(255,255,255,0.7)",
                fontSize: "18px",
                fontWeight: 750,
              }}
            >
              Before you spend a
              penny... ask Blinlx.
            </div>

            <div
              style={{
                display: "flex",
                color: "#62f08e",
                fontSize: "18px",
                fontWeight: 900,
              }}
            >
              blinlx.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}