import Image from "next/image";
import Link from "next/link";

export interface GuidePromotion {
  id: string;

  label?: string;

  title: string;

  href: string;

  buttonLabel: string;

  image: string;

  imageAlt: string;
}

interface GuidePromotionRailProps {
  promotions: GuidePromotion[];
}

export function GuidePromotionRail({
  promotions,
}: GuidePromotionRailProps) {
  if (promotions.length === 0) {
    return null;
  }

  return (
   <aside className="hidden h-fit 2xl:block">
  <div className="sticky top-24 space-y-5">
    <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
      From our network
    </p>

    {promotions.map((promotion) => (
      <Link
        key={promotion.id}
        href={promotion.href}
        target="_blank"
        rel="noopener noreferrer"
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
          group-hover:-translate-y-1
          group-hover:border-green-500/40
          group-hover:shadow-[0_35px_80px_rgba(0,0,0,0.55)]
        "
      >
        <Image
          src={promotion.image}
          alt={promotion.imageAlt}
          width={320}
          height={560}
          sizes="320px"
          className="
            w-full
            h-auto
            transition-all
            duration-700
            ease-out
            group-hover:scale-[1.02]
            group-hover:brightness-105
            group-hover:contrast-105
          "
        />
      </Link>
          ),
        )}
      </div>
    </aside>
  );
}