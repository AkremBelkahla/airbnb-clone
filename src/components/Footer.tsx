/**
 * Footer component with links and information
 */

import { Globe } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  const footerSections = [
    {
      title: "Assistance",
      links: [
        "Centre d'aide",
        "AirCover",
        "Lutte contre les discriminations",
        "Accompagnement des personnes en situation de handicap",
        "Options d'annulation",
        "Signaler un problème de voisinage",
      ],
    },
    {
      title: "Accueil de voyageurs",
      links: [
        "Airbnb votre logement",
        "AirCover pour les hôtes",
        "Ressources pour les hôtes",
        "Forum communautaire",
        "Accueillir de manière responsable",
        "Rejoindre un cours d'essai gratuit",
      ],
    },
    {
      title: "Airbnb",
      links: [
        "Newsroom",
        "Nouvelles fonctionnalités",
        "Carrières",
        "Investisseurs",
        "Cartes cadeaux",
        "Séjours Airbnb.org en cas d'urgence",
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-3">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">
              Confidentialité
            </a>
            <span>·</span>
            <a href="#" className="hover:underline">
              Conditions
            </a>
            <span>·</span>
            <a href="#" className="hover:underline">
              Plan du site
            </a>
            <span>·</span>
            <a href="#" className="hover:underline">
              Infos sur l'entreprise
            </a>
            <span>·</span>
            <span>Développé avec ❤️ par InfinityWeb.tn</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-semibold">Français (FR)</span>
            </Button>
            <Button variant="ghost" size="sm">
              <span className="text-sm font-semibold">€ EUR</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
