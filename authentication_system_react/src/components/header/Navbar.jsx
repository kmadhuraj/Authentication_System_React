import React, { use, useState } from "react";
import UserProfileMenu from "../drop_down_panel/UserProfileMenu";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogOut,  Users } from "lucide-react";
import { UserCircle } from "lucide-react";
export default function Navbar({ userName }) {
  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };
  //
  const navigate = useNavigate();
  const toggleMenu = () => setOpen(prev => !prev);
    const [open, setOpen] = useState(false);
  // here im working 



  const handleUserList = () => {
    navigate("/user-list");
  };
  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <nav className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 p-4 shadow-md flex  justify-between items-center">
        <div className="text-white flex justify-center items-center text-xl font-semibold">
          My Auth
        </div>

        {/* Desktop navbar  menu */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-white font-medium">Hi, {userName} 👋</span>

          <UserProfileMenu />
        </div>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-md w-60 p-4 flex flex-col gap-4 z-50 md:hidden">
            {/* User profile menu */}
            <div className="flex items-center gap-2">

            {/* for navigating to the profile */}
              <button
                onClick={handleNavigateProfile}
                className="focus:outline-none flex items-center rounded-2xl"
                aria-haspopup="true"
                aria-expanded={open}
              >
                <UserCircle className="w-8 h-8 text-gray-700 hover:text-purple-600" />
              </button>
              <span className="text-gray-800 font-medium">{userName}</span>
            </div>

            {/*  */}

            {/* Divider */}
            <div className="border-b border-gray-300 my-2" />

            {/* View User Button */}
            <button
              onClick={handleUserList}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <Users size={32} />
              View User
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut size={32} />
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
