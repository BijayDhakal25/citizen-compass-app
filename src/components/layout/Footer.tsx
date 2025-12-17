import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, ExternalLink } from "lucide-react";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Announcements", path: "/announcements" },
  { name: "Contact", path: "/contact" },
  { name: "FAQs", path: "/faq" },
];

const citizenServices = [
  { name: "Birth Certificate", path: "/services/certificates" },
  { name: "Death Certificate", path: "/services/certificates" },
  { name: "Marriage Certificate", path: "/services/certificates" },
  { name: "Citizenship", path: "/services/certificates" },
  { name: "File Complaint", path: "/complaints" },
];

const importantLinks = [
  { name: "Nepal Government Portal", url: "https://nepal.gov.np", external: true },
  { name: "Ministry of Federal Affairs", url: "https://mofald.gov.np", external: true },
  { name: "Bagmati Province", url: "https://bagamati.gov.np", external: true },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground text-primary font-display font-bold text-xl">
                LG
              </div>
              <div>
                <div className="font-display font-bold text-lg">
                  Likhu Gaupalika
                </div>
                <div className="text-sm text-primary-foreground/70">
                  Nuwakot, Bagmati Province
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Committed to serving our citizens with transparency, efficiency, and dedication. 
              Building a prosperous community together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Citizen Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Citizen Services</h4>
            <ul className="space-y-2">
              {citizenServices.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Likhu Rural Municipality, Nuwakot District, Bagmati Province, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+977-10-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@likhugaupalika.gov.np</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Sun - Fri: 10:00 AM - 5:00 PM</div>
                  <div>Saturday: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Links */}
        <div className="mt-10 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <span className="text-sm font-medium">Important Links:</span>
              {importantLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1"
                >
                  {link.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-primary-hover">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Likhu Gaupalika. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}