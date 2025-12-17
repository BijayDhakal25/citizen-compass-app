import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ApplicationStatus = "pending" | "in_progress" | "approved" | "rejected";
export type CertificateType = "birth" | "death" | "marriage" | "citizenship" | "residency";

export interface Application {
  id: string;
  userId: string;
  type: CertificateType;
  status: ApplicationStatus;
  submittedAt: number;
  updatedAt: number;
  data: Record<string, string>;
  documents?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  createdAt: number;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  applicationUpdates: boolean;
  announcements: boolean;
}

interface ApplicationContextType {
  applications: Application[];
  notifications: Notification[];
  notificationSettings: NotificationSettings;
  submitApplication: (userId: string, type: CertificateType, data: Record<string, string>) => Application;
  getApplicationsByUser: (userId: string) => Application[];
  getNotificationsByUser: (userId: string) => Notification[];
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  addNotification: (userId: string, title: string, message: string, type: "info" | "success" | "warning") => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

const CERTIFICATE_NAMES: Record<CertificateType, string> = {
  birth: "Birth Certificate",
  death: "Death Certificate",
  marriage: "Marriage Certificate",
  citizenship: "Citizenship Recommendation",
  residency: "Residency Certificate"
};

// Auto-approval time in milliseconds (15 minutes = 900000ms, using 1 minute for demo)
const AUTO_APPROVE_TIME = 60 * 1000; // 1 minute for quick demo, change to 15 * 60 * 1000 for 15 min

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    applicationUpdates: true,
    announcements: true
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedApps = localStorage.getItem("applications");
    const storedNotifs = localStorage.getItem("notifications");
    const storedSettings = localStorage.getItem("notification_settings");
    
    if (storedApps) setApplications(JSON.parse(storedApps));
    if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
    if (storedSettings) setNotificationSettings(JSON.parse(storedSettings));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("notification_settings", JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  // Auto-approval timer
  useEffect(() => {
    const interval = setInterval(() => {
      setApplications(prev => {
        let updated = false;
        const newApps = prev.map(app => {
          if (app.status === "pending" && Date.now() - app.submittedAt >= AUTO_APPROVE_TIME) {
            updated = true;
            // Add approval notification
            const notif: Notification = {
              id: `notif_${Date.now()}_${Math.random()}`,
              userId: app.userId,
              title: "Application Approved",
              message: `Your ${CERTIFICATE_NAMES[app.type]} application (${app.id}) has been approved!`,
              type: "success",
              read: false,
              createdAt: Date.now()
            };
            setNotifications(prev => [notif, ...prev]);
            
            return { ...app, status: "approved" as ApplicationStatus, updatedAt: Date.now() };
          }
          return app;
        });
        return updated ? newApps : prev;
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const submitApplication = (userId: string, type: CertificateType, data: Record<string, string>): Application => {
    const now = Date.now();
    const app: Application = {
      id: `APP-${new Date().getFullYear()}-${String(applications.length + 1).padStart(3, "0")}`,
      userId,
      type,
      status: "pending",
      submittedAt: now,
      updatedAt: now,
      data
    };

    setApplications(prev => [app, ...prev]);

    // Add submission notification
    const notif: Notification = {
      id: `notif_${now}`,
      userId,
      title: "Application Submitted",
      message: `Your ${CERTIFICATE_NAMES[type]} application has been submitted successfully. ID: ${app.id}`,
      type: "info",
      read: false,
      createdAt: now
    };
    setNotifications(prev => [notif, ...prev]);

    return app;
  };

  const getApplicationsByUser = (userId: string) => {
    return applications.filter(app => app.userId === userId);
  };

  const getNotificationsByUser = (userId: string) => {
    return notifications.filter(notif => notif.userId === userId);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsRead = (userId: string) => {
    setNotifications(prev =>
      prev.map(n => n.userId === userId ? { ...n, read: true } : n)
    );
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  const addNotification = (userId: string, title: string, message: string, type: "info" | "success" | "warning") => {
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: Date.now()
    };
    setNotifications(prev => [notif, ...prev]);
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      notifications,
      notificationSettings,
      submitApplication,
      getApplicationsByUser,
      getNotificationsByUser,
      markNotificationRead,
      markAllNotificationsRead,
      updateNotificationSettings,
      addNotification
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
}
