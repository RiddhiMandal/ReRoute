import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import SourceLabel from "@/components/SourceLabel";

export default function Healthcare({ data }: { data: CityData }) {
  const { healthcare } = data;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-green">Healthcare</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-black/5 bg-white p-4 shadow-sm">
          <div className="text-2xl font-semibold">{healthcare.clinics_accepting}</div>
          <div className="text-sm text-slate-500">clinics accepting new patients</div>
        </div>
        <div className="rounded-lg border border-black/5 bg-white p-4 shadow-sm">
          <div className="text-lg font-semibold">{healthcare.nearest_hospital}</div>
          <div className="text-sm text-slate-500">nearest hospital</div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        New to Ontario? Enroll in OHIP first — there is a {healthcare.ohip_wait_days}-day
        waiting period.{" "}
        <a
          href={healthcare.ohip_guide_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutboundClick("healthcare", healthcare.ohip_guide_url)}
          className="font-medium underline"
        >
          OHIP enrollment guide
        </a>
      </div>

      {/* TODO(day1): Google Maps Embed API requires a Google Cloud project + API key.
          Swap YOUR_GOOGLE_MAPS_EMBED_API_KEY in each data/cities/*.json before demo. */}
      <iframe
        title={`Clinics near ${data.city}`}
        src={healthcare.maps_embed_url}
        className="h-64 w-full rounded-lg border-0"
        loading="lazy"
      />

      <SourceLabel source={healthcare.source} lastUpdated={healthcare.last_updated} />
    </div>
  );
}
