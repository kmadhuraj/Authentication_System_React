import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { resetPassword } from "../services/api";
import { FaEnvelope, FaKey } from "react-icons/fa";
export default function ResetPassword() {
    const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token") || "";
  const emailParam = query.get("email") || "";

  const [form, setForm] = useState({
    email: emailParam,
    newPassword: "",
  });

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
      const payload = {
        email: form.email,
        token: token,
        newPassword: form.newPassword,
      };

      await resetPassword(payload);

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  return (
    <>
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
        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-4">
          Reset Password 🔒
        </h2>
        <p className="text-center text-gray-900 text-sm mb-6">
          Enter your email and new password
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
          <FaKey className="absolute top-3.5 left-4 text-gray-400" />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 ease-in-out hover:opacity-90 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset Password
        </button>

        <Link
          to="/login"
          className="text-blue-500 text-sm text-center hover:underline transition"
        >
          Back to Login
        </Link>
      </form>
    </div>
    </>
  );
}
