import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user?.role === "Admin" || user?.role === "Super Admin" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
