import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login({setAuth}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await login(form); // Your API call
      localStorage.setItem("token", res.data.token);

      // Store user info manually becuase i have the user details directly along with token insted of object.
      const user = {
        name: res.data.fullName,
        email: res.data.email,
      };

      localStorage.setItem("user", JSON.stringify(user)); // Optional: Store user
      setAuth(true); // ✅ Update parent App's auth state
      setMessage("Login successful! 🎉");
      navigate("/")
    //   setTimeout(() => navigate("/"), 1000); // Delay navigation slightly for message to show
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      {message && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6 animate-fade-in"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-600 mb-4 ">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-900 text-sm mb-6">
          Please login to your account
        </p>

        <div className="relative">
          <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-3.5 left-4 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 ease-in-out hover:opacity-90 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          className="text-blue-500 text-sm text-center hover:underline transition"
        >
          Forgot Password?
        </Link>

        <p className="text-center text-sm mt-4 text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
