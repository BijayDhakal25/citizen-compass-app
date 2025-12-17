import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "citizen" | "admin" | "staff";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users
const DEMO_USERS: { [email: string]: { password: string; user: User } } = {
  "demo.citizen@likhugaupalika.gov.np": {
    password: "Demo1234",
    user: { id: "1", name: "Demo Citizen", email: "demo.citizen@likhugaupalika.gov.np", role: "citizen" }
  },
  "admin@likhugaupalika.gov.np": {
    password: "Admin1234",
    user: { id: "2", name: "Admin User", email: "admin@likhugaupalika.gov.np", role: "admin" }
  },
  "staff@likhugaupalika.gov.np": {
    password: "Staff1234",
    user: { id: "3", name: "Staff User", email: "staff@likhugaupalika.gov.np", role: "staff" }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check demo users
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem("auth_user", JSON.stringify(demoUser.user));
      return { success: true };
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "{}");
    const registeredUser = registeredUsers[email];
    if (registeredUser && registeredUser.password === password) {
      const userObj: User = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        phone: registeredUser.phone,
        role: "citizen"
      };
      setUser(userObj);
      localStorage.setItem("auth_user", JSON.stringify(userObj));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (name: string, email: string, phone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check if already exists
    if (DEMO_USERS[email]) {
      return { success: false, error: "This email is already registered" };
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "{}");
    if (registeredUsers[email]) {
      return { success: false, error: "This email is already registered" };
    }

    // Register new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone,
      password,
      role: "citizen"
    };
    registeredUsers[email] = newUser;
    localStorage.setItem("registered_users", JSON.stringify(registeredUsers));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
