import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Complaints from "./pages/Complaints";
import Contact from "./pages/Contact";
import CertificateApplication from "./pages/CertificateApplication";
import NotificationSettings from "./pages/NotificationSettings";
import MyApplications from "./pages/MyApplications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ApplicationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/certificates" element={<Services />} />
              <Route path="/apply/:type" element={<CertificateApplication />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings/notifications" element={<NotificationSettings />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/announcements" element={<Index />} />
              <Route path="/feedback" element={<Complaints />} />
              <Route path="/family" element={<Dashboard />} />
              <Route path="/certificates" element={<MyApplications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ApplicationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
