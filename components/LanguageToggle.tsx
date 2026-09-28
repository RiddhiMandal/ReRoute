"use client";

import { useI18n, type Lang } from "@/lib/i18n";

const OPTIONS: { lang: Lang; label: string; full: string }[] = [
  { lang: "en", label: "EN", full: "English" },
  { lang: "fr", label: "FR", full: "Français" },
];

export default function LanguageToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={`inline-flex overflow-hidden rounded-md border text-xs font-semibold ${
        tone === "dark" ? "border-white/30" : "border-black/10"
      }`}
    >
      {OPTIONS.map((o) => {
        const active = lang === o.lang;
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.lang}
            aria-pressed={active}
            title={o.full}
            onClick={() => setLang(o.lang)}
            className={`px-2.5 py-1 transition-colors ${
              active
                ? tone === "dark"
                  ? "bg-white text-reroute-green"
                  : "bg-reroute-green text-white"
                : tone === "dark"
                  ? "text-white/80 hover:bg-white/10"
                  : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
