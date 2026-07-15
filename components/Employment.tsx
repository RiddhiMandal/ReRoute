"use client";

import { useState } from "react";
import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import SourceLabel from "@/components/SourceLabel";

export default function Employment({ data }: { data: CityData }) {
  const { employment } = data;
  // jobbank.gc.ca has historically blocked iframe embedding via X-Frame-Options/CSP.
  // Verify this on Day 1-2 (see Execution Checklist "Risks to Address Early"). If the
  // iframe fails to load, iframeBlocked flips true and we fall back to a plain button.
  const [iframeBlocked, setIframeBlocked] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-green">Employment</h2>

      <div>
        <h3 className="text-sm font-medium text-slate-700">Top hiring roles</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {employment.top_roles.map((role) => (
            <li
              key={role}
              className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-black/5"
            >
              {role}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-slate-600">
        Unemployment rate is <strong>{employment.unemployment_rate}</strong>.
      </p>

      {!iframeBlocked ? (
        <iframe
          title={`Job Bank search results for ${data.city}`}
          src={employment.job_bank_url}
          className="h-64 w-full rounded-lg border border-black/5"
          loading="lazy"
          onError={() => setIframeBlocked(true)}
        />
      ) : null}

      <a
        href={employment.job_bank_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("employment", employment.job_bank_url)}
        className="inline-block rounded-md bg-reroute-green px-4 py-2 text-sm font-medium text-white hover:bg-reroute-green-light"
      >
        Search Job Bank
      </a>

      <SourceLabel source={employment.source} lastUpdated={employment.last_updated} />
    </div>
  );
}
