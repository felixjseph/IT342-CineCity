import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGenre, setEditGenre] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [countGenres,setCountGenres] = useState()

  useEffect(() => {
    fetchGenres();
    numberOfGenres();
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch genres");
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addGenre = async () => {
    if (!newGenre.trim()) return;
    if (genres.some((g) => g.genreName.toLowerCase() === newGenre.toLowerCase())) {
      setError("Genre already exists!");
      toast.error("Genre already exists!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genreName: newGenre }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error adding genre");
      const addedGenre = await response.json();
      setGenres([...genres, addedGenre]);
      closeModal();
      toast.success("Genre added successfully!");
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const numberOfGenres = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre/stats/count`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json();
        console.log("Number of genres: ", data)
        setCountGenres(data)
      } else {
        console.log("Error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateGenre = async () => {
    if (!editGenre || !editName.trim()) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre/${editGenre.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genreName: editName }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error updating genre");
      setGenres(genres.map((g) => (g.id === editGenre.id ? { ...g, genreName: editName } : g)));
      closeModal();
      toast.success("Genre updated successfully!");
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const deleteGenre = async () => {
    if (!genreToDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre/${genreToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error deleting genre");
      setGenres(genres.filter((g) => g.id !== genreToDelete.id));
      setIsDeleteModalOpen(false);
      toast.success("Genre deleted successfully!");
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const openAddModal = () => {
    setEditGenre(null);
    setNewGenre("");
    setIsModalOpen(true);
  };

  const openEditModal = (genre) => {
    setEditGenre(genre);
    setEditName(genre.genreName);
    setIsModalOpen(true);
  };

  const openDeleteModal = (genre) => {
    setGenreToDelete(genre);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditGenre(null);
    setEditName("");
    setNewGenre("");
  };

  const filteredGenres = genres.filter((g) => g.genreName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 overflow-y-auto text-white h-screen w-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-medium">Manage Genres</h1>
        <button onClick={openAddModal} className="flex items-center bg-[#2E2F33] px-4 py-2 rounded hover:bg-gray-500">
          <IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" /> Add Genre
        </button>
      </div>
      <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
        <h1 className="text-white mr-8">All</h1>
        <p className="bg-gray-500/30 px-2 rounded">{countGenres}</p>
      </div>
      <div className="mt-4 mb-4 w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33]">
        <IoSearchSharp className="text-[#2FBD59] mr-2" />
        <input type="text" placeholder="Search genre" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="text-white w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400 focus:outline-none" />
      </div>

      {loading ? <p>Loading genres...</p> : (
        <table className=" min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="text-gray-300 uppercase text-left text-bold">
              <th className="py-3 px-6">Genre Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGenres.map((genre) => (
              <tr key={genre.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="px-10">{genre.genreName}</td>
                <td className="py-4 flex justify-center gap-2">
                  <button onClick={() => openEditModal(genre)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-6 rounded-lg">Edit</button>
                  <button onClick={() => openDeleteModal(genre)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
          <div className="bg-[#2E2F33] p-6 rounded-lg w-96 text-white">
            <h2 className="text-xl font-bold mb-4">{editGenre ? "Edit Genre" : "Add New Genre"}</h2>
            <input
              type="text"
              placeholder="Enter genre name"
              value={editGenre ? editName : newGenre}
              onChange={(e) => (editGenre ? setEditName(e.target.value) : setNewGenre(e.target.value))}
              className="p-2 rounded bg-[#1E1F22] text-white border border-gray-600 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="p-2 w-20 bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
              <button onClick={editGenre ? updateGenre : addGenre} className="p-2 w-20 bg-green-600 rounded hover:bg-green-700">{editGenre ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/50 backdrop-blur-sm">
          <div className="bg-[#2E2F33] p-6 rounded-lg w-96 text-white">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the genre "{genreToDelete?.genreName}"?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="p-2 w-20 bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
              <button onClick={deleteGenre} className="p-2 w-20 bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        draggablePercent={60}
        rtl={false}
      />

    </div>
  );
}
