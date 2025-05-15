// src/layouts/DashboardLayout.jsx
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-6">{children}</main>
    </>
  );
}
