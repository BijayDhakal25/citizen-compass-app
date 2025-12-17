import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Building, 
  Stethoscope,
  GraduationCap,
  Map,
  FileCheck,
  ArrowRight,
  Search
} from "lucide-react";
import { useState } from "react";

const serviceCategories = [
  {
    id: "certificates",
    icon: FileText,
    title: "Certificate Services",
    description: "Birth, death, marriage, citizenship, and other vital certificates",
    color: "bg-primary",
    services: [
      { name: "Birth Certificate", time: "3-5 days", fee: "Free", type: "birth" },
      { name: "Death Certificate", time: "3-5 days", fee: "Free", type: "death" },
      { name: "Marriage Certificate", time: "5-7 days", fee: "Rs. 500", type: "marriage" },
      { name: "Citizenship Recommendation", time: "7-10 days", fee: "Rs. 100", type: "citizenship" },
      { name: "Residency Certificate", time: "2-3 days", fee: "Free", type: "residency" },
    ],
  },
  {
    id: "family",
    icon: Users,
    title: "Family Services",
    description: "Family registration, digital ID, and household management",
    color: "bg-secondary",
    services: [
      { name: "Family Registration", time: "5-7 days", fee: "Free" },
      { name: "Digital Family ID", time: "7-10 days", fee: "Free" },
      { name: "Family Member Update", time: "2-3 days", fee: "Free" },
      { name: "Household Survey", time: "Ongoing", fee: "Free" },
    ],
  },
  {
    id: "land",
    icon: Map,
    title: "Land & Property",
    description: "Land registration, ownership transfer, and property services",
    color: "bg-accent",
    services: [
      { name: "Land Ownership Certificate", time: "15-30 days", fee: "Varies" },
      { name: "Property Tax Assessment", time: "7-10 days", fee: "Based on value" },
      { name: "Building Permit", time: "15-20 days", fee: "Rs. 5,000+" },
      { name: "Land Use Recommendation", time: "7-10 days", fee: "Rs. 500" },
    ],
  },
  {
    id: "business",
    icon: Building,
    title: "Business Services",
    description: "Business registration, licenses, and trade permits",
    color: "bg-primary",
    services: [
      { name: "Business Registration", time: "5-7 days", fee: "Rs. 1,000" },
      { name: "Trade License", time: "7-10 days", fee: "Rs. 2,500" },
      { name: "Industry Registration", time: "15-20 days", fee: "Varies" },
      { name: "Tax Clearance", time: "3-5 days", fee: "Free" },
    ],
  },
  {
    id: "social",
    icon: Stethoscope,
    title: "Social Services",
    description: "Healthcare, social security, and welfare programs",
    color: "bg-secondary",
    services: [
      { name: "Senior Citizen Allowance", time: "Monthly", fee: "Free" },
      { name: "Disability Support", time: "Ongoing", fee: "Free" },
      { name: "Single Women Allowance", time: "Monthly", fee: "Free" },
      { name: "Health Insurance Registration", time: "7-10 days", fee: "As per plan" },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education Services",
    description: "School enrollment, scholarships, and educational support",
    color: "bg-accent",
    services: [
      { name: "School Enrollment Support", time: "Ongoing", fee: "Free" },
      { name: "Scholarship Application", time: "As per schedule", fee: "Free" },
      { name: "Educational Certificate Verification", time: "3-5 days", fee: "Rs. 100" },
      { name: "Skill Development Programs", time: "Varies", fee: "Free/Subsidized" },
    ],
  },
];

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredCategories = serviceCategories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.services.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApply = (serviceType?: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (serviceType) {
      navigate(`/apply/${serviceType}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Access a comprehensive range of government services online. Fast, transparent, 
              and citizen-friendly.
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div 
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-lg ${category.color} flex items-center justify-center`}>
                      <category.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {category.services.length} services
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>

                  {/* Expandable services list */}
                  <motion.div
                    initial={false}
                    animate={{ height: selectedCategory === category.id ? "auto" : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border space-y-3">
                      {category.services.map((service) => (
                        <div 
                          key={service.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{service.fee}</span>
                            {(service as any).type && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApply((service as any).type);
                                }}
                              >
                                Apply
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-4 w-full"
                  >
                    {selectedCategory === category.id ? "Show Less" : "View Services"}
                    <ArrowRight className={`h-4 w-4 transition-transform ${selectedCategory === category.id ? "rotate-90" : ""}`} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Applying for services is simple and straightforward.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Create Account", desc: "Register with your details" },
              { step: "2", title: "Choose Service", desc: "Select the service you need" },
              { step: "3", title: "Submit Application", desc: "Fill form and upload documents" },
              { step: "4", title: "Track & Receive", desc: "Monitor status and collect" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/login">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl gradient-hero text-primary-foreground"
            >
              <MessageSquare className="h-10 w-10 mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">
                File a Complaint
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Have an issue or grievance? Submit your complaint and we'll address it promptly. 
                Track its progress online.
              </p>
              <Button variant="hero" asChild>
                <Link to="/complaints">
                  Submit Complaint <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl gradient-success text-secondary-foreground"
            >
              <FileCheck className="h-10 w-10 mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">
                Provide Feedback
              </h3>
              <p className="text-secondary-foreground/80 mb-6">
                Your feedback helps us improve. Share your experience and suggestions to make 
                our services better.
              </p>
              <Button variant="hero" className="bg-card text-secondary hover:bg-card/90" asChild>
                <Link to="/feedback">
                  Give Feedback <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
