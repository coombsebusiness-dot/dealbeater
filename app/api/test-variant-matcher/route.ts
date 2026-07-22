import { NextResponse } from "next/server";
import { searchEbay } from "@/app/components/lib/ebay/browse";
import {
  matchProductVariant,
  type ProductVariant,
} from "@/app/components/lib/matching/variantMatcher";

export async function GET() {
  try {
    const target: ProductVariant = {
      brand: "Apple",
      product: "iPad Air",
      generation: "M4",
      year: "2026",
      screenSize: "11",
      storage: "128GB",
      connectivity: "wifi",
      condition: "new",
    };

    const offers = await searchEbay(
      "Apple iPad Air M4 2026 11 128GB WiFi",
      20
    );

    const checkedOffers = offers.map((offer) => {
      const match = matchProductVariant({
        target,
        listingTitle: offer.title,
        listingCondition: offer.condition,
      });

      return {
        ...offer,
        match,
      };
    });

    const verifiedOffers = checkedOffers
      .filter((offer) => offer.match.isMatch)
      .sort((a, b) => a.totalPrice - b.totalPrice);

    const rejectedOffers = checkedOffers.filter(
      (offer) => !offer.match.isMatch
    );

    return NextResponse.json({
      success: true,
      target,
      totalChecked: checkedOffers.length,
      verifiedCount: verifiedOffers.length,
      rejectedCount: rejectedOffers.length,
      verifiedOffers,
      rejectedOffers: rejectedOffers.map((offer) => ({
        title: offer.title,
        totalPrice: offer.totalPrice,
        condition: offer.condition,
        confidence: offer.match.confidence,
        rejectedReasons: offer.match.rejectedReasons,
        extracted: offer.match.extracted,
      })),
    });
  } catch (error) {
    console.error("Variant matcher test error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown variant matcher error",
      },
      { status: 500 }
    );
  }
}