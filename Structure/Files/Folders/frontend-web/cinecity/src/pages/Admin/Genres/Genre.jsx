import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGenre, setEditGenre] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/genre", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setGenres(data);
      } else {
        setError("Failed to fetch genres");
      }
    } catch (error) {
      setError("Error fetching genres");
    } finally {
      setLoading(false);
    }
  };

  const addGenre = async () => {
    if (!newGenre.trim()) return;

    // Prevent duplicate genres
    if (genres.some((genre) => genre.genreName.toLowerCase() === newGenre.toLowerCase())) {
      setError("Genre already exists!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genreName: newGenre }),
        credentials: "include",
      });
      if (response.ok) {
        setGenres([...genres, { id: Date.now(), genreName: newGenre }]); // Optimistic update
        setNewGenre("");
        setIsModalOpen(false);
      } else {
        setError("Error adding genre");
      }
    } catch (error) {
      setError("Error adding genre");
    }
  };

  const updateGenre = async () => {
    if (!editGenre || !editName.trim()) return;

    try {
      const response = await fetch(`http://localhost:8080/genre/${editGenre.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genreName: editName }),
        credentials: "include",
      });

      if (response.ok) {
        setGenres(
          genres.map((genre) =>
            genre.id === editGenre.id ? { ...genre, genreName: editName } : genre
          )
        );
        setEditGenre(null);
        setEditName("");
      } else {
        setError("Error updating genre");
      }
    } catch (error) {
      setError("Error updating genre");
    }
  };

  const deleteGenre = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/genre/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setGenres(genres.filter((genre) => genre.id !== id));
      } else {
        setError("Error deleting genre");
      }
    } catch (error) {
      setError("Error deleting genre");
    }
  };

  const filteredGenres = genres.filter((genre) =>
    genre.genreName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 text-white h-screen w-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-white font-medium text-2xl">Manage Genres</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-gray-500 transition duration-100 cursor-pointer flex items-center text-white bg-[#2E2F33] px-4 py-2 rounded"
        >
          <IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" /> Add Genre
        </button>
      </div>

      <div className="mb-2">
        <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
          <h1 className="text-white mr-8">All</h1>
          <p className="bg-gray-500/30 px-2 rounded">{filteredGenres.length}</p>
        </div>
        <div className="w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33] mt-4">
          <IoSearchSharp className="text-[#2FBD59] mr-2" />
          <input
            type="text"
            placeholder="Search genre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white focus:outline-none w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading genres...</p>
      ) : (
        
          <table className="min-w-full bg-gray-800 text-left text-white rounded-lg overflow-hidden shadow-lg mt-4">
            <thead>
              <tr className="text-left text-gray-300 uppercase text-sm">
                <th className="py-3 px-6">GENRE NAME</th>
                <th className="py-3 px-6 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredGenres.map((genre) => (
                <tr key={genre.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="px-10">{genre.genreName}</td>
                  <td className="py-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setEditGenre(genre);
                        setEditName(genre.genreName);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-6 rounded-lg text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGenre(genre.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}

      {/* Add Genre Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#2E2F33] p-6 rounded-lg w-96 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Genre</h2>
            <input
              type="text"
              placeholder="Enter genre name"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              className="p-2 rounded bg-[#1E1F22] text-white border border-gray-600 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 w-20 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={addGenre}
                className="p-2 w-20 bg-green-600 rounded hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Genre Modal */}
      {editGenre && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setEditGenre(null)}
        >
          <div
            className="bg-[#2E2F33] p-6 rounded-lg w-96 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Edit Genre</h2>
            <input
              type="text"
              placeholder="Enter genre name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="p-2 rounded bg-[#1E1F22] text-white border border-gray-600 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditGenre(null)}
                className="p-2 w-20 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={updateGenre}
                className="p-2 w-20 bg-blue-600 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
