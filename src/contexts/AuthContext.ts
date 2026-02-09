import { createContext } from "react";
import { type RegisterData } from "@/services/authService";

interface User {
  id: number;
  first_name: string;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
