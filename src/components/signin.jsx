import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore'; // adjust path as needed


const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    // Simulate successful login
     // Save user to state

    setIsLoggedIn(true);
    setTimeout(() => {
       
      navigate('/'); // Replace with your actual home/dashboard route

    }, 3000);
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center"
        >
          <motion.h2
            className="text-2xl font-bold text-green-600 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            
            Login Successful!
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Redirecting to Home...
          </motion.p>
          <motion.div
            className="animate-spin h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent"
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-green-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signin;
