"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, LayerGroup, Marker } from "leaflet";
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

const TONES: Record<NonNullable<MapMarker["tone"]>, string> = {
  green: "#1F5136",
  amber: "#d97706",
  red: "#dc2626",
  blue: "#2563eb",
  slate: "#475569",
};

function pinHtml(m: MapMarker, selected: boolean): string {
  const color = TONES[m.tone ?? "green"];
  const ring = selected ? "0 0 0 4px rgba(31,81,54,0.35), 0 2px 6px rgba(0,0,0,0.4)" : "0 1px 4px rgba(0,0,0,0.4)";
  if (m.label) {
    // label comes from our own data (formatted numbers), never user input
    const text = m.label.replace(/[<>&"']/g, "");
    return `<div style="background:${color};color:#fff;padding:3px 9px;border-radius:9999px;border:2px solid #fff;font:600 12px system-ui,sans-serif;white-space:nowrap;box-shadow:${ring};transform:${selected ? "scale(1.15)" : "none"}">${text}</div>`;
  }
  const size = selected ? 24 : 18;
  return `<div style="width:${size}px;height:${size}px;background:${color};border:3px solid #fff;border-radius:9999px;box-shadow:${ring}"></div>`;
}

export default function MapView({
  markers,
  selectedId,
  onSelect,
  ariaLabel,
  className = "h-72 lg:h-[32rem]",
}: {
  markers: MapMarker[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markerObjects = useRef<Map<string, Marker>>(new Map());
  const fitKey = useRef("");
  const onSelectRef = useRef(onSelect);
  const markersRef = useRef(markers);
  const selectedRef = useRef(selectedId);
  onSelectRef.current = onSelect;
  markersRef.current = markers;
  selectedRef.current = selectedId;

  function draw() {
    const L = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;

    layer.clearLayers();
    markerObjects.current.clear();
    const current = markersRef.current;

    current.forEach((m) => {
      const selected = m.id === selectedRef.current;
      const icon = L.divIcon({
        className: "",
        html: pinHtml(m, selected),
        iconSize: m.label ? undefined : [selected ? 24 : 18, selected ? 24 : 18],
        iconAnchor: m.label ? undefined : [selected ? 12 : 9, selected ? 12 : 9],
      });
      const marker = L.marker([m.lat, m.lng], {
        icon,
        title: m.title,
        alt: m.title,
        zIndexOffset: selected ? 1000 : 0,
        keyboard: true,
      });
      const tip = document.createElement("span");
      tip.textContent = m.title;
      marker.bindTooltip(tip, { direction: "top", offset: [0, -8] });
      marker.on("click", () => onSelectRef.current?.(m.id));
      marker.addTo(layer);
      markerObjects.current.set(m.id, marker);
    });

    const key = current.map((m) => m.id).join("|");
    if (key !== fitKey.current && current.length > 0) {
      fitKey.current = key;
      if (current.length === 1) map.setView([current[0].lat, current[0].lng], 14);
      else map.fitBounds(L.latLngBounds(current.map((m) => [m.lat, m.lng] as [number, number])), { padding: [36, 36], maxZoom: 14 });
    }
  }

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | null = null;

    (async () => {
      const mod = await import("leaflet");
      const L = ((mod as unknown as { default?: typeof import("leaflet") }).default ?? mod) as typeof import("leaflet");
      if (cancelled || !elRef.current || mapRef.current) return;

      leafletRef.current = L;
      const map = L.map(elRef.current, { scrollWheelZoom: false, zoomControl: true }).setView([43.7, -79.6], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      draw();

      observer = new ResizeObserver(() => map.invalidateSize());
      observer.observe(elRef.current);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      fitKey.current = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    const m = markers.find((x) => x.id === selectedId);
    if (map && m) map.panTo([m.lat, m.lng], { animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <div className="relative z-0 overflow-hidden rounded-xl border border-black/10 shadow-sm">
      <div ref={elRef} role="region" aria-label={ariaLabel} className={`w-full bg-slate-100 ${className}`} />
    </div>
  );
}
