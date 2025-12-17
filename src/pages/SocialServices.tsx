import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Stethoscope, 
  Upload,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const services = [
  { value: "senior", label: "Senior Citizen Allowance", labelNe: "वृद्ध भत्ता", fee: "Free", time: "Monthly" },
  { value: "disability", label: "Disability Support", labelNe: "अपाङ्गता सहयोग", fee: "Free", time: "Ongoing" },
  { value: "widow", label: "Single Women Allowance", labelNe: "एकल महिला भत्ता", fee: "Free", time: "Monthly" },
  { value: "health", label: "Health Insurance Registration", labelNe: "स्वास्थ्य बीमा दर्ता", fee: "As per plan", time: "7-10 days" },
];

export default function SocialServices() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    applicantName: "",
    dateOfBirth: "",
    citizenshipNo: "",
    address: "",
    wardNo: "",
    contactNumber: "",
    bankAccount: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !formData.applicantName || !formData.citizenshipNo || !formData.address) {
      toast({
        title: t("error"),
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const appId = `SOC-${Date.now().toString().slice(-6)}`;
    setApplicationId(appId);
    setIsSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: t("applicationSubmitted"),
      description: `${t("applicationId")}: ${appId}`
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-16 min-h-[80vh] flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-secondary" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-4">
                {t("applicationSubmitted")}
              </h1>
              <p className="text-lg font-mono font-bold text-primary mb-6">
                {t("applicationId")}: {applicationId}
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ applicantName: "", dateOfBirth: "", citizenshipNo: "", address: "", wardNo: "", contactNumber: "", bankAccount: "", reason: "" });
                  setSelectedService("");
                }}>
                  {t("applyForAnother")}
                </Button>
                <Button onClick={() => navigate("/dashboard")}>
                  {t("goToDashboard")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="h-16 w-16 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">
                {language === "ne" ? "सामाजिक सेवाहरू" : "Social Services"}
              </h1>
              <p className="text-primary-foreground/80">
                {language === "ne" ? "स्वास्थ्य, सामाजिक सुरक्षा, र कल्याण कार्यक्रमहरू" : "Healthcare, social security, and welfare programs"}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/services")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToServices")}
          </Button>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-display font-bold text-foreground">
                  {language === "ne" ? "सेवा छान्नुहोस्" : "Select Service"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <Label>{language === "ne" ? "सेवा प्रकार" : "Service Type"} *</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === "ne" ? "सेवा छान्नुहोस्" : "Choose a service"} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(s => (
                        <SelectItem key={s.value} value={s.value}>
                          {language === "ne" ? s.labelNe : s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedService && (
                    <div className="mt-2 p-3 bg-muted rounded-lg text-sm">
                      <span className="text-muted-foreground">{t("fee")}: </span>
                      <span className="font-medium">{services.find(s => s.value === selectedService)?.fee}</span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground">{t("processingTime")}: </span>
                      <span className="font-medium">{services.find(s => s.value === selectedService)?.time}</span>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="applicantName">{language === "ne" ? "आवेदकको नाम" : "Applicant Name"} *</Label>
                    <Input
                      id="applicantName"
                      value={formData.applicantName}
                      onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">{t("dateOfBirth")} *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="citizenshipNo">{language === "ne" ? "नागरिकता नं." : "Citizenship No."} *</Label>
                    <Input
                      id="citizenshipNo"
                      value={formData.citizenshipNo}
                      onChange={e => setFormData({ ...formData, citizenshipNo: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wardNo">{language === "ne" ? "वडा नं." : "Ward No."}</Label>
                    <Input
                      id="wardNo"
                      value={formData.wardNo}
                      onChange={e => setFormData({ ...formData, wardNo: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">{language === "ne" ? "ठेगाना" : "Address"} *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactNumber">{t("phone")} *</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankAccount">{language === "ne" ? "बैंक खाता नं." : "Bank Account No."}</Label>
                    <Input
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={e => setFormData({ ...formData, bankAccount: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason">{language === "ne" ? "कारण/विवरण" : "Reason/Details"}</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t("uploadDocuments")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("pdfJpgPng")}</p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? t("submitting") : t("submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
