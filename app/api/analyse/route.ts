import { NextRequest, NextResponse } from "next/server";
import { analyseMarket } from "@/app/components/lib/dbi/market/marketAnalysis";
import {
  analyseDealWithAI,
  type AnalyseDealInput,
} from "@/app/components/lib/ai/dealAI";

import {
  scrapeProductPage,
} from "@/app/components/lib/scrapers/productPageScraper";

export const runtime = "nodejs";
export const maxDuration = 60;

interface AnalyseRequestBody {
  mode?: "link" | "describe" | "upload";
  input?: string;
  userInput?: string;
  scrapedContent?: string;
  imageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyseRequestBody;

    const mode = body.mode ?? "describe";
    const userInput = body.userInput ?? body.input ?? "";

    if (!["link", "describe", "upload"].includes(mode)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid analysis mode.",
        },
        { status: 400 }
      );
    }

    if (!userInput.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a product link or description.",
        },
        { status: 400 }
      );
    }

    let scrapedContent =
      body.scrapedContent?.trim() || undefined;

    let scrapeWarning: string | undefined;

    if (mode === "link" && !scrapedContent) {
      try {
       const scrapedPage = await Promise.race([
  scrapeProductPage(userInput.trim()),

  new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(
          "The retailer page took too long to respond."
        )
      );
    }, 4_000);
  }),
]);

scrapedContent = scrapedPage.evidence;
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

    const input: AnalyseDealInput = {
      mode,
      userInput: userInput.trim(),
      scrapedContent,
      imageUrl: body.imageUrl?.trim() || undefined,
    };

    const report = await analyseDealWithAI(input);

    return NextResponse.json({
      success: true,
      report,
      pageEvidenceUsed: Boolean(scrapedContent),
      scrapeWarning,
    });
  } catch (error) {
    console.error("Deal analysis failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}