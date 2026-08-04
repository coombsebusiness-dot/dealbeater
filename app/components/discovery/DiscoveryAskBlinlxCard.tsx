import Link from "next/link";

import type {
  DiscoveryItem,
} from "@/app/lib/discovery/DiscoveryModels";

interface DiscoveryAskBlinlxCardProps {
  item: DiscoveryItem;
}

export function DiscoveryAskBlinlxCard({
  item,
}: DiscoveryAskBlinlxCardProps) {
  return (
    <Link
      href={item.href}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-green-500/30
        bg-linear-to-br
        from-green-500/15
        via-slate-900
        to-slate-950
        p-6
        shadow-xl
        ring-1
        ring-green-500/10
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-green-400/50
      "
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-400">
        Before you spend a penny
      </p>

      <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
        {item.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-300">
        {item.description}
      </p>

      <div className="mt-5 inline-flex items-center rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-slate-950 transition group-hover:bg-green-400">
        Ask Blinlx

        <span
          aria-hidden="true"
          className="ml-2 transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}