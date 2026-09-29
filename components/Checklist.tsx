"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { useAccount, type UserType } from "@/lib/account";
import { useI18n } from "@/lib/i18n";
import { trackOutboundClick } from "@/lib/analytics";
import type { SectionId } from "@/components/SectionTabs";

interface Item {
  id: string;
  link?: string;
  goTo?: SectionId;
}

interface Phase {
  key: string;
  items: Item[];
}

const SIN = "https://www.canada.ca/en/employment-social-development/services/sin.html";
const OHIP = "https://www.ontario.ca/page/apply-ohip-and-get-health-card";
const BANK = "https://www.canada.ca/en/financial-consumer-agency/services/banking/opening-bank-account.html";
const TENANT = "https://www.ontario.ca/page/renting-ontario-your-rights";
const IRCC = "https://ircc.canada.ca/english/newcomers/services/index.asp";
const TELEHEALTH = "https://health811.ontario.ca/static/guest/home";
const PRESTO = "https://www.prestocard.ca";
const JOBBANK = "https://www.jobbank.gc.ca/findajob";
const ONE_ONE = "https://211ontario.ca";

const PLANS: Record<UserType, Phase[]> = {
  newcomer: [
    {
      key: "week1",
      items: [
        { id: "sin", link: SIN },
        { id: "ohip", link: OHIP },
        { id: "bank", link: BANK },
        { id: "housing", link: TENANT, goTo: "housing" },
        { id: "insurance", goTo: "housing" },
      ],
    },
    {
      key: "weeks2to4",
      items: [
        { id: "settlement", link: IRCC, goTo: "community" },
        { id: "doctor", goTo: "healthcare" },
        { id: "telehealth", link: TELEHEALTH },
        { id: "presto", link: PRESTO },
        { id: "jobs", link: JOBBANK, goTo: "employment" },
      ],
    },
    {
      key: "months2to3",
      items: [{ id: "school" }, { id: "licence" }, { id: "taxes" }],
    },
  ],
  internal: [
    {
      key: "week1",
      items: [
        { id: "ohipInternal", link: OHIP },
        { id: "address" },
        { id: "bankInternal", link: BANK },
        { id: "housing", link: TENANT, goTo: "housing" },
        { id: "insurance", goTo: "housing" },
      ],
    },
    {
      key: "weeks2to4",
      items: [
        { id: "doctor", goTo: "healthcare" },
        { id: "telehealth", link: TELEHEALTH },
        { id: "presto", link: PRESTO },
        { id: "jobs", link: JOBBANK, goTo: "employment" },
        { id: "community211", link: ONE_ONE, goTo: "community" },
      ],
    },
    {
      key: "months2to3",
      items: [{ id: "school" }, { id: "licenceInternal" }, { id: "taxesInternal" }],
    },
  ],
};

export default function Checklist({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const { t, link } = useI18n();
  const { userType, saved, setSaved } = useAccount();
  const done = saved.checklist ?? {};
  const phases = PLANS[userType];
  const total = phases.reduce((n, p) => n + p.items.length, 0);
  const completed = phases.reduce((n, p) => n + p.items.filter((i) => done[i.id]).length, 0);
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-reroute-teal">{t("check.title")}</h2>
        <p className="mt-1 text-sm text-slate-600">
          {userType === "internal" ? t("check.introInternal") : t("check.introNewcomer")}
        </p>
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium text-slate-700">{t("check.progress", { done: completed, total })}</span>
          <span className="font-semibold text-reroute-teal">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-reroute-teal transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {phases.map((phase) => (
        <div key={phase.key} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">{t(`check.phase.${phase.key}`)}</h3>
          {phase.items.map((item) => {
            const checked = !!done[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-xl border bg-white p-4 shadow-sm transition-colors ${
                  checked ? "border-green-200 bg-green-50/50" : "border-black/5"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setSaved("checklist", { ...done, [item.id]: !checked })}
                    className="mt-1 h-4 w-4 shrink-0 accent-reroute-teal"
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium ${checked ? "text-slate-400 line-through" : "text-slate-900"}`}>
                      {t(`check.${item.id}.title`)}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-600">{t(`check.${item.id}.detail`)}</p>
                  </div>
                </label>
                {(item.link || item.goTo) && (
                  <div className="mt-3 flex flex-wrap gap-2 pl-7">
                    {item.goTo && (
                      <button
                        onClick={() => onNavigate(item.goTo!)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-reroute-orange px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-reroute-orange-light"
                      >
                        {t(`check.go.${item.goTo}`)}
                        <ArrowRight size={14} />
                      </button>
                    )}
                    {item.link && (
                      <a
                        href={link(item.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutboundClick("checklist", item.id)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-reroute-teal/10 px-3 py-1.5 text-sm font-medium text-reroute-teal transition-colors hover:bg-reroute-teal hover:text-white"
                      >
                        {t(`check.${item.id}.link`)}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {completed > 0 && (
        <button
          onClick={() => setSaved("checklist", {})}
          className="text-sm text-slate-400 underline hover:text-slate-600"
        >
          {t("check.reset")}
        </button>
      )}
    </div>
  );
}
