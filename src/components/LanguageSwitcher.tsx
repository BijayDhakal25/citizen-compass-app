import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-primary-foreground/70" />
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 py-1 h-auto text-xs ${
          language === "ne" 
            ? "text-primary-foreground font-medium" 
            : "text-primary-foreground/70"
        }`}
        onClick={() => setLanguage("ne")}
      >
        नेपाली
      </Button>
      <span className="text-primary-foreground/40">|</span>
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 py-1 h-auto text-xs ${
          language === "en" 
            ? "text-primary-foreground font-medium" 
            : "text-primary-foreground/70"
        }`}
        onClick={() => setLanguage("en")}
      >
        English
      </Button>
    </div>
  );
}
