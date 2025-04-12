import React from 'react'
import { motion } from 'framer-motion'

const Preloader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    {/* Book icon spinner */}
    <motion.div
      className="text-6xl mb-4"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      📘
    </motion.div>

    {/* Loading text */}
    <motion.h1
      className="text-xl font-semibold text-blue-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      Loading Attendance Portal...
    </motion.h1>
  </div>
  )
}

export default Preloader