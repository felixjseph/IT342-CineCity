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
      const response = await fetch("http://localhost:8080/api/movie/all");
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
      const response = await fetch("http://localhost:8080/api/genre/all");
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
      (selectedGenres.length === 0 || selectedGenres.includes(movie.genreId)) &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#2E2F33] text-white">
      {/* Sidebar */}
      <div className="w-1/6 p-8 bg-[#2E2F33] border-r border-gray-600">
        <h2 className="text-2xl font-bold mb-4">GENRES</h2>
        {genres.map((genre) => (
          <div key={genre.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
              className="mr-2 accent-[#2FBD59]"
            />
            <span>{genre.name}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-7">
        {/* Navbar */}
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

        {/* Movie Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.movie_cinema_id}
              className="bg-[#2FBD59] p-4 rounded-lg text-black cursor-pointer"
              onClick={() => navigate(`/movie/${movie.movie_cinema_id}`)}
            >
              <img
                src={`http://localhost:8080/api/movie/${movie.movie_cinema_id}/cover`}
                alt={movie.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm">{movie.synopsis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
