import Image from "next/image";
import Link from "next/link";

import type {
  DiscoveryItem,
} from "@/app/lib/discovery/DiscoveryModels";

interface DiscoveryAppCardProps {
  item: DiscoveryItem;
}

export function DiscoveryAppCard({
  item,
}: DiscoveryAppCardProps) {
  if (!item.image) {
    return null;
  }

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
      aria-label={item.title}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-slate-700/60
        bg-slate-900
        shadow-2xl
        shadow-black/40
        ring-1
        ring-white/5
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-green-500/40
      "
    >
      <Image
        src={item.image}
        alt={item.title}
        width={320}
        height={560}
        sizes="460px"
        className="
          h-auto
          w-full
          transition-all
          duration-700
          ease-out
          group-hover:scale-[1.02]
          group-hover:brightness-105
          group-hover:contrast-105
        "
      />
    </Link>
  );
}