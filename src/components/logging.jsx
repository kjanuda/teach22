// src/components/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin@123') {
      setSuccess(true);
      setTimeout(() => {
        onLogin();
      }, 2000); // Show success screen for 3 sec
    } else {
      setError('❌ Invalid credentials. ');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-100">
        <motion.div
          className="text-4xl font-semibold text-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Login Successful!
        </motion.div>
        <motion.div
          className="mt-4 animate-spin h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent"
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100 px-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
