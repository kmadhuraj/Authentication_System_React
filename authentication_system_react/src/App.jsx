import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import ForgotPassword from './pages/ForgotPassword';
import ForgotPassword from "./pages/Forgotpassword";
import Home from "./pages/Home";
import "./index.css";
import ResetPassword from "./pages/ResetPassword";
import UserList from "./pages/UserList";
import UserProfileMenu from './components/drop_down_panel/UserProfileMenu';
import Profile from "./pages/Profile";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Re-check token on storage change
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // const isAuthenticated =  !!localStorage.getItem('token');

  return (
   
    <Router>
       <ToastContainer position="top-right" autoClose={6000} />
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        /> */}
        <Route path="/user-list" element={<UserList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
