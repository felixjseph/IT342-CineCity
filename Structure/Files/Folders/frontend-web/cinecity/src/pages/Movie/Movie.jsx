import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Movie() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/movie", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error("Error fetching movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://localhost:8080/genre", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setGenres(data);
      } else {
        console.error("Error fetching genres:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
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

  return (
    <div className="flex h-screen text-white">
      <div className="w-1/6 p-8 border-r border-gray-600">
        <h2 className="text-2xl font-bold mb-4">Genre</h2>
        {genres.map((genre) => (
          <div key={genre.id} className="flex items-center mb-2 px-7 py-2 rounded-3xl bg-[#777777] hover:bg-gray-700 transition">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
              className="mr-2 h-4 w-4 rounded-full border border-gray-700 bg-[#777777] appearance-none checked:bg-[#2fbd5ac5] checked:border-[#2fbd5ac5] cursor-pointer transition duration-300"
            />
            <span>{genre.genreName}</span>
          </div>
        ))}
      </div>

      <div className="w-5/6 p-7">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl font-bold text-[#FFF]">MOVIES</h1>
          <input
            type="text"
            placeholder="Search Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded-full bg-white text-black border border-gray-500 focus:border-[#2FBD59] focus:outline-none w-64"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.movie_cinema_id}
              className="bg-[#2FBD59] p-4 rounded-lg text-black cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                    src={`http://localhost:8080/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
                    alt={`${movie.title} Cover`}
                    className="object-cover rounded mb-4"
                  />

              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm">{movie.synopsis}</p>
              <p className="text-sm font-semibold">Genre: {movie.genre?.genreName || "Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
