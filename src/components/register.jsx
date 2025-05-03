import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;
  return strength;
};

const strengthLabel = (score) => {
  switch (score) {
    case 0:
    case 1:
      return { label: 'Weak', color: 'bg-red-500' };
    case 2:
      return { label: 'Medium', color: 'bg-yellow-500' };
    case 3:
    case 4:
      return { label: 'Strong', color: 'bg-green-500' };
    default:
      return { label: '', color: 'bg-gray-300' };
  }
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      setIsRegistered(true);
      setError('');
      setTimeout(() => navigate('/signin'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const strength = strengthLabel(getPasswordStrength(formData.password));

  if (isRegistered) {
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
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
          >
            Registration Successful!
          </motion.h2>
          <motion.p className="text-lg text-gray-600 mb-6">
            Redirecting to Login...
          </motion.p>
          <div className="animate-spin h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent" />
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
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Create Account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded mb-1 focus:ring-2 focus:ring-green-400"
          />
          <div className="h-2 mb-1 rounded bg-gray-200">
            <div className={`h-2 ${strength.color} rounded transition-all duration-500`} style={{ width: `${getPasswordStrength(formData.password) * 25}%` }}></div>
          </div>
          <p className={`text-xs font-medium mb-3 ${strength.color.replace("bg", "text")}`}>
            Strength: {strength.label}
          </p>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
