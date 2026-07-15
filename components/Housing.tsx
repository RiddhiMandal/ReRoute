import type { CityData } from "@/lib/cities";
import { trackOutboundClick, trackAffiliateClick } from "@/lib/analytics";
import SourceLabel from "@/components/SourceLabel";

export default function Housing({ data }: { data: CityData }) {
  const { housing } = data;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-green">Housing</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="1BR average rent" value={`$${housing.avg_rent_1br.toLocaleString()}`} />
        <StatCard label="2BR average rent" value={`$${housing.avg_rent_2br.toLocaleString()}`} />
        <StatCard label="3BR average rent" value={`$${housing.avg_rent_3br.toLocaleString()}`} />
      </div>

      <p className="text-sm text-slate-600">
        Vacancy rate is <strong>{housing.vacancy_rate}</strong> — move quickly on listings.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={housing.listings_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutboundClick("housing", housing.listings_url)}
          className="rounded-md bg-reroute-green px-4 py-2 text-sm font-medium text-white hover:bg-reroute-green-light"
        >
          View Rentals.ca listings
        </a>
        <a
          href={housing.affiliate_url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackAffiliateClick(housing.affiliate_url)}
          className="rounded-md border border-reroute-green px-4 py-2 text-sm font-medium text-reroute-green hover:bg-reroute-green/5"
        >
          Get a tenant insurance quote
        </a>
      </div>

      <SourceLabel source={housing.source} lastUpdated={housing.last_updated} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/5 bg-white p-4 shadow-sm">
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}
