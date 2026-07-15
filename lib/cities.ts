import mississauga from "@/data/cities/mississauga.json";
import toronto from "@/data/cities/toronto.json";
import brampton from "@/data/cities/brampton.json";

export interface CityData {
  id: string;
  city: string;
  distance_from_toronto: string;
  housing: {
    avg_rent_1br: number;
    avg_rent_2br: number;
    avg_rent_3br: number;
    vacancy_rate: string;
    source: string;
    last_updated: string;
    listings_url: string;
    affiliate_url: string;
  };
  healthcare: {
    clinics_accepting: number;
    nearest_hospital: string;
    ohip_wait_days: number;
    source: string;
    last_updated: string;
    ohip_guide_url: string;
    maps_embed_url: string;
  };
  safety: {
    csi_rating: string;
    csi_score: number;
    trend: string;
    source: string;
    last_updated: string;
    source_url: string;
  };
  employment: {
    top_roles: string[];
    unemployment_rate: string;
    source: string;
    last_updated: string;
    job_bank_url: string;
  };
  community: {
    languages: string[];
    settlement_url: string;
    maps_embed_url: string;
    source: string;
    last_updated: string;
  };
  disclaimer: string;
}

// Add a new Ontario city by dropping a JSON file matching this shape into
// data/cities/ and registering it here.
export const CITIES: CityData[] = [
  mississauga as CityData,
  toronto as CityData,
  brampton as CityData,
];

export const DEFAULT_CITY_ID = "mississauga";

export function getCityData(id: string): CityData {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}
