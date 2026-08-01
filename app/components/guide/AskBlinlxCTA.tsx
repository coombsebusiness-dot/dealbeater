import Link from "next/link";

interface AskBlinlxCTAProps {
  prompt?: string;

  heading?: string;

  text?: string;

  buttonLabel?: string;

  buttonHref?: string;
}

export function AskBlinlxCTA({
  prompt,
  heading = "Still unsure what to buy?",
  text =
    "Tell Blinlx what you need, what you want to use it for and how much you want to spend. We’ll help you make a smarter buying decision.",
  buttonLabel = "Ask Blinlx",
  buttonHref = "/",
}: AskBlinlxCTAProps) {
  const href =
    prompt
      ? `${buttonHref}?q=${encodeURIComponent(
          prompt,
        )}`
      : buttonHref;

  return (
    <section className="overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/15 via-slate-900 to-slate-950 p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-400">
          Before you spend a penny
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {heading}
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-300">
          {text}
        </p>

        {prompt && (
          <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">
              Try asking:
            </p>

            <p className="mt-2 font-medium text-white">
              “{prompt}”
            </p>
          </div>
        )}

        <Link
          href={href}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-green-400"
        >
          {buttonLabel}

          <span
            aria-hidden="true"
            className="ml-2"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}