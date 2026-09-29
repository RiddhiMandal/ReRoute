// Real, licensed photos for the home page (Unsplash License: free for commercial use, no permission
// needed). Brampton is intentionally left out — no verified, recognizable Brampton landmark photo was
// found, so its cards fall back to a plain gradient rather than a misleading generic stock photo.
export interface CityPhoto {
  url: string;
  /** Not required by the Unsplash License, kept here for provenance. */
  credit: string;
  sourcePage: string;
}

export const CITY_PHOTOS: Record<string, CityPhoto> = {
  toronto: {
    url: "https://images.unsplash.com/photo-1569982615761-66697da68502?auto=format&fit=crop&w=1600&q=80",
    credit: "Marcin Skalij / Unsplash",
    sourcePage: "https://unsplash.com/photos/gray-buildings-near-body-of-water-in-aerial-photo-AhmLdXl_azU",
  },
  mississauga: {
    url: "https://images.unsplash.com/photo-1726286733742-cd6149ff1184?auto=format&fit=crop&w=1600&q=80",
    credit: "Oles Borys / Unsplash",
    sourcePage: "https://unsplash.com/photos/a-very-tall-building-with-a-lot-of-wavy-lines-on-it-Cfq-Xmpkhpo",
  },
};
