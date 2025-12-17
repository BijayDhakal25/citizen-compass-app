import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications } from "@/contexts/ApplicationContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bell, Mail, MessageSquare, Megaphone, FileText, Save } from "lucide-react";

export default function NotificationSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notificationSettings, updateNotificationSettings } = useApplications();
  const { toast } = useToast();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleToggle = (key: keyof typeof notificationSettings) => {
    updateNotificationSettings({ [key]: !notificationSettings[key] });
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved."
    });
  };

  const settings = [
    {
      key: "emailNotifications" as const,
      icon: Mail,
      title: "Email Notifications",
      description: "Receive updates via email"
    },
    {
      key: "smsNotifications" as const,
      icon: MessageSquare,
      title: "SMS Notifications",
      description: "Receive updates via SMS"
    },
    {
      key: "applicationUpdates" as const,
      icon: FileText,
      title: "Application Updates",
      description: "Get notified when your application status changes"
    },
    {
      key: "announcements" as const,
      icon: Megaphone,
      title: "Announcements",
      description: "Receive public announcements and news"
    }
  ];

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
            className="max-w-xl mx-auto"
          >
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="gradient-hero text-primary-foreground p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-display font-bold">Notification Settings</h1>
                    <p className="text-sm text-primary-foreground/80">
                      Manage how you receive notifications
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="p-6 space-y-6">
                {settings.map(setting => (
                  <div 
                    key={setting.key}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <setting.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label className="font-medium">{setting.title}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings[setting.key]}
                      onCheckedChange={() => handleToggle(setting.key)}
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Changes are saved automatically
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
