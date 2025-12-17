import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit2, 
  Save,
  User,
  Calendar,
  UserCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  gender: string;
  citizenshipNo?: string;
}

const initialMembers: FamilyMember[] = [];

export default function FamilyRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem("family_members");
    return saved ? JSON.parse(saved) : initialMembers;
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    dateOfBirth: "",
    gender: "",
    citizenshipNo: ""
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const saveMembers = (newMembers: FamilyMember[]) => {
    setMembers(newMembers);
    localStorage.setItem("family_members", JSON.stringify(newMembers));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.relationship || !formData.dateOfBirth || !formData.gender) {
      toast({
        title: t("error"),
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      const updated = members.map(m => 
        m.id === editingId ? { ...formData, id: editingId } : m
      );
      saveMembers(updated);
      toast({ title: t("success"), description: "Family member updated" });
    } else {
      const newMember: FamilyMember = {
        ...formData,
        id: `FM-${Date.now()}`
      };
      saveMembers([...members, newMember]);
      toast({ title: t("success"), description: "Family member added" });
    }

    setFormData({ name: "", relationship: "", dateOfBirth: "", gender: "", citizenshipNo: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (member: FamilyMember) => {
    setFormData({
      name: member.name,
      relationship: member.relationship,
      dateOfBirth: member.dateOfBirth,
      gender: member.gender,
      citizenshipNo: member.citizenshipNo || ""
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    saveMembers(members.filter(m => m.id !== id));
    toast({ title: t("success"), description: "Family member removed" });
  };

  const relationships = [
    { value: "self", label: language === "ne" ? "आफू" : "Self" },
    { value: "father", label: t("father") },
    { value: "mother", label: t("mother") },
    { value: "spouse", label: t("spouse") },
    { value: "son", label: t("son") },
    { value: "daughter", label: t("daughter") },
    { value: "brother", label: t("brother") },
    { value: "sister", label: t("sister") },
  ];

  const genders = [
    { value: "male", label: t("male") },
    { value: "female", label: t("female") },
    { value: "other", label: t("other") },
  ];

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
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">{t("familyRegistration")}</h1>
              <p className="text-primary-foreground/80">{t("familyRegistrationDesc")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-4xl">
          {/* Add Member Button */}
          {!showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <Button onClick={() => setShowForm(true)} size="lg">
                <Plus className="h-5 w-5 mr-2" />
                {t("addFamilyMember")}
              </Button>
            </motion.div>
          )}

          {/* Add/Edit Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-card rounded-xl border border-border"
            >
              <h2 className="text-xl font-display font-bold mb-4">
                {editingId ? t("edit") : t("addFamilyMember")}
              </h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t("memberName")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship">{t("relationship")} *</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={value => setFormData({ ...formData, relationship: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationships.map(r => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dob">{t("dateOfBirth")} *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">{t("gender")} *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={value => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map(g => (
                        <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="citizenship">Citizenship No. ({t("optional")})</Label>
                  <Input
                    id="citizenship"
                    value={formData.citizenshipNo}
                    onChange={e => setFormData({ ...formData, citizenshipNo: e.target.value })}
                    placeholder="Enter citizenship number if available"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2 flex gap-3 pt-2">
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? t("save") : t("addFamilyMember")}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({ name: "", relationship: "", dateOfBirth: "", gender: "", citizenshipNo: "" });
                    }}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Family Members List */}
          <div className="space-y-4">
            {members.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Family Members</h3>
                <p className="text-muted-foreground mb-4">Add your family members to get started</p>
              </div>
            ) : (
              members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{member.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {relationships.find(r => r.value === member.relationship)?.label || member.relationship}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(member.dateOfBirth).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
