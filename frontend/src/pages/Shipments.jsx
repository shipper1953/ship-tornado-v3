import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Shipments() {
  const { token } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShipments() {
      try {
        const res = await fetch("http://localhost:5001/api/shipments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setShipments(data);
      } catch (err) {
        console.error("Failed to fetch shipments", err);
      } finally {
        setLoading(false);
      }
    }
    fetchShipments();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#0b1c2c] mb-6">📦 Shipments</h1>

      {loading ? (
        <p className="text-gray-500">Loading shipments...</p>
      ) : shipments.length === 0 ? (
        <p className="text-gray-500">No shipments found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl ring-1 ring-gray-100">
          <table className="min-w-full text-sm divide-y divide-gray-100">
            <thead className="bg-[#f6f8fb] text-gray-600 font-semibold">
              <tr>
                <th className="text-left px-6 py-4">ID</th>
                <th className="text-left px-6 py-4">Carrier</th>
                <th className="text-left px-6 py-4">Service</th>
                <th className="text-left px-6 py-4">Tracking #</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#0b1c2c] divide-y divide-gray-100">
              {shipments.map((s) => (
                <tr key={s.id} className="hover:bg-[#f9fbfd]">
                  <td className="px-6 py-4">{s.id}</td>
                  <td className="px-6 py-4">{s.carrier}</td>
                  <td className="px-6 py-4">{s.service}</td>
                  <td className="px-6 py-4 text-[#00b8ff]">{s.tracking_number || "—"}</td>
                  <td className="px-6 py-4">{s.status || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
