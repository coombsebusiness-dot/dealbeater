import {
  NextRequest,
  NextResponse,
} from "next/server";

import { searchAmazon } from "@/app/components/lib/scrapers/amazon";

export async function GET(
  request: NextRequest
) {
  try {
    const query =
      request.nextUrl.searchParams.get("q") ??
      "Sony WH-1000XM6";

    const result = await searchAmazon(
      query,
      {
        limit: 5,
      }
    );

    return NextResponse.json({
      success: true,
      query,
      ...result,
    });
  } catch (error) {
    console.error(
      "Amazon test route failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown Amazon search error.",
      },
      {
        status: 500,
      }
    );
  }
}