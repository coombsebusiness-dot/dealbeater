type ProductOverviewCardProps = {
  productName: string;
  description: string;
  bestFor: string[];
  strengths: string[];
  considerations: string[];
  confidence?: number;
};

export default function ProductOverviewCard({
  productName,
  description,
  bestFor,
  strengths,
  considerations,
  confidence,
}: ProductOverviewCardProps) {
  const hasBestFor = bestFor.length > 0;
  const hasStrengths = strengths.length > 0;
  const hasConsiderations = considerations.length > 0;

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#101b26] shadow-xl shadow-black/20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#2ee866]/10 blur-3xl" />

      <div className="relative border-b border-white/10 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.17em] text-[#68f18e]">
              📦 About this product
            </p>

            <h3 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
              {productName}
            </h3>
          </div>

          {typeof confidence === "number" && confidence > 0 && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/50">
              {confidence}% confidence
            </span>
          )}
        </div>

        <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          {description}
        </p>
      </div>

      <div className="relative grid gap-px bg-white/10 lg:grid-cols-3">
        <OverviewColumn
          icon="🎯"
          title="Best for"
          items={bestFor}
          emptyText="Blinlx is still identifying the best use cases."
          positive
        />

        <OverviewColumn
          icon="👍"
          title="What stands out"
          items={strengths}
          emptyText="No standout strengths were identified yet."
          positive
        />

        <OverviewColumn
          icon="⚠️"
          title="Before you buy"
          items={considerations}
          emptyText="No major limitations were identified."
        />
      </div>

      {(hasBestFor || hasStrengths || hasConsiderations) && (
        <div className="relative border-t border-white/10 bg-[#16232d] px-5 py-4 sm:px-7">
          <p className="text-xs leading-5 text-white/40">
            Blinlx summarises the product to help you understand who it suits,
            where it performs well and what to consider before buying.
          </p>
        </div>
      )}
    </section>
  );
}

function OverviewColumn({
  icon,
  title,
  items,
  emptyText,
  positive = false,
}: {
  icon: string;
  title: string;
  items: string[];
  emptyText: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-[#101b26] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg">
          {icon}
        </span>

        <h4 className="font-black text-white">
          {title}
        </h4>
      </div>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.slice(0, 4).map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-3 text-sm leading-6 text-white/70"
            >
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                  positive
                    ? "bg-[#2ee866]/15 text-[#68f18e]"
                    : "bg-amber-400/10 text-amber-300"
                }`}
              >
                {positive ? "✓" : "!"}
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm leading-6 text-white/35">
          {emptyText}
        </p>
      )}
    </div>
  );
}