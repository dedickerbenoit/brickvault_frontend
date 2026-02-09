import { useState, useCallback, type ReactNode } from "react";
import { login as loginApi } from "@/services/authService";
import { STORAGE_KEYS } from "@/constants";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{
    id: number;
    first_name: string;
    name: string;
    email: string;
    created_at: string;
  } | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginApi(email, password);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
