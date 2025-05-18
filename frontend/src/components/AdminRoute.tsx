// src/components/AdminRoute.tsx
import React, { ReactNode, JSX } from 'react'; // Ensure React and ReactNode are imported
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserType } from "../context/AuthContext"; // Import UserType
import { LoadingPage } from './transitions/LoadingPage';

export interface AdminRouteProps {
  children?: ReactNode; // To wrap specific components
  allowedRoles?: string[]; // Roles allowed to access
}

export default function AdminRoute({ children, allowedRoles = [] }: AdminRouteProps): JSX.Element | null {
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return <LoadingPage />; // Or a simpler <div>Loading...</div>
  }

  if (!isAuthenticated || !user) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Check if user has at least one of the allowed roles
  // Ensure user.roles from AuthContext matches your backend role names EXACTLY
  const hasRequiredRole = allowedRoles.length === 0 || (user.roles && user.roles.some(role => allowedRoles.includes(role)));

  if (!hasRequiredRole) {
    // Authenticated but not authorized for this route
    return <Navigate to="/unauthorized" replace />; // Or redirect to a general dashboard
  }

  // If children are passed directly (e.g., <AdminRoute><MyPage /></AdminRoute>), render them.
  // Otherwise, render an <Outlet /> for nested routes (e.g., <Route element={<AdminRoute />}><Route path="page" element={...} /></Route>)
  return children ? <>{children}</> : <Outlet />;
}