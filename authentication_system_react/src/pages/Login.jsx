import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
export default function Login({ setAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // const [isSubmitting, setIsSubmitting] = useState(false);//this is for submitting the login form once
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email) {+
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
      setForm((prev) => ({ ...prev, password: "" }));
      return false;
    }else if (!/[A-Z]/.test(form.password)) {
      toast.error("Password must contain at least one uppercase letter");
      setForm((prev) => ({ ...prev, password: "" }));
      return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      toast.error("Password must contain at least one special character (e.g., !@#$%^&*(),.?)");
      setForm((prev) => ({ ...prev, password: "" }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (isSubmitting) return;// to know status of //submited or not
    if (!validateForm()) return;

    try {
      // setIsSubmitting(true);
      const res = await login(form);

      sessionStorage.setItem("token", res.data.token);

      const user = {
        name: res.data.fullName,
        email: res.data.email,
      };
      sessionStorage.setItem("user", JSON.stringify(user));

      setAuth(true);
      toast.success("Login successful! 🎉");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Login Error:", err);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (message === "User not found" ||status==404) {
        toast.error("User not found with this email.");
        console.log("User not found with this email.");
        setForm({ email: "", password: "" });
      } else if (message === "Invalid Password"||status==401) {
        toast.error("Incorrect password.");
        console.log("incorrect password.");
        setForm((prev) => ({ ...prev, password: "" }));
      } else {
        toast.error("Login failed. Please check credentials.");
        setForm({ email: "", password: "" });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      {/* {message && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )} */}

      {/* <ToastContainer /> */}

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
