interface BuyingGuideSummaryProps {
  items: string[];
}

export function BuyingGuideSummary({
  items,
}: BuyingGuideSummaryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="guide-summary-heading"
      className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6"
    >
      <h2
        id="guide-summary-heading"
        className="text-xl font-bold text-white"
      >
        Quick summary
      </h2>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-7 text-slate-300"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 text-green-400"
            >
              ✓
            </span>

            <span>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}