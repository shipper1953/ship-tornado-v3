// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-600 text-lg mb-6">
          You don’t have permission to view this page.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
