import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

export default function Movies() {
  const [addMovie, setAddMovie] = useState(false);

  return (
    <div className="p-8 border-white w-full relative">
      <div className="flex justify-between">
        <h1 className="text-white font-medium text-2xl">Movies</h1>
        <button
          onClick={() => setAddMovie(true)}
          className="hover:bg-gray-500 transition duration-100 cursor-pointer flex items-center text-white bg-[#2E2F33] px-4 py-2 rounded"
        >
          <IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" /> Add new movie
        </button>
      </div>
      <div>
        <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
          <h1 className="text-white mr-8">All</h1>
          <p className="bg-gray-500/30 px-2 rounded">0</p>
        </div>
        <div className="w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33] mt-4">
          <IoSearchSharp className="text-[#2FBD59] mr-2" />
          <input
            type="text"
            placeholder="Search movies"
            className="text-white focus:outline-none w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400"
          />
        </div>
      </div>

      {addMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
          <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
            <h2 className="text-lg font-semibold mb-4">Add New Movie</h2>
            <input
              type="text"
              placeholder="Movie title"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
            />
            <input type="number" 
                placeholder="duration"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
            />
            <input
              type="text"
              placeholder="Synopsis"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
            />
            <select>
                <option value="">Select Genre</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setAddMovie(false)}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button className="bg-green-500 px-4 py-2 rounded text-white ml-2 hover:bg-green-600 transition">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
