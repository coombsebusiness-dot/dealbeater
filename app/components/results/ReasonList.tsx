interface ReasonListProps {
  title: string;
  items: string[];
  type?: "positive" | "warning";
}

export default function ReasonList({
  title,
  items,
  type = "positive",
}: ReasonListProps) {
  if (items.length === 0) {
    return null;
  }

  const isPositive = type === "positive";

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          <span className="text-lg">
            {isPositive ? "✓" : "!"}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4"
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                isPositive
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/15 text-amber-400"
              }`}
            >
              {isPositive ? "✓" : "!"}
            </span>

            <p className="leading-6 text-zinc-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}