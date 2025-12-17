import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Likhu Rural Municipality Office\nNuwakot District, Bagmati Province\nNepal",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+977-10-XXXXXX\n+977-10-XXXXXX (Fax)",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@likhugaupalika.gov.np\nsupport@likhugaupalika.gov.np",
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: "Sunday - Friday: 10:00 AM - 5:00 PM\nSaturday: Closed",
  },
];

const departments = [
  "General Inquiry",
  "Certificate Services",
  "Tax & Revenue",
  "Planning & Development",
  "Administration",
  "IT Support",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond within 2-3 business days.",
    });

    setFormData({ name: "", email: "", phone: "", department: "", subject: "", message: "" });
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
              Contact Us
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Have questions or need assistance? Reach out to us through any of the channels below. 
              We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="h-12 w-12 rounded-lg bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{item.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="mt-1"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="mt-1"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+977-XXXXXXXXXX"
                        className="mt-1"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <select
                        id="department"
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      className="mt-1"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="mt-1 min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map / Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                Our Location
              </h2>
              
              {/* Map placeholder */}
              <div className="aspect-[4/3] rounded-xl bg-muted border border-border overflow-hidden mb-6">
                <div className="h-full flex items-center justify-center gradient-hero text-primary-foreground">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-3" />
                    <p className="font-display font-bold text-lg">Likhu Gaupalika</p>
                    <p className="text-sm text-primary-foreground/80">Nuwakot, Bagmati Province</p>
                  </div>
                </div>
              </div>

              {/* Ward Offices */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-display font-bold text-foreground mb-4">Ward Offices</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((ward) => (
                    <div
                      key={ward}
                      className="p-3 rounded-lg bg-muted text-center"
                    >
                      <span className="text-sm font-medium text-foreground">Ward {ward}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 p-6 rounded-xl bg-destructive/10 border border-destructive/20">
                <h3 className="font-display font-bold text-destructive mb-2">
                  Emergency Contact
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For urgent matters outside office hours:
                </p>
                <p className="font-mono text-lg text-foreground">+977-10-EMERGENCY</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}