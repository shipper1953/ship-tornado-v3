import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  console.log("Login component rendered");
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const { token, user } = await res.json();
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      navigate("/dashboard");
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#000E5C] text-white flex-col justify-center items-center px-10">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold">ShipTornado</h1>
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm opacity-80">
            To continue, enter your sign in information
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              Sign in
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 space-y-2">
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot your password?
            </a>
            <p>
              New user?{" "}
              <a href="/register" className="font-semibold text-indigo-600 hover:underline">
                Apply
              </a>
            </p>
            <button className="mt-2 border border-gray-300 px-4 py-1 rounded-full hover:bg-gray-100">
              Sign in with Intuit
            </button>
            <div className="mt-4 text-gray-500 flex justify-center gap-4">
              <a href="#">Legal</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
