"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  /** Short text shown inside the pin (e.g. a rent price). Without it a coloured dot is drawn. */
  label?: string;
  tone?: "green" | "amber" | "red" | "blue" | "slate";
}

// Leaflet touches `window` at import time, so the real map can only render on the client.
// react-leaflet manages Leaflet's DOM/lifecycle itself (mount, unmount, marker add/remove),
// which is what a hand-rolled useRef/useEffect integration kept getting wrong.
const MapViewClient = dynamic(() => import("@/components/MapViewClient"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-100" />,
});

export default function MapView(props: {
  markers: MapMarker[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  const { ariaLabel, className = "h-72 lg:h-[32rem]" } = props;
  return (
    <div className="relative z-0 overflow-hidden rounded-xl border border-black/10 shadow-sm">
      <div role="region" aria-label={ariaLabel} className={`w-full bg-slate-100 ${className}`}>
        <MapViewClient {...props} />
      </div>
    </div>
  );
}
