import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TornadoLoader from "../components/TornadoLoader";

export default function CreateShipment() {
  const { token } = useAuth();
  const [form, setForm] = useState({ to_address: "", from_address: "", parcel: "" });
  const [rateOptions, setRateOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRateOptions([]);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/shipments/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch rates");
      }

      const data = await res.json();
      setRateOptions(data.rates || []);
    } catch (err) {
      console.error("Rate fetch failed", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#0b1c2c] mb-6">📬 Create a Shipment</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#0b1c2c] mb-1">To Address</label>
            <input
              name="to_address"
              value={form.to_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00b8ff] focus:border-[#00b8ff]"
              placeholder="Recipient’s address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0b1c2c] mb-1">From Address</label>
            <input
              name="from_address"
              value={form.from_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00b8ff] focus:border-[#00b8ff]"
              placeholder="Sender’s address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b1c2c] mb-1">Parcel (LxWxH / Weight)</label>
          <input
            name="parcel"
            value={form.parcel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00b8ff] focus:border-[#00b8ff]"
            placeholder="e.g., 10x5x2 / 1.5 lb"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 text-white bg-[#00b8ff] hover:bg-[#009ed9] font-semibold rounded-md transition"
        >
          {loading ? "Loading rates..." : "Fetch Shipping Rates"}
        </button>

        {error && <div className="text-red-600 text-sm font-medium mt-2">{error}</div>}
      </form>

      {loading && <TornadoLoader />}

      {rateOptions.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-[#0b1c2c] mb-4">✅ Available Rates</h2>
          <ul className="divide-y divide-gray-200">
            {rateOptions.map((rate, idx) => (
              <li key={idx} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-[#0b1c2c] font-medium">{rate.carrier} — {rate.service}</p>
                  <p className="text-sm text-gray-500">
                    Delivery: {rate.delivery_days || "N/A"} days · Rate ID: {rate.id}
                  </p>
                </div>
                <span className="text-[#00b8ff] font-bold">${rate.rate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
