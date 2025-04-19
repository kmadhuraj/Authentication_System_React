import React, { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
import ForgotPassword from './pages/Forgotpassword';
import Home from './pages/Home';
import './index.css';
import ResetPassword from './pages/ResetPassword';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Re-check token on storage change
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

 
  // const isAuthenticated =  !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>

    
  );
};

export default App;