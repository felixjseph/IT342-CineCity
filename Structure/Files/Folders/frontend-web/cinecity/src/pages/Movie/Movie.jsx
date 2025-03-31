import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [showtime, setShowtime] = useState({})
  const [cinemas, setCinemas] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchShowtimes();
    fetchGenres();
  }, []);

  // const fetchMovies = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/movie", {
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setMovies(data);
  //     } else {
  //       console.error("Error fetching movies:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching movies:", error);
  //   }
  // };

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

  const fetchShowtime = async (showtimeId) => {
    try {
      const response = await fetch(`http://localhost:8080/showtime/${showtimeId}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setShowtime(data);
        console.log(data)
        setSelectedMovie(true)
      } else {
        console.error("Error fetching showtimes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await fetch("http://localhost:8080/showtime", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setShowtimes(data);
        console.log(data)
      } else {
        console.error("Error fetching showtimes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  // const fetchCinemas = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/cinemas", {
  //       method: "GET",
  //       credentials: "include"
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setCinemas(data);
  //     } else {
  //       console.log("Error fetching cinemas");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const toggleGenre = (id) => {
  //   setSelectedGenres((prev) =>
  //     prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
  //   );
  // };

  // const filteredMovies = movies.filter(
  //   (movie) =>
  //     (selectedGenres.length === 0 || selectedGenres.includes(movie.genre?.id)) &&
  //     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // useEffect(() => {
  //   localStorage.setItem("movie",JSON.stringify(selectedMovie))
  // }, [selectedMovie]);


  return (
    <div className="flex h-screen text-white">
      <div className="w-1/6 p-8 border-r border-gray-600">
        <h2 className="text-2xl font-bold mb-4">Genre</h2>
        {genres.map((genre) => (
          <div key={genre.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
              className="mr-2"
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
            className="p-3 rounded-full bg-white text-black border border-gray-500 w-64"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {showtimes.map((showtime) => (
            <div
              key={showtime.movieCinemaId}
              className="bg-[#2FBD59] p-4 rounded-lg text-black cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300"
              onClick={() => {
                fetchShowtime(showtime.movieCinemaId)
              }}
            >
              <img
                src={`http://localhost:8080/movie/${showtime.movie.id}/cover?timestamp=${new Date().getTime()}`}
                alt={`${showtime.movie.title} Cover`}
                className="object-cover rounded mb-4 w-full h-48"
              />
              <h3 className="text-lg font-bold">{showtime.movie.title}</h3>
              <p className="text-sm truncate">{showtime.movie.synopsis}</p>
              <p className="text-sm font-semibold">Genre: {showtime.movie.genre?.genreName || "Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" onClick={() => setSelectedMovie(null)}>

          <div className="relative bg-[#1E1E1E] text-white rounded-lg shadow-lg w-[80%] max-w-4xl flex p-6 space-x-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-5 right-3 text-white text-2xl hover:text-gray-400"
            > ✖ </button>
            <img
              src={`http://localhost:8080/movie/${showtime.movie.id}/cover?timestamp=${new Date().getTime()}`}
              alt={`${showtime.movie.title} Cover`}
              className="w-1/3 object-cover rounded-lg"
            />
            <div className="w-2/3">
              <h1 className="text-4xl font-extrabold">{showtime.movie.title}</h1>
              <p className="mt-3 text-gray-300">{showtime.movie.synopsis}</p>
              <p className="mt-4 font-semibold">Cinemas:</p>
              <p className="text-lg font-bold text-gray-200">{showtime.cinema.cinema_name}</p>
              <p className="mt-4 font-semibold ">Showtimes:</p>
              <p className="text-sm text-gray-400 border-b border-gray-600 py-2">
                {showtime.date} {showtime.time} - Price: ₱{showtime.price}
              </p>
              <button className="mt-3 ml-4 px-3 py-1 bg-green-500 text-black rounded-full hover:scale-105 transition duration-300"
                onClick={() => {
                  localStorage.setItem("showtime", JSON.stringify(showtime))
                  navigate('/seat')
                }}
              >Book Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}