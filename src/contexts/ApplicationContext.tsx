import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ApplicationStatus = "pending" | "in_progress" | "approved" | "rejected";
export type CertificateType = "birth" | "death" | "marriage" | "citizenship" | "residency";

export interface ApplicationDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: number;
}

export interface ApplicationComment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: number;
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: CertificateType;
  status: ApplicationStatus;
  submittedAt: number;
  updatedAt: number;
  data: Record<string, string>;
  documents: ApplicationDocument[];
  comments: ApplicationComment[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: number;
  applicationId?: string;
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
  submitApplication: (userId: string, userName: string, userEmail: string, type: CertificateType, data: Record<string, string>, documents?: ApplicationDocument[]) => Application;
  updateApplicationStatus: (id: string, status: ApplicationStatus, comment?: string, adminName?: string) => void;
  addComment: (applicationId: string, userId: string, userName: string, text: string) => void;
  getApplicationsByUser: (userId: string) => Application[];
  getAllApplications: () => Application[];
  getApplicationById: (id: string) => Application | undefined;
  getNotificationsByUser: (userId: string) => Notification[];
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  addNotification: (userId: string, title: string, message: string, type: "info" | "success" | "warning" | "error", applicationId?: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

const CERTIFICATE_NAMES: Record<CertificateType, string> = {
  birth: "Birth Certificate",
  death: "Death Certificate",
  marriage: "Marriage Certificate",
  citizenship: "Citizenship Recommendation",
  residency: "Residency Certificate"
};

// Demo applications with documents
const DEMO_APPLICATIONS: Application[] = [
  {
    id: "APP-2024-001",
    userId: "1",
    userName: "Demo Citizen",
    userEmail: "demo.citizen@likhugaupalika.gov.np",
    type: "birth",
    status: "pending",
    data: {
      childName: "राम बहादुर थापा",
      dateOfBirth: "2024-01-15",
      placeOfBirth: "लिखु गाउँपालिका",
      fatherName: "कृष्ण बहादुर थापा",
      motherName: "सीता थापा"
    },
    documents: [
      { id: "doc1", name: "Birth_Hospital_Record.pdf", type: "application/pdf", url: "#", uploadedAt: Date.now() - 86400000 },
      { id: "doc2", name: "Parent_ID_Card.jpg", type: "image/jpeg", url: "#", uploadedAt: Date.now() - 86400000 }
    ],
    comments: [],
    submittedAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000
  },
  {
    id: "APP-2024-002",
    userId: "1",
    userName: "Demo Citizen",
    userEmail: "demo.citizen@likhugaupalika.gov.np",
    type: "citizenship",
    status: "in_progress",
    data: {
      applicantName: "सुनिता कुमारी राई",
      dateOfBirth: "1998-05-20",
      fatherName: "मन बहादुर राई",
      motherName: "पार्वती राई",
      address: "लिखु गाउँपालिका वडा नं. ५"
    },
    documents: [
      { id: "doc3", name: "Birth_Certificate.pdf", type: "application/pdf", url: "#", uploadedAt: Date.now() - 172800000 },
      { id: "doc4", name: "Father_Citizenship.jpg", type: "image/jpeg", url: "#", uploadedAt: Date.now() - 172800000 },
      { id: "doc5", name: "Passport_Photo.jpg", type: "image/jpeg", url: "#", uploadedAt: Date.now() - 172800000 }
    ],
    comments: [
      { id: "c1", userId: "2", userName: "Admin User", text: "Documents under verification", createdAt: Date.now() - 86400000 }
    ],
    submittedAt: Date.now() - 172800000,
    updatedAt: Date.now() - 86400000
  },
  {
    id: "APP-2024-003",
    userId: "user_sample",
    userName: "कमला देवी श्रेष्ठ",
    userEmail: "kamala@example.com",
    type: "marriage",
    status: "pending",
    data: {
      groomName: "रमेश श्रेष्ठ",
      brideName: "कमला देवी",
      marriageDate: "2024-02-14",
      marriagePlace: "लिखु गाउँपालिका",
      witnessName: "हरि बहादुर"
    },
    documents: [
      { id: "doc6", name: "Marriage_Photo.jpg", type: "image/jpeg", url: "#", uploadedAt: Date.now() - 259200000 },
      { id: "doc7", name: "Witness_Statement.pdf", type: "application/pdf", url: "#", uploadedAt: Date.now() - 259200000 }
    ],
    comments: [],
    submittedAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000
  }
];

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
    
    if (storedApps) {
      setApplications(JSON.parse(storedApps));
    } else {
      setApplications(DEMO_APPLICATIONS);
      localStorage.setItem("applications", JSON.stringify(DEMO_APPLICATIONS));
    }
    if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
    if (storedSettings) setNotificationSettings(JSON.parse(storedSettings));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem("applications", JSON.stringify(applications));
    }
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("notification_settings", JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const submitApplication = (
    userId: string, 
    userName: string, 
    userEmail: string, 
    type: CertificateType, 
    data: Record<string, string>,
    documents: ApplicationDocument[] = []
  ): Application => {
    const now = Date.now();
    const app: Application = {
      id: `APP-${new Date().getFullYear()}-${String(applications.length + 1).padStart(3, "0")}`,
      userId,
      userName,
      userEmail,
      type,
      status: "pending",
      submittedAt: now,
      updatedAt: now,
      data,
      documents,
      comments: []
    };

    setApplications(prev => [app, ...prev]);

    // Add submission notification
    addNotification(
      userId,
      "Application Submitted",
      `Your ${CERTIFICATE_NAMES[type]} application has been submitted successfully. ID: ${app.id}`,
      "info",
      app.id
    );

    return app;
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus, comment?: string, adminName?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const updatedApp = { ...app, status, updatedAt: Date.now() };
        
        if (comment && adminName) {
          updatedApp.comments = [
            ...app.comments,
            { id: `c-${Date.now()}`, userId: "admin", userName: adminName, text: comment, createdAt: Date.now() }
          ];
        }
        
        // Add notification for the user
        const statusText = status === "approved" ? "approved" : status === "rejected" ? "rejected" : "updated";
        addNotification(
          app.userId,
          `Application ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`,
          `Your application ${app.id} has been ${statusText}.${comment ? ` Comment: ${comment}` : ""}`,
          status === "approved" ? "success" : status === "rejected" ? "error" : "info",
          app.id
        );
        
        return updatedApp;
      }
      return app;
    }));
  };

  const addComment = (applicationId: string, userId: string, userName: string, text: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          comments: [...app.comments, { id: `c-${Date.now()}`, userId, userName, text, createdAt: Date.now() }],
          updatedAt: Date.now()
        };
      }
      return app;
    }));
  };

  const getApplicationsByUser = (userId: string) => {
    return applications.filter(app => app.userId === userId);
  };

  const getAllApplications = () => applications;

  const getApplicationById = (id: string) => {
    return applications.find(app => app.id === id);
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

  const addNotification = (userId: string, title: string, message: string, type: "info" | "success" | "warning" | "error", applicationId?: string) => {
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: Date.now(),
      applicationId
    };
    setNotifications(prev => [notif, ...prev]);
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      notifications,
      notificationSettings,
      submitApplication,
      updateApplicationStatus,
      addComment,
      getApplicationsByUser,
      getAllApplications,
      getApplicationById,
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
