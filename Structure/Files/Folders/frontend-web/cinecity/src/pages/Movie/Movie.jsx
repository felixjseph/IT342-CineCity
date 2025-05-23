import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { PiFilmSlateFill } from "react-icons/pi";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({})
  const [genres, setGenres] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState()
  const showtime2 = localStorage.getItem("showtime2") ? JSON.parse(localStorage.getItem("showtime2")) : null;
  const paymentMethod = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : null;
  const navigate = useNavigate();

  const location = useLocation();

  const fetchMovieShowtime = (movieId) => {
    fetchMovie(movieId);
    fetchShowtime(movieId);
  }

  const fetchMovie = async (movieId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie/${movieId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json();
        console.log("Movie: ", data)
        setMovie(data)
      } else {
        console.log("Error fetching movie id: ", movieId)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/movie`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json();
        setMovies(data);
        console.log("Movies: ", data)
      } else {
        toast.error("Error fetching movies")
      }
    } catch (error) {
      toast.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchShowtimes();
    fetchGenres();
    fetchUser();
    fetchMovies();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/users/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUsers(data)
      } else {
        console.log("Error user: ", data)
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/genre`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setGenres(data.sort((a, b) => a.genreName.localeCompare(b.genreName)));
      } else {
        console.error("Error fetching genres:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchShowtime = async (movieId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/showtime/movie/${movieId}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setShowtime(data);
        setSelectedMovie(true);
      } else {
        console.error("Error fetching showtimes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/showtime`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setShowtimes(data);
      } else {
        console.error("Error fetching showtimes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const filteredMovies = movies.filter(
    (movie) =>
      (selectedGenres.length === 0 || selectedGenres.includes(movie.genre?.id)) &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const clearFilters = () => {
    setSelectedGenres([]);
    setSearchTerm("");
  };

  const handleSearch = () => {
    console.log("Search triggered for:", searchTerm);
  };

  return (
    <div className="flex text-white" style={{ height: `calc(100vh - 82px)` }}>
      <nav className="shadow-md border-r border-gray-700 h-full min-w-[250px] py-6 px-4 overflow-auto bg-[#1c1c1c]">
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-green-500 text-lg font-semibold">Genres</h6>
            <button
              className="text-sm text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-1 rounded-full transition duration-200 flex items-center gap-1"
              onClick={clearFilters}
            >
              <FaTrash className="text-xs" />
              Reset
            </button>
          </div>
          <ul className="space-y-2">
            {genres.map((genre) => (
              <li key={genre.id}>
                <button
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedGenres.includes(genre.id)
                      ? "bg-green-500 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => toggleGenre(genre.id)}
                >
                  <span className="font-medium">{genre.genreName}</span>
                  {selectedGenres.includes(genre.id) && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="w-full p-7 overflow-y-auto bg-[#1c1c1c]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-4xl font-bold text-white">
            <PiFilmSlateFill className="mr-2 text-green-500" />
            MOVIES
          </div>
          <div className="flex justify-end w-full">
            <div className="flex overflow-hidden rounded-2xl w-4/15">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full outline-none bg-[#2E2F33] text-white text-sm px-4 py-3 placeholder-gray-400"
              />
              <button
                type="button"
                className="flex items-center justify-center bg-green-600 px-5 text-sm text-white cursor-pointer hover:bg-green-700 transition duration-200"
                onClick={handleSearch}
              >
                <IoSearchSharp className="mr-1" />
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-[#2E2F33] h-full flex flex-col rounded overflow-hidden shadow-md animate-pulse">
                  <div className="w-full h-64 bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="min-h-[50px] p-4 !pt-0">
                    <div className="h-10 bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#2E2F33] h-full flex flex-col rounded overflow-hidden shadow-md hover:scale-[1.01] transition-all relative"
                  onClick={() => {
                    setSelectedMovie(true);
                    fetchMovieShowtime(movie.id);
                  }}
                >
                  <div className="block cursor-pointer">
                    <div className="w-full">
                      <img
                        src={`${import.meta.env.VITE_DATA_URL}/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
                        alt={`${movie.title} Cover`}
                        className="object-cover mb-4 w-full h-64"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-sm sm:text-base font-semibold text-white line-clamp-2">
                        {movie.title}
                      </h5>
                      <div className="mt-2 flex items-center flex-wrap gap-2">
                        <h6 className="text-sm sm:text-base text-white">{movie.duration} minutes</h6>
                      </div>
                    </div>
                  </div>
                  <div className="min-h-[50px] p-4 !pt-0">
                    <button
                      type="button"
                      className="absolute left-0 right-0 bottom-3 max-w-[88%] mx-auto text-sm px-2 py-2 font-medium w-full bg-green-600 hover:bg-green-700 text-white tracking-wide outline-none border-none rounded"
                    >
                      Book Movie
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg mt-10">
              No movies available
            </div>
          )}
        </div>
      </div>
      {selectedMovie && showtime && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" onClick={() => setSelectedMovie(false)}>
          <div className="relative bg-[#1E1E1E] text-white rounded-lg shadow-lg w-[80%] max-w-4xl flex p-6 space-x-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMovie(false)}>
              <MdClose className="absolute top-1 right-2 text-2xl text-red-100 transition duration-200 hover:text-red-400 cursor-pointer" />
            </button>
            <img
              src={`${import.meta.env.VITE_DATA_URL}/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
              alt={`${movie.title} Cover`}
              className="w-1/3 object-cover rounded-lg"
            />
            <div className="w-2/3">
              <h1 className="text-4xl font-extrabold">{movie.title}</h1>
              <p className="mt-3 text-gray-300">{movie.synopsis}</p>
              <p className="mt-4 font-semibold">Cinemas:</p>
              {showtime.map((showtime) => (
                <p className="text-sm text-gray-200/50">{showtime.cinema.cinema_name}</p>
              ))}
              <p className="mt-4 font-semibold">Showtimes:</p>
              {showtime.map((showtime) => (
                <p className="text-sm text-gray-200/50">{showtime.date} - {showtime.time}</p>
              ))}
              <button className="mt-3 ml-4 px-3 py-1 bg-green-500 text-black rounded-full hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => {
                  localStorage.setItem("showtime", JSON.stringify(showtime));
                  localStorage.setItem("movie", JSON.stringify(movie));
                  navigate('/seat');
                }}
              >Book Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
