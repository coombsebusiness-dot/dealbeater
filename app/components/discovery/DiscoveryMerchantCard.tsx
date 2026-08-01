import Image from "next/image";
import Link from "next/link";

import type {
  DiscoveryItem,
} from "@/app/lib/discovery/DiscoveryModels";

interface DiscoveryMerchantCardProps {
  item: DiscoveryItem;
}

export function DiscoveryMerchantCard({
  item,
}: DiscoveryMerchantCardProps) {
  const external =
    item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      target={
        external
          ? "_blank"
          : undefined
      }
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-slate-700/60
        bg-slate-900
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
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
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
        {item.badge && (
          <span className="inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
            {item.badge}
          </span>
        )}

        <h2 className="mt-3 text-xl font-bold text-white">
          {item.title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-green-400">
            View retailer
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