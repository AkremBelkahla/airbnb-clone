/**
 * Logements page - All accommodations with filters
 */

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ListingCard } from "@/components/ListingCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SlidersHorizontal, X } from "lucide-react";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/lib/types";

const Logements = () => {
  const allListings = useMemo(() => listingsData as Listing[], []);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique cities
  const cities = useMemo(() => {
    const citySet = new Set(allListings.map(l => l.city));
    return Array.from(citySet).sort();
  }, [allListings]);

  // Filter listings
  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      if (selectedCity !== "all" && listing.city !== selectedCity) return false;
      if (listing.price < priceRange[0] || listing.price > priceRange[1]) return false;
      if (listing.rating < minRating) return false;
      if (bedrooms !== "all" && listing.rooms !== parseInt(bedrooms)) return false;
      
      return true;
    });
  }, [allListings, selectedCity, priceRange, minRating, bedrooms]);

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredListings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredListings, currentPage]);


  const clearFilters = () => {
    setSelectedCity("all");
    setPriceRange([0, 500]);
    setMinRating(0);
    setBedrooms("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    selectedCity !== "all" || 
    priceRange[0] !== 0 || 
    priceRange[1] !== 500 || 
    minRating !== 0 || 
    bedrooms !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Découvrez des logements uniques</h1>
          <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
            Trouvez le logement parfait pour votre prochain voyage. 
            Des appartements cosy aux villas de luxe, nous avons ce qu'il vous faut.
          </p>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tous les logements</h2>
            <p className="mt-2 text-muted-foreground">
              {filteredListings.length} logement{filteredListings.length > 1 ? 's' : ''} disponible{filteredListings.length > 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Masquer" : "Afficher"} les filtres
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-80 shrink-0 space-y-6">
              <div className="sticky top-24 space-y-6 rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filtres</h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="gap-1 text-sm"
                    >
                      <X className="h-3 w-3" />
                      Réinitialiser
                    </Button>
                  )}
                </div>

                {/* City Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Ville</Label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Prix par nuit: {priceRange[0]}€ - {priceRange[1]}€
                  </Label>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Note minimum</Label>
                  <Select value={minRating.toString()} onValueChange={(v) => setMinRating(parseFloat(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Toutes les notes</SelectItem>
                      <SelectItem value="4">4+ ⭐</SelectItem>
                      <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                      <SelectItem value="4.8">4.8+ ⭐</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Chambres</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Peu importe</SelectItem>
                      <SelectItem value="1">1 chambre</SelectItem>
                      <SelectItem value="2">2 chambres</SelectItem>
                      <SelectItem value="3">3 chambres</SelectItem>
                      <SelectItem value="4">4+ chambres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>
          )}

          {/* Listings Grid */}
          <div className="flex-1">
            {filteredListings.length === 0 ? (
              <EmptyState
                title="Aucun logement trouvé"
                description="Essayez d'ajuster vos filtres pour voir plus de résultats"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Logements;
