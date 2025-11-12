/**
 * URL synchronization utilities
 * Serialize/deserialize filters to/from query params
 */

import type { Filters, ListingType, SortOption } from "./types";
import { ListingTypeSchema, SortOptionSchema } from "./types";

/**
 * Convert filters object to URLSearchParams
 */
export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.type) params.set("type", filters.type);
  if (filters.minPrice) params.set("min", filters.minPrice.toString());
  if (filters.maxPrice) params.set("max", filters.maxPrice.toString());
  if (filters.rooms) params.set("rooms", filters.rooms.toString());
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.checkIn) params.set("checkIn", filters.checkIn);
  if (filters.checkOut) params.set("checkOut", filters.checkOut);
  if (filters.adults) params.set("adults", filters.adults.toString());
  if (filters.children) params.set("children", filters.children.toString());
  if (filters.infants) params.set("infants", filters.infants.toString());
  if (filters.pets) params.set("pets", filters.pets.toString());

  return params;
}

/**
 * Parse URLSearchParams into filters object
 */
export function paramsToFilters(params: URLSearchParams): Filters {
  const filters: Filters = {};

  const q = params.get("q");
  if (q) filters.q = q;

  const type = params.get("type");
  if (type && isValidListingType(type)) {
    filters.type = type as ListingType;
  }

  const min = params.get("min");
  if (min) {
    const parsed = parseInt(min, 10);
    if (!isNaN(parsed) && parsed > 0) filters.minPrice = parsed;
  }

  const max = params.get("max");
  if (max) {
    const parsed = parseInt(max, 10);
    if (!isNaN(parsed) && parsed > 0) filters.maxPrice = parsed;
  }

  const rooms = params.get("rooms");
  if (rooms) {
    const parsed = parseInt(rooms, 10);
    if (!isNaN(parsed) && parsed > 0) filters.rooms = parsed;
  }

  const sort = params.get("sort");
  if (sort && isValidSortOption(sort)) {
    filters.sort = sort as SortOption;
  }

  const checkIn = params.get("checkIn");
  if (checkIn) filters.checkIn = checkIn;

  const checkOut = params.get("checkOut");
  if (checkOut) filters.checkOut = checkOut;

  const adults = params.get("adults");
  if (adults) {
    const parsed = parseInt(adults, 10);
    if (!isNaN(parsed) && parsed >= 0) filters.adults = parsed;
  }

  const children = params.get("children");
  if (children) {
    const parsed = parseInt(children, 10);
    if (!isNaN(parsed) && parsed >= 0) filters.children = parsed;
  }

  const infants = params.get("infants");
  if (infants) {
    const parsed = parseInt(infants, 10);
    if (!isNaN(parsed) && parsed >= 0) filters.infants = parsed;
  }

  const pets = params.get("pets");
  if (pets) {
    const parsed = parseInt(pets, 10);
    if (!isNaN(parsed) && parsed >= 0) filters.pets = parsed;
  }

  return filters;
}

function isValidListingType(value: string): boolean {
  return ListingTypeSchema.safeParse(value).success;
}

function isValidSortOption(value: string): boolean {
  return SortOptionSchema.safeParse(value).success;
}
