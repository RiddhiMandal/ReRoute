"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import type { MapMarker } from "@/components/MapView";

const TONES: Record<NonNullable<MapMarker["tone"]>, string> = {
  green: "#0F6E56",
  amber: "#d97706",
  red: "#dc2626",
  blue: "#2563eb",
  slate: "#475569",
};

function pinIcon(m: MapMarker, selected: boolean): L.DivIcon {
  const color = TONES[m.tone ?? "green"];
  const ring = selected ? "0 0 0 4px rgba(31,81,54,0.35), 0 2px 6px rgba(0,0,0,0.4)" : "0 1px 4px rgba(0,0,0,0.4)";
  if (m.label) {
    // label comes from our own data (formatted numbers), never user input
    const text = m.label.replace(/[<>&"']/g, "");
    return L.divIcon({
      className: "",
      html: `<div style="background:${color};color:#fff;padding:3px 9px;border-radius:9999px;border:2px solid #fff;font:600 12px system-ui,sans-serif;white-space:nowrap;box-shadow:${ring};transform:${selected ? "scale(1.15)" : "none"}">${text}</div>`,
    });
  }
  const size = selected ? 24 : 18;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:3px solid #fff;border-radius:9999px;box-shadow:${ring}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/** Moves the view to fit the markers (or pans to the selection) whenever either changes. */
function ViewController({ markers, selectedId }: { markers: MapMarker[]; selectedId?: string | null }) {
  const map = useMap();
  const key = markers.map((m) => m.id).join("|");

  useEffect(() => {
    if (markers.length === 0) return;
    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 14, { animate: false });
    } else {
      map.fitBounds(
        L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number])),
        { padding: [36, 36], maxZoom: 14, animate: false }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const sel = markers.find((m) => m.id === selectedId);
    if (sel) map.panTo([sel.lat, sel.lng], { animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return null;
}

export default function MapViewClient({
  markers,
  selectedId,
  onSelect,
}: {
  markers: MapMarker[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  return (
    <MapContainer
      center={[43.7, -79.6]}
      zoom={10}
      scrollWheelZoom={false}
      zoomAnimation={false}
      markerZoomAnimation={false}
      fadeAnimation={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ViewController markers={markers} selectedId={selectedId} />
      {markers.map((m) => {
        const selected = m.id === selectedId;
        return (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={pinIcon(m, selected)}
            zIndexOffset={selected ? 1000 : 0}
            eventHandlers={onSelect ? { click: () => onSelect(m.id) } : undefined}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              {m.title}
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
