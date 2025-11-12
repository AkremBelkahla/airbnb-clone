/**
 * LocalStorage utilities for favorites persistence
 */

const FAVORITES_KEY = "airbnb-lite-favorites";

export function getFavorites(): Set<string> {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error("Error reading favorites:", error);
    return new Set();
  }
}

export function saveFavorites(favorites: Set<string>): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
}

export function toggleFavorite(listingId: string): Set<string> {
  const favorites = getFavorites();
  if (favorites.has(listingId)) {
    favorites.delete(listingId);
  } else {
    favorites.add(listingId);
  }
  saveFavorites(favorites);
  return favorites;
}

export function isFavorite(listingId: string): boolean {
  return getFavorites().has(listingId);
}
