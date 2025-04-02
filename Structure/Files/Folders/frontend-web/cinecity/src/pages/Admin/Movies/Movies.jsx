import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function Movies() {
  const [addMovie, setAddMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successAddToast, setSuccessAddToast] = useState(false);
  const [successUpdateToast, setSuccessUpdateToast] = useState(false);
  const [successDeleteToast, setSuccessDeleteToast] = useState(false);
  const [genre, setGenre] = useState([]);
  const [updateModal, setUpdateModal] = useState(false)
  const [updateMovie, setUpdateMovie] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [movie, setMovie] = useState({
    title: "",
    duration: "",
    synopsis: "",
    genre: {
      id: ""
    }
  });

  const handleEdit = (movieId) => {
    setUpdateModal(true)
    setUpdateMovie(movieId)
    fetchMovie(movieId)
  }

  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie`, {
        method: "GET",
        credentials: "include",
      });

      const movieDatas = await response.json();

      if (response.ok) {
        console.log(movieDatas);
        console.log("Movies fetched successfully");
        setMovies(movieDatas);
      } else {
        console.log(movieDatas);
        console.log("Movies fetch failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movie),
        credentials: "include"
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        console.log("Movie added successfully");
        setAddMovie(false);
        setSuccessAddToast(true);
        setTimeout(() => setSuccessAddToast(false), 3000);
        fetchMovies();
        setMovie({
          title: "",
          duration: "",
          synopsis: "",
          genre: {
            id: ""
          }
        })
      } else {
        console.log(data);
        console.log("Error adding a movie");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      setMovie((movie) => ({
        ...movie,
        genre: { ...movie.genre, id: value }
      }));
    } else {
      setMovie((movie) => ({
        ...movie,
        [name]: value
      }));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie/${updateMovie}`, {
        method: "DELETE",
        credentials: 'include'
      })

      if (response.ok) {
        console.log(`movie with id ${updateMovie} has been deleted`)
        setConfirmDelete(false)
        setIsLoading(false)
        setSuccessDeleteToast(true)
        fetchMovies();
        setTimeout(() => setSuccessDeleteToast(false), 3000);
      } else {
        console.log(`error deleting movie id ${updateMovie}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie/${updateMovie}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movie),
        credentials: 'include'
      })

      const data = await response.json();
      if (response.ok) {
        console.log(data)
        console.log("movie updated successfully")
        setUpdateModal(false);
        setSuccessUpdateToast(true);
        fetchMovies();
        setTimeout(() => setSuccessUpdateToast(false), 3000);
        setIsLoading(false)
        setMovie({
          title: "",
          duration: "",
          synopsis: "",
          genre: {
            id: ""
          }
        })
      } else {
        console.log(data)
        console.log("movie updated failed")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMovie = async (movieid) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie/${movieid}`, {
        method: "GET",
        credentials: 'include'
      })

      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setMovie(data)
        console.log(`movie id: ${movieid}`)
      } else {
        console.log(data)
        console.log(`Error fetching movie id: ${movieid}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre`, {
          method: "GET",
          credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setGenre(data);
        } else {
          console.log(response);
          console.log("Error fetching genre");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  const handleImageUpload = async (e, movieId) => {
    e.preventDefault();
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file); // Append the file to the form data

    try {
      setIsLoading(true); // Show loading state
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie/${movieId}/cover`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log(`Image uploaded successfully for movie ID: ${movieId}`);
        fetchMovies(); // Refresh the movie list to show the updated image
      } else {
        console.error("Error uploading image:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="p-8 border-white w-full relative overflow-y-scroll">
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
        <div className="grid grid-cols-2 gap-4 mt-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="text-white p-4 flex justify-between items-center bg-[#2E2F33] rounded"
            >
              <div>
                <h1 className="text-xl">{movie.title}</h1>
                <div><p className="text-xm font-medium opacity-30">Duration</p><p className="text-sm font-medium">{movie.duration} minutes</p></div>
                <div className="mt-4"><p className="text-xm font-medium opacity-30">Genre</p><p className="text-sm font-medium">{movie.genre.genreName}</p></div>
                <div className="flex items-center mt-2 w-fit">
                  <button className="flex items-center px-4 py-1 mr-4 rounded bg-gray-500 cursor-pointer transition duration-300 ease-in-out"
                    onClick={() => handleEdit(movie.id)}
                  ><FaEdit className="text-blue-500 text-xl mr-2" />Edit</button>
                  <button className="flex mr-4 items-center px-4 py-1 rounded bg-gray-500 cursor-pointer transition duration-300 ease-in-out"
                    onClick={() => {
                      setConfirmDelete(true)
                      setUpdateMovie(movie.id)
                    }}
                  ><MdDelete className="text-red-500 text-xl mr-2" />Delete</button>
                  {movie.photo !== null ? (
                    <label className="w-full px-2 text-white mt-2 py-1 rounded cursor-pointer bg-gray-700 flex items-center justify-center">
                      Change
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, movie.id)}
                      />
                    </label>
                  ) : (
                    <label className="w-full px-2 text-white mt-2 rounded cursor-pointer bg-gray-700 flex items-center justify-center">
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, movie.id)}
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className="bg-green-500/20 h-[80%] w-[7rem] rounded text-center content-center">
                {movie.photo !== null ? (
                  <img
                    src={`${import.meta.env.VITE_DATA_URL}/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
                    alt={`${movie.title} Cover`}
                    className="object-cover rounded mb-4"
                  />

                ) : (
                  <div>
                    <h1>Upload cover photo</h1>

                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
          <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
            <h1>Are you sure you want to delete this movie?</h1>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                className="bg-green-500 px-4 py-2 rounded text-white ml-2 hover:bg-green-600 transition flex items-center"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Yes
                {isLoading && <span className="loader ml-2"></span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {addMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
          <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
            <h2 className="text-lg font-semibold mb-4">Add New Movie</h2>
            <input
              type="text"
              placeholder="Movie title"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
              onChange={handleChange}
              name="title"
              value={movie.title}
            />
            <input
              type="number"
              placeholder="Duration"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
              onChange={handleChange}
              name="duration"
              value={movie.duration}
            />
            <input
              type="text"
              placeholder="Synopsis"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
              name="synopsis"
              onChange={handleChange}
              value={movie.synopsis}
            />
            <select
              className="w-[50%] rounded bg-gray-700 text-white h-[2.3rem]"
              name="genre"
              onChange={handleChange}
              value={movie.genre.id}
            >
              <option value="">Select Genre</option>
              {genre.map((gen) => (
                <option value={gen.id} key={gen.id}>
                  {gen.genreName}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setAddMovie(false)}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                className="bg-green-500 px-4 py-2 rounded text-white ml-2 hover:bg-green-600 transition flex items-center"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Save
                {isLoading && <span className="loader ml-2"></span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {successAddToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          New movie added
        </div>
      )}

      {successUpdateToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Movie updated successfully
        </div>
      )}

      {successDeleteToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Movie deleted successfully
        </div>
      )}

      {updateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
          <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
            <h2 className="text-lg font-semibold mb-4">Edit Movie</h2>
            <input
              type="text"
              placeholder="Movie title"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
              onChange={handleChange}
              name="title"
              value={movie.title}
            />
            <input
              type="number"
              placeholder="Duration"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
              onChange={handleChange}
              name="duration"
              value={movie.duration}
            />
            <input
              type="text"
              placeholder="Synopsis"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
              name="synopsis"
              onChange={handleChange}
              value={movie.synopsis}
            />
            <select
              className="w-[50%] rounded bg-gray-700 text-white h-[2.3rem]"
              name="genre"
              onChange={handleChange}
              value={movie.genre.id}
            >
              <option value="">Select Genre</option>
              {genre.map((gen) => (
                <option value={gen.id} key={gen.id}>
                  {gen.genreName}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setUpdateModal(false)}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                className="bg-green-500 px-4 py-2 rounded text-white ml-2 hover:bg-green-600 transition flex items-center"
                onClick={handleEditSubmit}
                disabled={isLoading}
              >
                Save
                {isLoading && <span className="loader ml-2"></span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}