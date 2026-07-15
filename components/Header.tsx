import Image from "next/image";
import CitySelector from "@/components/CitySelector";

export default function Header({
  cityName,
  activeCityId,
  onCityChange,
}: {
  cityName: string;
  activeCityId: string;
  onCityChange: (cityId: string) => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Reroute" width={32} height={32} />
        <span className="text-lg font-semibold text-reroute-green">Reroute</span>
        <span className="hidden text-sm text-slate-400 sm:inline">
          — a relocation guide for Ontario
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 sm:inline">{cityName}, Ontario</span>
        <CitySelector activeCityId={activeCityId} onChange={onCityChange} />
      </div>
    </header>
  );
}
