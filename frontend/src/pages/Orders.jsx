import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#0b1c2c] mb-6">📦 Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader color="#00b8ff" size={50} />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No orders found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow ring-1 ring-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-[#f6f8fb] text-gray-600 font-semibold">
              <tr>
                <th className="text-left px-6 py-3">Order ID</th>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="text-[#0b1c2c] divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f9fbfd]">
                  <td className="px-6 py-4 font-mono">{order.id}</td>
                  <td className="px-6 py-4">{order.customer_name || <span className="italic text-gray-400">N/A</span>}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block text-xs px-2 py-1 rounded bg-[#e0f7ff] text-[#007fa3]">
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
