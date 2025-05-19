// src/pages/AdminUsers.tsx
import React, { useEffect, useState, ReactNode, JSX } from 'react';
import Layout from '../components/Layout'; // Ensure Layout.tsx accepts and renders children
import apiClient from '@/api/fetchWithAuth'; // Use the configured Axios instance
import type { UserType } from '@/context/AuthContext'; // Import UserType from AuthContext
import type { AxiosResponse, AxiosError } from 'axios';
import { LoadingPage } from '../components/LoadingPage'; // Assuming path

// Define what the API response for users list looks like
// This should match what your backend /api/admin/users endpoint returns
interface UsersApiResponse {
  users: UserType[]; // Assuming backend returns an object with a 'users' array
  // Or if it returns the array directly: UserType[]
}

export default function AdminUsers(): JSX.Element {
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState<string | null>(null); // Allow null for no error
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        // The path should be relative to the baseURL in apiClient (e.g., '/api/admin/users')
        const response: AxiosResponse<UsersApiResponse> = await apiClient.get('/api/admin/users');
        
        // Check if response.data and response.data.users exist
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          // Handle cases where the structure isn't as expected, even if the request succeeds
          console.error("Fetched data is not in the expected format:", response.data);
          setUsers([]); // Set to empty array or handle as an error
          setError("Received invalid data format for users.");
        }

      } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = (axiosError.response?.data as any)?.error || axiosError.message || "Failed to fetch users.";
        console.error("Failed to fetch users:", errorMessage);
        setError(errorMessage);
        setUsers([]); // Clear users on error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Layout><LoadingPage /></Layout>;
  }

  return (
    <Layout> {/* Ensure Layout component is typed to accept children */}
      <div className="max-w-4xl mx-auto bg-card text-card-foreground p-4 md:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-6">All Users</h1>
        {error && <p className="text-destructive mb-4 p-3 bg-destructive/10 rounded-md">{error}</p>}
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 border-b border-border font-semibold">ID</th>
                  <th className="p-3 border-b border-border font-semibold">Email</th>
                  <th className="p-3 border-b border-border font-semibold">Name</th>
                  <th className="p-3 border-b border-border font-semibold">Company ID</th>
                  <th className="p-3 border-b border-border font-semibold">Roles</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: UserType) => ( // Explicitly type 'u'
                  <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-3 border-b border-border text-xs font-mono" title={u.id}>{u.id.slice(0, 8)}…</td>
                    <td className="p-3 border-b border-border">{u.email}</td>
                    <td className="p-3 border-b border-border">{(u.firstName || u.lastName) ? `${u.firstName || ''} ${u.lastName || ''}`.trim() : 'N/A'}</td>
                    <td className="p-3 border-b border-border">{u.companyId || 'N/A'}</td>
                    <td className="p-3 border-b border-border">{u.roles.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !error && <p className="text-muted-foreground">No users found.</p>
        )}
      </div>
    </Layout>
  );
}