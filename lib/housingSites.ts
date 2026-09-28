export interface HousingSite {
  name: string;
  description: string;
  tags: string[];
  /** Exact links for cities where the site uses opaque IDs (verified by hand). */
  urls?: Record<string, string>;
  /** Builds a city link from the city id (e.g. "mississauga", "richmond-hill"). */
  template?: (slug: string) => string;
  /** Used when the site has no city-level link. */
  fallback: string;
}

export const HOUSING_SITES: HousingSite[] = [
  {
    name: "REALTOR.ca",
    description: "Homes, condos, rentals, prices, bedrooms, location.",
    tags: ["Homes", "Condos", "Rentals", "Prices", "Bedrooms"],
    template: (s) => `https://www.realtor.ca/on/${s}/rentals`,
    fallback: "https://www.realtor.ca/",
  },
  {
    name: "Rentals.ca",
    description: "Apartments, houses, rent, amenities, location.",
    tags: ["Apartments", "Houses", "Amenities"],
    template: (s) => `https://rentals.ca/${s}`,
    fallback: "https://rentals.ca/",
  },
  {
    name: "Zumper",
    description: "Rental listings, rent, bedrooms, amenities, location.",
    tags: ["Rentals", "Bedrooms", "Amenities"],
    template: (s) => `https://www.zumper.com/apartments-for-rent/${s}-on`,
    fallback: "https://www.zumper.com/",
  },
  {
    name: "PadMapper",
    description: "Rental listings with map and location information.",
    tags: ["Rentals", "Map"],
    template: (s) => `https://www.padmapper.com/apartments/${s}-on`,
    fallback: "https://www.padmapper.com/",
  },
  {
    name: "liv.rent",
    description: "Rentals, verified landlords/properties, rent.",
    tags: ["Rentals", "Verified listings"],
    template: (s) => `https://liv.rent/rental-listings/city/${s}`,
    fallback: "https://liv.rent/",
  },
  {
    name: "Kijiji",
    description: "Apartments, rooms, houses, private listings.",
    tags: ["Apartments", "Rooms", "Houses", "Private listings"],
    urls: {
      toronto: "https://www.kijiji.ca/b-apartments-condos/city-of-toronto/apartment-for-rent/k0c37l1700273",
    },
    template: (s) => `https://www.kijiji.ca/b-apartments-condos/ontario/apartments-for-rent-${s}/k0c37l9004`,
    fallback: "https://www.kijiji.ca/",
  },
  {
    name: "4Rent.ca",
    description: "Apartments and rental properties.",
    tags: ["Apartments", "Rentals"],
    urls: {
      toronto: "https://4rent.ca/apartment-for-rent/on/toronto/5319/list",
      mississauga: "https://4rent.ca/apartments-for-rent/on/mississauga/708",
      brampton: "https://4rent.ca/apartments-for-rent/on/brampton/574",
    },
    fallback: "https://4rent.ca/",
  },
  {
    name: "Viewit.ca",
    description: "Ontario/GTA apartments and rentals.",
    tags: ["Apartments", "Rentals", "GTA"],
    template: (s) => `https://www.viewit.ca/rentals/${s}`,
    fallback: "https://www.viewit.ca/gta",
  },
  {
    name: "RentFaster.ca",
    description: "Rentals, rent statistics, property details.",
    tags: ["Rentals", "Rent statistics"],
    template: (s) => `https://www.rentfaster.ca/on/${s}/`,
    fallback: "https://www.rentfaster.ca/",
  },
  {
    name: "RentSeeker",
    description: "Apartments and rental properties.",
    tags: ["Apartments", "Rentals"],
    template: (s) => `https://www.rentseeker.ca/rentals/apartments/ontario/${s}`,
    fallback: "https://www.rentseeker.ca/",
  },
  {
    name: "RentBoard.ca",
    description: "Apartments, houses and rental listings.",
    tags: ["Apartments", "Houses", "Rentals"],
    template: (s) => `https://www.rentboard.ca/${s}-on`,
    fallback: "https://www.rentboard.ca/",
  },
  {
    name: "Zoocasa",
    description: "Canadian real estate listings and market information.",
    tags: ["Real estate", "Market info"],
    template: (s) => `https://www.zoocasa.com/${s}-on-real-estate/for-rent`,
    fallback: "https://www.zoocasa.com/",
  },
  {
    name: "Zolo",
    description: "Canadian properties, prices, neighbourhood information.",
    tags: ["Properties", "Prices", "Neighbourhood info"],
    template: (s) => `https://www.zolo.ca/${s}-real-estate/for-rent`,
    fallback: "https://www.zolo.ca/",
  },
  {
    name: "HouseSigma",
    description: "Property information, sales history, market information.",
    tags: ["Property info", "Sales history", "Market info"],
    template: (s) => `https://housesigma.com/on/${s}-real-estate/map/`,
    fallback: "https://housesigma.com/",
  },
  {
    name: "REW",
    description: "Buying, selling and rental properties.",
    tags: ["Buying", "Selling", "Rentals"],
    template: (s) => `https://www.rew.ca/rentals/areas/${s}-on`,
    fallback: "https://www.rew.ca/rentals",
  },
  {
    name: "Places4Students",
    description: "Student housing and rentals (search by school).",
    tags: ["Student housing"],
    fallback: "https://www.places4students.com/find-a-school",
  },
  {
    name: "Rent Compass",
    description: "Rental apartments and properties.",
    tags: ["Apartments", "Rentals"],
    template: (s) => `https://www.rentcompass.com/${s}-apartments-for-rent`,
    fallback: "https://www.rentcompass.com/",
  },
  {
    name: "Condos.ca",
    description: "GTA condos, prices, sales and rental information.",
    tags: ["Condos", "Prices", "GTA"],
    template: (s) => `https://condos.ca/${s}/condos-for-rent`,
    fallback: "https://condos.ca/",
  },
];

export function siteUrl(site: HousingSite, cityId: string): string {
  return site.urls?.[cityId] ?? site.template?.(cityId) ?? site.fallback;
}
