import { evaluateRetailerTrust } from "./retailerTrust";
import { calculateOfferScore } from "./offerScore";
import { OfferAnalysis } from "./types";
import { analyseCondition } from "./conditionAnalysis";
import { analyseSeller } from "./sellerAnalysis";
import { analyseWarranty } from "./warrantyAnalysis";
import { analyseReturns } from "./returnsAnalysis";
import { analyseDelivery } from "./deliveryAnalysis";

export interface OfferVerificationInput {
  retailer: string;
  title: string;
  condition?: string;
  seller?: string;
  delivery?: string;
  warranty?: string;
  returns?: string;
}

export function verifyOffer(
  input: OfferVerificationInput
): OfferAnalysis {
  const retailer = evaluateRetailerTrust(input.retailer);

  const seller = analyseSeller({
    sellerName: input.seller,
  });

  const conditionText = `${input.title} ${input.condition ?? ""}`;

  const condition = analyseCondition(conditionText);

  const warranty = analyseWarranty(
    retailer.canonicalName,
    input.title,
    input.warranty
  );

  const returns = analyseReturns(
    retailer.canonicalName,
    input.returns
  );

  const delivery = analyseDelivery(input.delivery);

  const sellerTrust = retailer.requiresSellerVerification
    ? seller.score
    : 100;

  return calculateOfferScore({
    retailer: retailer.canonicalName,

retailerTrust: retailer.trustScore,
retailerConfidence: 100,

sellerTrust,
sellerConfidence: seller.confidence,

conditionScore: condition.score,
conditionConfidence: condition.confidence,

warrantyScore: warranty.score,
warrantyConfidence: warranty.confidence,

returnsScore: returns.score,
returnsConfidence: returns.confidence,

deliveryScore: delivery.score,
deliveryConfidence: delivery.confidence,

    positives: [
      ...retailer.reasons,
      ...condition.positives,
      ...seller.positives,
      ...warranty.positives,
      ...returns.positives,
      ...delivery.positives,
    ],

    warnings: [
      ...condition.warnings,
      ...seller.warnings,
      ...warranty.warnings,
      ...returns.warnings,
      ...delivery.warnings,

      ...(retailer.requiresSellerVerification
        ? ["Marketplace seller requires verification."]
        : []),
    ],
  });
}