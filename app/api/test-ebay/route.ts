import { NextResponse } from "next/server";
import { getEbayAccessToken } from "@/app/components/lib/ebay/auth";

export async function GET() {
  try {
    const token = await getEbayAccessToken();

    return NextResponse.json({
      success: true,
      tokenLength: token.length,
      message: "eBay authentication successful!",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}