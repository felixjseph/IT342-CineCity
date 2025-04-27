import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { FaBookReader } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { SiMicrogenetics } from "react-icons/si";
import { SiShowtime } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/admin/Dashboard" },
    { name: "Movies", icon: <MdMovie />, path: "/admin/Movies" },
    { name: "Cinemas", icon: <RiMovie2Fill />, path: "/admin/Cinemas" },
    { name: "Bookings", icon: <FaBookReader />, path: "/admin/Bookings" },
    { name: "Customers", icon: <FaUser />, path: "/admin/Customers" },
    { name: "Genres", icon: <SiMicrogenetics />, path: "/admin/Genres" },
    { name: "Showtimes", icon: <SiShowtime />, path: "/admin/Showtimes" },
  ];

  const handleLogout = async (e) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/newlogin");
      } else {
        console.log("error has occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex border-white">
      <div className="side bg-[#2E2F33] w-[20rem] flex flex-col items-center p-4">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-[10rem] cursor-pointer"
          onClick={() => navigate("/admin/Dashboard")}
        />
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`px-4 py-2 mt-2 w-[80%] flex items-center font-medium text-white rounded cursor-pointer transition duration-100 ease-in-out ${
              location.pathname === item.path ? "bg-gray-500" : "hover:bg-gray-500"
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="text-xl text-white opacity-50 mr-4">{item.icon}</span>
            {item.name}
          </div>
        ))}
        <div
          className="px-4 py-2 mt-16 w-[80%] flex items-center font-medium text-white rounded cursor-pointer hover:bg-gray-500 transition duration-100 ease-in-out"
          onClick={() => navigate("/admin/profile")}
        >
          <FaUserCircle className="text-xl text-white opacity-50 mr-4" /> Admin
        </div>
        <div
          className="px-4 py-2 mt-2 w-[80%] flex items-center font-medium text-white rounded cursor-pointer hover:bg-gray-500 transition duration-100 ease-in-out"
          onClick={handleLogout}
        >
          <IoLogOut className="text-xl text-white opacity-50 mr-4" /> Logout
        </div>
      </div>
      <Outlet />
    </div>
  );
}