import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Users, MessageSquare, Bell, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  {
    icon: FileText,
    title: "Certificate Services",
    description: "Apply for birth, death, marriage, and citizenship certificates online.",
    link: "/services/certificates",
    color: "bg-primary",
  },
  {
    icon: Users,
    title: "Family Management",
    description: "Manage your family records and digital IDs in one place.",
    link: "/family",
    color: "bg-secondary",
  },
  {
    icon: MessageSquare,
    title: "Complaints & Feedback",
    description: "Submit complaints and provide feedback to improve our services.",
    link: "/complaints",
    color: "bg-accent",
  },
  {
    icon: Bell,
    title: "Announcements",
    description: "Stay updated with the latest news and public notices.",
    link: "/announcements",
    color: "bg-primary",
  },
];

const stats = [
  { value: "50,000+", label: "Citizens Served" },
  { value: "15,000+", label: "Certificates Issued" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Online Access" },
];

const announcements = [
  {
    date: "Dec 15, 2025",
    title: "New Health Camp Schedule Released",
    category: "Health",
  },
  {
    date: "Dec 12, 2025",
    title: "Property Tax Payment Deadline Extended",
    category: "Finance",
  },
  {
    date: "Dec 10, 2025",
    title: "Road Construction Project Update",
    category: "Infrastructure",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Official Government Portal
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
            >
              Welcome to <br />
              <span className="text-accent">Likhu Gaupalika</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed"
            >
              Your gateway to efficient, transparent, and citizen-centric local governance. 
              Access government services, track applications, and stay connected with your community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/login">
                  Citizen Portal
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access a wide range of government services from the comfort of your home. 
              Fast, secure, and transparent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="block h-full p-6 rounded-xl bg-card border border-border hover-lift group"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.color} text-primary-foreground mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Announcements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Latest Announcements
                </h2>
                <Button variant="link" asChild>
                  <Link to="/announcements">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {announcements.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-accent-light text-accent mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {item.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Access */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-96"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                Quick Access
              </h2>
              
              <div className="p-6 rounded-xl gradient-hero text-primary-foreground">
                <h3 className="font-display font-bold text-xl mb-2">
                  Track Your Application
                </h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Enter your application ID to check the status of your request.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Application ID"
                    className="flex-1 px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  />
                  <Button variant="hero" size="default">
                    Track
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-6 rounded-xl bg-card border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Need Help?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-8 w-8 rounded-full bg-secondary-light flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-secondary" />
                    </div>
                    <span>Live Chat Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <span>Download Forms</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl gradient-success text-secondary-foreground p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
              Create your citizen account today and access all government services online. 
              It's free, fast, and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="bg-card text-secondary hover:bg-card/90" asChild>
                <Link to="/login">
                  Create Account
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl" 
                className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}