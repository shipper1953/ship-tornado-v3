export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">ShipTornado</h1>
        <p className="text-gray-500 text-sm mt-2">Welcome to your logistics dashboard</p>
      </div>
      {children}
      <footer className="mt-10 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} ShipTornado, Inc.
      </footer>
    </div>
  );
}
