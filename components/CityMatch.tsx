"use client";

import { useMemo } from "react";
import { ArrowRight, Check, Minus, Trophy } from "lucide-react";
import { acceptingClinicCount, type CityData } from "@/lib/cities";
import { useAccount } from "@/lib/account";
import { useI18n } from "@/lib/i18n";
import {
  DEFAULT_PREFS,
  PRIORITY_KEYS,
  languageOptions,
  rankCities,
  roleOptions,
  type MatchPrefs,
  type Reason,
  type ReasonVar,
} from "@/lib/match";

const TOP_N = 4;

export default function CityMatch({ onExplore }: { onExplore: (cityId: string) => void }) {
  const { t, tr, money } = useI18n();
  const { saved, setSaved } = useAccount();

  const prefs: MatchPrefs = useMemo(
    () => ({ ...DEFAULT_PREFS, ...saved.prefs, weights: { ...DEFAULT_PREFS.weights, ...saved.prefs?.weights } }),
    [saved.prefs]
  );

  function update(next: MatchPrefs) {
    setSaved("prefs", next);
  }

  const results = useMemo(() => rankCities(prefs), [prefs]);
  const top = results.slice(0, TOP_N);
  const languages = useMemo(() => languageOptions(), []);
  const roles = useMemo(() => roleOptions(), []);

  function fmtVar(v: ReasonVar): string | number {
    if (typeof v === "object" && "money" in v) return money(v.money);
    if (typeof v === "object" && "tr" in v) return tr(v.tr);
    return v;
  }
  function reasonText(r: Reason): string {
    const vars: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(r.vars ?? {})) vars[k] = fmtVar(v);
    return t(r.key, vars);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-reroute-teal">{t("match.title")}</h2>
        <p className="mt-1 text-sm text-slate-600">{t("match.intro")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr] lg:items-start">
        <aside
          aria-label={t("match.filters")}
          className="space-y-5 rounded-xl border border-black/5 bg-white p-5 shadow-sm lg:sticky lg:top-32"
        >
          <div className="text-sm font-semibold text-slate-700">{t("match.filters")}</div>

          <div>
            <label className="flex items-baseline justify-between text-sm font-medium text-slate-700">
              <span>{t("match.budget")}</span>
              <span className="text-lg font-semibold text-reroute-teal">{money(prefs.budget)}</span>
            </label>
            <input
              type="range"
              min={1500}
              max={3500}
              step={50}
              value={prefs.budget}
              aria-label={t("match.budget")}
              onChange={(e) => update({ ...prefs, budget: Number(e.target.value) })}
              className="mt-2 w-full accent-reroute-teal"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{money(1500)}</span>
              <span>{money(3500)}</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="match-role">
              {t("match.role")}
            </label>
            <select
              id="match-role"
              value={prefs.role}
              onChange={(e) => update({ ...prefs, role: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
            >
              <option value="">{t("match.roleNone")}</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {tr(r)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="match-language">
              {t("match.language")}
            </label>
            <select
              id="match-language"
              value={prefs.language}
              onChange={(e) => update({ ...prefs, language: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
            >
              <option value="">{t("match.languageNone")}</option>
              {languages.map((l) => (
                <option key={l} value={l}>
                  {tr(l)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-700">{t("match.howMuch")}</div>
            <div className="mt-2 space-y-3">
              {PRIORITY_KEYS.map((key) => (
                <div key={key}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-medium text-slate-600">{t(`match.p.${key}`)}</span>
                    <span className="text-slate-400">{t(`match.imp.${prefs.weights[key]}`)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={3}
                    step={1}
                    value={prefs.weights[key]}
                    aria-label={t(`match.p.${key}`)}
                    onChange={(e) =>
                      update({ ...prefs, weights: { ...prefs.weights, [key]: Number(e.target.value) } })
                    }
                    className="w-full accent-reroute-teal"
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-semibold text-slate-700">{t("match.results")}</h3>
            <span className="text-xs text-slate-400">
              {t("match.topOf", { n: top.length, total: results.length })}
            </span>
          </div>

          <div className="max-h-[34rem] space-y-3 overflow-y-auto pr-1">
            {top.map((r, index) => (
              <div
                key={r.city.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  index === 0 ? "border-reroute-teal/40 ring-1 ring-reroute-teal/30" : "border-black/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {index === 0 && <Trophy size={18} className="text-amber-500" />}
                      <span className="text-lg font-semibold text-slate-900">
                        {index + 1}. {r.city.city}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {parseInt(r.city.distance_from_toronto, 10) === 0
                        ? t("hero.inToronto")
                        : t("hero.fromToronto", { min: parseInt(r.city.distance_from_toronto, 10) })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-reroute-teal">{r.score}%</div>
                    <div className="text-xs text-slate-400">{t("match.matchWord")}</div>
                  </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-reroute-teal transition-all"
                    style={{ width: `${r.score}%` }}
                  />
                </div>

                <ul className="mt-4 space-y-1.5">
                  {r.reasons.map((reason) => {
                    const text = reasonText(reason);
                    return (
                      <li key={text} className="flex items-start gap-2 text-sm text-slate-600">
                        {reason.ok ? (
                          <Check size={16} className="mt-0.5 shrink-0 text-green-600" />
                        ) : (
                          <Minus size={16} className="mt-0.5 shrink-0 text-amber-500" />
                        )}
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => onExplore(r.city.id)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-reroute-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-reroute-orange-light"
                >
                  {t("match.explore", { city: r.city.city })}
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Comparison cities={top.map((r) => r.city)} />
    </div>
  );
}

function Comparison({ cities }: { cities: CityData[] }) {
  const { t, tr, money, num } = useI18n();
  const rows: { label: string; values: string[] }[] = [
    { label: t("cmp.rent1"), values: cities.map((c) => money(c.housing.avg_rent_1br)) },
    { label: t("cmp.rent2"), values: cities.map((c) => money(c.housing.avg_rent_2br)) },
    { label: t("cmp.rent3"), values: cities.map((c) => money(c.housing.avg_rent_3br)) },
    { label: t("cmp.listings"), values: cities.map((c) => num(c.housing.listings_count)) },
    { label: t("cmp.vacancy"), values: cities.map((c) => c.housing.vacancy_rate ?? t("common.notAvailable")) },
    {
      label: t("cmp.crime"),
      values: cities.map((c) => `${tr(c.safety.csi_rating)} (${c.safety.csi_score})`),
    },
    {
      label: t("cmp.distance"),
      values: cities.map((c) => t("cmp.minutes", { min: parseInt(c.distance_from_toronto, 10) })),
    },
    { label: t("cmp.unemployment"), values: cities.map((c) => c.employment.unemployment_rate) },
    { label: t("cmp.roles"), values: cities.map((c) => c.employment.top_roles.map(tr).join(", ")) },
    { label: t("cmp.languages"), values: cities.map((c) => c.community.languages.map(tr).join(", ")) },
    { label: t("cmp.clinics"), values: cities.map((c) => String(acceptingClinicCount(c))) },
    { label: t("cmp.agencies"), values: cities.map((c) => String(c.community.agencies.length)) },
    { label: t("cmp.hospital"), values: cities.map((c) => c.healthcare.nearest_hospital) },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{t("cmp.title")}</h3>
        <span className="text-xs text-slate-400">{t("cmp.hint", { n: cities.length })}</span>
      </div>
      <div className="max-h-[26rem] overflow-auto rounded-xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20 border-b border-black/5 bg-reroute-cream px-4 py-3 font-medium text-slate-500" />
              {cities.map((c) => (
                <th
                  key={c.id}
                  className="sticky top-0 z-10 border-b border-black/5 bg-reroute-cream px-4 py-3 font-semibold text-slate-900"
                >
                  {c.city}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="sticky left-0 z-10 border-b border-black/5 bg-white px-4 py-3 font-medium text-slate-500">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td key={i} className="border-b border-black/5 px-4 py-3 text-slate-800">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400">{t("cmp.note")}</p>
    </div>
  );
}
