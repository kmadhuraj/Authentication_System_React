import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    jobTitle: "",
    department: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //validation form
  // const validateForm = () => {
  //   if (!form.fullname) {
  //     toast.error("Full name is required");
  //     setForm((prev) => ({ ...prev, fullname: "" }));

  //     return false;
  //   }

  //   if (!form.email) {
  //     toast.error("Email is required");
  //     setForm((prev) => ({ ...prev, email: "" }));

  //     return false;
  //   } else if (!/\S+@\S+\.\S+/.test(form.email)) {
  //     toast.error("Enter a valid email");
  //     setForm((prev) => ({ ...prev, email: "" }));

  //     return false;
  //   }

  //   if (!form.password) {
  //     toast.error("Password is required");
  //     setForm((prev) => ({ ...prev, password: "" }));
  //     return false;
  //   } else if (form.password.length < 6) {
  //     toast.error("Password must be at least 6 characters");
  //     setForm((prev) => ({ ...prev, password: "" }));
  //     return false;
  //   } else if (!/[A-Z]/.test(form.password)) {
  //     toast.error("Password must contain at least one uppercase letter");
  //     setForm((prev)=>({...prev, password:""}))
  //     return false;
  //   } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
  //     toast.error(
  //       "Password must contain at least one special character (e.g., !@#$%^&*(),.?)"
  //     );
  //     setForm((prev) => ({ ...prev, password: "" }));
  //     return false;
  //   }

  //   if (!form.confirmPassword) {
  //     toast.error("Confirm Password is required");
  //     setForm((prev) => ({ ...prev, confirmPassword: "" }));
  //     return false;
  //   } else if (form.password !== form.confirmPassword) {
  //     toast.error("Passwords do not match");
  //     setForm((prev) => ({ ...prev, confirmPassword: "" }));
  //     return false;
  //   }

  //   if (!form.employeeId.trim()) {
  //     toast.error("Employee ID is required");
  //     setForm((prev) => ({ ...prev, employeeId: "" }));
  //     return false;
  //   }

  //   if (!form.jobTitle.trim()) {
  //     toast.error("Job Title is required");
  //     setForm((prev) => ({ ...prev, jobTitle: "" }));
  //     return false;
  //   }

  //   if (!form.department.trim()) {
  //     toast.error("Department is required");
  //     setForm((prev) => ({ ...prev, department: "" }));
  //     return false;
  //   }

  //   if (!form.phoneNumber.trim()) {
  //     toast.error("Mobile number is required");
  //     setForm((prev) => ({ ...prev, phoneNumber: "" }));
  //     return false;
  //   } else if (!/^\d{10}$/.test(form.phoneNumber)) {
  //     toast.error("Mobile number must be 10 digits");
  //     setForm((prev) => ({ ...prev, phoneNumber: "" }));
  //     return false;
  //   }

  //   return true;
  // };

  const validateForm = () => {
    const {
      fullname,
      email,
      password,
      confirmPassword,
      employeeId,
      jobTitle,
      department,
      phoneNumber,
    } = form;

    if (!fullname.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      return false;
    }
    console.log(password+"password");
    console.log(confirmPassword+"confirm password");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!employeeId.trim()) {
      toast.error("Employee ID is required");
      return false;
    }

    if (!jobTitle.trim()) {
      toast.error("Job Title is required");
      return false;
    }

    if (!department.trim()) {
      toast.error("Department is required");
      return false;
    }

    if (!phoneNumber.trim()) {
      toast.error("Mobile number is required");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }

    return true;
  };

  console.log(form);
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    if (!validateForm()) return; //form validation
    try {
      await register(form);
      toast.success("🎉 Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message;
      console.log("message "+message);
      if (errorMsg?.includes("email")) {
        toast.error("Email already exists. Please use a different one.");
      } else if (errorMsg?.includes("employeeId")) {
        toast.error("Employee ID already exists. Please use a different one.");
      } else {
        toast.error(
          "Invalid input. Please check your email or password." + errorMsg
        );
      }

      // setForm({
      //   fullname: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      //   employeeId: "",
      //   jobTitle: "",
      //   department: "",
      //   phoneNumber: "",
      // });
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
          
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? "Disable" : "Show Password"}
            </button> */}
          </div>
          <label className="flex items-center mt-2 space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="form-checkbox"
            />
            <span>Show Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={form.jobTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="number"
            name="phoneNumber"
            placeholder="Mobile Number"
            value={form.phoneNumber}
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
