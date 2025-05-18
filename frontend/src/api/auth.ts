// src/api/auth.ts
import apiClient from './fetchWithAuth';
import type { AxiosResponse } from 'axios';
// Import UserType and CompanyType from where they are centrally defined (e.g., AuthContext or src/types/auth.ts)
import type { UserType, CompanyType } from '../context/AuthContext'; // Assuming they are exported from AuthContext

// --- Request Payloads ---
export interface LoginData {
  email: string;
  password?: string; // Or required: password: string;
}

export interface RegisterData {
  email: string;
  password?: string; // Or required
  firstName?: string;
  lastName?: string;
  company_id?: string; // Use camelCase (companyId) if your backend expects that, or ensure consistency
  role_id?: string;    // Use camelCase (roleId) if consistent
  // Add any other fields your backend register endpoint expects
}

// --- Response Payloads ---
// For login and register API calls
export interface AuthResponse {
  token: string;
  user: UserType; // Uses the imported UserType
  company?: CompanyType; // Uses the imported CompanyType
}

// For GET /me API call
export interface MeResponse {
  user: UserType;
  company?: CompanyType;
}

// API functions
// Ensure paths like "/api/auth/login" match your backend routes exactly
export const loginAPI = (data: LoginData): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post<AuthResponse>("/api/auth/login", data);
};

export const registerAPI = (data: RegisterData): Promise<AxiosResponse<AuthResponse>> => { 
  // Ensure AuthResponse is the correct type for what /api/auth/register returns
  return apiClient.post<AuthResponse>("/api/auth/register", data);
};

export const getMeAPI = (): Promise<AxiosResponse<MeResponse>> => {
  return apiClient.get<MeResponse>("/api/auth/me");
};