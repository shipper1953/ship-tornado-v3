// src/pages/Profile.tsx
import React, { ReactNode, JSX } from 'react';
import Layout from '../components/Layout'; // Ensure Layout.tsx accepts and renders children
import { useAuth, type UserType } from '../context/AuthContext'; // Import UserType
import { LoadingPage } from '../components/LoadingPage'; // Assuming path is src/components/LoadingPage.tsx

// Define LayoutProps here if not imported or defined in Layout.tsx
// interface LayoutProps { children: ReactNode; }

export default function Profile(): JSX.Element {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  // Removed local error/loading state as we use what's from AuthContext or handle it via PrivateRoute

  if (authLoading) {
    return (
      <Layout> {/* Ensure Layout can handle children, or wraps LoadingPage appropriately */}
        <LoadingPage />
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    // This should ideally be caught by PrivateRoute and redirected to /login
    // If PrivateRoute is not used, or for an extra layer of check:
    return (
      <Layout>
        <div className="max-w-md mx-auto bg-card text-card-foreground p-6 rounded-lg shadow-md text-center">
          <p className="text-destructive font-semibold">
            You are not authenticated. Please log in to view your profile.
          </p>
          {/* Optionally, add a Link to login here */}
        </div>
      </Layout>
    );
  }

  // Now 'user' is guaranteed to be UserType due to the isAuthenticated check above
  const typedUser = user as UserType; // Or, user is already UserType from useAuth()

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-card text-card-foreground p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">Your Profile</h1>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-muted-foreground">User ID:</span>
            <p className="text-foreground text-sm break-all">{typedUser.id}</p>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">Email:</span>
            <p className="text-foreground">{typedUser.email}</p>
          </div>
          {typedUser.firstName && (
            <div>
              <span className="font-semibold text-muted-foreground">First Name:</span>
              <p className="text-foreground">{typedUser.firstName}</p>
            </div>
          )}
          {typedUser.lastName && (
            <div>
              <span className="font-semibold text-muted-foreground">Last Name:</span>
              <p className="text-foreground">{typedUser.lastName}</p>
            </div>
          )}
          <div>
            <span className="font-semibold text-muted-foreground">Company ID:</span>
            <p className="text-foreground">{typedUser.companyId || 'N/A'}</p>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">Roles:</span>
            <p className="text-foreground">{typedUser.roles.join(', ')}</p>
          </div>
          {/* Add more profile details or an "Edit Profile" button as needed */}
        </div>
      </div>
    </Layout>
  );
}