import type {
  DiscoveryItem,
} from "@/app/lib/discovery/DiscoveryModels";

import { DiscoveryAppCard, } from "@/app/components/discovery/DiscoveryAppCard";

import {
  DiscoveryGuideCard,
} from "@/app/components/discovery/DiscoveryGuideCard";

import {
  DiscoveryMerchantCard,
} from "@/app/components/discovery/DiscoveryMerchantCard";

import {
  DiscoveryAskBlinlxCard,
} from "@/app/components/discovery/DiscoveryAskBlinlxCard";

interface DiscoveryRailProps {
  items: DiscoveryItem[];
}

export function DiscoveryRail({
  items,
}: DiscoveryRailProps) {
  return (
    <aside className="hidden h-fit 2xl:block">
      <div className="sticky top-24 space-y-6">
        <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Recommended by Blinlx
        </p>

        {items.map((item) => {
          switch (item.type) {
            case "merchant":
              return (
                <DiscoveryMerchantCard
                  key={item.id}
                  item={item}
                />
              );

            case "guide":
              return (
                <DiscoveryGuideCard
                  key={item.id}
                  item={item}
                />
              );

            case "app":
              return (
                <DiscoveryAppCard
                  key={item.id}
                  item={item}
                />
              );

            case "assistant":
              return (
                <DiscoveryAskBlinlxCard
                  key={item.id}
                  item={item}
                />
              );

            default:
              return null;
          }
        })}
      </div>
    </aside>
  );
}