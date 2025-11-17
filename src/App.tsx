import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Logements from "./pages/Logements";
import ListingDetail from "./pages/ListingDetail";
import Experiences from "./pages/Experiences";
import Services from "./pages/Services";
import DevenirHote from "./pages/DevenirHote";
import MonCompte from "./pages/MonCompte";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import OrganiserExperience from "./pages/OrganiserExperience";
import CentreAide from "./pages/CentreAide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/logements" element={<Logements />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/services" element={<Services />} />
          <Route path="/devenir-hote" element={<DevenirHote />} />
          <Route path="/mon-compte" element={<MonCompte />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/organiser-experience" element={<OrganiserExperience />} />
          <Route path="/centre-aide" element={<CentreAide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
