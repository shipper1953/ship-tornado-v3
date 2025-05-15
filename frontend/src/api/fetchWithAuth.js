// src/api/fetchWithAuth.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export default function fetchWithAuth(path, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}
