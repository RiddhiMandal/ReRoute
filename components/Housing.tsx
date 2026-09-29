"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import type { CityData } from "@/lib/cities";
import { cityCenter } from "@/lib/geo";
import { useI18n } from "@/lib/i18n";
import { trackOutboundClick } from "@/lib/analytics";
import { HOUSING_SITES, siteUrl } from "@/lib/housingSites";
import { INSURANCE_PROVIDERS } from "@/lib/insuranceProviders";
import MapView, { type MapMarker } from "@/components/MapView";
import SourceLabel from "@/components/SourceLabel";

interface DirectoryItem {
  name: string;
  description: string;
  tags: string[];
  url: string;
}

type Bedrooms = 1 | 2 | 3;

function rentFor(city: CityData, bedrooms: Bedrooms): number {
  return bedrooms === 1
    ? city.housing.avg_rent_1br
    : bedrooms === 2
      ? city.housing.avg_rent_2br
      : city.housing.avg_rent_3br;
}

export default function Housing({ data }: { data: CityData }) {
  const { t, tr, money, num } = useI18n();
  const { housing } = data;
  const [bedrooms, setBedrooms] = useState<Bedrooms>(1);

  const rentalSites: DirectoryItem[] = useMemo(
    () => HOUSING_SITES.map((site) => ({ ...site, url: siteUrl(site, data.id) })),
    [data.id]
  );

  // Only the selected city — showing every city at once was confusing once you'd already picked one.
  const markers: MapMarker[] = useMemo(() => {
    const center = cityCenter(data.id);
    if (!center) return [];
    const rent = rentFor(data, bedrooms);
    return [
      {
        id: data.id,
        lat: center[0],
        lng: center[1],
        label: money(rent),
        title: `${data.city} — ${money(rent)}`,
        tone: "green",
      },
    ];
  }, [data, bedrooms, money]);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-reroute-teal">{t("nav.housing")}</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="order-2 space-y-5 lg:order-1">
          <div
            role="group"
            aria-label={t("housing.bedrooms")}
            className="inline-flex overflow-hidden rounded-lg border border-slate-300 text-sm font-medium"
          >
            {([1, 2, 3] as Bedrooms[]).map((n) => (
              <button
                key={n}
                aria-pressed={bedrooms === n}
                onClick={() => setBedrooms(n)}
                className={`px-4 py-2 transition-colors ${
                  bedrooms === n ? "bg-reroute-teal text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t("housing.br", { n })}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatCard label={t("housing.avg1")} value={money(housing.avg_rent_1br)} active={bedrooms === 1} />
            <StatCard label={t("housing.avg2")} value={money(housing.avg_rent_2br)} active={bedrooms === 2} />
            <StatCard label={t("housing.avg3")} value={money(housing.avg_rent_3br)} active={bedrooms === 3} />
          </div>

          <p className="text-sm text-slate-600">
            {t("housing.listingsLine", { n: num(housing.listings_count), date: housing.listings_as_of })}
            {housing.vacancy_rate && <> {t("housing.vacancy", { rate: housing.vacancy_rate })}</>}
          </p>

          <SiteDirectory
            items={rentalSites}
            title={t("housing.searchTitle", { city: data.city })}
            subtitle={t("housing.searchSubtitle", { n: rentalSites.length })}
            searchPlaceholder={t("housing.searchPlaceholder")}
            linkLabel={() => t("housing.searchCity", { city: data.city })}
            trackingCategory="housing"
            columns="one"
          />
        </div>

        <div className="order-1 space-y-2 lg:sticky lg:top-32 lg:order-2">
          <MapView
            markers={markers}
            selectedId={data.id}
            ariaLabel={t("housing.mapLabel", { city: data.city })}
            className="h-64 sm:h-80 lg:h-[34rem]"
          />
          <p className="text-xs text-slate-400">{t("housing.mapHint", { n: bedrooms, city: data.city })}</p>
        </div>
      </div>

      <SiteDirectory
        items={INSURANCE_PROVIDERS}
        title={t("housing.insTitle")}
        subtitle={t("housing.insSubtitle", { n: INSURANCE_PROVIDERS.length })}
        searchPlaceholder={t("housing.insPlaceholder")}
        linkLabel={(item) => t("housing.getQuote", { name: item.name })}
        trackingCategory="insurance"
        columns="two"
      />

      <SourceLabel source={housing.source} lastUpdated={housing.last_updated} />
    </div>
  );
}

function SiteDirectory({
  items,
  title,
  subtitle,
  searchPlaceholder,
  linkLabel,
  trackingCategory,
  columns,
}: {
  items: DirectoryItem[];
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  linkLabel: (item: DirectoryItem) => string;
  trackingCategory: string;
  columns: "one" | "two";
}) {
  const { t, tr } = useI18n();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(items.flatMap((i) => i.tags))), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        tr(item.description).toLowerCase().includes(q) ||
        item.tags.some((tag) => tr(tag).toLowerCase().includes(q));
      const matchesTag = !activeTag || item.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [items, query, activeTag, tr]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(isActive ? null : tag)}
              aria-pressed={isActive}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                isActive ? "bg-reroute-teal text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tr(tag)}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-black/5 bg-white p-4 text-sm text-slate-500">
          {t("common.noResults")}
        </p>
      ) : (
        <div className={`grid grid-cols-1 gap-3 ${columns === "two" ? "sm:grid-cols-2" : ""}`}>
          {filtered.map((item) => (
            <div
              key={item.name}
              className="flex flex-col rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="font-semibold text-slate-900">{item.name}</div>
              <p className="mt-1 flex-1 text-sm text-slate-600">{tr(item.description)}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-reroute-cream px-2.5 py-1 text-xs text-slate-600">
                    {tr(tag)}
                  </span>
                ))}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick(trackingCategory, item.name)}
                className="mt-4 inline-flex items-center gap-1.5 self-start rounded-md bg-reroute-teal/10 px-3 py-1.5 text-sm font-medium text-reroute-teal transition-colors hover:bg-reroute-teal hover:text-white"
              >
                {linkLabel(item)}
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div
      className={`rounded-lg border bg-white p-3 shadow-sm ${
        active ? "border-reroute-teal ring-1 ring-reroute-teal/40" : "border-black/5"
      }`}
    >
      <div className="text-lg font-semibold text-slate-900 sm:text-xl">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
