import {
  NextRequest,
  NextResponse,
  after,
} from "next/server";

import { extractProductIdentity } from "@/lib/product-intelligence/product-identity";
import { findCanonicalProduct } from "@/product-intelligence/canonical/findCanonicalProduct";

import {
  saveProductAnalysis,
} from "@/app/components/lib/products/saveProductAnalysis";

import {
  analyseDealWithAI,
  type AnalyseDealInput,
} from "@/app/components/lib/ai/dealAI";

import {
  scrapeProductPage,
} from "@/app/components/lib/scrapers/productPageScraper";

import {
  getEbayItemByLegacyId,
} from "@/app/components/lib/ebay/browse";

export const runtime = "nodejs";
export const maxDuration = 60;

interface AnalyseRequestBody {
  mode?: "link" | "describe";
  input?: string;
  userInput?: string;
  scrapedContent?: string;
  imageUrl?: string;
}

export async function POST(
  request: NextRequest
) {
//   // console.error(
//   // "🔥 ROUTE VERSION: CANONICAL-V1"
// );
  /*
   * Hide noisy development logs unless debugging
   * has been explicitly enabled in .env.local.
   *
   * Timers using console.info() and genuine errors
   * using console.error() will still appear.
   */
  if (
    process.env.NODE_ENV === "development" &&
    process.env.BLINLX_DEBUG !== "true"
  ) {
    console.log = () => {};
    console.dir = () => {};
    console.warn = () => {};
  }

  try {
    const body =
      (await request.json()) as AnalyseRequestBody;

    const mode =
      body.mode ?? "describe";

    const userInput =
      body.userInput ??
      body.input ??
      "";

    if (
      !["link", "describe"].includes(mode)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid analysis mode.",
        },
        {
          status: 400,
        }
      );
    }

    if (!userInput.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a product link or description.",
        },
        {
          status: 400,
        }
      );
    }

    let resolvedUserInput =
      userInput.trim();

    let resolvedImageUrl =
      body.imageUrl?.trim() ||
      undefined;

    let scrapedContent =
      body.scrapedContent?.trim() ||
      undefined;

    let scrapeWarning:
      | string
      | undefined;

    if (
      mode === "link" &&
      !scrapedContent
    ) {
      const ebayItemId =
        extractEbayLegacyItemId(
          resolvedUserInput
        );

      /*
       * eBay blocks normal page scraping, so eBay
       * links are resolved through the official
       * Browse API.
       */
      if (ebayItemId) {
        try {
          const ebayItem =
            await getEbayItemByLegacyId(
              ebayItemId
            );
            if (!ebayItem) {
  throw new Error(
    "The eBay listing could not be found."
  );
}

          resolvedUserInput =
            ebayItem.title;

          if (
            !resolvedImageUrl &&
            ebayItem.imageUrl
          ) {
            resolvedImageUrl =
              ebayItem.imageUrl;
          }

          scrapedContent =
            buildEbayEvidence({
              originalUrl:
                userInput.trim(),
              item: ebayItem,
            });
        } catch (ebayError) {
          scrapeWarning =
            ebayError instanceof Error
              ? ebayError.message
              : "The eBay listing could not be read.";

          console.warn(
            "eBay listing lookup failed:",
            scrapeWarning
          );
        }
      } else {
        try {
          const scrapedPage =
            await Promise.race([
              scrapeProductPage(
                resolvedUserInput
              ),

              new Promise<never>(
                (_, reject) => {
                  setTimeout(() => {
                    reject(
                      new Error(
                        "The retailer page took too long to respond."
                      )
                    );
                  }, 4_000);
                }
              ),
            ]);

          scrapedContent =
            scrapedPage.evidence;

          if (
            !resolvedImageUrl &&
            scrapedPage.image
          ) {
            resolvedImageUrl =
              scrapedPage.image;
          }

          resolvedUserInput =
            scrapedPage.productName ??
            scrapedPage.title ??
            resolvedUserInput;
        } catch (scrapeError) {
          scrapeWarning =
            scrapeError instanceof Error
              ? scrapeError.message
              : "The product page could not be read.";

          console.warn(
            "Product-page scraping failed:",
            scrapeWarning
          );
        }
      }
    }

    const input: AnalyseDealInput = {
      mode,
      userInput:
        resolvedUserInput,
      scrapedContent,
      imageUrl:
        resolvedImageUrl,
    };

    const analysisStartedAt =
      performance.now();

    const report =
      await analyseDealWithAI(input);

    const analysisDuration =
      Math.round(
        performance.now() -
          analysisStartedAt
      );

    /*
     * console.info remains enabled so the useful
     * performance result is still visible.
     */
    console.info(
      `BLINLX ANALYSIS COMPLETE: ${analysisDuration}ms`
    );

   /*
 * Canonical matching and product saving are
 * background tasks. Neither should delay the
 * recommendation shown on the homepage.
 */
after(async () => {
  const backgroundStartedAt =
    performance.now();

  const productName =
    report.productName ?? "";

  try {
    if (productName.trim()) {
      const identity =
        extractProductIdentity(
          productName
        );

      const canonicalProduct =
        await findCanonicalProduct({
          category:
            identity.category,
          brand:
            identity.brand,
          family:
            identity.family,
          model: {
            base:
              identity.model,
          },
        });

      if (canonicalProduct.found) {
        console.info(
          "BLINLX CANONICAL PRODUCT MATCH:",
          {
            searchedProduct:
              productName,
            existingProductId:
              canonicalProduct.productId,
            existingSlug:
              canonicalProduct.slug,
            confidence:
              canonicalProduct.confidence,
            matchedFields:
              canonicalProduct.matchedFields,
          }
        );
      }
    }
  } catch (canonicalError) {
    console.error(
      "Canonical product lookup failed:",
      canonicalError
    );
  }

  const saveStartedAt =
    performance.now();

  try {
    const savedProduct =
      await saveProductAnalysis(
        report
      );

    console.info(
      `BLINLX PRODUCT SAVED: ${Math.round(
        performance.now() -
          saveStartedAt
      )}ms`,
      savedProduct
    );
  } catch (saveError) {
    console.error(
      "Product analysis could not be saved:",
      saveError
    );
  }

  console.info(
    `BLINLX BACKGROUND TASKS COMPLETE: ${Math.round(
      performance.now() -
        backgroundStartedAt
    )}ms`
  );
});

    return NextResponse.json({
      success: true,
      report,
      pageEvidenceUsed:
        Boolean(scrapedContent),
      scrapeWarning,
      performance: {
        analysisMs:
          analysisDuration,
      },
    });
  } catch (error) {
    console.error(
      "Deal analysis failed:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}

function extractEbayLegacyItemId(
  rawInput: string
): string | null {
  let url: URL;

  try {
    url = new URL(rawInput);
  } catch {
    return null;
  }

  const hostname =
    url.hostname
      .toLowerCase()
      .replace(/^www\./, "");

  const isEbayHostname =
    hostname === "ebay.co.uk" ||
    hostname.endsWith(
      ".ebay.co.uk"
    ) ||
    hostname === "ebay.com" ||
    hostname.endsWith(
      ".ebay.com"
    );

  if (!isEbayHostname) {
    return null;
  }

  const queryItemId =
    url.searchParams.get(
      "item"
    ) ??
    url.searchParams.get(
      "itemid"
    );

  if (
    queryItemId &&
    /^\d{9,15}$/.test(
      queryItemId
    )
  ) {
    return queryItemId;
  }

  const pathParts =
    url.pathname
      .split("/")
      .filter(Boolean)
      .reverse();

  for (
    const pathPart of pathParts
  ) {
    const match =
      pathPart.match(
        /\b(\d{9,15})\b/
      );

    if (match) {
      return match[1];
    }
  }

  return null;
}

function buildEbayEvidence({
  originalUrl,
  item,
}: {
  originalUrl: string;
 item: NonNullable<
  Awaited<
    ReturnType<
      typeof getEbayItemByLegacyId
    >
  >
>;
}): string {
  const price =
    item.price === null
      ? "Not found"
      : `${item.currency} ${item.price.toFixed(
          2
        )}`;

  return [
    "VERIFIED EBAY LISTING EVIDENCE",
    "",
    `Original URL: ${originalUrl}`,
    `Legacy eBay item ID: ${item.legacyItemId}`,
    `eBay Browse item ID: ${
      item.itemId ??
      "Not found"
    }`,
    `Product title: ${item.title}`,
    `Price: ${price}`,
    `Condition: ${
      item.condition ??
      "Not found"
    }`,
    `Image URL: ${
      item.imageUrl ??
      "Not found"
    }`,
    `Listing URL: ${
      item.itemUrl ??
      originalUrl
    }`,
    "",
    "This information was obtained through the official eBay Browse API.",
    "Treat only the information above as verified listing evidence.",
    "Anything marked 'Not found' remains unknown and must not be invented.",
  ].join("\n");
}