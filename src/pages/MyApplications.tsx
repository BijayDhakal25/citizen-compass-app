import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications, Application, ApplicationStatus, CertificateType } from "@/contexts/ApplicationContext";
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Plus,
  RefreshCw
} from "lucide-react";

const CERTIFICATE_NAMES: Record<CertificateType, string> = {
  birth: "Birth Certificate",
  death: "Death Certificate",
  marriage: "Marriage Certificate",
  citizenship: "Citizenship Recommendation",
  residency: "Residency Certificate"
};

const getStatusConfig = (status: ApplicationStatus) => {
  switch (status) {
    case "approved":
      return { icon: CheckCircle2, text: "Approved", className: "bg-secondary/10 text-secondary border-secondary/20" };
    case "pending":
      return { icon: Clock, text: "Pending", className: "bg-accent/10 text-accent border-accent/20" };
    case "in_progress":
      return { icon: AlertCircle, text: "In Progress", className: "bg-primary/10 text-primary border-primary/20" };
    case "rejected":
      return { icon: XCircle, text: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" };
    default:
      return { icon: Clock, text: "Unknown", className: "bg-muted text-muted-foreground" };
  }
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

function getTimeRemaining(submittedAt: number) {
  const elapsed = Date.now() - submittedAt;
  const remaining = 60000 - elapsed; // 1 minute auto-approve
  if (remaining <= 0) return null;
  const seconds = Math.ceil(remaining / 1000);
  return `Auto-approval in ${seconds}s`;
}

export default function MyApplications() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getApplicationsByUser } = useApplications();
  const [, setRefresh] = useState(0);

  // Force refresh every second for countdown
  useEffect(() => {
    const interval = setInterval(() => setRefresh(r => r + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const applications = getApplicationsByUser(user.id);

  return (
    <Layout>
      <section className="py-8 min-h-[80vh]">
        <div className="container">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-display font-bold text-foreground">My Applications</h1>
              <Button asChild>
                <Link to="/services">
                  <Plus className="h-4 w-4 mr-2" />
                  New Application
                </Link>
              </Button>
            </div>

            {applications.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-display font-bold text-foreground mb-2">
                  No Applications Yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any applications. Start by choosing a service.
                </p>
                <Button asChild>
                  <Link to="/services">Browse Services</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, index) => {
                  const status = getStatusConfig(app.status);
                  const timeRemaining = app.status === "pending" ? getTimeRemaining(app.submittedAt) : null;
                  
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card rounded-xl border border-border p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-mono text-muted-foreground">
                              {app.id}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.className}`}>
                              <status.icon className="h-3.5 w-3.5" />
                              {status.text}
                            </span>
                            {timeRemaining && (
                              <span className="inline-flex items-center gap-1 text-xs text-accent">
                                <RefreshCw className="h-3 w-3 animate-spin" />
                                {timeRemaining}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-medium text-foreground mb-1">
                            {CERTIFICATE_NAMES[app.type]}
                          </h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Submitted: {formatDate(app.submittedAt)}</p>
                            {app.status !== "pending" && (
                              <p>Updated: {formatDate(app.updatedAt)}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      {/* Application Data Preview */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Application Data:</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(app.data).slice(0, 4).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>{" "}
                              <span className="text-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
