import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/movie/${id}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      } else {
        console.error("Error fetching movie details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  if (!movie) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div
      className="relative w-full h-screen text-white"
      style={{
        backgroundImage: `url(http://localhost:8080/movie/${id}/cover?timestamp=${new Date().getTime()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

    <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-15 px-4 py-2 text-white rounded-md hover:bg-black/70 transition duration-300 text-xl z-50"
        >
        ← BACK
    </button>

      {/* Movie Details */}
      <div className="left-15 relative z-10 flex flex-col justify-center h-full px-12 max-w-2xl">
        <h1 className="text-7xl font-extrabold">{movie.title}</h1>
        <p className="py-1 mt-4 text-3xl text-gray-300 font-semibold">{movie.synopsis}</p>
        <p className="py-4 text-xl font-semibold">{movie.genre.genreName}</p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-[#2FBD59] text-white font-semibold rounded-full hover:bg-[#2fbd5ad2] transition duration-300 cursor-pointer"
          onClick={() => navigate('/seat/selection')}>
            Book Now
          </button>
          
        </div>
      </div>
    </div>
  );
}
