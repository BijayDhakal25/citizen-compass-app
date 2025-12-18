import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications, CertificateType } from "@/contexts/ApplicationContext";
import { ArrowLeft, FileText, Upload, CheckCircle2 } from "lucide-react";

const CERTIFICATE_CONFIG: Record<CertificateType, { 
  title: string; 
  description: string;
  fields: { name: string; label: string; type: string; required: boolean; placeholder: string }[];
}> = {
  birth: {
    title: "Birth Certificate Application",
    description: "Apply for a birth certificate for newborn registration",
    fields: [
      { name: "childName", label: "Child's Full Name", type: "text", required: true, placeholder: "Enter child's full name" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true, placeholder: "" },
      { name: "placeOfBirth", label: "Place of Birth", type: "text", required: true, placeholder: "Hospital/Home address" },
      { name: "fatherName", label: "Father's Name", type: "text", required: true, placeholder: "Enter father's full name" },
      { name: "motherName", label: "Mother's Name", type: "text", required: true, placeholder: "Enter mother's full name" },
      { name: "address", label: "Permanent Address", type: "text", required: true, placeholder: "Ward, Municipality, District" },
    ]
  },
  death: {
    title: "Death Certificate Application",
    description: "Apply for a death certificate",
    fields: [
      { name: "deceasedName", label: "Deceased's Full Name", type: "text", required: true, placeholder: "Enter deceased's full name" },
      { name: "dateOfDeath", label: "Date of Death", type: "date", required: true, placeholder: "" },
      { name: "placeOfDeath", label: "Place of Death", type: "text", required: true, placeholder: "Hospital/Home address" },
      { name: "causeOfDeath", label: "Cause of Death", type: "text", required: true, placeholder: "As per medical certificate" },
      { name: "applicantRelation", label: "Applicant's Relation", type: "text", required: true, placeholder: "Son/Daughter/Spouse etc." },
      { name: "address", label: "Deceased's Last Address", type: "text", required: true, placeholder: "Ward, Municipality, District" },
    ]
  },
  marriage: {
    title: "Marriage Certificate Application",
    description: "Apply for official marriage registration",
    fields: [
      { name: "groomName", label: "Groom's Full Name", type: "text", required: true, placeholder: "Enter groom's full name" },
      { name: "brideName", label: "Bride's Full Name", type: "text", required: true, placeholder: "Enter bride's full name" },
      { name: "marriageDate", label: "Date of Marriage", type: "date", required: true, placeholder: "" },
      { name: "marriagePlace", label: "Place of Marriage", type: "text", required: true, placeholder: "Venue/Location" },
      { name: "witness1", label: "Witness 1 Name", type: "text", required: true, placeholder: "First witness full name" },
      { name: "witness2", label: "Witness 2 Name", type: "text", required: true, placeholder: "Second witness full name" },
    ]
  },
  citizenship: {
    title: "Citizenship Recommendation",
    description: "Apply for citizenship recommendation from municipality",
    fields: [
      { name: "applicantName", label: "Applicant's Full Name", type: "text", required: true, placeholder: "Enter your full name" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true, placeholder: "" },
      { name: "fatherName", label: "Father's Name", type: "text", required: true, placeholder: "Enter father's full name" },
      { name: "motherName", label: "Mother's Name", type: "text", required: true, placeholder: "Enter mother's full name" },
      { name: "permanentAddress", label: "Permanent Address", type: "text", required: true, placeholder: "Ward, Municipality, District" },
      { name: "reason", label: "Purpose/Reason", type: "textarea", required: true, placeholder: "Why do you need citizenship?" },
    ]
  },
  residency: {
    title: "Residency Certificate Application",
    description: "Apply for proof of residence certificate",
    fields: [
      { name: "applicantName", label: "Applicant's Full Name", type: "text", required: true, placeholder: "Enter your full name" },
      { name: "currentAddress", label: "Current Address", type: "text", required: true, placeholder: "Full current address" },
      { name: "residingSince", label: "Residing Since", type: "date", required: true, placeholder: "" },
      { name: "purpose", label: "Purpose", type: "text", required: true, placeholder: "Bank/School/Employment etc." },
      { name: "landlordName", label: "Landlord/Property Owner", type: "text", required: false, placeholder: "If renting" },
      { name: "contactNumber", label: "Contact Number", type: "tel", required: true, placeholder: "Your phone number" },
    ]
  }
};

export default function CertificateApplication() {
  const { type } = useParams<{ type: CertificateType }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { submitApplication } = useApplications();
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState("");

  if (!type || !CERTIFICATE_CONFIG[type]) {
    navigate("/services");
    return null;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const config = CERTIFICATE_CONFIG[type];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    for (const field of config.fields) {
      if (field.required && !formData[field.name]) {
        toast({
          title: "Missing Required Field",
          description: `Please fill in ${field.label}`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const app = submitApplication(user.id, user.name, user.email, type, formData);
    setSubmittedAppId(app.id);
    setIsSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: "Application Submitted!",
      description: `Your application ID is ${app.id}. Status will update automatically.`
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
                Application Submitted!
              </h1>
              <p className="text-muted-foreground mb-2">
                Your application has been successfully submitted.
              </p>
              <p className="text-lg font-mono font-bold text-primary mb-6">
                Application ID: {submittedAppId}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Your application is currently <span className="text-accent font-medium">Pending</span>. 
                It will be automatically approved within 1 minute (demo). Check your dashboard for updates.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/services")}>
                  Apply for Another
                </Button>
                <Button onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
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
      <section className="py-8">
        <div className="container">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/services")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="gradient-hero text-primary-foreground p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-display font-bold">{config.title}</h1>
                    <p className="text-sm text-primary-foreground/80">{config.description}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {config.fields.map(field => (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}

                {/* Document Upload Placeholder */}
                <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload supporting documents (optional)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 5MB
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
