import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import listings from "@/data/listings.json";

type Message = { role: "user" | "bot"; content: string; suggestions?: string[] };

export function PropertyChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      content: "Bonjour ! Je peux vous aider à trouver votre logement idéal. Dans quelle ville recherchez-vous ?",
      suggestions: ["Paris", "Nice", "Barcelona", "Lyon", "Marseille", "Bordeaux"]
    }
  ]);
  const [input, setInput] = useState("");
  const [conversationState, setConversationState] = useState<{
    city?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({});

  const getCities = () => {
    const cities = new Set(listings.map(l => l.city));
    return Array.from(cities);
  };

  const getTypes = () => ["Appartement", "Maison", "Studio", "Villa"];

  const searchProperties = (criteria: typeof conversationState) => {
    let filtered = listings;
    
    if (criteria.city) {
      filtered = filtered.filter(l => 
        l.city.toLowerCase().includes(criteria.city!.toLowerCase())
      );
    }
    if (criteria.type) {
      filtered = filtered.filter(l => 
        l.type.toLowerCase().includes(criteria.type!.toLowerCase())
      );
    }
    if (criteria.minPrice) {
      filtered = filtered.filter(l => l.price >= criteria.minPrice!);
    }
    if (criteria.maxPrice) {
      filtered = filtered.filter(l => l.price <= criteria.maxPrice!);
    }
    
    return filtered.slice(0, 5);
  };

  const generateBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    const cities = getCities();
    const types = getTypes();

    // Check for city
    if (!conversationState.city) {
      const foundCity = cities.find(city => 
        lowerInput.includes(city.toLowerCase())
      );
      
      if (foundCity) {
        setConversationState(prev => ({ ...prev, city: foundCity }));
        return {
          role: "bot",
          content: `Parfait ! ${foundCity}. Quel type de bien recherchez-vous ?`,
          suggestions: types
        };
      }
      return {
        role: "bot",
        content: "Je n'ai pas compris la ville. Pouvez-vous choisir parmi nos villes disponibles ?",
        suggestions: cities
      };
    }

    // Check for type
    if (!conversationState.type) {
      const foundType = types.find(type => 
        lowerInput.includes(type.toLowerCase())
      );
      
      if (foundType) {
        setConversationState(prev => ({ ...prev, type: foundType }));
        return {
          role: "bot",
          content: "Quel est votre budget maximum par nuit ?",
          suggestions: ["100€", "200€", "300€", "500€+"]
        };
      }
      return {
        role: "bot",
        content: "Quel type de bien recherchez-vous ?",
        suggestions: types
      };
    }

    // Check for budget
    if (!conversationState.maxPrice) {
      const priceMatch = userInput.match(/(\d+)/);
      if (priceMatch) {
        const maxPrice = parseInt(priceMatch[1]);
        const newState = { ...conversationState, maxPrice };
        setConversationState(newState);
        
        const results = searchProperties(newState);
        
        if (results.length > 0) {
          setTimeout(() => {
            navigate(`/logements?location=${newState.city}`);
          }, 2000);
          
          return {
            role: "bot",
            content: `Super ! J'ai trouvé ${results.length} bien(s) à ${newState.city} correspondant à vos critères. Je vous redirige vers les résultats...`
          };
        }
        return {
          role: "bot",
          content: "Désolé, je n'ai pas trouvé de biens correspondant exactement à vos critères. Voulez-vous élargir votre recherche ?"
        };
      }
    }

    return {
      role: "bot",
      content: "Je peux vous aider à rechercher un logement. Voulez-vous recommencer ?",
      suggestions: ["Oui, recommencer"]
    };
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Oui, recommencer") {
      setConversationState({});
      setMessages([{
        role: "bot",
        content: "Bonjour ! Je peux vous aider à trouver votre logement idéal. Dans quelle ville recherchez-vous ?",
        suggestions: getCities()
      }]);
    } else {
      handleSend(suggestion);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        aria-label="Ouvrir le chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 left-8 z-50 w-96 shadow-2xl">
          <div className="flex h-[500px] flex-col">
            <div className="border-b bg-primary p-4 text-primary-foreground">
              <h3 className="font-semibold">Assistant de recherche</h3>
              <p className="text-sm opacity-90">Trouvez votre logement idéal</p>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className="space-y-2">
                    <div
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-start pl-2">
                        {msg.suggestions.map((suggestion, sidx) => (
                          <Button
                            key={sidx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-8"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tapez votre réponse..."
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
