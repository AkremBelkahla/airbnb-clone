/**
 * Core types and schemas for the Airbnb clone
 * All data structures validated with Zod
 */

import { z } from "zod";

export const ListingTypeSchema = z.enum([
  "maison",
  "appartement",
  "villa",
  "studio",
  "loft",
]);

export const ListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  city: z.string(),
  country: z.string(),
  type: ListingTypeSchema,
  price: z.number().positive(),
  rating: z.number().min(0).max(5),
  reviews: z.number().nonnegative(),
  rooms: z.number().positive(),
  lat: z.number(),
  lng: z.number(),
  cover: z.string(),
  description: z.string().optional(),
});

export type Listing = z.infer<typeof ListingSchema>;
export type ListingType = z.infer<typeof ListingTypeSchema>;

export const SortOptionSchema = z.enum([
  "price_asc",
  "price_desc",
  "rating_desc",
]);

export type SortOption = z.infer<typeof SortOptionSchema>;

export interface Filters {
  q?: string;
  type?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  sort?: SortOption;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
}

export const FiltersSchema = z.object({
  q: z.string().optional(),
  type: ListingTypeSchema.optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  rooms: z.number().positive().optional(),
  sort: SortOptionSchema.optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().positive().optional(),
});
