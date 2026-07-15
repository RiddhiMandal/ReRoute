"use client";

import { CITIES } from "@/lib/cities";

export default function CitySelector({
  activeCityId,
  onChange,
}: {
  activeCityId: string;
  onChange: (cityId: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-500">
      City
      <select
        value={activeCityId}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-black/10 bg-white px-2 py-1 text-sm text-slate-700"
      >
        {CITIES.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city}
          </option>
        ))}
      </select>
    </label>
  );
}
