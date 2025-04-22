import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { resetPassword } from "../services/api";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token") || "";
  const emailParam = query.get("email") || "";

  const [form, setForm] = useState({
    email: emailParam,
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validations
    const { newPassword, confirmPassword, email } = form;

    // Confirm password check
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      setForm(prev => ({ ...prev, confirmPassword: "" }));
      return;
    }
    
    // Email validation
    if (!email.includes("@") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      setForm(prev => ({ ...prev, email: "" }));
      return;
    }
    
    // Password rule checks
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setForm(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
      return;
    }
    
    if (!/[A-Z]/.test(newPassword)) {
      toast.error("Password must include at least one uppercase letter.");
      setForm(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
      return;
    }
    
    if (!/[a-z]/.test(newPassword)) {
      toast.error("Password must include at least one lowercase letter.");
      setForm(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
      return;
    }
    
    if (!/\d/.test(newPassword)) {
      toast.error("Password must include at least one number.");
      setForm(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
      return;
    }
    
    if (!/[@$!%*?&]/.test(newPassword)) {
      toast.error("Password must include at least one special character (@$!%*?&).");
      setForm(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
      return;
    }
    try {
      const payload = {
        email: form.email,
        token: token,
        newPassword: form.newPassword,
      };

      await resetPassword(payload);
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
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

          <div className="relative">
            <FaKey className="absolute top-3.5 left-4 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
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
