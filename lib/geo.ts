import coordinates from "@/data/coordinates.json";

export type LatLng = [number, number];

const COORDS = coordinates as unknown as Record<string, LatLng>;

export function coordsFor(name: string): LatLng | null {
  return COORDS[name] ?? null;
}

export function cityCenter(cityId: string): LatLng | null {
  return COORDS[`city:${cityId}`] ?? null;
}
