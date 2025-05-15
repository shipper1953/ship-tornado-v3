// src/pages/AdminUsers.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import fetchWithAuth from "../utils/fetchWithAuth";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWithAuth("/api/admin/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data.users))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users.");
      });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">All Users</h1>
        {error && <p className="text-red-500">{error}</p>}
        {users.length > 0 ? (
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-indigo-50">
                  <td className="p-2 border">{u.id.slice(0, 8)}…</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.company_id}</td>
                  <td className="p-2 border">{u.role_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <p>Loading users...</p>
        )}
      </div>
    </Layout>
  );
}
