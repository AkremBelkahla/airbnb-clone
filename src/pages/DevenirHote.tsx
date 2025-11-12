/**
 * Devenir hôte - Become a host page
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, DollarSign, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function DevenirHote() {
  const benefits = [
    {
      icon: Home,
      title: "Partagez votre espace",
      description: "Louez une chambre ou votre logement entier pour compléter vos revenus",
    },
    {
      icon: DollarSign,
      title: "Revenus flexibles",
      description: "Fixez vos prix et choisissez quand vous souhaitez recevoir des voyageurs",
    },
    {
      icon: Shield,
      title: "Protection des hôtes",
      description: "Profitez d'une protection jusqu'à 1 million d'euros en cas de dommages",
    },
    {
      icon: Users,
      title: "Communauté mondiale",
      description: "Rejoignez des millions d'hôtes dans le monde entier",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 lg:px-8">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Devenez hôte sur Airbnb
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Partagez votre espace et gagnez de l'argent en louant votre logement sur Airbnb. 
            Rejoignez notre communauté d'hôtes et commencez à accueillir des voyageurs du monde entier.
          </p>
          <Button size="lg" className="text-lg">
            Commencer maintenant
          </Button>
        </div>

        {/* Benefits grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Pourquoi devenir hôte ?
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
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Créez votre annonce</h3>
                <p className="text-muted-foreground">
                  Ajoutez des photos de votre logement, décrivez votre espace et définissez vos tarifs.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Accueillez vos voyageurs</h3>
                <p className="text-muted-foreground">
                  Communiquez avec vos invités, répondez à leurs questions et accueillez-les chaleureusement.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Gagnez de l'argent</h3>
                <p className="text-muted-foreground">
                  Recevez vos paiements de manière sécurisée et profitez de vos revenus supplémentaires.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Prêt à commencer ?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Rejoignez des millions d'hôtes et commencez à gagner de l'argent dès aujourd'hui
          </p>
          <Button size="lg" className="text-lg">
            Créer une annonce
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
