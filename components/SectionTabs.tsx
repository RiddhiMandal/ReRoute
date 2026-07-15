"use client";

import { Home, HeartPulse, ShieldCheck, Briefcase, Users } from "lucide-react";

export const SECTIONS = [
  { id: "housing", label: "Housing", icon: Home },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "safety", label: "Safety", icon: ShieldCheck },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "community", label: "Community", icon: Users },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export default function SectionTabs({
  active,
  onChange,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
}) {
  return (
    <nav className="flex overflow-x-auto border-b border-black/5 bg-white px-2 sm:px-6">
      {SECTIONS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "border-reroute-green text-reroute-green"
                : "border-transparent text-slate-500 hover:text-reroute-green"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
