import type {
  FAQ as FAQItem,
} from "@/types/buying-guide/FAQ";

interface FAQProps {
  items: FAQItem[];

  heading?: string;
}

export function FAQ({
  items,
  heading = "Frequently asked questions",
}: FAQProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="faq-heading"
      className="space-y-5"
    >
      <h2
        id="faq-heading"
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {heading}
      </h2>

      <div className="space-y-3">
        {items.map(
          (item, index) => (
            <details
              key={`${item.question}-${index}`}
              className="group rounded-2xl border border-slate-700 bg-slate-900/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white sm:px-6">
                <span>
                  {item.question}
                </span>

                <span
                  aria-hidden="true"
                  className="text-xl text-green-400 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-slate-800 px-5 py-4 sm:px-6">
                <p className="max-w-3xl leading-7 text-slate-300">
                  {item.answer}
                </p>
              </div>
            </details>
          ),
        )}
      </div>
    </section>
  );
}