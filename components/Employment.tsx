"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import { EMPLOYERS } from "@/lib/employers";
import { useI18n } from "@/lib/i18n";
import SourceLabel from "@/components/SourceLabel";

const INDUSTRY_COLORS: Record<string, string> = {
  "Banking & Financial Services": "bg-blue-600",
  Healthcare: "bg-rose-500",
  Technology: "bg-indigo-600",
  Retail: "bg-amber-500",
  "Retail & Distribution": "bg-amber-600",
  "Food Manufacturing": "bg-orange-500",
  "Food & Beverage Manufacturing": "bg-orange-600",
  "Logistics & E-commerce": "bg-slate-600",
  Government: "bg-teal-600",
  "Telecom & Media": "bg-purple-600",
};

function initials(name: string) {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function Employment({ data }: { data: CityData }) {
  const { t, tr, link } = useI18n();
  const { employment } = data;
  const [query, setQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  useEffect(() => {
    setQuery("");
    setActiveIndustry(null);
  }, [data.city]);

  const cityEmployers = useMemo(() => EMPLOYERS.filter((e) => e.city === data.city), [data.city]);

  const industries = useMemo(() => Array.from(new Set(cityEmployers.map((e) => e.industry))), [cityEmployers]);

  const filteredEmployers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cityEmployers.filter((e) => {
      const matchesQuery =
        q.length === 0 ||
        e.name.toLowerCase().includes(q) ||
        tr(e.description).toLowerCase().includes(q) ||
        tr(e.industry).toLowerCase().includes(q);
      const matchesIndustry = !activeIndustry || e.industry === activeIndustry;
      return matchesQuery && matchesIndustry;
    });
  }, [cityEmployers, query, activeIndustry, tr]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-teal">{t("nav.employment")}</h2>

      <div>
        <h3 className="text-sm font-medium text-slate-700">{t("jobs.topRoles")}</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {employment.top_roles.map((role) => (
            <li key={role} className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-black/5">
              {tr(role)}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-slate-600">{t("jobs.unemployment", { rate: employment.unemployment_rate })}</p>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">{t("jobs.employersTitle", { city: data.city })}</h3>
          <p className="mt-0.5 text-xs text-slate-400">
            {t("jobs.showing", { n: filteredEmployers.length, total: cityEmployers.length })}
          </p>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("jobs.searchPlaceholder")}
            aria-label={t("jobs.searchPlaceholder")}
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {industries.map((industry) => {
            const isActive = industry === activeIndustry;
            return (
              <button
                key={industry}
                onClick={() => setActiveIndustry(isActive ? null : industry)}
                aria-pressed={isActive}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  isActive ? "bg-reroute-teal text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tr(industry)}
              </button>
            );
          })}
        </div>

        {filteredEmployers.length === 0 ? (
          <p className="rounded-lg border border-black/5 bg-white p-4 text-sm text-slate-500">
            {t("jobs.none")}
          </p>
        ) : (
          <div className="divide-y divide-black/5 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
            {filteredEmployers.map((employer) => (
              <a
                key={employer.name}
                href={employer.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick("employment", employer.name)}
                className="flex items-start gap-4 p-4 transition-colors hover:bg-reroute-cream/60"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${
                    INDUSTRY_COLORS[employer.industry] ?? "bg-reroute-teal"
                  }`}
                >
                  {initials(employer.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-semibold text-slate-900">{employer.name}</span>
                    <span className="text-sm text-slate-400">{employer.city}, ON</span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{tr(employer.description)}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {employer.hiring && (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {t("jobs.hiring")}
                      </span>
                    )}
                    <span className="rounded-full bg-reroute-cream px-2.5 py-0.5 text-xs text-slate-600">
                      {tr(employer.industry)}
                    </span>
                  </div>
                </div>
                <ExternalLink size={16} className="mt-1 shrink-0 text-slate-300" />
              </a>
            ))}
          </div>
        )}
      </div>

      <a
        href={link(employment.job_bank_url)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("employment", employment.job_bank_url)}
        className="inline-flex items-center gap-1.5 rounded-md bg-reroute-orange px-4 py-2 text-sm font-medium text-white hover:bg-reroute-orange-light"
      >
        {t("jobs.jobBank", { city: data.city })}
        <ExternalLink size={14} />
      </a>

      <SourceLabel source={employment.source} lastUpdated={employment.last_updated} />
    </div>
  );
}
