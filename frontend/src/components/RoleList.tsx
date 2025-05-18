// src/components/RoleList.tsx
import React, { useEffect, useState, ReactNode, JSX } from 'react';
import apiClient from '../api/fetchWithAuth'; // Corrected: Default import of Axios instance
import type { AxiosResponse, AxiosError } from 'axios';

// Define the structure of a Role object based on your backend
interface RoleType {
  id: string | number; // Or whatever type your ID is
  name: string;
  // Add other properties if your role object has them
}

// Define what the API response for /api/roles looks like
// Assuming it directly returns an array of RoleType
type RolesApiResponse = RoleType[];

const RoleList = (): JSX.Element => {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the configured apiClient. Path should be relative to baseURL in apiClient.
        const response: AxiosResponse<RolesApiResponse> = await apiClient.get('/api/roles');
        setRoles(response.data || []); // Assuming the API returns the array directly
      } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = (axiosError.response?.data as any)?.error || axiosError.message || 'Failed to load roles';
        setError(errorMessage);
        console.error("Failed to load roles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <div className="p-4">Loading roles...</div>;
  }

  return (
    <div className="p-4 bg-card text-card-foreground rounded-md shadow">
      <h2 className="text-xl font-semibold text-primary mb-4">Available Roles</h2>
      {error && <p className="text-destructive bg-destructive/10 p-2 rounded-md">{error}</p>}
      {roles.length > 0 ? (
        <ul className="space-y-2">
          {roles.map((role: RoleType) => ( // Explicitly type 'role' here
            <li key={role.id} className="border-b border-border pb-2 text-sm text-muted-foreground">
              {role.name} (ID: {role.id})
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="text-muted-foreground">No roles found.</p>
      )}
    </div>
  );
};

export default RoleList;