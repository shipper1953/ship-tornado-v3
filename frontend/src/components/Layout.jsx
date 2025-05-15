import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
