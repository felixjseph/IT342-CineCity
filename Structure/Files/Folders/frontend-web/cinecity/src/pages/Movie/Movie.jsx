import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({})
  const [genres, setGenres] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [users, setUsers] = useState()
  const seats = localStorage.getItem("seats") ? JSON.parse(localStorage.getItem("seats")) : null;
  const showtime2 = localStorage.getItem("showtime2") ? JSON.parse(localStorage.getItem("showtime2")) : null;
  const paymentMethod = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : null;
  const navigate = useNavigate();

  const location = useLocation();

  const fetchMovieShowtime = (movieId) =>{
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
    }
  }

  const updateSeatAvailability = async () => {
    try {
      for (const seat of seats) {
        const response = await fetch(`${import.meta.env.VITE_DATA_URL}/seats/${seat.seatId}`, {
          method: "PUT",
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json();
          console.log("Seat updated successful: ", data)
        } else {
          console.log("error updating seat")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBooking = async (status) => {
    try {
      for (const seat of seats) {
        const response = await fetch(`${import.meta.env.VITE_DATA_URL}/api/bookings`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            showtime: {
              movieCinemaId: showtime2.movieCinemaId
            },
            user: {
              userId: users.userId
            },
            seat: {
              seatId: seat.seatId
            },
            amount: showtime2.price,
            status: status,
            paymentMethod: paymentMethod.type
          }),
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Booking Success: ", data);
          if (status === "success") {
            updateSeatAvailability();
          }
        } else {
          console.log("Booking Failed for seat: ", seat.seatNo);
        }
      }
    } catch (error) {
      console.log("Error during booking: ", error);
    }
  };


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const paymentIntent = queryParams.get("payment_intent_id")

    if (paymentIntent) {
      retrievePaymentIntent(paymentIntent);
    }
  }, [location.search, users])

  const retrievePaymentIntent = async (paymentIntentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/intent/${paymentIntentId}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json();
        if (data.data.attributes.status === "succeeded") {
          handleBooking("success");
          console.log(users)
          console.log("success")
          console.log(data)
        } else {
          console.log("payment failed")
          handleBooking("failed");
        }
      }
    } catch (error) {
      console.log("Error retrieving payment intent:", error)
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
      const response = await fetch("http://localhost:8080/genre", {
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
      const response = await fetch(`http://localhost:8080/showtime/movie/${movieId}`, {
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
      const response = await fetch("http://localhost:8080/showtime", {
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

  const filteredMovies = showtimes.filter(
    (showtime) =>
      (selectedGenres.length === 0 || selectedGenres.includes(showtime.movie.genre?.id)) &&
      showtime.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearFilters = () => {
    setSelectedGenres([]);
    setSearchTerm("")
  };

  return (
    <div className="flex h-screen text-white">
      <div className="w-1/6 p-8 border-r border-gray-600 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Genres</h2>
          <button onClick={clearFilters} className="text-white transition duration-200 cursor-pointer underline">
            Clear
          </button>
        </div>
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`relative flex items-center px-5 py-2 mb-2 rounded-full cursor-pointer transition duration-200 ${selectedGenres.includes(genre.id) ? "bg-[#2FBD59] text-white" : "bg-gray-700 hover:bg-gray-600"
              }`}
            onClick={() => toggleGenre(genre.id)}
          >
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
              className="absolute opacity-0 w-5 h-5 cursor-pointer"
            />
            <span className="font-medium">{genre.genreName}</span>
          </div>
        ))}
      </div>
      <div className="w-5/6 p-7">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl font-bold text-[#FFF]">MOVIES</h1>
          <div className="mt-4 mb-4 w-[20%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33]">
            <IoSearchSharp className="text-[#2FBD59] mr-2" />
            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400 focus:outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-[#2FBD59] p-4 rounded-lg text-black cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300"
              onClick={() => fetchMovieShowtime(movie.id)}
            >
              <img
                src={`http://localhost:8080/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
                alt={`${movie.title} Cover`}
                className="object-cover rounded mb-4 w-full h-48"
              />
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm truncate">{movie.synopsis}</p>
              <p className="text-sm font-semibold">Genre: {movie.genre?.genreName || "Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && showtime && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" onClick={() => setSelectedMovie(false)}>
          <div className="relative bg-[#1E1E1E] text-white rounded-lg shadow-lg w-[80%] max-w-4xl flex p-6 space-x-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMovie(false)}
              className="absolute top-5 right-3 text-white text-2xl hover:text-gray-400"
            > ✖ </button>
            <img
              src={`http://localhost:8080/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
              alt={`${movie.title} Cover`}
              className="w-1/3 object-cover rounded-lg"
            />
            <div className="w-2/3">
              <h1 className="text-4xl font-extrabold">{movie.title}</h1>
              <p className="mt-3 text-gray-300">{movie.synopsis}</p>
              <p className="mt-4 font-semibold">Cinemas:</p>
              {showtime.map((showtime)=>(
                <p className="text-sm text-gray-200/50">{showtime.cinema.cinema_name}</p>
              ))}
              <p className="mt-4 font-semibold">Showtimes:</p>
              {showtime.map((showtime)=>(
                <p className="text-sm text-gray-200/50">{showtime.date} - {showtime.time}</p>
              ))}
              <button className="mt-3 ml-4 px-3 py-1 bg-green-500 text-black rounded-full hover:scale-105 transition duration-300"
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
