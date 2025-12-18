import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

type AuthMode = "login" | "signup";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, signup } = useAuth();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === "login") {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast({
          title: language === "ne" ? "लग इन सफल" : "Login Successful",
          description: language === "ne" ? "स्वागत छ! ड्यासबोर्डमा रिडाइरेक्ट हुँदैछ..." : "Welcome back! Redirecting...",
        });
        onSuccess?.();
        onClose();
      } else {
        toast({
          title: language === "ne" ? "लग इन असफल" : "Login Failed",
          description: result.error || (language === "ne" ? "अमान्य इमेल वा पासवर्ड" : "Invalid email or password"),
          variant: "destructive",
        });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: language === "ne" ? "पासवर्ड मेल खाएन" : "Password Mismatch",
          description: language === "ne" ? "पासवर्डहरू मेल खाँदैनन्।" : "Passwords do not match.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: language === "ne" ? "पासवर्ड धेरै छोटो" : "Password Too Short",
          description: language === "ne" ? "पासवर्ड कम्तीमा ६ अक्षरको हुनुपर्छ।" : "Password must be at least 6 characters.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const result = await signup(formData.name, formData.email, formData.phone, formData.password);
      if (result.success) {
        toast({
          title: language === "ne" ? "खाता सिर्जना भयो" : "Account Created",
          description: language === "ne" ? "तपाईंको खाता सिर्जना भयो। कृपया लग इन गर्नुहोस्।" : "Your account has been created. Please login.",
        });
        setMode("login");
        setFormData({ ...formData, password: "", confirmPassword: "" });
      } else {
        toast({
          title: language === "ne" ? "साइन अप असफल" : "Signup Failed",
          description: result.error || (language === "ne" ? "खाता सिर्जना गर्न सकिएन।" : "Could not create account."),
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
  };

  const handleDemoLogin = async (type: "citizen" | "admin") => {
    setIsLoading(true);
    const creds = type === "admin"
      ? { email: "admin@likhugaupalika.gov.np", password: "Admin1234" }
      : { email: "demo.citizen@likhugaupalika.gov.np", password: "Demo1234" };

    const result = await login(creds.email, creds.password);
    if (result.success) {
      toast({
        title: language === "ne" ? "डेमो लग इन सफल" : "Demo Login Successful",
        description: language === "ne" ? `${type === "admin" ? "प्रशासक" : "नागरिक"}को रूपमा लग इन भयो` : `Logged in as ${type}`,
      });
      onSuccess?.();
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className="gradient-hero text-primary-foreground p-6 text-center">
          <div className="h-14 w-14 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mx-auto mb-3">
            <Shield className="h-7 w-7" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold text-primary-foreground">
              {mode === "login" 
                ? (language === "ne" ? "स्वागत छ" : "Welcome Back")
                : (language === "ne" ? "खाता बनाउनुहोस्" : "Create Account")
              }
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-primary-foreground/80 mt-1">
            {mode === "login"
              ? (language === "ne" ? "नागरिक सेवाहरू पहुँच गर्न साइन इन गर्नुहोस्" : "Sign in to access citizen services")
              : (language === "ne" ? "लिखु गाउँपालिका पोर्टलमा दर्ता गर्नुहोस्" : "Register for Likhu Gaupalika Portal")
            }
          </p>
        </div>

        {/* Demo Login Buttons */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDemoLogin("citizen")}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-primary" />
              {language === "ne" ? "नागरिक डेमो" : "Demo Citizen"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDemoLogin("admin")}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-accent" />
              {language === "ne" ? "प्रशासक डेमो" : "Demo Admin"}
            </Button>
          </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {language === "ne" ? "वा" : "or"}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">{t("fullName")}</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder={language === "ne" ? "पूरा नाम प्रविष्ट गर्नुहोस्" : "Enter your full name"}
                    className="pl-10"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={language === "ne" ? "इमेल प्रविष्ट गर्नुहोस्" : "Enter your email"}
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <Label htmlFor="phone">{t("phone")}</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={language === "ne" ? "फोन नम्बर प्रविष्ट गर्नुहोस्" : "Enter your phone number"}
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={language === "ne" ? "पासवर्ड प्रविष्ट गर्नुहोस्" : "Enter your password"}
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder={language === "ne" ? "पासवर्ड पुष्टि गर्नुहोस्" : "Confirm your password"}
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                language === "ne" ? "कृपया पर्खनुहोस्..." : "Please wait..."
              ) : mode === "login" ? (
                <>
                  {t("signIn")} <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  {t("createAccount")} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <div className="mt-4 text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                {t("noAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-primary font-medium hover:underline"
                >
                  {t("signUp")}
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                {t("haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary font-medium hover:underline"
                >
                  {t("signIn")}
                </button>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
