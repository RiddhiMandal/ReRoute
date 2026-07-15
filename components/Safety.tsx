import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import SourceLabel from "@/components/SourceLabel";

const RATING_COLORS: Record<string, string> = {
  Low: "bg-green-100 text-green-800",
  Moderate: "bg-amber-100 text-amber-800",
  High: "bg-red-100 text-red-800",
};

export default function Safety({ data }: { data: CityData }) {
  const { safety } = data;
  const badgeClass = RATING_COLORS[safety.csi_rating] ?? "bg-slate-100 text-slate-800";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-green">Safety</h2>

      <div className="flex items-center gap-3">
        <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${badgeClass}`}>
          {safety.csi_rating} crime severity
        </span>
        <span className="text-sm text-slate-500">Trend: {safety.trend}</span>
      </div>

      <p className="text-sm text-slate-600">
        Crime Severity Index score of <strong>{safety.csi_score}</strong> — in plain
        language, this means {data.city} has a comparatively {safety.csi_rating.toLowerCase()}{" "}
        level of reported crime, and it is {safety.trend.toLowerCase()} year over year.
      </p>

      <a
        href={safety.source_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("safety", safety.source_url)}
        className="inline-block text-sm font-medium text-reroute-green underline"
      >
        See full data
      </a>

      <SourceLabel source={safety.source} lastUpdated={safety.last_updated} />
    </div>
  );
}
