import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Orders from "./pages/Orders";
import Shipments from "./pages/Shipments";
import CreateShipment from "./pages/CreateShipment";

import PrivateRoute from "./components/PrivateRoute";
import RoleProtectedRoute from './pages/RoleProtectedRoute';
import Unauthorized from './pages/Unauthorized';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Authenticated routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/create-shipment" element={<CreateShipment />} />

            {/* Admin-only */}
            <Route
              element={<RoleProtectedRoute allowedRoles={["Admin", "Super Admin"]} />}
            >
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
