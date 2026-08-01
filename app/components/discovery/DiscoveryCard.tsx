import Link from "next/link";

import type {
  DiscoveryItem,
} from "@/app/lib/discovery/DiscoveryModels";

interface Props {
  item: DiscoveryItem;
}

export function DiscoveryCard({
  item,
}: Props) {
  return (
    <Link
      href={item.href}
      className="
        block
        rounded-3xl
        border
        border-slate-700
        bg-slate-900
        p-6
        transition-all
        hover:border-green-500/40
        hover:-translate-y-1
      "
    >
      {item.badge && (
        <p className="text-xs font-semibold uppercase tracking-wide text-green-400">
          {item.badge}
        </p>
      )}

      <h2 className="mt-2 text-xl font-bold text-white">
        {item.title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        {item.description}
      </p>
    </Link>
  );
}