// src/components/DashboardLayout.tsx
import React, { JSX } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { TmsLayout } from './layout/TmsLayout';
import { useAuth } from '../context/AuthContext'; // Ensure AuthContext types are solid
import { LoadingPage } from './LoadingPage'; // Assuming LoadingPage.tsx is now in src/components/

const DashboardLayout = (): JSX.Element => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TmsLayout> {/* TmsLayout handles its internal structure */}
      <Outlet />
    </TmsLayout>
  );
};

export default DashboardLayout;