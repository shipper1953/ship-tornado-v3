// src/router.tsx
import React, { lazy, ReactNode, Suspense, JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts (Ensure these components accept and render children or Outlet)
import Layout from './components/Layout'; 
import AuthLayout from './components/AuthLayout'; 
import DashboardLayout from './components/DashboardLayout';

// Route Protection
import PrivateRoute from './components/PrivateRoute';
// You need to define AdminRouteProps in AdminRoute.tsx and export it or ensure it accepts these props.
// For this file, we assume AdminRoute is a component that takes these props.
import AdminRoute from './components/AdminRoute'; 

// Loading & Pages
import { LoadingPage } from './transitions/LoadingPage'; // Corrected path

const LandingPage = lazy(() => import('./pages/Landing'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const UnauthorizedPage = lazy(() => import('./pages/Unauthorized'));
const DashboardPage = lazy(() => import('./pages/Index'));
const OrdersPage = lazy(() => import('./pages/Orders'));
const ShipmentsPage = lazy(() => import('./pages/Shipments'));
const CreateShipmentPage = lazy(() => import('./pages/CreateShipment'));
const UsersPage = lazy(() => import('./pages/Users'));
const CreateUserPage = lazy(() => import('./pages/CreateUser'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboard')); 
const SettingsPage = lazy(() => import('./components/Settings')); // Ensure this file exists

// Props that AdminRoute component should expect
interface AdminRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

// This is a conceptual wrapper. Ideally, AdminRoute itself handles its children prop.
// If AdminRoute from './components/AdminRoute' already does this, you use it directly.
const AdminRouteWrapper: React.FC<AdminRouteProps> = ({ allowedRoles, children }) => {
    return <AdminRoute allowedRoles={allowedRoles}>{children}</AdminRoute>;
};

const AppRoutes = (): JSX.Element => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<Layout />}> {/* Layout should render <Outlet /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Route>

        <Route element={<AuthLayout />}> {/* AuthLayout should render <Outlet /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}> {/* Renders <Outlet /> inside TmsLayout */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="create-shipment" element={<CreateShipmentPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            <Route
              path="admin/users"
              element={
                <AdminRouteWrapper allowedRoles={['Super Admin', 'Company Admin']}>
                  <UsersPage />
                </AdminRouteWrapper>
              }
            />
            <Route
              path="admin/create-user"
              element={
                <AdminRouteWrapper allowedRoles={['Super Admin', 'Company Admin']}>
                  <CreateUserPage />
                </AdminRouteWrapper>
              }
            />
            <Route
              path="admin/dashboard"
              element={
                <AdminRouteWrapper allowedRoles={['Super Admin']}>
                  <AdminDashboardPage />
                </AdminRouteWrapper>
              }
            />
            {/* Place NotFoundPage as a direct child of the layout for authenticated section */}
            <Route path="*" element={<NotFoundPage />} /> 
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;