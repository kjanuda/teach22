import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>This app is designed to manage and monitor teacher attendance with ease and clarity.</p>
    </motion.div>
  )
}

export default About