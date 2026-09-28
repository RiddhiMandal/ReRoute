import mississauga from "@/data/cities/mississauga.json";
import toronto from "@/data/cities/toronto.json";
import brampton from "@/data/cities/brampton.json";

export interface Clinic {
  name: string;
  address: string;
  accepting_new_patients: boolean;
  patient_types: string[];
  conditions_treated: string[];
  phone?: string;
}

export interface Agency {
  name: string;
  address: string;
  phone?: string;
  languages: string[];
  services: string[];
  note?: string;
}

export interface CityData {
  id: string;
  city: string;
  distance_from_toronto: string;
  housing: {
    avg_rent_1br: number;
    avg_rent_2br: number;
    avg_rent_3br: number;
    listings_count: number;
    listings_as_of: string;
    vacancy_rate: string | null;
    source: string;
    last_updated: string;
  };
  healthcare: {
    nearest_hospital: string;
    source: string;
    last_updated: string;
    ohip_guide_url: string;
    clinics: Clinic[];
  };
  safety: {
    csi_rating: string;
    csi_score: number;
    trend: string;
    source: string;
    last_updated: string;
    source_url: string;
    police_service: string;
    police_non_emergency: string;
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
    source: string;
    last_updated: string;
    agencies: Agency[];
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

export function acceptingClinicCount(city: CityData): number {
  return city.healthcare.clinics.filter((c) => c.accepting_new_patients).length;
}

export function commuteMinutes(city: CityData): number {
  const n = parseInt(city.distance_from_toronto, 10);
  return Number.isFinite(n) ? n : 0;
}
