import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Search,
} from "lucide-react";

const stats = [
  { label: "Total Applications", value: "1,234", change: "+12%", icon: FileText, color: "bg-primary" },
  { label: "Pending Review", value: "56", change: "-5%", icon: Clock, color: "bg-accent" },
  { label: "Approved Today", value: "23", change: "+18%", icon: CheckCircle2, color: "bg-secondary" },
  { label: "Active Complaints", value: "12", change: "-8%", icon: MessageSquare, color: "bg-destructive" },
];

const recentApplications = [
  { id: "APP-2025-156", citizen: "Ram Prasad Sharma", type: "Birth Certificate", status: "pending", date: "2 hours ago" },
  { id: "APP-2025-155", citizen: "Sita Kumari KC", type: "Marriage Certificate", status: "approved", date: "4 hours ago" },
  { id: "APP-2025-154", citizen: "Hari Bahadur Tamang", type: "Citizenship Rec.", status: "in_progress", date: "6 hours ago" },
  { id: "APP-2025-153", citizen: "Gita Devi Shrestha", type: "Death Certificate", status: "approved", date: "1 day ago" },
  { id: "APP-2025-152", citizen: "Krishna Lal Maharjan", type: "Residency Cert.", status: "pending", date: "1 day ago" },
];

const recentComplaints = [
  { id: "CMP-001", title: "Road repair needed in Ward 3", status: "in_progress", priority: "high" },
  { id: "CMP-002", title: "Water supply issue", status: "pending", priority: "medium" },
  { id: "CMP-003", title: "Street light not working", status: "resolved", priority: "low" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
    case "resolved":
      return "bg-secondary-light text-secondary";
    case "pending":
      return "bg-accent-light text-accent";
    case "in_progress":
      return "bg-primary-light text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

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
                    <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
                    <span className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium">
                      Administrator
                    </span>
                  </div>
                  <p className="text-sm text-sidebar-foreground/70">admin@likhugaupalika.gov.np</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-sidebar-accent border-none text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent w-64"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith("+") ? "text-secondary" : "text-destructive"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-display font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display font-bold text-foreground">
                    Recent Applications
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Citizen</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-2 text-sm font-mono text-muted-foreground">{app.id}</td>
                          <td className="py-3 px-2 text-sm text-foreground">{app.citizen}</td>
                          <td className="py-3 px-2 text-sm text-foreground">{app.type}</td>
                          <td className="py-3 px-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${getStatusBadge(app.status)}`}>
                              {app.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{app.date}</td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-display font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/certificates">
                      <FileText className="h-4 w-4" />
                      Manage Certificates
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/complaints">
                      <MessageSquare className="h-4 w-4" />
                      Review Complaints
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/announcements">
                      <Bell className="h-4 w-4" />
                      Post Announcement
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/family">
                      <Users className="h-4 w-4" />
                      Family Records
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Recent Complaints */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-foreground">Recent Complaints</h3>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="p-3 rounded-lg bg-muted"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{complaint.title}</p>
                          <span className="text-xs text-muted-foreground">{complaint.id}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getStatusBadge(complaint.status)}`}>
                          {complaint.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6 rounded-xl gradient-hero text-primary-foreground"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5" />
                  <h3 className="font-display font-bold">Today's Schedule</h3>
                </div>
                <div className="space-y-2 text-sm text-primary-foreground/80">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span>10:00 AM - Ward meeting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    <span>2:00 PM - Certificate review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary-foreground/50" />
                    <span>4:00 PM - Complaint hearing</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}