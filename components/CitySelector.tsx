"use client";

import { CITIES } from "@/lib/cities";
import { useI18n } from "@/lib/i18n";

export default function CitySelector({
  activeCityId,
  onChange,
}: {
  activeCityId: string;
  onChange: (cityId: string) => void;
}) {
  const { t } = useI18n();
  return (
    <label className="flex items-center gap-2 text-sm text-slate-500">
      <span className="hidden sm:inline">{t("header.city")}</span>
      <select
        value={activeCityId}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("header.city")}
        className="rounded-md border border-black/10 bg-white px-2 py-1 text-sm text-slate-700"
      >
        <optgroup label={t("header.regionGta")}>
          {CITIES.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );
}
