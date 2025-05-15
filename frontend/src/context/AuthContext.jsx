import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token && isValidJWT(token)) {
      console.log("✅ Using token:", token);

      axios
        .get("http://localhost:5001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("❌ Token verification failed:", err?.response?.data || err.message);
          localStorage.removeItem("token");
          setToken("");
          setUser(null);
        });
    } else {
      console.warn("⚠️ No valid token found. Skipping auth check.");
    }
  }, [token]);

  // Used inside Login.jsx
  const login = async (formData) => {
    const response = await axios.post("http://localhost:5001/api/auth/login", formData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function isValidJWT(token) {
  return typeof token === "string" && token.split(".").length === 3;
}
