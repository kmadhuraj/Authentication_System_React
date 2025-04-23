// import React from 'react'
// import  { useState } from 'react';
// import { forgotPassword } from '../services/api.js';
// import { Navigate, useNavigate } from 'react-router-dom';

// export default function ForgotPassword() {
//     const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate=useNavigate();

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await forgotPassword({ email });
//       setMessage(res.data.message);

//       // Extract email and token from resetLink
//       const resetLink = new URL(res.data.resetLink);
//       const emailParam = resetLink.searchParams.get("email");
//       const tokenParam = resetLink.searchParams.get("token");

//       // Navigate to frontend reset-password route with token and email
//       navigate(`/reset-password?email=${encodeURIComponent(emailParam)}&token=${encodeURIComponent(tokenParam)}`);
//     } catch (err) {
//       console.error("Failed to send forgot password request", err);
//       setMessage("Failed to send reset email. Please try again.");
//     }
//   };

//   return (
//     <>
//     {/* <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
//           Submit
//         </button>

//         {message && <p className="text-green-600 mt-2">{message}</p>}
//       </form>
//     </div> */}

//     </>
//   )
// }

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { forgotPassword } from "../services/api"; // your API function
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgotPassword({ email });
      const { message, resetLink } = res.data;

      // Check if response has expected success structure
      if (res.data && res.data.success) {
        const { resetLink } = res.data;
        const url = new URL(resetLink);
        const emailParam = url.searchParams.get("email");
        const tokenParam = url.searchParams.get("token");

        navigate(
          `/reset-password?email=${encodeURIComponent(
            emailParam
          )}&token=${encodeURIComponent(tokenParam)}`
        );
        
      } 
      else {
        toast.success("Reset link sent to registered email");
      }
    } catch (err) {
      console.error("Failed to send forgot password request", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Forgot Password?
            </h1>
            <p className="text-gray-500">
              No worries! Enter your email and we'll send you reset
              instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 ease-in-out bg-gray-50 hover:bg-gray-100 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 ease-in-out hover:opacity-90 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
