import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type AuthMode = "login" | "signup";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
    return null;
  }

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
          title: "Login Successful",
          description: "Welcome back! Redirecting to dashboard...",
        });
        setTimeout(() => {
          navigate(formData.email.includes("admin") ? "/admin" : "/dashboard");
        }, 500);
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid email or password. Try the demo credentials.",
          variant: "destructive",
        });
      }
    } else {
      // Signup flow
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 6 characters.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const result = await signup(formData.name, formData.email, formData.phone, formData.password);
      if (result.success) {
        toast({
          title: "Account Created",
          description: "Your account has been created. Please login.",
        });
        setMode("login");
        setFormData({ ...formData, password: "", confirmPassword: "" });
      } else {
        toast({
          title: "Signup Failed",
          description: result.error || "Could not create account.",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = (type: "citizen" | "admin") => {
    const creds = type === "admin" 
      ? { email: "admin@likhugaupalika.gov.np", password: "Admin1234" }
      : { email: "demo.citizen@likhugaupalika.gov.np", password: "Demo1234" };
    setFormData({ ...formData, email: creds.email, password: creds.password });
  };

  return (
    <Layout>
      <section className="py-16 min-h-[80vh] flex items-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border shadow-gov-lg overflow-hidden"
            >
              {/* Header */}
              <div className="gradient-hero text-primary-foreground p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-display font-bold">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-sm text-primary-foreground/80 mt-1">
                  {mode === "login"
                    ? "Sign in to access citizen services"
                    : "Register for Likhu Gaupalika Portal"}
                </p>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          className="pl-10"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {mode === "signup" && (
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
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
                      "Please wait..."
                    ) : mode === "login" ? (
                      <>
                        Sign In <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo Credentials */}
                {mode === "login" && (
                  <div className="mt-6 p-4 rounded-lg bg-accent-light border border-accent/20">
                    <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => fillDemoCredentials("citizen")}
                        className="w-full text-left text-xs p-2 rounded bg-card border border-border hover:border-primary/30 transition-colors"
                      >
                        <span className="font-medium">Citizen:</span> demo.citizen@likhugaupalika.gov.np
                      </button>
                      <button
                        type="button"
                        onClick={() => fillDemoCredentials("admin")}
                        className="w-full text-left text-xs p-2 rounded bg-card border border-border hover:border-primary/30 transition-colors"
                      >
                        <span className="font-medium">Admin:</span> admin@likhugaupalika.gov.np
                      </button>
                    </div>
                  </div>
                )}

                {/* Toggle mode */}
                <div className="mt-6 text-center text-sm">
                  {mode === "login" ? (
                    <p className="text-muted-foreground">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="text-primary font-medium hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-primary font-medium hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
