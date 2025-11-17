/**
 * Pure functions for filtering and sorting listings
 * All functions are side-effect free and testable
 */

import { orderBy } from "lodash";
import type { Listing, Filters, SortOption } from "./types";

/**
 * Filter listings based on user criteria
 */
export function filterListings(listings: Listing[], filters: Filters): Listing[] {
  let result = [...listings];

  // Text search (title, city, country)
  if (filters.q && filters.q.trim()) {
    const query = filters.q.toLowerCase().trim();
    result = result.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.city.toLowerCase().includes(query) ||
        listing.country.toLowerCase().includes(query)
    );
  }

  // Type filter
  if (filters.type) {
    result = result.filter((listing) => listing.type === filters.type);
  }

  // Price range
  if (filters.minPrice !== undefined) {
    result = result.filter((listing) => listing.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((listing) => listing.price <= filters.maxPrice!);
  }

  // Rooms filter
  if (filters.rooms) {
    result = result.filter((listing) => listing.rooms >= filters.rooms!);
  }

  return result;
}

/**
 * Sort listings based on user preference
 */
export function sortListings(listings: Listing[], sort?: SortOption): Listing[] {
  if (!sort) return listings;

  switch (sort) {
    case "price_asc":
      return orderBy(listings, ["price"], ["asc"]);
    case "price_desc":
      return orderBy(listings, ["price"], ["desc"]);
    case "rating_desc":
      return orderBy(listings, ["rating", "reviews"], ["desc", "desc"]);
    default:
      return listings;
  }
}

/**
 * Apply filters and sorting in one pass
 */
export function applyFiltersAndSort(
  listings: Listing[],
  filters: Filters
): Listing[] {
  const filtered = filterListings(listings, filters);
  return sortListings(filtered, filters.sort);
}
