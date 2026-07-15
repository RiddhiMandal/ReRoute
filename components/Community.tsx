import type { CityData } from "@/lib/cities";
import { trackOutboundClick } from "@/lib/analytics";
import SourceLabel from "@/components/SourceLabel";

export default function Community({ data }: { data: CityData }) {
  const { community } = data;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-reroute-green">Community</h2>

      <div>
        <h3 className="text-sm font-medium text-slate-700">Languages spoken</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {community.languages.map((language) => (
            <li
              key={language}
              className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-black/5"
            >
              {language}
            </li>
          ))}
        </ul>
      </div>

      {/* TODO(day1): swap YOUR_GOOGLE_MAPS_EMBED_API_KEY in each data/cities/*.json */}
      <iframe
        title={`Settlement agencies near ${data.city}`}
        src={community.maps_embed_url}
        className="h-64 w-full rounded-lg border-0"
        loading="lazy"
      />

      <a
        href={community.settlement_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("community", community.settlement_url)}
        className="inline-block rounded-md bg-reroute-green px-4 py-2 text-sm font-medium text-white hover:bg-reroute-green-light"
      >
        Find a settlement agency
      </a>

      <SourceLabel source={community.source} lastUpdated={community.last_updated} />
    </div>
  );
}
