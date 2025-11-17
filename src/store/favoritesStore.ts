/**
 * Zustand store for favorites management
 * Synced with localStorage
 */

import { create } from "zustand";
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from "@/lib/storage";

interface FavoritesState {
  favorites: Set<string>;
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  initializeFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),

  initializeFavorites: () => {
    const favorites = getFavorites();
    set({ favorites });
  },

  toggleFavorite: (listingId: string) => {
    const newFavorites = toggleFavoriteStorage(listingId);
    set({ favorites: newFavorites });
  },

  isFavorite: (listingId: string) => {
    return get().favorites.has(listingId);
  },
}));
