// src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-700 text-lg">
          Welcome, Admin. This area is restricted to administrators only.
        </p>
      </div>
    </div>
  );
}
