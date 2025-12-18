import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications } from "@/contexts/ApplicationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bell, Mail, MessageSquare, Megaphone, FileText, Smartphone, Globe, Save } from "lucide-react";

export default function NotificationSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notificationSettings, updateNotificationSettings } = useApplications();
  const { language } = useLanguage();
  const { toast } = useToast();

  const isNepali = language === "ne";

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleToggle = (key: keyof typeof notificationSettings) => {
    updateNotificationSettings({ [key]: !notificationSettings[key] });
    toast({
      title: isNepali ? "सेटिङ अपडेट भयो" : "Settings Updated",
      description: isNepali ? "तपाईंको सूचना प्राथमिकताहरू सुरक्षित गरियो।" : "Your notification preferences have been saved."
    });
  };

  const settings = [
    {
      key: "emailNotifications" as const,
      icon: Mail,
      title: isNepali ? "इमेल सूचनाहरू" : "Email Notifications",
      description: isNepali ? "इमेलमार्फत अपडेटहरू प्राप्त गर्नुहोस्" : "Receive updates via email"
    },
    {
      key: "smsNotifications" as const,
      icon: Smartphone,
      title: isNepali ? "SMS सूचनाहरू" : "SMS Notifications",
      description: isNepali ? "SMS मार्फत अपडेटहरू प्राप्त गर्नुहोस्" : "Receive updates via SMS"
    },
    {
      key: "applicationUpdates" as const,
      icon: FileText,
      title: isNepali ? "आवेदन अपडेटहरू" : "Application Updates",
      description: isNepali ? "तपाईंको आवेदनको स्थिति परिवर्तन हुँदा सूचित हुनुहोस्" : "Get notified when your application status changes"
    },
    {
      key: "announcements" as const,
      icon: Megaphone,
      title: isNepali ? "सूचनाहरू" : "Announcements",
      description: isNepali ? "सार्वजनिक सूचना र समाचारहरू प्राप्त गर्नुहोस्" : "Receive public announcements and news"
    }
  ];

  return (
    <Layout>
      <section className="py-8 min-h-[80vh]">
        <div className="container">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isNepali ? "पछाडि जानुहोस्" : "Go Back"}
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
                    <h1 className="text-xl font-display font-bold">
                      {isNepali ? "सूचना सेटिङहरू" : "Notification Settings"}
                    </h1>
                    <p className="text-sm text-primary-foreground/80">
                      {isNepali ? "तपाईं कसरी सूचनाहरू प्राप्त गर्नुहुन्छ व्यवस्थापन गर्नुहोस्" : "Manage how you receive notifications"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="p-6 space-y-4">
                {settings.map(setting => (
                  <div 
                    key={setting.key}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <setting.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">{setting.title}</Label>
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
                    {isNepali ? "परिवर्तनहरू स्वचालित रूपमा सुरक्षित हुन्छन्" : "Changes are saved automatically"}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">
                {isNepali ? "सूचना प्रकारहरू" : "Notification Types"}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 text-primary" />
                  <span>
                    {isNepali 
                      ? "ब्राउजर पुश सूचनाहरू - तपाईंको ब्राउजरमा तत्काल अलर्टहरू"
                      : "Browser push notifications - instant alerts in your browser"
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-primary" />
                  <span>
                    {isNepali 
                      ? "इमेल सूचनाहरू - तपाईंको इमेलमा विस्तृत अपडेटहरू"
                      : "Email notifications - detailed updates to your inbox"
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 mt-0.5 text-primary" />
                  <span>
                    {isNepali 
                      ? "SMS सूचनाहरू - महत्त्वपूर्ण अपडेटहरूको लागि पाठ सन्देशहरू"
                      : "SMS notifications - text messages for critical updates"
                    }
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
