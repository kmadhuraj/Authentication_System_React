import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileMenu from "../components/drop_down_panel/UserProfileMenu";
import Navbar from "../components/header/Navbar";
export default function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    const storedUser = sessionStorage.getItem("user");

    console.log("stored user is " + storedUser);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "User");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

 
  return (
    <>
      
      <Navbar userName={userName}/>

      {/* Home Content */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Welcome to the Home Page, {userName}!
        </h1>
        <p className="text-lg md:text-xl text-center max-w-xl">
          We're excited to have you here. Explore the features and enjoy your
          stay! 🚀
        </p>
      </div>
    </>
  );
}
