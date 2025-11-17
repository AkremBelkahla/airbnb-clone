/**
 * Experiences page - Activities and tours with filters
 */

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
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
import { SlidersHorizontal, X, Star, MapPin, Clock, Users } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

const mockExperiences: Experience[] = [
  {
    id: "exp-1",
    title: "Visite gastronomique du Marais",
    location: "Paris",
    duration: "3 heures",
    groupSize: "Jusqu'à 10 personnes",
    price: 89,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    category: "Gastronomie"
  },
  {
    id: "exp-2",
    title: "Cours de cuisine française",
    location: "Lyon",
    duration: "4 heures",
    groupSize: "Jusqu'à 8 personnes",
    price: 120,
    rating: 4.95,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    category: "Gastronomie"
  },
  {
    id: "exp-3",
    title: "Tour en vélo électrique",
    location: "Nice",
    duration: "2.5 heures",
    groupSize: "Jusqu'à 12 personnes",
    price: 65,
    rating: 4.85,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
    category: "Sport & Nature"
  },
  {
    id: "exp-4",
    title: "Dégustation de vins à Bordeaux",
    location: "Bordeaux",
    duration: "5 heures",
    groupSize: "Jusqu'à 15 personnes",
    price: 150,
    rating: 4.92,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    category: "Gastronomie"
  },
  {
    id: "exp-5",
    title: "Atelier de peinture en plein air",
    location: "Provence",
    duration: "3 heures",
    groupSize: "Jusqu'à 6 personnes",
    price: 95,
    rating: 4.88,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    category: "Art & Culture"
  },
  {
    id: "exp-6",
    title: "Croisière au coucher du soleil",
    location: "Marseille",
    duration: "2 heures",
    groupSize: "Jusqu'à 20 personnes",
    price: 75,
    rating: 4.91,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    category: "Sport & Nature"
  },
  {
    id: "exp-7",
    title: "Visite du château de Versailles",
    location: "Versailles",
    duration: "6 heures",
    groupSize: "Jusqu'à 25 personnes",
    price: 110,
    rating: 4.87,
    reviews: 523,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    category: "Art & Culture"
  },
  {
    id: "exp-8",
    title: "Randonnée dans les Alpes",
    location: "Chamonix",
    duration: "8 heures",
    groupSize: "Jusqu'à 10 personnes",
    price: 140,
    rating: 4.93,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    category: "Sport & Nature"
  },
  {
    id: "exp-9",
    title: "Cours de pâtisserie française",
    location: "Paris",
    duration: "4 heures",
    groupSize: "Jusqu'à 8 personnes",
    price: 135,
    rating: 4.96,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800",
    category: "Gastronomie"
  },
  {
    id: "exp-10",
    title: "Visite des marchés locaux",
    location: "Toulouse",
    duration: "2.5 heures",
    groupSize: "Jusqu'à 12 personnes",
    price: 55,
    rating: 4.84,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
    category: "Gastronomie"
  }
];

const ExperienceCard = ({ experience }: { experience: Experience }) => (
  <div className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={experience.image}
        alt={experience.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="space-y-1 p-4">
      <h3 className="font-semibold line-clamp-2 text-base leading-tight">{experience.title}</h3>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span className="line-clamp-1">{experience.location}</span>
      </div>
      <div className="mb-2 flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium">
          {experience.category}
        </span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {experience.duration}
        </span>
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{experience.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({experience.reviews})</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold">{experience.price}€</span>
          <span className="text-sm text-muted-foreground"> /pers</span>
        </div>
      </div>
    </div>
  </div>
);

const Experiences = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [minRating, setMinRating] = useState<number>(0);
  const [category, setCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique locations
  const locations = useMemo(() => {
    const locationSet = new Set(mockExperiences.map(e => e.location));
    return Array.from(locationSet).sort();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(mockExperiences.map(e => e.category));
    return Array.from(categorySet).sort();
  }, []);

  // Filter experiences
  const filteredExperiences = useMemo(() => {
    return mockExperiences.filter(experience => {
      if (selectedLocation !== "all" && experience.location !== selectedLocation) return false;
      if (experience.price < priceRange[0] || experience.price > priceRange[1]) return false;
      if (experience.rating < minRating) return false;
      if (category !== "all" && experience.category !== category) return false;
      
      return true;
    });
  }, [selectedLocation, priceRange, minRating, category]);

  // Pagination
  const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage);
  const paginatedExperiences = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExperiences.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredExperiences, currentPage]);

  const clearFilters = () => {
    setSelectedLocation("all");
    setPriceRange([0, 200]);
    setMinRating(0);
    setCategory("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    selectedLocation !== "all" || 
    priceRange[0] !== 0 || 
    priceRange[1] !== 200 || 
    minRating !== 0 || 
    category !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Découvrez des expériences uniques</h1>
          <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
            Participez à des activités locales animées par des experts passionnés. 
            Des cours de cuisine aux randonnées guidées, vivez des moments inoubliables.
          </p>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Toutes les expériences</h2>
            <p className="mt-2 text-muted-foreground">
              {filteredExperiences.length} expérience{filteredExperiences.length > 1 ? 's' : ''} disponible{filteredExperiences.length > 1 ? 's' : ''}
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

                {/* Location Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Destination</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les destinations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Catégorie</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Prix par personne: {priceRange[0]}€ - {priceRange[1]}€
                  </Label>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
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
              </div>
            </aside>
          )}

          {/* Experiences Grid */}
          <div className="flex-1">
            {filteredExperiences.length === 0 ? (
              <EmptyState
                title="Aucune expérience trouvée"
                description="Essayez d'ajuster vos filtres pour voir plus de résultats"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
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

export default Experiences;
