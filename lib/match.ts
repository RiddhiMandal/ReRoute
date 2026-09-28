import { CITIES, commuteMinutes, type CityData } from "@/lib/cities";

export type PriorityKey = "affordability" | "safety" | "commute" | "jobs" | "language";

export interface MatchPrefs {
  budget: number;
  language: string;
  role: string;
  weights: Record<PriorityKey, number>;
}

/** Values are formatted by the UI so they follow the visitor's language. */
export type ReasonVar = string | number | { money: number } | { tr: string };

export interface Reason {
  ok: boolean;
  key: string;
  vars?: Record<string, ReasonVar>;
}

export interface MatchResult {
  city: CityData;
  score: number;
  reasons: Reason[];
}

export const DEFAULT_PREFS: MatchPrefs = {
  budget: 2300,
  language: "",
  role: "",
  weights: { affordability: 3, safety: 2, commute: 1, jobs: 2, language: 2 },
};

export const PRIORITY_KEYS: PriorityKey[] = ["affordability", "safety", "commute", "jobs", "language"];

const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function languageOptions(): string[] {
  const all = CITIES.flatMap((c) => c.community.languages);
  return Array.from(new Set(all)).sort();
}

export function roleOptions(): string[] {
  const all = CITIES.flatMap((c) => c.employment.top_roles);
  return Array.from(new Set(all)).sort();
}

function scoreCity(city: CityData, prefs: MatchPrefs): { total: number; reasons: Reason[] } {
  const { weights } = prefs;
  const reasons: Reason[] = [];
  const parts: { w: number; s: number }[] = [];

  const rent = city.housing.avg_rent_1br;
  const rentScore = clamp(1 - (rent / prefs.budget - 0.8) / 0.4);
  parts.push({ w: weights.affordability, s: rentScore });
  if (weights.affordability > 0) {
    reasons.push(
      rent <= prefs.budget
        ? { ok: true, key: "match.r.rentOk", vars: { rent: { money: rent }, budget: { money: prefs.budget } } }
        : {
            ok: false,
            key: "match.r.rentOver",
            vars: { rent: { money: rent }, diff: { money: rent - prefs.budget } },
          }
    );
  }

  const safetyScore = clamp(1 - (city.safety.csi_score - 40) / 40);
  parts.push({ w: weights.safety, s: safetyScore });
  if (weights.safety > 0) {
    reasons.push({
      ok: city.safety.csi_score < 56,
      key: "match.r.safety",
      vars: { rating: { tr: city.safety.csi_rating }, score: city.safety.csi_score },
    });
  }

  const minutes = commuteMinutes(city);
  parts.push({ w: weights.commute, s: clamp(1 - minutes / 60) });
  if (weights.commute > 0) {
    reasons.push(
      minutes === 0
        ? { ok: true, key: "match.r.commute0" }
        : { ok: minutes <= 30, key: "match.r.commute", vars: { min: minutes } }
    );
  }

  let jobScore = 0.6;
  if (prefs.role) {
    const hit = city.employment.top_roles.includes(prefs.role);
    jobScore = hit ? 1 : 0.3;
    if (weights.jobs > 0) {
      reasons.push({
        ok: hit,
        key: hit ? "match.r.roleHit" : "match.r.roleMiss",
        vars: { role: { tr: prefs.role } },
      });
    }
  }
  parts.push({ w: weights.jobs, s: jobScore });

  let langScore = 0.6;
  if (prefs.language) {
    const spoken = city.community.languages.includes(prefs.language);
    const agencyCount = city.community.agencies.filter((a) => a.languages.includes(prefs.language)).length;
    langScore = spoken ? 1 : agencyCount > 0 ? 0.6 : 0.2;
    if (weights.language > 0) {
      const vars = { lang: { tr: prefs.language }, n: agencyCount };
      let key: string;
      if (spoken) key = agencyCount === 0 ? "match.r.langSpoken" : agencyCount === 1 ? "match.r.langSpokenAgency1" : "match.r.langSpokenAgencyN";
      else if (agencyCount > 0) key = agencyCount === 1 ? "match.r.langAgency1" : "match.r.langAgencyN";
      else key = "match.r.langNone";
      reasons.push({ ok: spoken || agencyCount > 0, key, vars });
    }
  }
  parts.push({ w: weights.language, s: langScore });

  const totalWeight = parts.reduce((sum, p) => sum + p.w, 0);
  const total =
    totalWeight === 0
      ? parts.reduce((sum, p) => sum + p.s, 0) / parts.length
      : parts.reduce((sum, p) => sum + p.w * p.s, 0) / totalWeight;

  return { total, reasons };
}

export function rankCities(prefs: MatchPrefs): MatchResult[] {
  return CITIES.map((city) => {
    const { total, reasons } = scoreCity(city, prefs);
    return { city, total, score: Math.round(total * 100), reasons };
  })
    .sort((a, b) => b.total - a.total)
    .map(({ city, score, reasons }) => ({ city, score, reasons }));
}
