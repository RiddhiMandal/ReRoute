"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "reroute_favorites_v1";

/** Favourite cities, saved on this device only (no account needed). */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch {
      // storage unavailable — favorites just won't persist
    }
  }, []);

  const toggle = useCallback((cityId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(cityId)) next.delete(cityId);
      else next.add(cityId);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // best effort
      }
      return next;
    });
  }, []);

  return { favorites, toggle };
}
