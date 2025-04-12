import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore'; // Import Zustand store

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore(); // Get current user

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-tr from-blue-50 via-white to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-xl text-center"
      >
        <motion.h1
          className="text-4xl font-extrabold text-blue-700 mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          {user
            ? `Welcome, ${user.email.split('@')[0]}`
            : 'Welcome to the Teacher Attendance System'}
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Mark attendance, manage classes, and streamline your daily routine with ease.
        </motion.p>

        <motion.div
          className="flex justify-center mb-6"
          animate={{
            rotate: [0, 5, -5, 0],
            transition: { repeat: Infinity, duration: 4 },
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="teacher"
            className="w-32 h-32"
          />
        </motion.div>

        {!user && (
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => navigate('/signin')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Register
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
