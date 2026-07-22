import { NextRequest, NextResponse } from "next/server";
import { searchEbay } from "@/app/components/lib/ebay/browse";

export async function GET(request: NextRequest) {
  try {
    const query =
      request.nextUrl.searchParams.get("q") ??
      "Apple iPad Air 11 128GB";

    const offers = await searchEbay(query, 10);

    return NextResponse.json({
      success: true,
      query,
      resultCount: offers.length,
      offers,
    });
  } catch (error) {
    console.error("eBay search error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown eBay search error",
      },
      { status: 500 }
    );
  }
}