import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications, Application, ApplicationStatus, CertificateType, ApplicationDocument } from "@/contexts/ApplicationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DocumentPreviewModal } from "@/components/DocumentPreviewModal";
import {
  Users,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Search,
  Eye,
  Download,
  User,
  Mail,
  FileImage,
  File,
  X,
  Megaphone
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const CERTIFICATE_NAMES: Record<CertificateType, { en: string; ne: string }> = {
  birth: { en: "Birth Certificate", ne: "जन्म प्रमाणपत्र" },
  death: { en: "Death Certificate", ne: "मृत्यु प्रमाणपत्र" },
  marriage: { en: "Marriage Certificate", ne: "विवाह प्रमाणपत्र" },
  citizenship: { en: "Citizenship Recommendation", ne: "नागरिकता सिफारिस" },
  residency: { en: "Residency Certificate", ne: "बसोबास प्रमाणपत्र" }
};

const STATUS_CONFIG: Record<ApplicationStatus, { icon: typeof Clock; className: string }> = {
  pending: { icon: Clock, className: "bg-accent/10 text-accent border-accent/20" },
  in_progress: { icon: AlertCircle, className: "bg-primary/10 text-primary border-primary/20" },
  approved: { icon: CheckCircle2, className: "bg-secondary/10 text-secondary border-secondary/20" },
  rejected: { icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" }
};

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getRelativeTime(timestamp: number, isNepali: boolean) {
  const diff = Date.now() - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return isNepali ? `${days} दिन अघि` : `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return isNepali ? `${hours} घण्टा अघि` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return isNepali ? "भर्खरै" : "Just now";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllApplications, updateApplicationStatus } = useApplications();
  const { language, t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [actionComment, setActionComment] = useState("");
  const [previewDocument, setPreviewDocument] = useState<ApplicationDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Redirect non-admin users
  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    navigate("/login");
    return null;
  }

  const applications = getAllApplications();
  const isNepali = language === "ne";
  
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    inProgress: applications.filter(a => a.status === "in_progress").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setIsDetailOpen(true);
  };

  const handleAction = (app: Application, type: "approve" | "reject") => {
    setSelectedApp(app);
    setActionType(type);
    setActionComment("");
    setIsActionOpen(true);
  };

  const submitAction = () => {
    if (!selectedApp || !actionType) return;
    
    const newStatus: ApplicationStatus = actionType === "approve" ? "approved" : "rejected";
    updateApplicationStatus(selectedApp.id, newStatus, actionComment, user?.name);
    
    toast({
      title: isNepali ? "सफल" : "Success",
      description: isNepali 
        ? `आवेदन ${actionType === "approve" ? "स्वीकृत" : "अस्वीकार"} गरियो`
        : `Application ${actionType === "approve" ? "approved" : "rejected"} successfully`,
    });
    
    setIsActionOpen(false);
    setIsDetailOpen(false);
    setSelectedApp(null);
    setActionType(null);
    setActionComment("");
  };

  const handleViewDocument = (doc: ApplicationDocument) => {
    setPreviewDocument(doc);
    setIsPreviewOpen(true);
  };

  const getDocIcon = (type: string) => {
    if (type.startsWith("image/")) return FileImage;
    return File;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-muted">
        {/* Admin Header */}
        <div className="bg-sidebar text-sidebar-foreground py-6">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-sidebar-accent flex items-center justify-center">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-display font-bold">{t("adminDashboard")}</h1>
                    <span className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium">
                      {isNepali ? "प्रशासक" : "Administrator"}
                    </span>
                  </div>
                  <p className="text-sm text-sidebar-foreground/70">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent" asChild>
                  <Link to="/admin/announcements">
                    <Megaphone className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent" asChild>
                  <Link to="/settings/notifications">
                    <Bell className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent" asChild>
                  <Link to="/settings/notifications">
                    <Settings className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: isNepali ? "कुल" : "Total", value: stats.total, color: "bg-card", icon: FileText },
              { label: t("pending"), value: stats.pending, color: "bg-accent/10", icon: Clock },
              { label: t("inProgress"), value: stats.inProgress, color: "bg-primary/10", icon: AlertCircle },
              { label: t("approved"), value: stats.approved, color: "bg-secondary/10", icon: CheckCircle2 },
              { label: isNepali ? "अस्वीकृत" : "Rejected", value: stats.rejected, color: "bg-destructive/10", icon: XCircle }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${stat.color} rounded-xl border border-border p-4`}
              >
                <div className="flex items-center gap-3">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isNepali ? "आईडी, नाम वा इमेलले खोज्नुहोस्..." : "Search by ID, name or email..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["all", "pending", "in_progress", "approved", "rejected"] as const).map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" && (isNepali ? "सबै" : "All")}
                  {status === "pending" && t("pending")}
                  {status === "in_progress" && t("inProgress")}
                  {status === "approved" && t("approved")}
                  {status === "rejected" && (isNepali ? "अस्वीकृत" : "Rejected")}
                </Button>
              ))}
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-display font-bold text-foreground">
                {t("allApplications")} ({filteredApplications.length})
              </h2>
            </div>
            
            {filteredApplications.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isNepali ? "कुनै आवेदन भेटिएन" : "No applications found"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredApplications.map((app, index) => {
                  const status = STATUS_CONFIG[app.status];
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-sm font-mono text-primary">{app.id}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.className}`}>
                              <StatusIcon className="h-3 w-3" />
                              {app.status === "pending" && t("pending")}
                              {app.status === "in_progress" && t("inProgress")}
                              {app.status === "approved" && t("approved")}
                              {app.status === "rejected" && (isNepali ? "अस्वीकृत" : "Rejected")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {getRelativeTime(app.submittedAt, isNepali)}
                            </span>
                          </div>
                          <h3 className="font-medium text-foreground mb-1">
                            {CERTIFICATE_NAMES[app.type][language]}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" />
                              {app.userName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {app.userEmail}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              {app.documents.length} {isNepali ? "कागजात" : "docs"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(app)}>
                            <Eye className="h-4 w-4 mr-1" />
                            {t("viewDetails")}
                          </Button>
                          {(app.status === "pending" || app.status === "in_progress") && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-secondary hover:bg-secondary/90"
                                onClick={() => handleAction(app, "approve")}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                {t("approve")}
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleAction(app, "reject")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                {t("reject")}
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedApp?.id} - {selectedApp && CERTIFICATE_NAMES[selectedApp.type][language]}
            </DialogTitle>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-6">
              {/* Applicant Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">
                  {isNepali ? "आवेदक विवरण" : "Applicant Information"}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{isNepali ? "नाम" : "Name"}:</span>
                    <span className="ml-2 text-foreground">{selectedApp.userName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isNepali ? "इमेल" : "Email"}:</span>
                    <span className="ml-2 text-foreground">{selectedApp.userEmail}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isNepali ? "पेश गरिएको" : "Submitted"}:</span>
                    <span className="ml-2 text-foreground">{formatDate(selectedApp.submittedAt)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isNepali ? "अपडेट" : "Updated"}:</span>
                    <span className="ml-2 text-foreground">{formatDate(selectedApp.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Application Data */}
              <div>
                <h4 className="font-medium text-foreground mb-3">
                  {isNepali ? "आवेदन विवरण" : "Application Details"}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(selectedApp.data).map(([key, value]) => (
                    <div key={key} className="bg-muted/30 rounded p-2">
                      <span className="text-muted-foreground capitalize block text-xs">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-medium text-foreground mb-3">
                  {isNepali ? "कागजातहरू" : "Documents"} ({selectedApp.documents.length})
                </h4>
                <div className="space-y-2">
                  {selectedApp.documents.map((doc) => {
                    const DocIcon = getDocIcon(doc.type);
                    return (
                      <div 
                        key={doc.id}
                        className="flex items-center justify-between bg-muted/30 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <DocIcon className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {isNepali ? "अपलोड" : "Uploaded"}: {formatDate(doc.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {isNepali ? "हेर्नुहोस्" : "View"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            {isNepali ? "डाउनलोड" : "Download"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comments */}
              <div>
                <h4 className="font-medium text-foreground mb-3">
                  {isNepali ? "टिप्पणीहरू" : "Comments"} ({selectedApp.comments.length})
                </h4>
                {selectedApp.comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {isNepali ? "कुनै टिप्पणी छैन" : "No comments yet"}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedApp.comments.map((comment) => (
                      <div key={comment.id} className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-sm text-foreground pl-6">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {(selectedApp.status === "pending" || selectedApp.status === "in_progress") && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    className="flex-1 bg-secondary hover:bg-secondary/90"
                    onClick={() => {
                      setIsDetailOpen(false);
                      handleAction(selectedApp, "approve");
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {t("approve")}
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      setIsDetailOpen(false);
                      handleAction(selectedApp, "reject");
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {t("reject")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={isActionOpen} onOpenChange={setIsActionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" 
                ? (isNepali ? "आवेदन स्वीकृत गर्नुहोस्" : "Approve Application")
                : (isNepali ? "आवेदन अस्वीकार गर्नुहोस्" : "Reject Application")
              }
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {isNepali 
                ? `के तपाईं ${selectedApp?.id} ${actionType === "approve" ? "स्वीकृत" : "अस्वीकार"} गर्न चाहनुहुन्छ?`
                : `Are you sure you want to ${actionType} application ${selectedApp?.id}?`
              }
            </p>
            
            <div>
              <label className="text-sm font-medium text-foreground">
                {t("comment")} ({t("optional")})
              </label>
              <Textarea
                placeholder={isNepali ? "टिप्पणी थप्नुहोस्..." : "Add a comment..."}
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setIsActionOpen(false)}>
                {t("cancel")}
              </Button>
              <Button 
                className={`flex-1 ${actionType === "approve" ? "bg-secondary hover:bg-secondary/90" : ""}`}
                variant={actionType === "reject" ? "destructive" : "default"}
                onClick={submitAction}
              >
                {actionType === "approve" ? t("approve") : t("reject")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        document={previewDocument}
      />
    </Layout>
  );
}
