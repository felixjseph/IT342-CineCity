import React, { useEffect, useState } from "react";

export default function Seat({ showtime, onClose }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Simulate fetching seats from an API (replace with actual API call)
    const fetchedSeats = [
        { id: 1, number: "A1", available: true },
        { id: 2, number: "A2", available: false },
        { id: 3, number: "A3", available: true },
        { id: 4, number: "A4", available: false },
        { id: 5, number: "A5", available: true },
        { id: 6, number: "A6", available: true },
        { id: 7, number: "A7", available: false },
        { id: 8, number: "A8", available: true },
        { id: 9, number: "A9", available: false },
        { id: 10, number: "A10", available: true },
      
        { id: 11, number: "B1", available: false },
        { id: 12, number: "B2", available: true },
        { id: 13, number: "B3", available: true },
        { id: 14, number: "B4", available: false },
        { id: 15, number: "B5", available: true },
        { id: 16, number: "B6", available: false },
        { id: 17, number: "B7", available: true },
        { id: 18, number: "B8", available: true },
        { id: 19, number: "B9", available: false },
        { id: 20, number: "B10", available: true },
      
        { id: 21, number: "C1", available: true },
        { id: 22, number: "C2", available: false },
        { id: 23, number: "C3", available: true },
        { id: 24, number: "C4", available: false },
        { id: 25, number: "C5", available: true },
        { id: 26, number: "C6", available: true },
        { id: 27, number: "C7", available: false },
        { id: 28, number: "C8", available: true },
        { id: 29, number: "C9", available: false },
        { id: 30, number: "C10", available: true },
      
        { id: 31, number: "D1", available: false },
        { id: 32, number: "D2", available: true },
        { id: 33, number: "D3", available: true },
        { id: 34, number: "D4", available: false },
        { id: 35, number: "D5", available: true },
        { id: 36, number: "D6", available: false },
        { id: 37, number: "D7", available: true },
        { id: 38, number: "D8", available: true },
        { id: 39, number: "D9", available: false },
        { id: 40, number: "D10", available: true },
      
        { id: 41, number: "E1", available: true },
        { id: 42, number: "E2", available: false },
        { id: 43, number: "E3", available: true },
        { id: 44, number: "E4", available: false },
        { id: 45, number: "E5", available: true },
        { id: 46, number: "E6", available: true },
        { id: 47, number: "E7", available: false },
        { id: 48, number: "E8", available: true },
        { id: 49, number: "E9", available: false },
        { id: 50, number: "E10", available: true },
      
        { id: 51, number: "F1", available: false },
        { id: 52, number: "F2", available: true },
        { id: 53, number: "F3", available: true },
        { id: 54, number: "F4", available: false },
        { id: 55, number: "F5", available: true },
        { id: 56, number: "F6", available: false },
        { id: 57, number: "F7", available: true },
        { id: 58, number: "F8", available: true },
        { id: 59, number: "F9", available: false },
        { id: 60, number: "F10", available: true },
      
        { id: 61, number: "G1", available: true },
        { id: 62, number: "G2", available: false },
        { id: 63, number: "G3", available: true },
        { id: 64, number: "G4", available: false },
        { id: 65, number: "G5", available: true },
        { id: 66, number: "G6", available: true },
        { id: 67, number: "G7", available: false },
        { id: 68, number: "G8", available: true },
        { id: 69, number: "G9", available: false },
        { id: 70, number: "G10", available: true },
    ];
    setSeats(fetchedSeats);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center">
        <h2 className="text-white text-xl font-semibold mb-4">Seat Availability</h2>

        <p className="text-white">Movie: {showtime.movie.title}</p>
        <p className="text-white">Cinema: {showtime.cinema.cinema_name}</p>

        {/* TV Screen (Seat Container) */}
        <div className="mt-4 flex justify-center">
          <div className="bg-black w-[400px] h-[50px] rounded-lg border-4 border-gray-600 shadow-lg flex items-center justify-center">
            <p className="text-white">Screen</p>
          </div>
        </div>


        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-semibold ${
                seat.available ? "bg-green-500 cursor-pointer" : "bg-gray-500"
              }`}
            >
              {seat.number}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
