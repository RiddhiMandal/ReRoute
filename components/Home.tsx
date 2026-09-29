"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  Heart,
  Home as HomeIcon,
  Building2,
  HeartPulse,
  ShieldCheck,
  Briefcase,
  Users,
  BarChart3,
  Target,
  Bookmark,
  FileText,
} from "lucide-react";
import { CITIES } from "@/lib/cities";
import { CITY_PHOTOS } from "@/lib/cityPhotos";
import { useFavorites } from "@/lib/favorites";
import { useI18n } from "@/lib/i18n";
import type { SectionId } from "@/components/SectionTabs";

const QUICK_LINKS = [
  { id: "housing" as const, icon: Building2, titleKey: "nav.housing", descKey: "home.card.housing.desc" },
  { id: "healthcare" as const, icon: HeartPulse, titleKey: "nav.healthcare", descKey: "home.card.healthcare.desc" },
  { id: "safety" as const, icon: ShieldCheck, titleKey: "nav.safety", descKey: "home.card.safety.desc" },
  { id: "employment" as const, icon: Briefcase, titleKey: "nav.employment", descKey: "home.card.employment.desc" },
  { id: "community" as const, icon: Users, titleKey: "nav.community", descKey: "home.card.community.desc" },
];

const WHY_ITEMS = [
  { icon: BarChart3, titleKey: "home.why.1.title", bodyKey: "home.why.1.body", tone: "bg-reroute-teal/10 text-reroute-teal" },
  { icon: Target, titleKey: "home.why.2.title", bodyKey: "home.why.2.body", tone: "bg-reroute-orange/10 text-reroute-orange" },
  { icon: Bookmark, titleKey: "home.why.3.title", bodyKey: "home.why.3.body", tone: "bg-reroute-navy/10 text-reroute-navy" },
];

export default function Home({ onNavigate }: { onNavigate: (section: SectionId, cityId?: string) => void }) {
  const { t, tr, money, num } = useI18n();
  const [query, setQuery] = useState("");
  const { favorites, toggle } = useFavorites();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    const found = q.length > 0 ? CITIES.find((c) => c.city.toLowerCase().includes(q)) : undefined;
    if (found) onNavigate("housing", found.id);
    else onNavigate("match");
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-reroute-navy">{t("home.findCity.title")}</h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">{t("home.findCity.subtitle")}</p>
        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("home.searchPlaceholder")}
              aria-label={t("home.searchPlaceholder")}
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-reroute-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-reroute-teal-light"
          >
            {t("home.search")}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="order-2 space-y-8 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {QUICK_LINKS.map(({ id, icon: Icon, titleKey, descKey }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="group flex flex-col items-start gap-1 rounded-xl border border-black/5 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon size={20} className="text-reroute-teal" />
                <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-900">
                  {t(titleKey)}
                  <ArrowRight size={13} className="text-slate-400 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-xs leading-snug text-slate-500">{t(descKey)}</span>
              </button>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-reroute-navy">{t("home.popular.title")}</h3>
              <button
                onClick={() => onNavigate("match")}
                className="inline-flex items-center gap-1 text-sm font-medium text-reroute-teal hover:underline"
              >
                {t("home.popular.viewAll")}
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CITIES.map((city) => {
                const photo = CITY_PHOTOS[city.id];
                const isFav = favorites.has(city.id);
                const minutes = parseInt(city.distance_from_toronto, 10);
                return (
                  <div
                    key={city.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onNavigate("housing", city.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onNavigate("housing", city.id);
                    }}
                    className="group cursor-pointer overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-32 w-full bg-slate-100">
                      {photo ? (
                        <Image src={photo.url} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-reroute-teal via-reroute-teal-light to-reroute-navy" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(city.id);
                        }}
                        aria-label={t(isFav ? "home.popular.unfavorite" : "home.popular.favorite", { city: city.city })}
                        aria-pressed={isFav}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-reroute-orange shadow-sm transition-colors hover:bg-white"
                      >
                        <Heart size={15} fill={isFav ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="font-semibold text-slate-900">{city.city}</div>
                      <div className="text-xs text-slate-500">
                        {minutes === 0 ? t("hero.inToronto") : t("hero.fromToronto", { min: minutes })}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <HomeIcon size={12} />
                          {money(city.housing.avg_rent_1br)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ShieldCheck size={12} />
                          {tr(city.safety.csi_rating)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FileText size={12} />
                          {num(city.housing.listings_count)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 rounded-xl border border-black/5 bg-white p-5 shadow-sm lg:sticky lg:top-32 lg:order-2">
          <h3 className="text-base font-bold text-reroute-navy">{t("home.why.title")}</h3>
          <div className="mt-4 space-y-4">
            {WHY_ITEMS.map(({ icon: Icon, titleKey, bodyKey, tone }) => (
              <div key={titleKey} className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t(titleKey)}</div>
                  <p className="mt-0.5 text-xs leading-snug text-slate-500">{t(bodyKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
