import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f8fb] to-white p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-[#0b1c2c] drop-shadow-sm">
            Welcome, {user?.email || "User"}
          </h1>
          <p className="text-[#5c7080] text-lg mt-2">Manage your shipping operations at a glance.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Orders", desc: "View and manage customer orders.", href: "/orders" },
            { title: "Shipments", desc: "Track outgoing shipments.", href: "/shipments" },
            { title: "Create Shipment", desc: "Buy shipping labels.", href: "/create-shipment" },
          ].map(({ title, desc, href }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-[#0b1c2c]">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
              <button
                onClick={() => (window.location.href = href)}
                className="mt-4 inline-block px-4 py-2 bg-[#00b8ff] text-white rounded-md hover:bg-[#009ed9] transition"
              >
                Go to {title}
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
