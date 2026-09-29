"use client";

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { CityData } from "@/lib/cities";
import { CITY_PHOTOS } from "@/lib/cityPhotos";
import { useAccount } from "@/lib/account";
import { useI18n } from "@/lib/i18n";

export default function HomeHero({ data, onOpenChecklist }: { data: CityData; onOpenChecklist: () => void }) {
  const { t } = useI18n();
  const { userType } = useAccount();
  const suffix = userType === "internal" ? "internal" : "newcomer";
  const minutes = parseInt(data.distance_from_toronto, 10);
  const photo = CITY_PHOTOS[data.id];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[22rem] w-full sm:h-[26rem]">
        {photo ? (
          <Image src={photo.url} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-reroute-teal via-reroute-teal-light to-reroute-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-10">
          <div className="max-w-xl text-white">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
              {t("banner.1.kicker")}
            </div>
            <h1 className="mt-1.5 text-2xl font-bold leading-tight sm:text-4xl">
              {t(`banner.1.title.${suffix}`)}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-white/90 sm:text-base">{t(`banner.1.body.${suffix}`)}</p>
            <button
              onClick={onOpenChecklist}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-reroute-teal transition-colors hover:bg-reroute-cream"
            >
              {t("banner.cta")}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="absolute bottom-5 right-5 hidden items-center gap-2.5 rounded-xl bg-black/55 px-4 py-3 text-white backdrop-blur-sm sm:flex">
            <MapPin size={18} className="shrink-0" />
            <div>
              <div className="text-sm font-semibold">{data.city}</div>
              <div className="text-xs text-white/80">
                {minutes === 0 ? t("hero.inToronto") : t("hero.fromToronto", { min: minutes })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
