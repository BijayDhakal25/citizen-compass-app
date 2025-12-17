import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Award, Users, MapPin, Calendar, Building } from "lucide-react";

const leaders = [
  {
    name: "Ram Bahadur Tamang",
    position: "Mayor",
    image: null,
  },
  {
    name: "Sita Kumari Shrestha",
    position: "Deputy Mayor",
    image: null,
  },
  {
    name: "Hari Prasad Ghimire",
    position: "Chief Administrative Officer",
    image: null,
  },
];

const milestones = [
  { year: "2017", event: "Establishment of Likhu Rural Municipality" },
  { year: "2018", event: "First Local Government Election" },
  { year: "2020", event: "Digital Service Initiative Launched" },
  { year: "2023", event: "E-Governance Portal Development Started" },
  { year: "2025", event: "Full Digital Transformation Completed" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About Likhu Gaupalika
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Likhu Rural Municipality (Likhu Gaupalika) is a local government body in Nuwakot District, 
              Bagmati Province, Nepal. We are committed to serving our citizens with transparency, 
              efficiency, and dedication to build a prosperous community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                Our Municipality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Likhu Gaupalika is nestled in the beautiful hills of Nuwakot District, known for its 
                  rich cultural heritage, scenic landscapes, and warm hospitality. Our municipality 
                  comprises diverse ethnic communities living in harmony.
                </p>
                <p>
                  As part of Nepal's federal restructuring, we have been actively working to bring 
                  government services closer to citizens through digital transformation and 
                  citizen-centric governance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-sm text-muted-foreground">Nuwakot, Nepal</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-light flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Population</div>
                    <div className="text-sm text-muted-foreground">~25,000</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent-light flex items-center justify-center">
                    <Building className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Wards</div>
                    <div className="text-sm text-muted-foreground">7 Wards</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Established</div>
                    <div className="text-sm text-muted-foreground">2017</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <div className="absolute inset-0 gradient-hero flex items-center justify-center text-primary-foreground">
                  <div className="text-center">
                    <div className="text-6xl font-display font-bold mb-2">LG</div>
                    <div className="text-lg">Likhu Gaupalika</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-card border border-border"
            >
              <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a model rural municipality in Nepal, known for transparent governance, 
                sustainable development, and high-quality citizen services. We envision a 
                prosperous community where every citizen has equal access to opportunities 
                and public services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-xl bg-card border border-border"
            >
              <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver efficient, transparent, and citizen-centric government services 
                through digital transformation. We are committed to empowering our community 
                through education, healthcare, infrastructure development, and economic 
                opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to citizens.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Transparency", desc: "Open and honest governance" },
              { icon: Users, title: "Citizen First", desc: "Putting citizens at the center" },
              { icon: Target, title: "Efficiency", desc: "Fast and effective services" },
              { icon: Eye, title: "Accountability", desc: "Responsible decision making" },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Our Leadership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the elected and appointed officials leading Likhu Gaupalika.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="h-32 w-32 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center text-primary-foreground text-3xl font-display font-bold">
                  {leader.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  {leader.name}
                </h3>
                <p className="text-sm text-muted-foreground">{leader.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in the development of Likhu Gaupalika.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year.slice(2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pt-3 pb-6">
                  <div className="text-sm text-primary font-medium mb-1">{milestone.year}</div>
                  <div className="text-foreground font-medium">{milestone.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}