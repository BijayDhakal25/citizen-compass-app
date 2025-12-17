import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, 
  Clock, 
  ChevronRight,
  Filter,
  Search,
  Calendar,
  Megaphone
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Announcement {
  id: string;
  title: string;
  titleNe: string;
  content: string;
  contentNe: string;
  category: string;
  date: string;
  important: boolean;
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "New Health Camp Schedule Released",
    titleNe: "नयाँ स्वास्थ्य शिविर तालिका जारी",
    content: "Free health checkup camps will be organized in all wards from December 20-25. Facilities include general checkup, eye testing, and dental services. All citizens are encouraged to participate.",
    contentNe: "डिसेम्बर २०-२५ सम्म सबै वडाहरूमा निःशुल्क स्वास्थ्य जाँच शिविरहरू आयोजना गरिनेछ। सुविधाहरूमा सामान्य जाँच, आँखाको परीक्षण, र दन्त सेवाहरू समावेश छन्। सबै नागरिकहरूलाई सहभागी हुन प्रोत्साहित गरिन्छ।",
    category: "health",
    date: "2025-12-15",
    important: true
  },
  {
    id: "2",
    title: "Property Tax Payment Deadline Extended",
    titleNe: "सम्पत्ति कर भुक्तानी समयसीमा विस्तार",
    content: "The deadline for property tax payment has been extended to January 15, 2026. Citizens are requested to clear their dues before the deadline to avoid penalties.",
    contentNe: "सम्पत्ति कर भुक्तानीको समयसीमा जनवरी १५, २०२६ सम्म विस्तार गरिएको छ। नागरिकहरूलाई जरिवाना बच्न समयसीमा अघि आफ्नो बाँकी रकम चुक्ता गर्न अनुरोध गरिन्छ।",
    category: "finance",
    date: "2025-12-12",
    important: true
  },
  {
    id: "3",
    title: "Road Construction Project Update",
    titleNe: "सडक निर्माण परियोजना अद्यावधिक",
    content: "Phase 2 of the main road construction connecting Ward 1 to Ward 5 has been completed. The new road will be open for public use from December 20.",
    contentNe: "वडा १ देखि वडा ५ जोड्ने मुख्य सडक निर्माणको दोस्रो चरण सम्पन्न भएको छ। नयाँ सडक डिसेम्बर २० देखि सार्वजनिक प्रयोगको लागि खुला हुनेछ।",
    category: "infrastructure",
    date: "2025-12-10",
    important: false
  },
  {
    id: "4",
    title: "Scholarship Applications Now Open",
    titleNe: "छात्रवृत्ति आवेदन अहिले खुला",
    content: "Applications for the annual merit scholarship program are now open. Students from economically disadvantaged families with excellent academic records are encouraged to apply.",
    contentNe: "वार्षिक योग्यता छात्रवृत्ति कार्यक्रमको लागि आवेदनहरू अहिले खुला छन्। उत्कृष्ट शैक्षिक रेकर्ड भएका आर्थिक रूपमा विपन्न परिवारका विद्यार्थीहरूलाई आवेदन दिन प्रोत्साहित गरिन्छ।",
    category: "education",
    date: "2025-12-08",
    important: true
  },
  {
    id: "5",
    title: "Senior Citizen Social Security Distribution",
    titleNe: "वृद्ध नागरिक सामाजिक सुरक्षा वितरण",
    content: "Social security allowance for senior citizens will be distributed from December 18-22 at respective ward offices. Please bring your citizenship certificate and beneficiary card.",
    contentNe: "वृद्ध नागरिकहरूको लागि सामाजिक सुरक्षा भत्ता डिसेम्बर १८-२२ मा सम्बन्धित वडा कार्यालयहरूमा वितरण गरिनेछ। कृपया आफ्नो नागरिकता प्रमाणपत्र र लाभग्राही कार्ड ल्याउनुहोस्।",
    category: "social",
    date: "2025-12-05",
    important: false
  },
  {
    id: "6",
    title: "Public Hearing on Annual Budget",
    titleNe: "वार्षिक बजेटमा सार्वजनिक सुनुवाई",
    content: "A public hearing on the proposed annual budget will be held on December 25 at the Gaupalika office. All citizens are invited to participate and share their views.",
    contentNe: "प्रस्तावित वार्षिक बजेटमा सार्वजनिक सुनुवाई डिसेम्बर २५ मा गाउँपालिका कार्यालयमा हुनेछ। सबै नागरिकहरूलाई सहभागी हुन र आफ्ना विचारहरू साझा गर्न आमन्त्रित गरिन्छ।",
    category: "finance",
    date: "2025-12-03",
    important: true
  }
];

const categories = [
  { value: "all", label: "All", labelNe: "सबै" },
  { value: "health", label: "Health", labelNe: "स्वास्थ्य" },
  { value: "finance", label: "Finance", labelNe: "वित्त" },
  { value: "infrastructure", label: "Infrastructure", labelNe: "पूर्वाधार" },
  { value: "education", label: "Education", labelNe: "शिक्षा" },
  { value: "social", label: "Social", labelNe: "सामाजिक" },
];

export default function Announcements() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAnnouncements = announcements.filter(a => {
    const matchesCategory = selectedCategory === "all" || a.category === selectedCategory;
    const title = language === "ne" ? a.titleNe : a.title;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (value: string) => {
    const cat = categories.find(c => c.value === value);
    return language === "ne" ? cat?.labelNe : cat?.label;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Megaphone className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold">{t("announcements")}</h1>
                <p className="text-primary-foreground/80">{t("announcementsDesc")}</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-xl mt-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card text-foreground"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          {/* Category Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            {categories.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className="flex-shrink-0"
              >
                {language === "ne" ? cat.labelNe : cat.label}
              </Button>
            ))}
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No announcements found</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    announcement.important 
                      ? "bg-accent-light border-accent/30" 
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                  onClick={() => setExpandedId(expandedId === announcement.id ? null : announcement.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          announcement.important 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {getCategoryLabel(announcement.category)}
                        </span>
                        {announcement.important && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive text-destructive-foreground">
                            {language === "ne" ? "महत्त्वपूर्ण" : "Important"}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-1">
                        {language === "ne" ? announcement.titleNe : announcement.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(announcement.date).toLocaleDateString(language === "ne" ? "ne-NP" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </div>
                      
                      {/* Expanded Content */}
                      <motion.div
                        initial={false}
                        animate={{ height: expandedId === announcement.id ? "auto" : 0, opacity: expandedId === announcement.id ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-foreground leading-relaxed">
                          {language === "ne" ? announcement.contentNe : announcement.content}
                        </p>
                      </motion.div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedId === announcement.id ? "rotate-90" : ""
                    }`} />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
