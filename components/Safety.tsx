"use client";

import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { ExternalLink, Phone } from "lucide-react";
import SourceLabel from "@/components/SourceLabel";

const RATING_COLORS: Record<string, string> = {
  Low: "bg-green-100 text-green-800",
  Moderate: "bg-amber-100 text-amber-800",
  High: "bg-red-100 text-red-800",
};

const ESSENTIAL_NUMBERS = [
  { value: "911", key: "safety.n911" },
  { value: "811", key: "safety.nTelehealth" },
  { value: "211", key: "safety.n211" },
  { value: "988", key: "safety.n988" },
];

export default function Safety({ data }: { data: CityData }) {
  const { t, tr, link } = useI18n();
  const { safety } = data;
  const badgeClass = RATING_COLORS[safety.csi_rating] ?? "bg-slate-100 text-slate-800";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-teal">{t("nav.safety")}</h2>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${badgeClass}`}>
          {t("safety.badge", { rating: tr(safety.csi_rating) })}
        </span>
        <span className="text-sm text-slate-500">
          {t("safety.trend")}{t("common.colon")}{tr(safety.trend)}
        </span>
      </div>

      <p className="text-sm text-slate-600">
        {t("safety.explain", {
          score: safety.csi_score,
          city: data.city,
          rating: tr(safety.csi_rating).toLowerCase(),
          trend: tr(safety.trend).toLowerCase(),
        })}
      </p>

      <a
        href={link(safety.source_url)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("safety", safety.source_url)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-reroute-teal underline"
      >
        {t("safety.fullData")}
        <ExternalLink size={14} />
      </a>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">{t("safety.saveTitle")}</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ESSENTIAL_NUMBERS.map((n) => (
            <div
              key={n.key}
              className="flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm"
            >
              <Phone size={18} className="shrink-0 text-reroute-teal" />
              <div>
                <div className="text-lg font-semibold text-slate-900">{n.value}</div>
                <div className="text-xs text-slate-500">{t(n.key)}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:col-span-2">
            <Phone size={18} className="shrink-0 text-reroute-teal" />
            <div>
              <div className="text-lg font-semibold text-slate-900">{tr(safety.police_non_emergency)}</div>
              <div className="text-xs text-slate-500">
                {t("safety.nonEmergency", { service: tr(safety.police_service) })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SourceLabel source={safety.source} lastUpdated={safety.last_updated} />
    </div>
  );
}
