// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import fetchWithAuth from "../utils/fetchWithAuth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile. Please log in again.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">Your Profile</h1>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {user && !loading && (
          <div className="space-y-2 text-left">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company ID:</strong> {user.company_id}</p>
            <p><strong>Role ID:</strong> {user.role_id}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
