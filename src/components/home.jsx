import React from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 w-full max-w-3xl text-center"
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-blue-700 mb-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, type: 'spring' }}
        >
          {user
            ? `Welcome, ${user.name || user.email?.split('@')[0]} 👋`
            : 'Welcome to the Teacher Attendance System'}
        </motion.h1>

        <motion.p
          className="text-gray-600 text-md md:text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {user && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Welcome bck, {user.name}!</p>
        </div>
      )}
          Mark attendance, manage classes, and streamline your daily routine with ease.
        </motion.p>

        <motion.div
          className="flex justify-center mb-8"
          animate={{
            rotate: [0, 5, -5, 0],
            transition: { repeat: Infinity, duration: 4 },
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="teacher"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
