import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-[#0b1c2c] tracking-tight flex items-center gap-3">
          <img
            src="/tornado-placeholder.svg"
            alt="ShipTornado logo"
            className="h-8 w-8 animate-spin-slow"
          />
          ShipTornado
        </Link>

        {user && (
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/orders" className="text-gray-600 hover:text-[#00b8ff] transition">Orders</Link>
            <Link to="/shipments" className="text-gray-600 hover:text-[#00b8ff] transition">Shipments</Link>
            <Link to="/create-shipment" className="text-gray-600 hover:text-[#00b8ff] transition">New Shipment</Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
