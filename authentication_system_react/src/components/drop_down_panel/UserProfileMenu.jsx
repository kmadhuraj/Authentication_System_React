import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export default function UserProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user"); // or use auth-kit logout
    navigate("/login");
  };

  const handleViewProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  const handleUserList = () => {
    navigate("/user-list");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="focus:outline-none flex items-center rounded-2xl"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <UserCircle className="w-8 h-8 text-gray-700 hover:text-purple-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <button
            onClick={handleViewProfile}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            View Profile
          </button>

          <button
            onClick={handleUserList}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            View Users
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
