import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Bell,
  Calendar,
  Eye,
  AlertTriangle
} from "lucide-react";

export interface Announcement {
  id: string;
  title: string;
  titleNe: string;
  content: string;
  contentNe: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "draft" | "published" | "archived";
  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
  author: string;
}

const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "New Health Camp Schedule Released",
    titleNe: "नयाँ स्वास्थ्य शिविर तालिका जारी",
    content: "Free health checkup camp will be organized on December 20-22, 2025 at the municipality office premises. Services include general checkup, blood pressure, diabetes screening, and eye examination. All citizens are encouraged to participate.",
    contentNe: "नगरपालिका कार्यालय परिसरमा २०२५ डिसेम्बर २०-२२ मा निःशुल्क स्वास्थ्य जाँच शिविर आयोजना गरिनेछ। सेवाहरूमा सामान्य जाँच, रक्तचाप, मधुमेह जाँच र आँखा परीक्षा समावेश छ।",
    category: "health",
    priority: "high",
    status: "published",
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
    publishedAt: Date.now() - 86400000 * 3,
    author: "Admin User"
  },
  {
    id: "ann-002",
    title: "Property Tax Payment Deadline Extended",
    titleNe: "सम्पत्ति कर भुक्तानी म्याद थपियो",
    content: "The deadline for property tax payment has been extended to January 15, 2026. Citizens are requested to clear their dues before the deadline to avoid penalties. Payment can be made online or at the municipality office.",
    contentNe: "सम्पत्ति कर भुक्तानी म्याद जनवरी १५, २०२६ सम्म थपिएको छ। जरिवाना बच्न नागरिकहरूलाई म्याद भित्र बक्यौता तिर्न अनुरोध छ।",
    category: "finance",
    priority: "medium",
    status: "published",
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 6,
    publishedAt: Date.now() - 86400000 * 6,
    author: "Admin User"
  },
  {
    id: "ann-003",
    title: "Road Construction Project Update",
    titleNe: "सडक निर्माण परियोजना अपडेट",
    content: "The road construction work on the main highway will cause temporary traffic disruption from December 18-25. Alternative routes have been arranged. We apologize for the inconvenience.",
    contentNe: "मुख्य राजमार्गमा सडक निर्माण कार्यले डिसेम्बर १८-२५ सम्म अस्थायी ट्राफिक अवरोध हुनेछ। वैकल्पिक मार्गहरू व्यवस्था गरिएको छ।",
    category: "infrastructure",
    priority: "high",
    status: "published",
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 86400000 * 8,
    publishedAt: Date.now() - 86400000 * 8,
    author: "Admin User"
  },
  {
    id: "ann-004",
    title: "Scholarship Applications Open",
    titleNe: "छात्रवृत्ति आवेदन खुला",
    content: "Applications for the annual scholarship program are now open. Eligible students from low-income families can apply before January 31, 2026.",
    contentNe: "वार्षिक छात्रवृत्ति कार्यक्रमका लागि आवेदनहरू अब खुला छन्। कम आय भएका परिवारका योग्य विद्यार्थीहरूले जनवरी ३१, २०२६ अघि आवेदन दिन सक्नुहुन्छ।",
    category: "education",
    priority: "medium",
    status: "published",
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 10,
    publishedAt: Date.now() - 86400000 * 10,
    author: "Admin User"
  },
  {
    id: "ann-005",
    title: "Senior Citizen Allowance Distribution",
    titleNe: "ज्येष्ठ नागरिक भत्ता वितरण",
    content: "Senior citizen allowance for the quarter will be distributed starting December 25. Please bring your ID card and allowance card.",
    contentNe: "त्रैमासिक ज्येष्ठ नागरिक भत्ता डिसेम्बर २५ देखि वितरण हुनेछ। कृपया परिचयपत्र र भत्ता कार्ड ल्याउनुहोस्।",
    category: "social",
    priority: "low",
    status: "draft",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    author: "Admin User"
  }
];

const categories = [
  { value: "health", label: "Health", labelNe: "स्वास्थ्य" },
  { value: "finance", label: "Finance", labelNe: "वित्त" },
  { value: "infrastructure", label: "Infrastructure", labelNe: "पूर्वाधार" },
  { value: "education", label: "Education", labelNe: "शिक्षा" },
  { value: "social", label: "Social", labelNe: "सामाजिक" },
  { value: "general", label: "General", labelNe: "सामान्य" },
];

export default function AdminAnnouncements() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    titleNe: "",
    content: "",
    contentNe: "",
    category: "general",
    priority: "medium" as "low" | "medium" | "high",
    status: "draft" as "draft" | "published" | "archived",
  });

  useEffect(() => {
    // Load from localStorage or use demo data
    const stored = localStorage.getItem("announcements");
    if (stored) {
      setAnnouncements(JSON.parse(stored));
    } else {
      setAnnouncements(DEMO_ANNOUNCEMENTS);
      localStorage.setItem("announcements", JSON.stringify(DEMO_ANNOUNCEMENTS));
    }
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      localStorage.setItem("announcements", JSON.stringify(announcements));
    }
  }, [announcements]);

  // Redirect non-admin users
  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    navigate("/");
    return null;
  }

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.titleNe.includes(searchQuery) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || ann.category === filterCategory;
    const matchesStatus = filterStatus === "all" || ann.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenModal = (announcement?: Announcement) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
      setFormData({
        title: announcement.title,
        titleNe: announcement.titleNe,
        content: announcement.content,
        contentNe: announcement.contentNe,
        category: announcement.category,
        priority: announcement.priority,
        status: announcement.status,
      });
    } else {
      setEditingAnnouncement(null);
      setFormData({
        title: "",
        titleNe: "",
        content: "",
        contentNe: "",
        category: "general",
        priority: "medium",
        status: "draft",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: language === "ne" ? "त्रुटि" : "Error",
        description: language === "ne" ? "शीर्षक र सामग्री आवश्यक छ" : "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    const now = Date.now();
    if (editingAnnouncement) {
      // Update existing
      setAnnouncements(prev => prev.map(ann => 
        ann.id === editingAnnouncement.id 
          ? { 
              ...ann, 
              ...formData, 
              updatedAt: now,
              publishedAt: formData.status === "published" && !ann.publishedAt ? now : ann.publishedAt
            }
          : ann
      ));
      toast({
        title: language === "ne" ? "सफल" : "Success",
        description: language === "ne" ? "सूचना अपडेट भयो" : "Announcement updated",
      });
    } else {
      // Create new
      const newAnnouncement: Announcement = {
        id: `ann-${Date.now()}`,
        ...formData,
        createdAt: now,
        updatedAt: now,
        publishedAt: formData.status === "published" ? now : undefined,
        author: user?.name || "Admin",
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast({
        title: language === "ne" ? "सफल" : "Success",
        description: language === "ne" ? "नयाँ सूचना सिर्जना भयो" : "New announcement created",
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deletingId) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== deletingId));
      toast({
        title: language === "ne" ? "सफल" : "Success",
        description: language === "ne" ? "सूचना मेटियो" : "Announcement deleted",
      });
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: "bg-muted text-muted-foreground",
      medium: "bg-accent/20 text-accent",
      high: "bg-destructive/20 text-destructive"
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: "bg-muted text-muted-foreground",
      published: "bg-secondary/20 text-secondary",
      archived: "bg-primary/20 text-primary"
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <Layout>
      <section className="py-8">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                {language === "ne" ? "सूचना व्यवस्थापन" : "Announcements Management"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "ne" ? "सार्वजनिक सूचनाहरू सिर्जना, सम्पादन र मेटाउनुहोस्" : "Create, edit, and delete public announcements"}
              </p>
            </div>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="h-4 w-4 mr-2" />
              {language === "ne" ? "नयाँ सूचना" : "New Announcement"}
            </Button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "ne" ? "सूचनाहरू खोज्नुहोस्..." : "Search announcements..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === "ne" ? "श्रेणी" : "Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "ne" ? "सबै श्रेणी" : "All Categories"}</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {language === "ne" ? cat.labelNe : cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={language === "ne" ? "स्थिति" : "Status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "ne" ? "सबै स्थिति" : "All Status"}</SelectItem>
                <SelectItem value="draft">{language === "ne" ? "ड्राफ्ट" : "Draft"}</SelectItem>
                <SelectItem value="published">{language === "ne" ? "प्रकाशित" : "Published"}</SelectItem>
                <SelectItem value="archived">{language === "ne" ? "संग्रहित" : "Archived"}</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "ne" ? "शीर्षक" : "Title"}</TableHead>
                  <TableHead>{language === "ne" ? "श्रेणी" : "Category"}</TableHead>
                  <TableHead>{language === "ne" ? "प्राथमिकता" : "Priority"}</TableHead>
                  <TableHead>{language === "ne" ? "स्थिति" : "Status"}</TableHead>
                  <TableHead>{language === "ne" ? "मिति" : "Date"}</TableHead>
                  <TableHead className="text-right">{language === "ne" ? "कार्यहरू" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnnouncements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {language === "ne" ? "कुनै सूचना फेला परेन" : "No announcements found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAnnouncements.map(ann => (
                    <TableRow key={ann.id}>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <p className="font-medium truncate">{language === "ne" ? ann.titleNe || ann.title : ann.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {(language === "ne" ? ann.contentNe || ann.content : ann.content).slice(0, 60)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {language === "ne" 
                            ? categories.find(c => c.value === ann.category)?.labelNe 
                            : categories.find(c => c.value === ann.category)?.label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(ann.priority)}>
                          {language === "ne" 
                            ? (ann.priority === "high" ? "उच्च" : ann.priority === "medium" ? "मध्यम" : "न्यून")
                            : ann.priority
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(ann.status)}>
                          {language === "ne"
                            ? (ann.status === "published" ? "प्रकाशित" : ann.status === "draft" ? "ड्राफ्ट" : "संग्रहित")
                            : ann.status
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(ann.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleOpenModal(ann)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setDeletingId(ann.id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAnnouncement 
                ? (language === "ne" ? "सूचना सम्पादन" : "Edit Announcement")
                : (language === "ne" ? "नयाँ सूचना" : "New Announcement")
              }
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === "ne" ? "शीर्षक (English)" : "Title (English)"}</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title in English"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>{language === "ne" ? "शीर्षक (नेपाली)" : "Title (Nepali)"}</Label>
                <Input
                  value={formData.titleNe}
                  onChange={(e) => setFormData({ ...formData, titleNe: e.target.value })}
                  placeholder="नेपालीमा शीर्षक"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>{language === "ne" ? "सामग्री (English)" : "Content (English)"}</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter content in English"
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label>{language === "ne" ? "सामग्री (नेपाली)" : "Content (Nepali)"}</Label>
              <Textarea
                value={formData.contentNe}
                onChange={(e) => setFormData({ ...formData, contentNe: e.target.value })}
                placeholder="नेपालीमा सामग्री"
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>{language === "ne" ? "श्रेणी" : "Category"}</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {language === "ne" ? cat.labelNe : cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{language === "ne" ? "प्राथमिकता" : "Priority"}</Label>
                <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as any })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{language === "ne" ? "न्यून" : "Low"}</SelectItem>
                    <SelectItem value="medium">{language === "ne" ? "मध्यम" : "Medium"}</SelectItem>
                    <SelectItem value="high">{language === "ne" ? "उच्च" : "High"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{language === "ne" ? "स्थिति" : "Status"}</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as any })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{language === "ne" ? "ड्राफ्ट" : "Draft"}</SelectItem>
                    <SelectItem value="published">{language === "ne" ? "प्रकाशित" : "Published"}</SelectItem>
                    <SelectItem value="archived">{language === "ne" ? "संग्रहित" : "Archived"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel"}
            </Button>
            <Button onClick={handleSave}>
              {editingAnnouncement 
                ? (language === "ne" ? "अपडेट गर्नुहोस्" : "Update")
                : (language === "ne" ? "सिर्जना गर्नुहोस्" : "Create")
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              {language === "ne" ? "सूचना मेटाउनुहोस्" : "Delete Announcement"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            {language === "ne" 
              ? "के तपाईं यो सूचना मेटाउन निश्चित हुनुहुन्छ? यो कार्य पूर्ववत गर्न सकिँदैन।"
              : "Are you sure you want to delete this announcement? This action cannot be undone."
            }
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel"}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {language === "ne" ? "मेटाउनुहोस्" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
