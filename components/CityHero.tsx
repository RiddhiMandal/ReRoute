import type { CityData } from "@/lib/cities";

export default function CityHero({ data }: { data: CityData }) {
  const stats = [
    {
      label: "Avg. 1BR rent",
      value: `$${data.housing.avg_rent_1br.toLocaleString()}`,
    },
    {
      label: "Crime severity",
      value: data.safety.csi_rating,
    },
    {
      label: "Clinics accepting patients",
      value: data.healthcare.clinics_accepting.toString(),
    },
  ];

  return (
    <section className="bg-reroute-green px-6 py-10 text-white">
      <h1 className="text-3xl font-bold">{data.city}</h1>
      <p className="mt-1 text-white/80">{data.distance_from_toronto} from Toronto</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm"
          >
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
