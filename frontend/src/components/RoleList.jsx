// src/components/RoleList.jsx
import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api/fetchWithAuth';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetchWithAuth('http://localhost:5001/api/roles');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        setError('Failed to load roles');
        console.error(err);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Roles</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {roles.map((role) => (
          <li key={role.id} className="border-b pb-2">{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
