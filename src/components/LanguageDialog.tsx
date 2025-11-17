/**
 * Language selection dialog
 */

import { Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";

const languages = [
  { code: "fr", name: "Français", region: "France" },
  { code: "en", name: "English", region: "United States" },
  { code: "es", name: "Español", region: "España" },
  { code: "de", name: "Deutsch", region: "Deutschland" },
  { code: "it", name: "Italiano", region: "Italia" },
];

const currencies = [
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "Dollar américain" },
  { code: "GBP", symbol: "£", name: "Livre sterling" },
];

interface LanguageDialogProps {
  className?: string;
}

export function LanguageDialog({ className }: LanguageDialogProps) {
  const [language, setLanguage] = useState("fr");
  const [currency, setCurrency] = useState("EUR");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Globe className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Langue et région</DialogTitle>
          <DialogDescription>
            Choisissez votre langue et votre devise
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Langue</h3>
            <RadioGroup value={language} onValueChange={setLanguage}>
              <div className="grid gap-2">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                  >
                    <RadioGroupItem value={lang.code} id={lang.code} />
                    <Label
                      htmlFor={lang.code}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {lang.name}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Currency Selection */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Devise</h3>
            <RadioGroup value={currency} onValueChange={setCurrency}>
              <div className="grid gap-2">
                {currencies.map((curr) => (
                  <div
                    key={curr.code}
                    className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                  >
                    <RadioGroupItem value={curr.code} id={curr.code} />
                    <Label
                      htmlFor={curr.code}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {curr.symbol} {curr.code}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
