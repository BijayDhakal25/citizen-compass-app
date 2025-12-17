import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications, ApplicationStatus, CertificateType } from "@/contexts/ApplicationContext";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Eye,
  MessageSquare,
  Users,
  XCircle,
} from "lucide-react";

const CERTIFICATE_NAMES: Record<CertificateType, string> = {
  birth: "Birth Certificate",
  death: "Death Certificate",
  marriage: "Marriage Certificate",
  citizenship: "Citizenship Recommendation",
  residency: "Residency Certificate"
};

const quickActions = [
  { icon: FileText, label: "New Application", href: "/services", color: "bg-primary" },
  { icon: MessageSquare, label: "File Complaint", href: "/complaints", color: "bg-accent" },
  { icon: Users, label: "Family Records", href: "/family", color: "bg-secondary" },
  { icon: Eye, label: "Track Status", href: "/my-applications", color: "bg-primary" },
];

const getStatusBadge = (status: ApplicationStatus) => {
  switch (status) {
    case "approved":
      return { icon: CheckCircle2, text: "Approved", className: "bg-secondary-light text-secondary" };
    case "pending":
      return { icon: Clock, text: "Pending", className: "bg-accent-light text-accent" };
    case "in_progress":
      return { icon: AlertCircle, text: "In Progress", className: "bg-primary-light text-primary" };
    case "rejected":
      return { icon: XCircle, text: "Rejected", className: "bg-destructive/10 text-destructive" };
    default:
      return { icon: Clock, text: "Unknown", className: "bg-muted text-muted-foreground" };
  }
};

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getApplicationsByUser, getNotificationsByUser, markNotificationRead, markAllNotificationsRead } = useApplications();
  const [, setRefresh] = useState(0);

  // Force refresh every 5 seconds for live updates
  useEffect(() => {
    const interval = setInterval(() => setRefresh(r => r + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const applications = getApplicationsByUser(user.id);
  const notifications = getNotificationsByUser(user.id);
  const unreadCount = notifications.filter(n => !n.read).length;

  const stats = {
    total: applications.length,
    approved: applications.filter(a => a.status === "approved").length,
    pending: applications.filter(a => a.status === "pending").length,
    inProgress: applications.filter(a => a.status === "in_progress").length,
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-muted">
        {/* Dashboard Header */}
        <div className="gradient-hero text-primary-foreground py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold">Welcome, {user.name}</h1>
                  <p className="text-primary-foreground/80">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="heroOutline" size="sm" asChild className="relative">
                  <Link to="/settings/notifications">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                    <span className="sr-only md:not-sr-only">Notifications</span>
                  </Link>
                </Button>
                <Button variant="heroOutline" size="sm" asChild>
                  <Link to="/settings/notifications">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only">Settings</span>
                  </Link>
                </Button>
                <Button variant="hero" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-lg font-display font-bold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.label}
                      to={action.href}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover-lift text-center"
                    >
                      <div className={`h-12 w-12 rounded-lg ${action.color} flex items-center justify-center mx-auto mb-3`}>
                        <action.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Recent Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-bold text-foreground">
                    Recent Applications
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/my-applications">
                      View All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {applications.length === 0 ? (
                  <div className="p-8 rounded-xl bg-card border border-border text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No applications yet</p>
                    <Button asChild>
                      <Link to="/services">Apply Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => {
                      const status = getStatusBadge(app.status);
                      return (
                        <div
                          key={app.id}
                          className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-muted-foreground">
                                  {app.id}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                                  <status.icon className="h-3 w-3" />
                                  {status.text}
                                </span>
                              </div>
                              <h3 className="font-medium text-foreground">{CERTIFICATE_NAMES[app.type]}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">{formatDate(app.submittedAt)}</div>
                              <Button variant="link" size="sm" className="h-auto p-0 mt-1" asChild>
                                <Link to="/my-applications">View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link to="/services">
                    <Plus className="h-4 w-4" />
                    New Application
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-display font-bold text-foreground mb-4">
                  Your Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Applications</span>
                    <span className="font-bold text-foreground">{stats.total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Approved</span>
                    <span className="font-bold text-secondary">{stats.approved}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="font-bold text-accent">{stats.pending}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">In Progress</span>
                    <span className="font-bold text-primary">{stats.inProgress}</span>
                  </div>
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-foreground">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No notifications yet</p>
                ) : (
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-lg text-sm cursor-pointer ${
                          notif.read ? "bg-muted" : "bg-primary-light"
                        }`}
                        onClick={() => markNotificationRead(notif.id)}
                      >
                        <p className="text-foreground font-medium">{notif.title}</p>
                        <p className="text-muted-foreground text-xs mt-1">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                )}
                {notifications.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => markAllNotificationsRead(user.id)}
                  >
                    Mark All as Read
                  </Button>
                )}
              </motion.div>

              {/* Help Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl gradient-success text-secondary-foreground"
              >
                <h3 className="font-display font-bold mb-2">Need Help?</h3>
                <p className="text-sm text-secondary-foreground/80 mb-4">
                  Contact our support team for assistance with your applications.
                </p>
                <Button variant="hero" size="sm" className="bg-card text-secondary hover:bg-card/90" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
