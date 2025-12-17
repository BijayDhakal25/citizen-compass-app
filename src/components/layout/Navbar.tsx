import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    {
      name: t("services"),
      path: "/services",
      children: [
        { name: t("allServices"), path: "/services" },
        { name: t("certificates"), path: "/services/certificates" },
        { name: t("complaints"), path: "/complaints" },
        { name: t("feedback"), path: "/feedback" },
      ],
    },
    { name: t("announcements"), path: "/announcements" },
    { name: t("contact"), path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span>📞 +977-10-XXXXXX</span>
            <span className="hidden sm:inline">✉️ info@likhugaupalika.gov.np</span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main navbar */}
      <nav className="border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-lg">
              LG
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-foreground leading-tight">
                {t("likhugaupalika")}
              </div>
              <div className="text-xs text-muted-foreground">
                Nuwakot, Bagmati Province
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-primary-light"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.name}
                  {link.children && (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="w-48 rounded-lg border border-border bg-card shadow-gov-lg py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive(child.path)
                                ? "text-primary bg-primary-light"
                                : "text-foreground hover:text-primary hover:bg-muted"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button size="sm" asChild>
                  <Link to="/dashboard">
                    <User className="h-4 w-4" />
                    {t("dashboard")}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  {t("login")}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-card overflow-hidden"
            >
              <div className="container py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(link.path)
                          ? "text-primary bg-primary-light"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="pl-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                              isActive(child.path)
                                ? "text-primary bg-primary-light"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-border flex gap-2">
                  {user ? (
                    <>
                      <Button className="flex-1" asChild>
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          {t("dashboard")}
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={handleLogout}>
                        {t("logout")}
                      </Button>
                    </>
                  ) : (
                    <Button className="flex-1" asChild>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        {t("login")}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
