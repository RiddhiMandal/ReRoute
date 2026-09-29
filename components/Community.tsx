"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, MapPin, Phone, Search } from "lucide-react";
import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import SourceLabel from "@/components/SourceLabel";

const GENERIC_LANGUAGE = /multilingual|interpretation/i;

export default function Community({ data }: { data: CityData }) {
  const { t, tr, link } = useI18n();
  const { community } = data;
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setQuery("");
    setLanguage("");
  }, [data.city]);

  const languageOptions = useMemo(() => {
    const all = community.agencies.flatMap((a) => a.languages).filter((l) => !GENERIC_LANGUAGE.test(l));
    return Array.from(new Set(all)).sort((a, b) => tr(a).localeCompare(tr(b)));
  }, [community.agencies, tr]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return community.agencies.filter((agency) => {
      const matchesQuery =
        q.length === 0 ||
        agency.name.toLowerCase().includes(q) ||
        agency.services.some((s) => tr(s).toLowerCase().includes(q));
      const matchesLanguage =
        !language || agency.languages.includes(language) || agency.languages.some((l) => GENERIC_LANGUAGE.test(l));
      return matchesQuery && matchesLanguage;
    });
  }, [community.agencies, query, language, tr]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-teal">{t("nav.community")}</h2>

      <div>
        <h3 className="text-sm font-medium text-slate-700">{t("community.languagesTitle", { city: data.city })}</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {community.languages.map((lang) => (
            <li key={lang} className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-black/5">
              {tr(lang)}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">{t("community.helpTitle", { city: data.city })}</h3>
          <p className="mt-0.5 text-xs text-slate-400">{t("community.helpSubtitle", { n: community.agencies.length })}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("community.searchPlaceholder")}
              aria-label={t("community.searchPlaceholder")}
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
            />
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label={t("community.filterLanguage")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
          >
            <option value="">{t("community.anyLanguage")}</option>
            {languageOptions.map((l) => (
              <option key={l} value={l}>
                {tr(l)}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-lg border border-black/5 bg-white p-4 text-sm text-slate-500">
            {t("community.none")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((agency) => (
              <div
                key={agency.name}
                className="flex flex-col rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="font-semibold text-slate-900">{agency.name}</div>

                <div className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>{agency.address}</span>
                </div>

                {agency.phone && (
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <Phone size={14} />
                    <a href={`tel:${agency.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                      {agency.phone}
                    </a>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agency.services.map((service) => (
                    <span key={service} className="rounded-full bg-reroute-cream px-2.5 py-1 text-xs text-slate-600">
                      {tr(service)}
                    </span>
                  ))}
                </div>

                {agency.languages.length > 0 && (
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-medium">{t("community.languagesLabel")}</span>{" "}
                    {agency.languages.map(tr).join(", ")}
                  </p>
                )}

                {agency.note && <p className="mt-2 flex-1 text-xs text-slate-500">{tr(agency.note)}</p>}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${agency.name} ${agency.address} ${data.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick("community", agency.name)}
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-md bg-reroute-teal/10 px-3 py-1.5 text-sm font-medium text-reroute-teal transition-colors hover:bg-reroute-teal hover:text-white"
                >
                  <MapPin size={14} />
                  {t("common.viewGoogleMaps")}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <a
        href={link(community.settlement_url)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("community", community.settlement_url)}
        className="inline-flex items-center gap-1.5 rounded-md bg-reroute-orange px-4 py-2 text-sm font-medium text-white hover:bg-reroute-orange-light"
      >
        {t("community.ircc")}
        <ExternalLink size={14} />
      </a>

      <SourceLabel source={community.source} lastUpdated={community.last_updated} />
    </div>
  );
}
