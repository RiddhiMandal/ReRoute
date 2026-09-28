"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { EN, FR } from "@/lib/dictionary";
import { DATA_FR, LINKS_FR } from "@/lib/dataFr";

export type Lang = "en" | "fr";

const STORAGE_KEY = "reroute_lang_v1";

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translate a UI string key, filling {placeholders}. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Translate a piece of data text (tags, descriptions, sources). Falls back to the original. */
  tr: (text: string) => string;
  /** Swap an official English link for its French page when we know one. */
  link: (url: string) => string;
  money: (n: number) => string;
  num: (n: number) => string;
  locale: string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let initial: Lang = "en";
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "en") initial = saved;
      else if (navigator.language?.toLowerCase().startsWith("fr")) initial = "fr";
    } catch {
      // storage unavailable
    }
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // best effort
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const dict = lang === "fr" ? FR : EN;
    const locale = lang === "fr" ? "fr-CA" : "en-CA";
    const moneyFmt = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    });
    const numFmt = new Intl.NumberFormat(locale);
    return {
      lang,
      setLang,
      locale,
      t: (key, vars) => {
        let s = dict[key] ?? EN[key] ?? key;
        if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
        return s;
      },
      tr: (text) => (lang === "fr" ? (DATA_FR[text] ?? text) : text),
      link: (url) => (lang === "fr" ? (LINKS_FR[url] ?? url) : url),
      money: (n) => moneyFmt.format(n),
      num: (n) => numFmt.format(n),
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
