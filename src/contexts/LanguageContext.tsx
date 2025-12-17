import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "ne";

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    announcements: "Announcements",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    allServices: "All Services",
    certificates: "Certificates",
    complaints: "Complaints",
    feedback: "Feedback",
    
    // Hero Section
    welcomeTo: "Welcome to",
    likhugaupalika: "Likhu Gaupalika",
    heroDescription: "Your gateway to efficient, transparent, and citizen-centric local governance. Access government services, track applications, and stay connected with your community.",
    exploreServices: "Explore Services",
    citizenPortal: "Citizen Portal",
    officialGovPortal: "Official Government Portal",
    
    // Stats
    citizensServed: "Citizens Served",
    certificatesIssued: "Certificates Issued",
    satisfactionRate: "Satisfaction Rate",
    onlineAccess: "Online Access",
    
    // Services
    ourServices: "Our Services",
    servicesDescription: "Access a wide range of government services from the comfort of your home. Fast, secure, and transparent.",
    certificateServices: "Certificate Services",
    certificateServicesDesc: "Apply for birth, death, marriage, and citizenship certificates online.",
    familyManagement: "Family Management",
    familyManagementDesc: "Manage your family records and digital IDs in one place.",
    complaintsAndFeedback: "Complaints & Feedback",
    complaintsDesc: "Submit complaints and provide feedback to improve our services.",
    announcementsDesc: "Stay updated with the latest news and public notices.",
    viewAllServices: "View All Services",
    
    // Announcements
    latestAnnouncements: "Latest Announcements",
    viewAll: "View All",
    
    // Quick Access
    quickAccess: "Quick Access",
    trackYourApplication: "Track Your Application",
    enterAppIdDesc: "Enter your application ID to check the status of your request.",
    enterAppId: "Enter Application ID",
    track: "Track",
    needHelp: "Need Help?",
    liveChatSupport: "Live Chat Support",
    downloadForms: "Download Forms",
    
    // CTA
    readyToGetStarted: "Ready to Get Started?",
    ctaDescription: "Create your citizen account today and access all government services online. It's free, fast, and secure.",
    createAccount: "Create Account",
    learnMore: "Learn More",
    
    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    phone: "Phone Number",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    loginSuccess: "Login Successful",
    loginError: "Login Failed",
    signupSuccess: "Account Created",
    signupError: "Signup Failed",
    
    // Dashboard
    welcome: "Welcome",
    quickActions: "Quick Actions",
    newApplication: "New Application",
    fileComplaint: "File Complaint",
    familyRecords: "Family Records",
    trackStatus: "Track Status",
    recentApplications: "Recent Applications",
    noApplicationsYet: "No applications yet",
    applyNow: "Apply Now",
    viewDetails: "View Details",
    yourStatistics: "Your Statistics",
    totalApplications: "Total Applications",
    approved: "Approved",
    pending: "Pending",
    inProgress: "In Progress",
    notifications: "Notifications",
    noNotifications: "No notifications yet",
    markAllAsRead: "Mark All as Read",
    contactSupport: "Contact Support",
    
    // Forms
    submit: "Submit",
    submitting: "Submitting...",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    required: "Required",
    optional: "Optional",
    uploadDocuments: "Upload supporting documents",
    pdfJpgPng: "PDF, JPG, PNG up to 5MB",
    
    // Application
    applicationSubmitted: "Application Submitted!",
    applicationId: "Application ID",
    backToServices: "Back to Services",
    applyForAnother: "Apply for Another",
    goToDashboard: "Go to Dashboard",
    
    // Certificate Types
    birthCertificate: "Birth Certificate",
    deathCertificate: "Death Certificate",
    marriageCertificate: "Marriage Certificate",
    citizenshipRecommendation: "Citizenship Recommendation",
    residencyCertificate: "Residency Certificate",
    
    // Family Registration
    familyRegistration: "Family Registration",
    familyRegistrationDesc: "Register and manage your family members with relationships",
    addFamilyMember: "Add Family Member",
    memberName: "Member Name",
    relationship: "Relationship",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    father: "Father",
    mother: "Mother",
    spouse: "Spouse",
    son: "Son",
    daughter: "Daughter",
    brother: "Brother",
    sister: "Sister",
    
    // Announcements Page
    publicNotices: "Public Notices",
    allAnnouncements: "All Announcements",
    health: "Health",
    finance: "Finance",
    infrastructure: "Infrastructure",
    education: "Education",
    social: "Social",
    readMore: "Read More",
    
    // Admin
    adminDashboard: "Admin Dashboard",
    allApplications: "All Applications",
    approve: "Approve",
    reject: "Reject",
    addComment: "Add Comment",
    comment: "Comment",
    
    // Footer
    footerTagline: "Serving citizens with transparency, efficiency, and dedication.",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    allRightsReserved: "All Rights Reserved",
    
    // Misc
    loading: "Loading...",
    error: "Error",
    success: "Success",
    search: "Search",
    searchPlaceholder: "Search for services...",
    apply: "Apply",
    fee: "Fee",
    free: "Free",
    processingTime: "Processing Time",
    days: "days",
    howItWorks: "How It Works",
    step1: "Create Account",
    step1Desc: "Register with your details",
    step2: "Choose Service",
    step2Desc: "Select the service you need",
    step3: "Submit Application",
    step3Desc: "Fill form and upload documents",
    step4: "Track & Receive",
    step4Desc: "Monitor status and collect",
    getStarted: "Get Started",
  },
  ne: {
    // Navigation
    home: "गृहपृष्ठ",
    about: "हाम्रो बारेमा",
    services: "सेवाहरू",
    announcements: "सूचनाहरू",
    contact: "सम्पर्क",
    login: "लग इन",
    logout: "लग आउट",
    dashboard: "ड्यासबोर्ड",
    allServices: "सबै सेवाहरू",
    certificates: "प्रमाणपत्रहरू",
    complaints: "उजुरीहरू",
    feedback: "प्रतिक्रिया",
    
    // Hero Section
    welcomeTo: "स्वागत छ",
    likhugaupalika: "लिखु गाउँपालिका",
    heroDescription: "कुशल, पारदर्शी र नागरिक-केन्द्रित स्थानीय शासनमा तपाईंको प्रवेशद्वार। सरकारी सेवाहरू पहुँच गर्नुहोस्, आवेदनहरू ट्र्याक गर्नुहोस्, र आफ्नो समुदायसँग जोडिएर रहनुहोस्।",
    exploreServices: "सेवाहरू हेर्नुहोस्",
    citizenPortal: "नागरिक पोर्टल",
    officialGovPortal: "आधिकारिक सरकारी पोर्टल",
    
    // Stats
    citizensServed: "सेवा गरिएका नागरिकहरू",
    certificatesIssued: "जारी गरिएका प्रमाणपत्रहरू",
    satisfactionRate: "सन्तुष्टि दर",
    onlineAccess: "अनलाइन पहुँच",
    
    // Services
    ourServices: "हाम्रा सेवाहरू",
    servicesDescription: "घरको सुविधाबाट विभिन्न सरकारी सेवाहरू पहुँच गर्नुहोस्। छिटो, सुरक्षित र पारदर्शी।",
    certificateServices: "प्रमाणपत्र सेवाहरू",
    certificateServicesDesc: "जन्म, मृत्यु, विवाह र नागरिकता प्रमाणपत्रहरूको लागि अनलाइन आवेदन दिनुहोस्।",
    familyManagement: "परिवार व्यवस्थापन",
    familyManagementDesc: "आफ्नो परिवारको अभिलेख र डिजिटल आईडी एकै ठाउँमा व्यवस्थापन गर्नुहोस्।",
    complaintsAndFeedback: "उजुरी र प्रतिक्रिया",
    complaintsDesc: "उजुरी दिनुहोस् र हाम्रो सेवा सुधार गर्न प्रतिक्रिया दिनुहोस्।",
    announcementsDesc: "नवीनतम समाचार र सार्वजनिक सूचनाहरूसँग अद्यावधिक रहनुहोस्।",
    viewAllServices: "सबै सेवाहरू हेर्नुहोस्",
    
    // Announcements
    latestAnnouncements: "नवीनतम सूचनाहरू",
    viewAll: "सबै हेर्नुहोस्",
    
    // Quick Access
    quickAccess: "द्रुत पहुँच",
    trackYourApplication: "आफ्नो आवेदन ट्र्याक गर्नुहोस्",
    enterAppIdDesc: "आफ्नो अनुरोधको स्थिति जाँच गर्न आवेदन ID प्रविष्ट गर्नुहोस्।",
    enterAppId: "आवेदन ID प्रविष्ट गर्नुहोस्",
    track: "ट्र्याक",
    needHelp: "सहयोग चाहिन्छ?",
    liveChatSupport: "लाइभ च्याट सहयोग",
    downloadForms: "फारमहरू डाउनलोड गर्नुहोस्",
    
    // CTA
    readyToGetStarted: "सुरु गर्न तयार हुनुहुन्छ?",
    ctaDescription: "आज नै आफ्नो नागरिक खाता बनाउनुहोस् र सबै सरकारी सेवाहरू अनलाइन पहुँच गर्नुहोस्। यो निःशुल्क, छिटो र सुरक्षित छ।",
    createAccount: "खाता बनाउनुहोस्",
    learnMore: "थप जान्नुहोस्",
    
    // Auth
    signIn: "साइन इन",
    signUp: "साइन अप",
    email: "इमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    phone: "फोन नम्बर",
    confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
    forgotPassword: "पासवर्ड बिर्सनुभयो?",
    noAccount: "खाता छैन?",
    haveAccount: "पहिले नै खाता छ?",
    loginSuccess: "लग इन सफल",
    loginError: "लग इन असफल",
    signupSuccess: "खाता सिर्जना भयो",
    signupError: "साइन अप असफल",
    
    // Dashboard
    welcome: "स्वागत छ",
    quickActions: "द्रुत कार्यहरू",
    newApplication: "नयाँ आवेदन",
    fileComplaint: "उजुरी दिनुहोस्",
    familyRecords: "परिवार अभिलेख",
    trackStatus: "स्थिति ट्र्याक",
    recentApplications: "हालका आवेदनहरू",
    noApplicationsYet: "अहिलेसम्म कुनै आवेदन छैन",
    applyNow: "अहिले आवेदन दिनुहोस्",
    viewDetails: "विवरण हेर्नुहोस्",
    yourStatistics: "तपाईंको तथ्याङ्क",
    totalApplications: "कुल आवेदनहरू",
    approved: "स्वीकृत",
    pending: "विचाराधीन",
    inProgress: "प्रगतिमा",
    notifications: "सूचनाहरू",
    noNotifications: "अहिलेसम्म कुनै सूचना छैन",
    markAllAsRead: "सबै पढिएको चिन्ह लगाउनुहोस्",
    contactSupport: "सहयोग सम्पर्क",
    
    // Forms
    submit: "पेश गर्नुहोस्",
    submitting: "पेश गर्दै...",
    cancel: "रद्द गर्नुहोस्",
    save: "सुरक्षित गर्नुहोस्",
    edit: "सम्पादन",
    delete: "मेटाउनुहोस्",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    uploadDocuments: "सहायक कागजातहरू अपलोड गर्नुहोस्",
    pdfJpgPng: "PDF, JPG, PNG ५MB सम्म",
    
    // Application
    applicationSubmitted: "आवेदन पेश भयो!",
    applicationId: "आवेदन ID",
    backToServices: "सेवाहरूमा फर्कनुहोस्",
    applyForAnother: "अर्को आवेदन दिनुहोस्",
    goToDashboard: "ड्यासबोर्डमा जानुहोस्",
    
    // Certificate Types
    birthCertificate: "जन्म प्रमाणपत्र",
    deathCertificate: "मृत्यु प्रमाणपत्र",
    marriageCertificate: "विवाह प्रमाणपत्र",
    citizenshipRecommendation: "नागरिकता सिफारिस",
    residencyCertificate: "बसोबास प्रमाणपत्र",
    
    // Family Registration
    familyRegistration: "परिवार दर्ता",
    familyRegistrationDesc: "परिवारका सदस्यहरूलाई सम्बन्धसहित दर्ता र व्यवस्थापन गर्नुहोस्",
    addFamilyMember: "परिवार सदस्य थप्नुहोस्",
    memberName: "सदस्यको नाम",
    relationship: "सम्बन्ध",
    dateOfBirth: "जन्म मिति",
    gender: "लिङ्ग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    father: "बाबु",
    mother: "आमा",
    spouse: "पति/पत्नी",
    son: "छोरा",
    daughter: "छोरी",
    brother: "दाजु/भाइ",
    sister: "दिदी/बहिनी",
    
    // Announcements Page
    publicNotices: "सार्वजनिक सूचनाहरू",
    allAnnouncements: "सबै सूचनाहरू",
    health: "स्वास्थ्य",
    finance: "वित्त",
    infrastructure: "पूर्वाधार",
    education: "शिक्षा",
    social: "सामाजिक",
    readMore: "थप पढ्नुहोस्",
    
    // Admin
    adminDashboard: "प्रशासक ड्यासबोर्ड",
    allApplications: "सबै आवेदनहरू",
    approve: "स्वीकृत गर्नुहोस्",
    reject: "अस्वीकार गर्नुहोस्",
    addComment: "टिप्पणी थप्नुहोस्",
    comment: "टिप्पणी",
    
    // Footer
    footerTagline: "पारदर्शिता, दक्षता र समर्पणका साथ नागरिकहरूको सेवा गर्दै।",
    quickLinks: "द्रुत लिङ्कहरू",
    contactUs: "सम्पर्क गर्नुहोस्",
    followUs: "हामीलाई फलो गर्नुहोस्",
    allRightsReserved: "सर्वाधिकार सुरक्षित",
    
    // Misc
    loading: "लोड हुँदैछ...",
    error: "त्रुटि",
    success: "सफल",
    search: "खोज्नुहोस्",
    searchPlaceholder: "सेवाहरू खोज्नुहोस्...",
    apply: "आवेदन दिनुहोस्",
    fee: "शुल्क",
    free: "निःशुल्क",
    processingTime: "प्रशोधन समय",
    days: "दिन",
    howItWorks: "यो कसरी काम गर्छ",
    step1: "खाता बनाउनुहोस्",
    step1Desc: "आफ्नो विवरणसहित दर्ता गर्नुहोस्",
    step2: "सेवा छान्नुहोस्",
    step2Desc: "तपाईंलाई चाहिने सेवा छान्नुहोस्",
    step3: "आवेदन पेश गर्नुहोस्",
    step3Desc: "फारम भर्नुहोस् र कागजातहरू अपलोड गर्नुहोस्",
    step4: "ट्र्याक र प्राप्त गर्नुहोस्",
    step4Desc: "स्थिति निगरानी गर्नुहोस् र सङ्कलन गर्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app_language");
    return (saved as Language) || "ne";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app_language", lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
