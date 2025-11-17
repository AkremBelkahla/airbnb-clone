/**
 * Listing detail page - Airbnb style
 */

import { useParams, Link } from "react-router-dom";
import { Heart, Star, Share2, MapPin, Users, Bed, Bath, ChevronLeft, Shield, Calendar, Award, Wifi, Tv, Wind, Snowflake, Utensils, Car, Check, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFavoritesStore } from "@/store/favoritesStore";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/lib/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite, initializeFavorites } = useFavoritesStore();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  
  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);

  const listing = (listingsData as Listing[]).find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Logement introuvable</h1>
          <p className="mb-6 text-muted-foreground">
            Le logement que vous recherchez n'existe pas.
          </p>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(listing.id);
  const imageSrc = imageMap[listing.cover] || "/placeholder.svg";

  // Mock data for additional images
  const additionalImages = [imageSrc, imageSrc, imageSrc, imageSrc];

  // Mock amenities
  const amenities = [
    { icon: Wifi, text: "Wifi", available: true },
    { icon: Tv, text: "Télévision avec Netflix", available: true },
    { icon: Utensils, text: "Cuisine équipée", available: true },
    { icon: Car, text: "Parking gratuit sur place", available: true },
    { icon: Wind, text: "Climatisation", available: true },
    { icon: Snowflake, text: "Chauffage", available: true },
    { icon: Shield, text: "Alarme de sécurité", available: false },
    { icon: Bath, text: "Baignoire", available: true },
  ];

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 5;
  const totalPrice = listing.price * nights;
  const serviceFee = Math.round(totalPrice * 0.14);
  const total = totalPrice + serviceFee;

  // Mock reviews
  const reviews = [
    {
      name: "Alexia",
      date: "Il y a 6 mois",
      avatar: "👤",
      rating: 5,
      text: "Super séjour ! L'appartement était très propre et exactement comme sur les photos. L'hôte a été très réactif et accueillant. Je recommande vivement !",
    },
    {
      name: "Mehdi",
      date: "Il y a 4 semaines",
      avatar: "👤",
      rating: 5,
      text: "Un logement parfait pour notre séjour. Emplacement idéal, tout était nickel. Communication facile avec l'hôte. On reviendra !",
    },
    {
      name: "Sophie",
      date: "Il y a 2 mois",
      avatar: "👤",
      rating: 5,
      text: "Très belle expérience. L'appartement est spacieux et bien équipé. Le quartier est calme et agréable.",
    },
  ];

  const reviewCategories = [
    { name: "Propreté", score: 4.9 },
    { name: "Exactitude", score: 4.8 },
    { name: "Communication", score: 5.0 },
    { name: "Emplacement", score: 4.8 },
    { name: "Arrivée", score: 4.9 },
    { name: "Qualité-prix", score: 4.7 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 lg:px-20">
        {/* Back button */}
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
          Retour
        </Link>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-semibold text-foreground">{listing.title}</h1>

        {/* Top info bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold">{listing.rating.toFixed(2)}</span>
            </div>
            <span className="text-muted-foreground">·</span>
            <button className="font-semibold underline">{listing.reviews} commentaires</button>
            <span className="text-muted-foreground">·</span>
            <button className="flex items-center gap-1 font-semibold underline">
              <MapPin className="h-4 w-4" />
              {listing.city}, {listing.country}
            </button>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="gap-2 font-semibold underline">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 font-semibold underline"
              onClick={() => toggleFavorite(listing.id)}
            >
              <Heart className={`h-4 w-4 ${favorite ? "fill-primary text-primary" : ""}`} />
              Enregistrer
            </Button>
          </div>
        </div>

        {/* Images grid */}
        <div className="mb-12 grid grid-cols-4 gap-2 overflow-hidden rounded-xl">
          <div className="col-span-4 md:col-span-2 md:row-span-2">
            <img
              src={imageSrc}
              alt={listing.title}
              className="h-full w-full cursor-pointer object-cover transition-opacity hover:opacity-90"
            />
          </div>
          {additionalImages.slice(0, 4).map((img, i) => (
            <div key={i} className="hidden md:block">
              <img
                src={img}
                alt={`${listing.title} - ${i + 2}`}
                className="h-full w-full cursor-pointer object-cover transition-opacity hover:opacity-90"
              />
            </div>
          ))}
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.5fr,1fr]">
          {/* Main content */}
          <div>
            {/* Host info */}
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-semibold">
                Logement entier: {listing.type} · {listing.city}
              </h2>
              <p className="text-muted-foreground">
                {listing.rooms > 1 ? `${listing.rooms} voyageurs` : `${listing.rooms} voyageur`} · {Math.ceil(listing.rooms / 2)} {Math.ceil(listing.rooms / 2) > 1 ? "chambres" : "chambre"} · {Math.ceil(listing.rooms / 2)} {Math.ceil(listing.rooms / 2) > 1 ? "lits" : "lit"} · 1 salle de bain
              </p>
            </div>

            <Separator className="my-8" />

            {/* Key features */}
            <div className="mb-8 space-y-6">
              <div className="flex gap-4">
                <Users className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-semibold">Idéal pour les voyageurs</h3>
                  <p className="text-sm text-muted-foreground">
                    Selon les commentaires récents, 95 % des voyageurs ont attribué 5 étoiles à cet hôte.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Award className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-semibold">Superhôte</h3>
                  <p className="text-sm text-muted-foreground">
                    Les Superhôtes sont des hôtes expérimentés et très bien notés.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Calendar className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-semibold">Annulation gratuite pendant 48 h</h3>
                  <p className="text-sm text-muted-foreground">
                    Bénéficiez d'un remboursement intégral si vous changez d'avis.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div className="mb-8">
              <p className="leading-relaxed text-muted-foreground">
                Magnifique appartement de {listing.rooms} pièces situé au cœur de {listing.city}. Cet hébergement a été récemment rénové et offre tout le confort moderne pour un séjour inoubliable. Profitez de la proximité des attractions principales tout en bénéficiant d'un espace calme et accueillant.
              </p>
              <button className="mt-4 font-semibold underline">Afficher la suite</button>
            </div>

            <Separator className="my-8" />

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold">Ce que propose ce logement</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {amenities.map((amenity, i) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={i} className={`flex items-center gap-4 ${!amenity.available ? "text-muted-foreground line-through" : ""}`}>
                      <Icon className="h-6 w-6" />
                      <span>{amenity.text}</span>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="mt-6">
                Afficher les {amenities.length} équipements
              </Button>
            </div>

            <Separator className="my-8" />

            {/* Calendar availability */}
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold">{nights} nuits à {listing.city}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {checkIn && checkOut 
                  ? `${format(checkIn, "d MMM", { locale: fr })} - ${format(checkOut, "d MMM yyyy", { locale: fr })}`
                  : "Sélectionnez vos dates"}
              </p>
              <CalendarComponent
                mode="range"
                numberOfMonths={2}
                className="rounded-md border"
                locale={fr}
              />
            </div>

            <Separator className="my-8" />

            {/* Reviews section */}
            <div className="mb-8">
              <div className="mb-8 flex items-center gap-2">
                <Star className="h-6 w-6 fill-current" />
                <h2 className="text-2xl font-semibold">{listing.rating.toFixed(2)}</h2>
                <span className="text-xl text-muted-foreground">· {listing.reviews} commentaires</span>
              </div>

              {/* Review categories */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {reviewCategories.map((category) => (
                  <div key={category.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm font-semibold">{category.score.toFixed(1)}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${(category.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Review cards */}
              <div className="grid gap-8 md:grid-cols-2">
                {reviews.map((review, i) => (
                  <div key={i}>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xl">
                        {review.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    <div className="mb-2 flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed">{review.text}</p>
                    <button className="mt-2 text-sm font-semibold underline">Lire la suite</button>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-8">
                Afficher les {listing.reviews} commentaires
              </Button>
            </div>

            <Separator className="my-8" />

            {/* Location */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">Où se situe le logement</h3>
              <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{listing.city}, {listing.country}</span>
              </div>
              <div className="h-[400px] overflow-hidden rounded-xl bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Carte interactive
                </div>
              </div>
              <button className="mt-4 font-semibold underline">En savoir plus sur le quartier</button>
            </div>

            <Separator className="my-8" />

            {/* Host section */}
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold">Faites connaissance avec votre hôte</h3>
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-4xl">
                        👤
                      </div>
                      <div className="font-semibold">Pierre Mehdi</div>
                      <div className="text-sm text-muted-foreground">Superhôte</div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="font-semibold">{listing.reviews}</div>
                          <div className="text-sm text-muted-foreground">Commentaires</div>
                        </div>
                        <div>
                          <div className="font-semibold">{listing.rating.toFixed(1)}</div>
                          <div className="text-sm text-muted-foreground">Note</div>
                        </div>
                        <div>
                          <div className="font-semibold">2</div>
                          <div className="text-sm text-muted-foreground">Années d'accueil</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Identité vérifiée
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                          Passionné par l'accueil et le partage, je m'efforce de rendre votre séjour inoubliable.
                        </p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Envoyer un message à l'hôte
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-8" />

            {/* Important info */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">À savoir</h3>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold">Règlement intérieur</h4>
                  <div className="space-y-2 text-sm">
                    <p>Arrivée : 15h00 - 22h00</p>
                    <p>Départ avant 11h00</p>
                    <p>8 voyageurs max.</p>
                  </div>
                  <button className="mt-2 text-sm font-semibold underline">En savoir +</button>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Sécurité et propriété</h4>
                  <div className="space-y-2 text-sm">
                    <p>Ni détecteur de monoxyde de carbone ni détecteur de fumée</p>
                    <p>Caution non requise</p>
                  </div>
                  <button className="mt-2 text-sm font-semibold underline">En savoir +</button>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Conditions d'annulation</h4>
                  <div className="space-y-2 text-sm">
                    <p>Annulation gratuite pendant 48 h</p>
                    <p>Consultez la politique d'annulation de cet hôte.</p>
                  </div>
                  <button className="mt-2 text-sm font-semibold underline">En savoir +</button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking card - sticky */}
          <div>
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{listing.price}€</span>
                    <span className="text-muted-foreground">/ nuit</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{listing.rating.toFixed(2)}</span>
                    <span className="text-muted-foreground">· {listing.reviews} commentaires</span>
                  </div>
                </div>

                <div className="mb-4 space-y-0 overflow-hidden rounded-lg border border-border">
                  <div className="grid grid-cols-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="border-b border-r border-border p-3 text-left transition-colors hover:bg-muted">
                          <div className="text-[10px] font-bold uppercase">Arrivée</div>
                          <div className="text-sm">
                            {checkIn ? format(checkIn, "dd/MM/yyyy", { locale: fr }) : "Sélectionner"}
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          locale={fr}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="border-b border-border p-3 text-left transition-colors hover:bg-muted">
                          <div className="text-[10px] font-bold uppercase">Départ</div>
                          <div className="text-sm">
                            {checkOut ? format(checkOut, "dd/MM/yyyy", { locale: fr }) : "Sélectionner"}
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => !checkIn || date <= checkIn}
                          locale={fr}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <button className="w-full p-3 text-left transition-colors hover:bg-muted">
                    <div className="text-[10px] font-bold uppercase">Voyageurs</div>
                    <div className="text-sm">{guests} voyageur{guests > 1 ? "s" : ""}</div>
                  </button>
                </div>

                <Button className="mb-4 w-full" size="lg">
                  Réserver
                </Button>

                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Vous ne serez pas encore débité
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <button className="underline">
                      {listing.price}€ x {nights} nuit{nights > 1 ? "s" : ""}
                    </button>
                    <span>{totalPrice}€</span>
                  </div>
                  <div className="flex justify-between">
                    <button className="underline">Frais de service Airbnb</button>
                    <span>{serviceFee}€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <button className="flex items-center justify-center gap-2 text-sm text-muted-foreground underline">
                <Shield className="h-4 w-4" />
                Signaler ce logement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
