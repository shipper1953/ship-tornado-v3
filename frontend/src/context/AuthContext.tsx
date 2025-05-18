// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, JSX } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import { jwtDecode, type JwtPayload as DecodedJwtPayload } from 'jwt-decode';
// Import API functions from api/auth.ts
// LoginData, AuthResponse, MeResponse types will now be defined here or imported if you make a central types file.
import { loginAPI, getMeAPI, type LoginData as ApiLoginData, type AuthResponse as ApiAuthResponse, type MeResponse as ApiMeResponse } from '../api/auth';

// --- Central Type Definitions (Exported from here) ---
export interface UserType {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  companyId?: string;
  // Add any other user properties your backend provides
}

export interface CompanyType {
  id: string;
  name: string;
  // Add any other company properties
}

// This is the data structure expected by the loginAPI function
// If LoginData from api/auth.ts is identical, you can use that too.
export interface LoginFormData {
  email: string;
  password?: string; // Or make it required: password: string;
}

// This is the type for the context value itself
export interface AuthContextType {
  user: UserType | null;
  token: string | null;
  company: CompanyType | null;
  login: (formData: LoginFormData) => Promise<void>; // Uses local LoginFormData
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  setToken: Dispatch<SetStateAction<string | null>>; // Kept for flexibility
  setUser: Dispatch<SetStateAction<UserType | null>>;   // Kept for flexibility
}

// Helper functions
function isTokenStructurallyValid(token: string | null): boolean {
  return typeof token === 'string' && token.split('.').length === 3;
}

function isTokenStillValid(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedJwtPayload>(token); // Use DecodedJwtPayload
    return decoded.exp ? decoded.exp * 1000 > Date.now() : true; // Consider no 'exp' as still valid or handle as error
  } catch (error) {
    console.error("❌ Error decoding JWT for expiration check:", error);
    return false;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<UserType | null>(null);
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyTokenAndFetchUser = async () => {
      if (token && isTokenStructurallyValid(token) && isTokenStillValid(token)) {
        try {
          // apiClient (used by getMeAPI) should have interceptor for token
          const res: AxiosResponse<ApiMeResponse> = await getMeAPI(); // Uses MeResponse from api/auth
          setUser(res.data.user);
          if (res.data.company) setCompany(res.data.company);
        } catch (err) {
          localStorage.removeItem("token");
          setToken(null); setUser(null); setCompany(null);
        }
      } else if (token) { // Token exists but is invalid
        localStorage.removeItem("token");
        setToken(null); setUser(null); setCompany(null);
      }
      setLoading(false);
    };
    verifyTokenAndFetchUser();
  }, [token]);

  const login = async (formData: LoginFormData): Promise<void> => {
    setLoading(true);
    try {
      // Ensure LoginData used by loginAPI matches LoginFormData here
      const response: AxiosResponse<ApiAuthResponse> = await loginAPI(formData as ApiLoginData); 
      const { token: receivedToken, user: receivedUser, company: receivedCompany } = response.data;
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      setUser(receivedUser);
      if (receivedCompany) setCompany(receivedCompany);
    } catch (error) {
      console.error("❌ AuthContext: Login failed:", (error as AxiosError).response?.data || (error as AxiosError).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCompany(null);
  };
  
  const isAuthenticated = !!token && !!user && isTokenStructurallyValid(token) && !isTokenStillValid(token); // Corrected: !isTokenExpired

  return (
    <AuthContext.Provider value={{ 
      user, token, company, login, logout, loading, isAuthenticated, setToken, setUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}