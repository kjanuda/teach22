// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  console.log('Navbar user state:', user);
  const isAuthenticated = Boolean(user?.id);

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
    <Link to="/" className="text-xl font-bold text-blue-700">
      Teacher Attendance
    </Link>

    <div className="flex gap-4">
      {isAuthenticated ? (
        <>
          <Link to="/profile" className="text-blue-600">Profile</Link>
          <Link to="/about" className="text-blue-600">About</Link>
          <Link to="/attendance" className="text-blue-600">Attendance</Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
          <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Register</Link>
        </>
      )}
    </div>
  </nav>
  );
};

export default Navbar;
