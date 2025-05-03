// src/components/LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const validate = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      setUser(res.data.user);// assuming your API returns user object

      console.log(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);   // Simulate loading
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {loading ? (
        <motion.div
          className="text-center text-lg text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin mb-4"></div>
            Logging in...
          </div>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default LoginForm;
