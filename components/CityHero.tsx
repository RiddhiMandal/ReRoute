"use client";

import type { CityData } from "@/lib/cities";
import { useI18n } from "@/lib/i18n";

export default function CityHero({ data }: { data: CityData }) {
  const { t, tr, money, num } = useI18n();
  const minutes = parseInt(data.distance_from_toronto, 10);

  const stats = [
    { label: t("hero.rent"), value: money(data.housing.avg_rent_1br) },
    { label: t("hero.crime"), value: tr(data.safety.csi_rating) },
    { label: t("hero.listings"), value: num(data.housing.listings_count) },
  ];

  return (
    <section className="w-full bg-reroute-green px-4 py-5 text-white sm:px-8 sm:py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{data.city}</h1>
          <p className="text-sm text-white/80">
            {minutes === 0 ? t("hero.inToronto") : t("hero.fromToronto", { min: minutes })}
          </p>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 sm:max-w-3xl sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm sm:px-4 sm:py-3"
            >
              <div className="text-lg font-semibold sm:text-2xl">{stat.value}</div>
              <div className="text-[11px] leading-tight text-white/70 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
