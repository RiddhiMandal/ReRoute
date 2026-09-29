"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Phone, Search } from "lucide-react";
import { acceptingClinicCount, type CityData } from "@/lib/cities";
import { coordsFor } from "@/lib/geo";
import { useI18n } from "@/lib/i18n";
import { trackOutboundClick } from "@/lib/analytics";
import MapView, { type MapMarker } from "@/components/MapView";
import SourceLabel from "@/components/SourceLabel";

const HOSPITAL_ID = "__hospital__";

export default function Healthcare({ data }: { data: CityData }) {
  const { t, tr, link } = useI18n();
  const { healthcare } = data;
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setQuery("");
    setActiveTag(null);
    setSelected(null);
  }, [data.city]);

  const hasNoOhipClinics = healthcare.clinics.some((c) => c.patient_types.some((tag) => /no ohip/i.test(tag)));

  const tags = useMemo(() => {
    const all = healthcare.clinics.flatMap((c) => [...c.patient_types, ...c.conditions_treated]);
    return Array.from(new Set(all));
  }, [healthcare.clinics]);

  const filteredClinics = useMemo(() => {
    const q = query.trim().toLowerCase();
    return healthcare.clinics.filter((clinic) => {
      const matchesQuery =
        q.length === 0 ||
        clinic.name.toLowerCase().includes(q) ||
        clinic.patient_types.some((x) => tr(x).toLowerCase().includes(q)) ||
        clinic.conditions_treated.some((x) => tr(x).toLowerCase().includes(q));
      const matchesTag =
        !activeTag || clinic.patient_types.includes(activeTag) || clinic.conditions_treated.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [healthcare.clinics, query, activeTag, tr]);

  const markers: MapMarker[] = useMemo(() => {
    const out: MapMarker[] = [];
    filteredClinics.forEach((c) => {
      const pos = coordsFor(c.name);
      if (pos) out.push({ id: c.name, lat: pos[0], lng: pos[1], title: c.name, tone: "green" });
    });
    const h = coordsFor(healthcare.nearest_hospital);
    if (h) {
      out.push({
        id: HOSPITAL_ID,
        lat: h[0],
        lng: h[1],
        title: `${healthcare.nearest_hospital} — ${t("health.hospital")}`,
        tone: "red",
      });
    }
    return out;
  }, [filteredClinics, healthcare.nearest_hospital, t]);

  function selectFromMap(id: string) {
    setSelected(id);
    if (id !== HOSPITAL_ID) {
      document.getElementById(`clinic-${encodeURIComponent(id)}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-teal">{t("nav.healthcare")}</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="order-2 space-y-5 lg:order-1">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-black/5 bg-white p-4 shadow-sm">
              <div className="text-2xl font-semibold">{acceptingClinicCount(data)}</div>
              <div className="text-sm text-slate-500">{t("health.accepting")}</div>
            </div>
            <button
              onClick={() => setSelected(HOSPITAL_ID)}
              className="rounded-lg border border-black/5 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-lg font-semibold">{healthcare.nearest_hospital}</div>
              <div className="text-sm text-slate-500">{t("health.hospital")}</div>
            </button>
          </div>

          <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p>
              <strong>{t("health.ohipLead")}</strong> {t("health.ohipBody")}{" "}
              <a
                href={link(healthcare.ohip_guide_url)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick("healthcare", healthcare.ohip_guide_url)}
                className="font-medium underline"
              >
                {t("health.ohipLink")}
              </a>
            </p>
            <p>{hasNoOhipClinics ? t("health.noOhipYes") : t("health.noOhipNo")}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">{t("health.findTitle", { city: data.city })}</h3>
              <p className="mt-0.5 text-xs text-slate-400">
                {t("health.findSubtitle", { n: healthcare.clinics.length })}
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
                placeholder={t("health.searchPlaceholder")}
                aria-label={t("health.searchPlaceholder")}
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
              />
            </div>

            {tags.length > 0 && (
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
            )}

            {filteredClinics.length === 0 ? (
              <p className="rounded-lg border border-black/5 bg-white p-4 text-sm text-slate-500">
                {t("health.none")}
              </p>
            ) : (
              <div className="space-y-3">
                {filteredClinics.map((clinic) => {
                  const isSelected = selected === clinic.name;
                  const hasPin = Boolean(coordsFor(clinic.name));
                  return (
                    <div
                      key={clinic.name}
                      id={`clinic-${encodeURIComponent(clinic.name)}`}
                      className={`flex flex-col rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                        isSelected ? "border-reroute-teal ring-2 ring-reroute-teal/30" : "border-black/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-semibold text-slate-900">{clinic.name}</div>
                        {clinic.accepting_new_patients && (
                          <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                            {t("health.acceptingBadge")}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        <span>{clinic.address}</span>
                      </div>

                      {clinic.patient_types.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {clinic.patient_types.map((type) => (
                            <span key={type} className="rounded-full bg-reroute-cream px-2.5 py-1 text-xs text-slate-600">
                              {tr(type)}
                            </span>
                          ))}
                        </div>
                      )}

                      {clinic.conditions_treated.length > 0 && (
                        <p className="mt-2 flex-1 text-sm text-slate-600">
                          <span className="font-medium">{t("health.treats")}</span>{" "}
                          {clinic.conditions_treated.map(tr).join(", ")}
                        </p>
                      )}

                      {clinic.phone && (
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                          <Phone size={14} />
                          <a href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                            {clinic.phone}
                          </a>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {hasPin && (
                          <button
                            onClick={() => setSelected(clinic.name)}
                            className="inline-flex items-center gap-1.5 rounded-md bg-reroute-orange px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-reroute-orange-light"
                          >
                            <MapPin size={14} />
                            {t("health.showOnMap")}
                          </button>
                        )}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${clinic.name} ${clinic.address}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackOutboundClick("healthcare", clinic.name)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-reroute-teal/10 px-3 py-1.5 text-sm font-medium text-reroute-teal transition-colors hover:bg-reroute-teal hover:text-white"
                        >
                          {t("common.viewGoogleMaps")}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="order-1 space-y-2 lg:sticky lg:top-32 lg:order-2">
          <MapView
            markers={markers}
            selectedId={selected}
            onSelect={selectFromMap}
            ariaLabel={t("health.mapLabel", { city: data.city })}
            className="h-64 sm:h-80 lg:h-[34rem]"
          />
          <p className="text-xs text-slate-400">{t("health.mapHint")}</p>
        </div>
      </div>

      <SourceLabel source={healthcare.source} lastUpdated={healthcare.last_updated} />
    </div>
  );
}

