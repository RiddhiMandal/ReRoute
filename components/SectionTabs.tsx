"use client";

import { Compass, Home, HeartPulse, ShieldCheck, Briefcase, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const SECTIONS = [
  { id: "match", labelKey: "nav.match", icon: Compass },
  { id: "housing", labelKey: "nav.housing", icon: Home },
  { id: "healthcare", labelKey: "nav.healthcare", icon: HeartPulse },
  { id: "safety", labelKey: "nav.safety", icon: ShieldCheck },
  { id: "employment", labelKey: "nav.employment", icon: Briefcase },
  { id: "community", labelKey: "nav.community", icon: Users },
] as const;

// "checklist" is opened from the 30-day plan banner rather than the nav bar.
export type SectionId = (typeof SECTIONS)[number]["id"] | "checklist";

export default function SectionTabs({
  active,
  onChange,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
}) {
  const { t } = useI18n();
  return (
    <nav
      aria-label={t("nav.aria")}
      className="flex overflow-x-auto border-b border-black/5 bg-white px-2 sm:px-6"
    >
      {SECTIONS.map(({ id, labelKey, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "border-reroute-green text-reroute-green"
                : "border-transparent text-slate-500 hover:text-reroute-green"
            }`}
          >
            <Icon size={16} />
            {t(labelKey)}
          </button>
        );
      })}
    </nav>
  );
}
