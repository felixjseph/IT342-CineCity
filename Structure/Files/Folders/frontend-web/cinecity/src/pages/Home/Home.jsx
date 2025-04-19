import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/HomePageBackground.jpg')",
      }}
    >
      <div className="bg-black/90 p-10 rounded-lg text-center max-w-3xl">
        <h1 className="text-7xl font-extrabold mb-6 text-green-500">
          Welcome to CineCity
        </h1>
        <p className="text-xl text-white mb-8 leading-relaxed">
          Experience the magic of cinema like never before. Discover the latest
          blockbusters, timeless classics, and everything in between. Book your
          tickets now and enjoy a seamless movie experience.
        </p>
        <button
          className="px-8 py-4 bg-green-500 text-black rounded-full text-xl font-semibold hover:scale-110 cursor-pointer hover:bg-green-600 transition duration-300 shadow-lg"
          onClick={() => navigate("/movie")}
        >
          Explore Movies
        </button>
      </div>
    </div>
  );
}