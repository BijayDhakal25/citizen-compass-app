import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Upload, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const existingComplaints = [
  {
    id: "CMP-2025-001",
    title: "Road repair needed in Ward 3",
    status: "in_progress",
    date: "Dec 10, 2025",
    description: "The main road near the school has several potholes that need immediate repair.",
  },
  {
    id: "CMP-2025-002",
    title: "Street light not working",
    status: "resolved",
    date: "Dec 5, 2025",
    description: "Street light at the main chowk has been non-functional for a week.",
  },
];

const categories = [
  "Infrastructure",
  "Water Supply",
  "Electricity",
  "Sanitation",
  "Public Safety",
  "Administrative",
  "Other",
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "resolved":
      return { icon: CheckCircle2, text: "Resolved", className: "bg-secondary-light text-secondary" };
    case "pending":
      return { icon: Clock, text: "Pending", className: "bg-accent-light text-accent" };
    case "in_progress":
      return { icon: AlertCircle, text: "In Progress", className: "bg-primary-light text-primary" };
    default:
      return { icon: Clock, text: "Unknown", className: "bg-muted text-muted-foreground" };
  }
};

export default function Complaints() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been registered. You can track its status here.",
    });

    setFormData({ title: "", category: "", description: "", location: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-display font-bold mb-4">
              File a Complaint
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Have a grievance or issue? Submit your complaint and we'll address it promptly. 
              Track the progress of your submissions online.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Complaint Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground">
                      Submit New Complaint
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Fill in the details below
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="title">Complaint Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief title of your complaint"
                      className="mt-1"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location / Ward</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Ward 3, Near School"
                      className="mt-1"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed description of the issue..."
                      className="mt-1 min-h-[120px]"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Attachments (Optional)</Label>
                    <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop files or <span className="text-primary">browse</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Complaint
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Existing Complaints */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                Your Complaints
              </h2>

              {existingComplaints.length > 0 ? (
                <div className="space-y-4">
                  {existingComplaints.map((complaint) => {
                    const status = getStatusBadge(complaint.status);
                    return (
                      <div
                        key={complaint.id}
                        className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <span className="text-xs font-mono text-muted-foreground">
                              {complaint.id}
                            </span>
                            <h3 className="font-medium text-foreground mt-1">
                              {complaint.title}
                            </h3>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                            <status.icon className="h-3 w-3" />
                            {status.text}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {complaint.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Submitted: {complaint.date}</span>
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-muted text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No complaints submitted yet</p>
                </div>
              )}

              {/* Info Card */}
              <div className="mt-8 p-6 rounded-xl bg-accent-light border border-accent/20">
                <h3 className="font-display font-bold text-foreground mb-2">
                  How It Works
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs flex-shrink-0">1</span>
                    Submit your complaint with all details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs flex-shrink-0">2</span>
                    Receive a complaint ID for tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs flex-shrink-0">3</span>
                    Our team reviews and assigns it
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs flex-shrink-0">4</span>
                    Get updates until resolution
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}