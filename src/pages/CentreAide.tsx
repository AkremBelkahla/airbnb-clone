/**
 * Centre d'aide - Help center page
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Phone, Mail, HelpCircle, Home, Calendar, CreditCard, Shield } from "lucide-react";

export default function CentreAide() {
  const categories = [
    {
      icon: Home,
      title: "Réservations et séjours",
      description: "Aide pour vos réservations, modifications et annulations",
    },
    {
      icon: Calendar,
      title: "Gérer votre logement",
      description: "Conseils et assistance pour les hôtes",
    },
    {
      icon: CreditCard,
      title: "Paiements et remboursements",
      description: "Questions sur les paiements, factures et remboursements",
    },
    {
      icon: Shield,
      title: "Sécurité et confidentialité",
      description: "Protégez votre compte et vos informations",
    },
  ];

  const popularQuestions = [
    "Comment modifier ou annuler ma réservation ?",
    "Que faire si j'ai un problème pendant mon séjour ?",
    "Comment fonctionne le remboursement ?",
    "Comment contacter mon hôte ?",
    "Quelles sont les conditions d'annulation ?",
    "Comment créer une annonce ?",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 lg:px-8">
        {/* Hero section with search */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Bonjour, comment pouvons-nous vous aider ?
          </h1>
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-14 pl-12 text-lg"
                placeholder="Rechercher dans l'aide..."
              />
            </div>
          </div>
        </div>

        {/* Categories grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Parcourir par catégorie</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.title} className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular questions */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Questions fréquentes</h2>
          <div className="space-y-3">
            {popularQuestions.map((question) => (
              <Card key={question} className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{question}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact options */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Vous n'avez pas trouvé de réponse ?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Chat en direct</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Discutez avec un conseiller en temps réel
                </p>
                <Button className="w-full">Démarrer une conversation</Button>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Appelez-nous</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Contactez notre équipe par téléphone
                </p>
                <Button variant="outline" className="w-full">+33 1 23 45 67 89</Button>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Email</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Envoyez-nous un message, nous vous répondrons sous 24h
                </p>
                <Button variant="outline" className="w-full">Envoyer un email</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community section */}
        <div className="rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Rejoignez notre communauté</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Échangez avec d'autres hôtes et voyageurs sur notre forum communautaire
          </p>
          <Button size="lg" variant="outline">
            Accéder au forum
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
