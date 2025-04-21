import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //validation form
  const validateForm = () => {
    if (!form.fullname) {
      toast.error("Full name is required");
      return false;
    }

    if (!form.email) {
      toast.error("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Enter a valid email");
      return false;
    }

    if (!form.password) {
      toast.error("Password is required");
      return false;
    } else if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    } else if (!/[A-Z]/.test(form.password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      toast.error(
        "Password must contain at least one special character (e.g., !@#$%^&*(),.?)"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage("");
    // setError("");

    if (!validateForm()) return; //form validation
    try {
      await register(form);
      // setMessage("🎉 Registration successful! Redirecting to login...");
      toast.success("🎉 Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message;
      toast.error(
        "Invalid input. Please check your email or password." + errorMsg
      );
    }
  };
// work with registwer user 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <img
            src="https://img.icons8.com/color/96/000000/add-user-group-man-man.png"
            alt="Register Icon"
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-extrabold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">Join us to explore more!</p>
        </div>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center text-sm font-medium">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 ease-in-out hover:opacity-90 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
