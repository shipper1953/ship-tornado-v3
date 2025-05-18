import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}