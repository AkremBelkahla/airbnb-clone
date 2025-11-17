/**
 * Organiser une expérience - Organize an experience page
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, Award } from "lucide-react";

export default function OrganiserExperience() {
  const benefits = [
    {
      icon: Calendar,
      title: "Flexibilité totale",
      description: "Choisissez vos horaires et la fréquence de vos expériences selon vos disponibilités",
    },
    {
      icon: Users,
      title: "Rencontrez des voyageurs",
      description: "Partagez votre passion avec des personnes du monde entier",
    },
    {
      icon: TrendingUp,
      title: "Revenus complémentaires",
      description: "Gagnez de l'argent en partageant ce que vous aimez faire",
    },
    {
      icon: Award,
      title: "Support Airbnb",
      description: "Bénéficiez de notre accompagnement et de nos ressources pour réussir",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Partagez votre expertise",
      description: "Cuisine, sport, art, culture... Partagez votre passion et vos compétences uniques",
    },
    {
      number: "2",
      title: "Créez votre expérience",
      description: "Décrivez votre activité, ajoutez des photos et fixez vos disponibilités",
    },
    {
      number: "3",
      title: "Accueillez vos premiers invités",
      description: "Recevez vos réservations et créez des souvenirs mémorables",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 lg:px-8">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Organisez une expérience Airbnb
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Partagez votre passion, rencontrez des voyageurs du monde entier et gagnez de l'argent 
            en organisant des expériences uniques dans votre ville.
          </p>
          <Button size="lg" className="text-lg">
            Commencer maintenant
          </Button>
        </div>

        {/* Benefits grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Pourquoi organiser une expérience ?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Steps section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Comment ça marche ?
          </h2>
          <div className="mx-auto max-w-3xl space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Examples section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Exemples d'expériences
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-6xl">🍳</span>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Cours de cuisine</h3>
                <p className="text-sm text-muted-foreground">
                  Partagez vos recettes traditionnelles et enseignez votre cuisine locale
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Atelier d'art</h3>
                <p className="text-sm text-muted-foreground">
                  Initiez vos invités à la peinture, la poterie ou toute forme d'art
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-6xl">🚶</span>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Visite guidée</h3>
                <p className="text-sm text-muted-foreground">
                  Faites découvrir les secrets et l'histoire de votre quartier
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA section */}
        <div className="rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Prêt à partager votre passion ?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Rejoignez des milliers d'hôtes d'expériences dans le monde entier
          </p>
          <Button size="lg" className="text-lg">
            Créer une expérience
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
