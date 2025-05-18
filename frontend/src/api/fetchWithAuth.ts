// src/api/fetchWithAuth.ts
import axios, {
  type AxiosInstance, // Use 'type' for type-only imports
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode, type JwtPayload as DecodedJwtPayload } from 'jwt-decode';

// Ensure VITE_API_BASE_URL is defined in your .env and src/vite-env.d.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

interface MinimalJwtPayload {
  exp?: number;
  // Add other claims you might check for basic validity
}

// Helper to check if token is present and not expired (client-side check)
function isTokenCurrentlyValid(token: string | null): boolean {
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
    return false;
  }
  try {
    const decoded = jwtDecode<MinimalJwtPayload>(token);
    return decoded.exp ? decoded.exp * 1000 > Date.now() : false; // Valid if exp exists and is in the future
  } catch (error) {
    console.error("Error decoding token for validity check:", error);
    return false; // If decoding fails or no exp, treat as invalid/expired
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // Default headers can be set here, but Content-Type for POST/PUT is often set per request or by Axios defaults for data types.
});

// Request interceptor to dynamically add the Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && isTokenCurrentlyValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
      // Token exists but is invalid/expired, clear it and remove header
      localStorage.removeItem('token');
      delete config.headers.Authorization;
      // Consider triggering a global logout action if using a state manager for auth
      // For now, this ensures invalid tokens are not sent.
    }
    // Ensure Content-Type for relevant methods if not automatically handled by Axios based on data
    if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;

// Optional wrapper functions if you prefer this calling style,
// but directly using apiClient.get, apiClient.post is often cleaner.
export async function fetchWithAuthWrapper<T = any>(
  path: string,
  options: AxiosRequestConfig = {} // options will be passed to apiClient, which includes method, data, etc.
): Promise<AxiosResponse<T>> {
  return apiClient(path, options);
}

export async function fetchWithAuthAndHandleErrorsWrapper<T = any>(
  path: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    // Use apiClient.request or specific methods like apiClient.get, apiClient.post
    const response: AxiosResponse<T> = await apiClient.request<T>({ url: path, ...options });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`API Error on ${options.method?.toUpperCase() || 'GET'} ${path}:`, axiosError.response?.data || axiosError.message);
    // Consider a more user-friendly error handling/notification system
    throw error; // Re-throw for the caller (e.g., UI component) to handle
  }
}