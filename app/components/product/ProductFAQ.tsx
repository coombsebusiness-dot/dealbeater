import type {
  Product,
  ProductFAQItem,
} from "@/types/product";

type ProductFAQProps = {
  product: Product;
};

function formatPrice(price?: number): string | null {
  if (
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return null;
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function cleanText(value?: string): string | null {
  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    return null;
  }

  return value.trim();
}

function cleanItems(items?: string[]): string[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim().length > 0
    )
    .map((item) => item.trim())
    .filter(
      (item, index, allItems) =>
        allItems.findIndex(
          (candidate) =>
            candidate.toLowerCase() === item.toLowerCase()
        ) === index
    );
}

function createGeneratedFAQs(
  product: Product
): ProductFAQItem[] {
  const productName = product.name;
  const verdict =
    cleanText(product.verdictLabel) ??
    cleanText(product.verdict);

  const recommendation = cleanText(
    product.ifItWasOurMoney
  );

  const strengths = cleanItems(product.highlights);
  const concerns = cleanItems(
    product.scoreContext?.concerns
  );

  const currentPrice = formatPrice(
    product.currentPrice
  );

  const fairPrice = formatPrice(
    product.fairPrice
  );

  const lowestPrice = formatPrice(
    product.lowestPrice
  );

  const faqs: ProductFAQItem[] = [];

  faqs.push({
    question: `Is ${productName} worth buying?`,
    answer:
      recommendation ??
      (verdict
        ? `Blinlx currently gives ${productName} a ${verdict} verdict. Whether it is right for you depends on the exact price, condition and how closely its strengths match your needs.`
        : `Whether ${productName} is worth buying depends on the exact price, condition and whether its features match your intended use.`),
  });

  if (currentPrice || fairPrice) {
    faqs.push({
      question: `What is a good price for ${productName}?`,
      answer:
        currentPrice && fairPrice
          ? `The current price identified by Blinlx is ${currentPrice}, while the estimated fair price is ${fairPrice}. A price at or below the fair-price estimate may represent stronger value, provided the exact product variant and condition match.`
          : fairPrice
            ? `Blinlx estimates a fair price of around ${fairPrice}. Prices below this level may represent stronger value, provided the exact product variant and condition match.`
            : `The current price identified by Blinlx is ${currentPrice}. Compare it with the verified offers and check the exact product condition before purchasing.`,
    });
  }

  if (lowestPrice) {
    faqs.push({
      question: `What is the lowest price Blinlx found for ${productName}?`,
      answer: `The lowest price recorded in this report is ${lowestPrice}. Prices and availability can change, so confirm the final amount and product details with the retailer before buying.`,
    });
  }

  if (strengths.length > 0) {
    faqs.push({
      question: `What are the main strengths of ${productName}?`,
      answer: `The main strengths identified by Blinlx are ${strengths
        .slice(0, 4)
        .join(
          ", "
        )}. These are the strongest reasons to consider this product.`,
    });
  }

  if (concerns.length > 0) {
    faqs.push({
      question: `What should I check before buying ${productName}?`,
      answer: `The main concerns identified by Blinlx are ${concerns
        .slice(0, 4)
        .join(
          ", "
        )}. Check these points carefully, particularly when buying used or refurbished stock.`,
    });
  }

  if (product.primaryOfferRetailer) {
    faqs.push({
      question: `Where can I buy ${productName}?`,
      answer: `Blinlx found a verified offer from ${product.primaryOfferRetailer}. You can also compare the other retailer offers listed in this report before deciding where to buy.`,
    });
  } else if (
    Array.isArray(product.topOffers) &&
    product.topOffers.length > 0
  ) {
    faqs.push({
      question: `Where can I buy ${productName}?`,
      answer: `Blinlx found ${
        product.topOffers.length
      } verified ${
        product.topOffers.length === 1
          ? "offer"
          : "offers"
      } for this product. Compare the prices and retailer details in the offers section before purchasing.`,
    });
  }

  if (
    Array.isArray(product.alternatives) &&
    product.alternatives.length > 0
  ) {
    const names = product.alternatives
      .slice(0, 3)
      .map((alternative) => alternative.name)
      .join(", ");

    faqs.push({
      question: `What are the best alternatives to ${productName}?`,
      answer: `Alternatives highlighted in this report include ${names}. Compare their price, specifications and intended use before deciding which product offers the best overall value.`,
    });
  }

  faqs.push({
    question: `Does Blinlx recommend ${productName}?`,
    answer:
      verdict && recommendation
        ? `Blinlx gives this product a ${verdict} verdict. Our recommendation is: ${recommendation}`
        : verdict
          ? `Blinlx currently gives this product a ${verdict} verdict. Check the detailed strengths, concerns and price analysis above for the reasons behind that decision.`
          : recommendation ??
            `Blinlx recommends comparing the current price, exact specification and retailer condition before making a final decision.`,
  });

  return faqs;
}

function cleanFAQs(
  faqs?: ProductFAQItem[]
): ProductFAQItem[] {
  if (!Array.isArray(faqs)) {
    return [];
  }

  return faqs
    .filter(
      (faq) =>
        faq &&
        typeof faq.question === "string" &&
        faq.question.trim().length > 0 &&
        typeof faq.answer === "string" &&
        faq.answer.trim().length > 0
    )
    .map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    }))
    .filter(
      (faq, index, allFAQs) =>
        allFAQs.findIndex(
          (candidate) =>
            candidate.question.toLowerCase() ===
            faq.question.toLowerCase()
        ) === index
    )
    .slice(0, 10);
}

export default function ProductFAQ({
  product,
}: ProductFAQProps) {
  const storedFAQs = cleanFAQs(product.faqs);

  const generatedFAQs = cleanFAQs(
    createGeneratedFAQs(product)
  );

  const faqs =
    storedFAQs.length > 0
      ? storedFAQs
      : generatedFAQs;

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      id="frequently-asked-questions"
      className="scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
    >
      <div className="border-b border-white/10 p-6 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Buyer questions
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Frequently asked questions
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          Straightforward answers to common questions about{" "}
          {product.name}, based on the current Blinlx
          analysis.
        </p>
      </div>

      <div className="space-y-3 p-4 sm:p-6">
        {faqs.map((faq, index) => (
          <details
            key={`${faq.question}-${index}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 open:border-emerald-400/25 open:bg-emerald-400/[0.035]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 sm:px-6">
              <span className="text-base font-black leading-7 text-white sm:text-lg">
                {faq.question}
              </span>

              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xl font-light text-slate-300 transition group-open:rotate-45 group-open:border-emerald-400/25 group-open:bg-emerald-400/10 group-open:text-emerald-300"
              >
                +
              </span>
            </summary>

            <div className="border-t border-white/10 px-5 py-5 sm:px-6">
              <p className="max-w-4xl leading-8 text-slate-300">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      <div className="border-t border-white/10 bg-slate-950/20 px-6 py-5 sm:px-8">
        <p className="text-sm leading-6 text-slate-500">
          Answers are based on the product data and retailer
          information available when this report was generated.
          Check important details with the retailer before
          purchasing.
        </p>
      </div>
    </section>
  );
}