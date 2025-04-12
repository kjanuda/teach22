import { motion } from 'framer-motion'
import React from 'react'

const Attendance = () => {
  return (
    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
    <h1 className="text-2xl font-bold mb-4">Attendance Page</h1>
    <p>Here you can mark and view teacher attendance.</p>
  </motion.div>
  )
}

export default Attendance