import Image from "next/image";
import Link from "next/link";

import type {
  DiscoveryItem,
} from "@/app/lib/discovery/DiscoveryModels";

interface DiscoveryGuideCardProps {
  item: DiscoveryItem;
}

export function DiscoveryGuideCard({
  item,
}: DiscoveryGuideCardProps) {
  return (
    <Link
      href={item.href}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-slate-700/60
        bg-slate-900/80
        shadow-xl
        ring-1
        ring-white/5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-green-500/40
      "
    >
      {item.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="460px"
            className="
              object-cover
              transition-all
              duration-500
              group-hover:scale-105
            "
          />
        </div>
      )}

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-400">
          Related buying guide
        </p>

        <h2 className="mt-3 text-xl font-bold leading-tight text-white">
          {item.title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-green-400">
            Read guide
          </span>

          <span
            aria-hidden="true"
            className="text-green-400 transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}