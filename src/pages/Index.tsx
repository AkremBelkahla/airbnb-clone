/**
 * Main page: listings grid + filters + map toggle
 * URL-synced filters, favorites mode, responsive layout
 */

import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ListingSection } from "@/components/ListingSection";
import { EmptyState } from "@/components/EmptyState";
import { Footer } from "@/components/Footer";
import { useFavoritesStore } from "@/store/favoritesStore";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/lib/types";
import { orderBy } from "lodash";

const Index = () => {
  const [searchParams] = useSearchParams();
  const { favorites, initializeFavorites } = useFavoritesStore();
  const showingFavorites = searchParams.get("favorites") === "1";

  // Initialize favorites from localStorage on mount
  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);

  // Get all listings
  const allListings = useMemo(() => listingsData as Listing[], []);

  // Filter for favorites if enabled
  const baseListings = useMemo(() => {
    return showingFavorites
      ? allListings.filter((listing) => favorites.has(listing.id))
      : allListings;
  }, [allListings, showingFavorites, favorites]);

  // Popular listings (highest ratings)
  const popularListings = useMemo(
    () => orderBy(baseListings, ["rating", "reviews"], ["desc", "desc"]),
    [baseListings]
  );

  // Available next month in Paris
  const parisListings = useMemo(
    () => baseListings.filter((listing) => listing.city === "Paris").slice(0, 10),
    [baseListings]
  );

  // Nice listings
  const niceListings = useMemo(
    () => baseListings.filter((listing) => listing.city === "Nice").slice(0, 10),
    [baseListings]
  );

  // Barcelona listings
  const barcelonaListings = useMemo(
    () => baseListings.filter((listing) => listing.city === "Barcelona").slice(0, 10),
    [baseListings]
  );

  // Lyon listings
  const lyonListings = useMemo(
    () => baseListings.filter((listing) => listing.city === "Lyon").slice(0, 10),
    [baseListings]
  );

  // Marseille listings
  const marseilleListings = useMemo(
    () => baseListings.filter((listing) => listing.city === "Marseille").slice(0, 10),
    [baseListings]
  );

  // Bordeaux listings
  const bordeauxListings = useMemo(
    () => baseListings.filter((listing) => listing.city === "Bordeaux").slice(0, 10),
    [baseListings]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        {baseListings.length === 0 ? (
          <EmptyState
            title={showingFavorites ? "Aucun favori" : "Aucun logement trouvé"}
            description={
              showingFavorites
                ? "Ajoutez des logements à vos favoris en cliquant sur l'icône cœur"
                : "Essayez d'ajuster vos filtres pour voir plus de résultats"
            }
          />
        ) : (
          <>
            <ListingSection title="Logements populaires" listings={popularListings} />
            <ListingSection
              title="Logements disponibles le mois prochain · Paris"
              listings={parisListings}
            />
            <ListingSection title="Logements · Nice" listings={niceListings} />
            <ListingSection title="Logements · Barcelona" listings={barcelonaListings} />
            <ListingSection title="Logements · Lyon" listings={lyonListings} />
            <ListingSection title="Logements · Marseille" listings={marseilleListings} />
            <ListingSection title="Logements · Bordeaux" listings={bordeauxListings} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
