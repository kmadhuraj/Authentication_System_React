import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    const storedUser = sessionStorage.getItem('user');
    console.log("stored user is "+storedUser);
    if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUserName(user.name || 'User');
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };
  const handleUserList=()=>{
    navigate("/user-list")
  }
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 p-4 shadow-md flex justify-between items-center">
        <div className="text-white text-xl font-semibold">My Auth</div>
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium">Hi, {userName} 👋</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
          <button onClick={handleUserList} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow" >View User</button>
        </div>
      </nav>

      {/* Home Content */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Welcome to the Home Page, {userName}!
        </h1>
        <p className="text-lg md:text-xl text-center max-w-xl">
          We're excited to have you here. Explore the features and enjoy your stay! 🚀
        </p>
      </div>
    </>
  );
}
