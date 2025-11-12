/**
 * Services page - Hotel-like services with filters
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
import { SlidersHorizontal, X, Star, Clock, CheckCircle2, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  features: string[];
  popular?: boolean;
}

const mockServices: Service[] = [
  {
    id: "srv-1",
    title: "Conciergerie Premium 24/7",
    description: "Service de conciergerie disponible jour et nuit pour répondre à tous vos besoins",
    price: 50,
    duration: "Par séjour",
    rating: 4.9,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    category: "Conciergerie",
    features: ["Disponible 24/7", "Réservations restaurants", "Billets spectacles", "Transport"],
    popular: true
  },
  {
    id: "srv-2",
    title: "Service de ménage quotidien",
    description: "Ménage professionnel quotidien avec changement de draps et serviettes",
    price: 35,
    duration: "Par jour",
    rating: 4.95,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    category: "Ménage",
    features: ["Produits écologiques", "Équipe formée", "Flexibilité horaire"],
    popular: true
  },
  {
    id: "srv-3",
    title: "Chef privé à domicile",
    description: "Chef professionnel pour préparer vos repas selon vos préférences",
    price: 200,
    duration: "Par repas",
    rating: 4.92,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800",
    category: "Restauration",
    features: ["Menu personnalisé", "Courses incluses", "Service & nettoyage"],
    popular: true
  },
  {
    id: "srv-4",
    title: "Spa & Massage",
    description: "Soins spa et massages relaxants dans votre logement",
    price: 120,
    duration: "1 heure",
    rating: 4.88,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    category: "Bien-être",
    features: ["Masseur diplômé", "Huiles bio", "Équipement fourni"]
  },
  {
    id: "srv-5",
    title: "Garde d'enfants professionnelle",
    description: "Baby-sitter qualifié(e) pour veiller sur vos enfants",
    price: 25,
    duration: "Par heure",
    rating: 4.94,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
    category: "Famille",
    features: ["Diplômée petite enfance", "Assurance incluse", "Activités ludiques"]
  },
  {
    id: "srv-6",
    title: "Transport privé & Chauffeur",
    description: "Service de chauffeur privé pour tous vos déplacements",
    price: 80,
    duration: "Par heure",
    rating: 4.91,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    category: "Transport",
    features: ["Véhicule haut de gamme", "Chauffeur professionnel", "Eau & Wifi gratuits"]
  },
  {
    id: "srv-7",
    title: "Personal Trainer",
    description: "Coach sportif personnel pour vos séances de fitness",
    price: 60,
    duration: "Par séance",
    rating: 4.87,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    category: "Sport",
    features: ["Programme personnalisé", "Équipement fourni", "Suivi nutrition"]
  },
  {
    id: "srv-8",
    title: "Blanchisserie express",
    description: "Service de pressing et blanchisserie avec retour sous 24h",
    price: 20,
    duration: "Par sac",
    rating: 4.85,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800",
    category: "Ménage",
    features: ["Retour 24h", "Pliage inclus", "Produits premium"]
  },
  {
    id: "srv-9",
    title: "Location véhicules de luxe",
    description: "Flotte de véhicules haut de gamme à votre disposition",
    price: 250,
    duration: "Par jour",
    rating: 4.93,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    category: "Transport",
    features: ["Assurance tous risques", "Livraison gratuite", "Assistance 24/7"]
  },
  {
    id: "srv-10",
    title: "Organisation événements",
    description: "Planification et organisation d'événements privés",
    price: 500,
    duration: "À partir de",
    rating: 4.96,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    category: "Événements",
    features: ["Wedding planner", "Anniversaires", "Événements pro", "Tout inclus"]
  }
];

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="space-y-1 p-4">
      <h3 className="font-semibold line-clamp-2 text-base leading-tight">{service.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
      <div className="mb-2 flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium">
          {service.category}
        </span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {service.duration}
        </span>
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{service.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({service.reviews})</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold">{service.price}€</span>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [category, setCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(mockServices.map(s => s.category));
    return Array.from(categorySet).sort();
  }, []);

  // Filter services
  const filteredServices = useMemo(() => {
    return mockServices.filter(service => {
      if (service.price < priceRange[0] || service.price > priceRange[1]) return false;
      if (service.rating < minRating) return false;
      if (category !== "all" && service.category !== category) return false;
      
      return true;
    });
  }, [priceRange, minRating, category]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredServices, currentPage]);

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setMinRating(0);
    setCategory("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    priceRange[0] !== 0 || 
    priceRange[1] !== 500 || 
    minRating !== 0 || 
    category !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Services hôteliers premium</h1>
          <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
            Profitez de services dignes des plus grands hôtels, directement dans votre logement. 
            Conciergerie, chef à domicile, spa, et bien plus encore.
          </p>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tous les services</h2>
            <p className="mt-2 text-muted-foreground">
              {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} disponible{filteredServices.length > 1 ? 's' : ''}
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
                    Budget: {priceRange[0]}€ - {priceRange[1]}€
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
              </div>
            </aside>
          )}

          {/* Services Grid */}
          <div className="flex-1">
            {filteredServices.length === 0 ? (
              <EmptyState
                title="Aucun service trouvé"
                description="Essayez d'ajuster vos filtres pour voir plus de résultats"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
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

export default Services;
