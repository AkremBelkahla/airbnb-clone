/**
 * Airbnb-style header with navigation and functional search bar
 */

import { useState } from "react";
import { Heart, Menu, Search, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import airbnbLogo from "@/assets/airbnb-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LanguageDialog } from "./LanguageDialog";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const showingFavorites = searchParams.get("favorites") === "1";

  const totalGuests = adults + children;
  const guestsText = totalGuests > 0 
    ? `${totalGuests} voyageur${totalGuests > 1 ? 's' : ''}${infants > 0 ? `, ${infants} bébé${infants > 1 ? 's' : ''}` : ''}${pets > 0 ? `, ${pets} animal${pets > 1 ? 'ux' : ''}` : ''}`
    : 'Ajouter des...';

  const toggleFavorites = () => {
    const params = new URLSearchParams(searchParams);
    if (showingFavorites) {
      params.delete("favorites");
    } else {
      params.set("favorites", "1");
    }
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (checkIn) {
      params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    }
    if (checkOut) {
      params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    }
    if (adults > 0) params.set("adults", adults.toString());
    if (children > 0) params.set("children", children.toString());
    if (infants > 0) params.set("infants", infants.toString());
    if (pets > 0) params.set("pets", pets.toString());
    
    navigate(`/?${params.toString()}`);
    setDestinationOpen(false);
    setCheckInOpen(false);
    setCheckOutOpen(false);
    setGuestsOpen(false);
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const popularDestinations = [
    { name: "Paris, Île-de-France", icon: "🗼" },
    { name: "Marseille, Provence-Côte d'Azur", icon: "⛵" },
    { name: "Lyon, Auvergne-Rhône-Alpes", icon: "🏛️" },
    { name: "Bordeaux, Nouvelle-Aquitaine", icon: "🍷" },
    { name: "Nice, Provence-Alpes-Côte d'Azur", icon: "🌴" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* Top navigation */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img src={airbnbLogo} alt="Airbnb" className="h-8" />
          </Link>

          {/* Center navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link 
              to="/logements" 
              className="relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <span>🏠</span>
              <span>Logements</span>
            </Link>
            <Link 
              to="/experiences" 
              className="relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <span>🎈</span>
              <span>Expériences</span>
              <span className="absolute -top-1 right-2 rounded-sm bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                NOUVEAU
              </span>
            </Link>
            <Link 
              to="/services" 
              className="relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <span>🛎️</span>
              <span>Services</span>
              <span className="absolute -top-1 right-2 rounded-sm bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                NOUVEAU
              </span>
            </Link>
          </nav>

          {/* Favorites button (mobile) */}
          <button 
            onClick={toggleFavorites}
            className="md:hidden flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted"
          >
            <Heart className={`h-4 w-4 ${showingFavorites ? "fill-current text-primary" : ""}`} />
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link to="/devenir-hote">
              <Button variant="ghost" size="sm" className="hidden text-sm font-semibold md:flex">
                Devenir hôte
              </Button>
            </Link>
            <ThemeToggle />
            <LanguageDialog />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full px-3 py-2">
                  <Menu className="h-4 w-4" />
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm">👤</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/inscription" className="cursor-pointer font-semibold">
                    S'inscrire
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/connexion" className="cursor-pointer">
                    Connexion
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/mon-compte" className="cursor-pointer">
                    Mon compte
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/devenir-hote" className="cursor-pointer">
                    Airbnb votre logement
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/organiser-experience" className="cursor-pointer">
                    Organiser une expérience
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/centre-aide" className="cursor-pointer">
                    Centre d'aide
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="border-t border-border bg-background py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto flex max-w-4xl items-center rounded-full border border-border bg-background shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex flex-1 items-center gap-1 px-1">
              {/* Destination */}
              <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                <PopoverTrigger asChild>
                  <div className="flex-1 cursor-pointer rounded-full px-6 py-3 transition-colors hover:bg-muted">
                    <div className="text-xs font-semibold">Destination</div>
                    <input
                      type="text"
                      placeholder="Rechercher une destination"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setDestinationOpen(true)}
                      className="w-full border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <div className="p-4">
                    <div className="mb-3 text-xs font-semibold">Suggestions de destinations</div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setDestinationOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <span className="text-2xl">🧭</span>
                        </div>
                        <div>
                          <div className="font-semibold">À proximité</div>
                          <div className="text-sm text-muted-foreground">Découvrez les options à proximité</div>
                        </div>
                      </button>
                      {popularDestinations.map((dest) => (
                        <button
                          key={dest.name}
                          type="button"
                          onClick={() => {
                            setSearchQuery(dest.name);
                            setDestinationOpen(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                            <span className="text-2xl">{dest.icon}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{dest.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Divider */}
              <div className="h-8 w-px bg-border" />

              {/* Arrivée */}
              <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                <PopoverTrigger asChild>
                  <div className="flex-1 cursor-pointer rounded-full px-6 py-3 transition-colors hover:bg-muted">
                    <div className="text-xs font-semibold">Arrivée</div>
                    <div className="text-sm text-muted-foreground">
                      {checkIn ? format(checkIn, "d MMM", { locale: fr }) : "Quand ?"}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="center">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      setCheckIn(date);
                      if (!checkOut && date) {
                        setCheckInOpen(false);
                        setCheckOutOpen(true);
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    numberOfMonths={2}
                    locale={fr}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Divider */}
              <div className="h-8 w-px bg-border" />

              {/* Départ */}
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <div className="flex-1 cursor-pointer rounded-full px-6 py-3 transition-colors hover:bg-muted">
                    <div className="text-xs font-semibold">Départ</div>
                    <div className="text-sm text-muted-foreground">
                      {checkOut ? format(checkOut, "d MMM", { locale: fr }) : "Quand ?"}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="center">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      setCheckOut(date);
                      setCheckOutOpen(false);
                    }}
                    disabled={(date) => {
                      if (checkIn) {
                        return date <= checkIn;
                      }
                      return date < new Date();
                    }}
                    numberOfMonths={2}
                    locale={fr}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Divider */}
              <div className="h-8 w-px bg-border" />

              {/* Voyageurs */}
              <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                <PopoverTrigger asChild>
                  <div className="flex flex-1 cursor-pointer items-center justify-between gap-2 rounded-full px-6 py-3 transition-colors hover:bg-muted">
                    <div className="flex-1">
                      <div className="text-xs font-semibold">Voyageurs</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {guestsText}
                      </div>
                    </div>
                    <Button type="submit" size="icon" className="h-12 w-12 shrink-0 rounded-full">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-96" align="end">
                  <div className="space-y-6">
                    {/* Adultes */}
                    <div className="flex items-center justify-between border-b pb-6">
                      <div>
                        <div className="font-semibold">Adultes</div>
                        <div className="text-sm text-muted-foreground">13 ans et plus</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(Math.max(0, adults - 1))}
                          disabled={adults <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{adults}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(adults + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Enfants */}
                    <div className="flex items-center justify-between border-b pb-6">
                      <div>
                        <div className="font-semibold">Enfants</div>
                        <div className="text-sm text-muted-foreground">De 2 à 12 ans</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          disabled={children <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{children}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(children + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Bébés */}
                    <div className="flex items-center justify-between border-b pb-6">
                      <div>
                        <div className="font-semibold">Bébés</div>
                        <div className="text-sm text-muted-foreground">- de 2 ans</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setInfants(Math.max(0, infants - 1))}
                          disabled={infants <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{infants}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setInfants(infants + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Animaux domestiques */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Animaux domestiques</div>
                        <div className="text-sm text-muted-foreground underline">Vous voyagez avec un animal d'assistance ?</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setPets(Math.max(0, pets - 1))}
                          disabled={pets <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{pets}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setPets(pets + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
}
