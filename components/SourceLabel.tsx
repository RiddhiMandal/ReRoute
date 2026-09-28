"use client";

import { useI18n } from "@/lib/i18n";

export default function SourceLabel({ source, lastUpdated }: { source: string; lastUpdated: string }) {
  const { t, tr } = useI18n();
  return (
    <p className="text-xs text-slate-400">
      {t("common.source")}{t("common.colon")}{tr(source)} · {t("common.lastUpdated")} {lastUpdated}
    </p>
  );
}
