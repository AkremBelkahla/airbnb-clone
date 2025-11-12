/**
 * Listing card component
 * Displays listing info with favorite toggle
 */

import { Heart, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { Listing } from "@/lib/types";

// Import images
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import listing4 from "@/assets/listing-4.jpg";
import listing5 from "@/assets/listing-5.jpg";
import listing6 from "@/assets/listing-6.jpg";
import listing7 from "@/assets/listing-7.jpg";
import listing8 from "@/assets/listing-8.jpg";
import listing9 from "@/assets/listing-9.jpg";
import listing10 from "@/assets/listing-10.jpg";

const imageMap: Record<string, string> = {
  "listing-1.jpg": listing1,
  "listing-2.jpg": listing2,
  "listing-3.jpg": listing3,
  "listing-4.jpg": listing4,
  "listing-5.jpg": listing5,
  "listing-6.jpg": listing6,
  "listing-7.jpg": listing7,
  "listing-8.jpg": listing8,
  "listing-9.jpg": listing9,
  "listing-10.jpg": listing10,
};

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(listing.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const imageSrc = imageMap[listing.cover] || "/placeholder.svg";

  return (
    <Link to={`/listing/${listing.id}`} className="block">
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                favorite ? "fill-primary text-primary" : "text-foreground"
              }`}
            />
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground">
              {listing.title}
            </h3>
          </div>

          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {listing.city}, {listing.country}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium capitalize">
              {listing.type}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              {listing.rooms} pièces
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{listing.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({listing.reviews})</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-foreground">{listing.price}€</span>
              <span className="text-sm text-muted-foreground"> /nuit</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
