import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);


  return (
    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white">
      <header className="p-6 bg-gray-800 shadow-md">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="flex-grow p-8">
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Total Movies */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Total Movies</h2>
            <p className="text-4xl font-bold text-green-500">{totalMovies}</p>
          </div>

          {/* Total Users */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Total Users</h2>
            <p className="text-4xl font-bold text-green-500">{totalUsers}</p>
          </div>

          {/* Total Bookings */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Total Bookings</h2>
            <p className="text-4xl font-bold text-green-500">{totalBookings}</p>
          </div>
        </div>

        {/* Manage Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Manage</h2>
          <div className="grid grid-cols-2 gap-6">
            <button
              className="bg-green-500 text-black px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => navigate("/admin/Movies")}
            >
              Manage Movies
            </button>
            <button
              className="bg-green-500 text-black px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => navigate("/admin/users")}
            >
              Manage Users
            </button>
            <button
              className="bg-green-500 text-black px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => navigate("/admin/bookings")}
            >
              View Bookings
            </button>
            <button
              className="bg-green-500 text-black px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => navigate("/admin/Genres")}
            >
              Manage Genres
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}