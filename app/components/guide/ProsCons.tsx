interface ProsConsProps {
  pros: string[];

  cons: string[];

  prosTitle?: string;

  consTitle?: string;
}

export function ProsCons({
  pros,
  cons,
  prosTitle = "Pros",
  consTitle = "Cons",
}: ProsConsProps) {
  if (
    pros.length === 0 &&
    cons.length === 0
  ) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5 sm:p-6">
        <h3 className="text-xl font-bold text-green-300">
          {prosTitle}
        </h3>

        {pros.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {pros.map((pro) => (
              <li
                key={pro}
                className="flex gap-3 leading-7 text-slate-200"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-green-400"
                >
                  ✓
                </span>

                <span>{pro}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-slate-400">
            No major advantages listed.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 sm:p-6">
        <h3 className="text-xl font-bold text-rose-300">
          {consTitle}
        </h3>

        {cons.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {cons.map((con) => (
              <li
                key={con}
                className="flex gap-3 leading-7 text-slate-200"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-rose-400"
                >
                  ×
                </span>

                <span>{con}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-slate-400">
            No major drawbacks listed.
          </p>
        )}
      </section>
    </div>
  );
}