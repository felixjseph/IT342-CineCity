import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Showtime() {

    const [seatModal, setSeatModal] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [addModal, setAddModal] = useState(false)
    const [movies, setMovies] = useState([])
    const [cinemas, setCinemas] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showtimes, setShowtimes] = useState([])
    const [addToast, setAddToast] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [show, setShow] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [viewSeatsModal, setViewSeatsModal] = useState(false)
    const [seats, setSeats] = useState([])
    const [movieCinema, setMovieCinema] = useState([])
    const [countShowtimes, setCountShowtimes] = useState()
    const [showtime, setShowtime] = useState({
        movie: {
            id: ""
        },
        cinema: {
            cinema_ID: ""
        },
        price: "",
        date: "",
        time: ""
    })

    const fetchSeats = async (showtimeId) => {
        try {
            const response = await fetch(`http://localhost:8080/seats/showtime/${showtimeId}`, {
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                console.log(data)
                setSeats(data)
                setViewSeatsModal(true)
                const response2 = await fetch(`http://localhost:8080/seats/showtime/${showtimeId}`, {
                    credentials: 'include'
                })

                const data2 = await response2.json();
                if (response2.ok) {
                    console.log(data2)
                    setMovieCinema(data2)
                } else {
                    console.log("error fetching showtime")
                }

            } else {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (showtimeId) => {
        setUpdateModal(true)
        fetchShowtime(showtimeId)
    }

    const addDefaultSeats = async (showtimeId) => {
        try {
            const response = await fetch(`http://localhost:8080/seats/default-seats/${showtimeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            if (response.ok) {
                setIsLoading(false)
                setAddModal(false)
                toast.success("Showtime added successfully")
                fetchShowtimes();
                setShowtime({
                    movie: {
                        id: ""
                    },
                    cinema: {
                        cinema_ID: ""
                    },
                    price: "",
                    date: "",
                    time: ""
                })
                console.log(`seats added to ${showtimeId}`)
            } else {
                console.log(`error adding seats to ${showtimeId}`)
            }
        } catch (error) {
            console.log(error)
            toast.success("Error adding showtime")
        }
    }

    const numberOfShowtimes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/showtime/stats/count`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Number of showtimes: ", data)
                setCountShowtimes(data)
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewSeats = (showtime) => {
        setSelectedShowtime(showtime);
        setSeatModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:8080/showtime', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(showtime),
                credentials: "include"
            })

            const data = await response.json();
            if (response.ok) {

                console.log(data.movieCinemaId)
                console.log("successful")
                numberOfShowtimes()
                addDefaultSeats(data.movieCinemaId)

            } else {
                console.log(showtime)
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (showtimeId) => {
        setDeleteModal(true)
        setShow(showtimeId)
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:8080/showtime/${show}`, {
                method: "DELETE",
                credentials: 'include'
            })

            if (response.ok) {
                console.log(`movie with id ${show} has been deleted`)
                setDeleteModal(false)
                setIsLoading(false)
                fetchShowtimes();
                toast.success("Showtime deleted successfully!");
            } else {
                console.log(`error deleting movie id ${show}`)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error deleting showtime!");
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:8080/showtime/${show}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(showtime),
                credentials: "include"
            })

            const data = await response.json();
            if (response.ok) {
                setIsLoading(false)
                setUpdateModal(false)
                console.log(data)
                console.log("successful")
                fetchShowtimes();
                toast.success("Showtime updated successfully!");
                setShowtime({
                    movie: {
                        id: ""
                    },
                    cinema: {
                        cinema_ID: ""
                    },
                    price: "",
                    date: "",
                    time: ""
                })
            } else {
                console.log(showtime)
                console.log("error")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error updating showtime!");
        }
    }

    const fetchCinemas = async () => {
        try {
            const response = await fetch("http://localhost:8080/cinemas", {
                method: "GET",
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                setCinemas(data)
                console.log(data);
                console.log("data fetch successfully")
            } else {
                console.log(data);
                console.log("error fetching data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchShowtimes = async () => {
        try {
            const response = await fetch("http://localhost:8080/showtime", {
                method: "GET",
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                setShowtimes(data)
                console.log(data);
                console.log("showtimes fetch successfully")
            } else {
                console.log(data);
                console.log("error fetching data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchShowtime = async (showtimeId) => {
        try {
            const response = await fetch(`http://localhost:8080/showtime/${showtimeId}`, {
                method: "GET",
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                setShowtime(data)
                console.log(data);
                setShow(showtimeId)
                console.log("showtime fetch successfully")
            } else {
                console.log(data);
                console.log("error fetching data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost:8080/movie", {
                method: "GET",
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                setMovies(data)
                console.log(data);
                console.log("data fetch successfully")
            } else {
                console.log(data);
                console.log("error fetching data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCinemas();
        fetchMovies();
        fetchShowtimes();
        numberOfShowtimes()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setShowtime((prev) => {
            if (name === "movie") {
                return {
                    ...prev,
                    movie: {
                        ...prev.movie,
                        id: value
                    }
                };
            }
            if (name === "cinema") {
                return {
                    ...prev,
                    cinema: {
                        ...prev.cinema,
                        cinema_ID: value
                    }
                };
            }
            return {
                ...prev,
                [name]: value
            };
        });
    };

    return (
        <div className="p-8 border-white w-full relative overflow-y-auto">
            <div className="flex justify-between">
                <h1 className="text-white font-medium text-2xl">Showtime Management</h1>
                <button
                    onClick={() => setAddModal(true)}
                    className="hover:bg-gray-500 transition duration-100 cursor-pointer flex items-center text-white bg-[#2E2F33] px-4 py-2 rounded"
                >
                    <IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" /> Add new showtime
                </button>
            </div>
            <div>
                <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
                    <h1 className="text-white mr-8">All</h1>
                    <p className="bg-gray-500/30 px-2 rounded">{countShowtimes}</p>
                </div>
                <div className="w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33] mt-4">
                    <IoSearchSharp className="text-[#2FBD59] mr-2" />
                    <input
                        type="text"
                        placeholder="Search movies"
                        className="text-white focus:outline-none w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400"
                    />
                </div>
                <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg mt-4">
                    <thead className="bg-gray-900">
                        <tr className="text-left text-gray-300 uppercase text-sm">
                            <th className="py-3 px-6 text-center">Movie</th>
                            <th className="py-3 px-6 text-center" >Cinema</th>
                            <th className="py-3 px-6 text-center">Date</th>
                            <th className="py-3 px-6 text-center">Time</th>
                            <th className="py-3 px-6 text-center">Price</th>
                            <th className="py-3 px-6 text-center">Seats Availability</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showtimes.map((showtime) => (
                            <tr key={showtime.movieCinemaId} className="border-b border-gray-700 hover:bg-gray-700 transition text-center">
                                <td className="py-4 px-6">{showtime.movie.title}</td>
                                <td className="py-4 px-6">{showtime.cinema.cinema_name}</td>
                                <td className="py-4 px-6">{showtime.date}</td>
                                <td className="py-4 px-6">{showtime.time}</td>
                                <td className="py-4 px-6">₱{showtime.price}</td>
                                <td className="py-4 px-6 underline text-blue-500 cursor-pointer"
                                    onClick={() => fetchSeats(showtime.movieCinemaId)} > View  </td>
                                <td className="py-4 px-6 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(showtime.movieCinemaId)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg text-sm transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(showtime.movieCinemaId)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-sm transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {addModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
                    <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
                        <h2 className="text-lg font-semibold mb-4">Add new showtime</h2>
                        <select
                            className="w-[50%] rounded bg-gray-700 text-white h-[2.3rem]"
                            name="movie"
                            onChange={handleChange}
                            value={showtime.movie.id}
                        >
                            <option value="">Select Movie</option>
                            {movies.map((movie) => (
                                <option value={movie.id} key={movie.id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-[50%] rounded bg-gray-700 text-white h-[2.3rem]"
                            name="cinema"
                            onChange={handleChange}
                            value={showtime.cinema.cinema_ID}
                        >
                            <option value="">Select Cinema</option>
                            {cinemas.map((cinema) => (
                                <option value={cinema.cinema_ID} key={cinema.cinema_ID}>
                                    {cinema.cinema_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="price"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="price"
                            value={showtime.price}
                        />
                        <input
                            type="date"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="date"
                            value={showtime.date}
                        />

                        <input
                            type="time"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="time"
                            value={showtime.time}
                            step={1}
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setAddModal(false)}
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

            {updateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
                    <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
                        <h2 className="text-lg font-semibold mb-4">Edit showtime</h2>
                        <select
                            className="w-[50%] rounded bg-gray-700 text-white h-[2.3rem]"
                            name="movie"
                            onChange={handleChange}
                            value={showtime.movie.id}
                        >
                            <option value="">Select Movie</option>
                            {movies.map((movie) => (
                                <option value={movie.id} key={movie.id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-[50%] rounded bg-gray-700 text-white h-[2.3rem]"
                            name="cinema"
                            onChange={handleChange}
                            value={showtime.cinema.cinema_ID}
                        >
                            <option value="">Select Cinema</option>
                            {cinemas.map((cinema) => (
                                <option value={cinema.cinema_ID} key={cinema.cinema_ID}>
                                    {cinema.cinema_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="price"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="price"
                            value={showtime.price}
                        />
                        <input
                            type="date"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="date"
                            value={showtime.date}
                        />

                        <input
                            type="time"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="time"
                            value={showtime.time}
                            step={1}
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setUpdateModal(false)}
                                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
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

            {deleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
                    <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
                        <h1>Are you sure you want to delete this showtime?</h1>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 px-4 py-2 rounded text-white ml-2 hover:bg-green-600 transition flex items-center"
                                onClick={handleDeleteSubmit}
                                disabled={isLoading}
                            >
                                Yes
                                {isLoading && <span className="loader ml-2"></span>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewSeatsModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[600px] flex flex-col items-center">
                        <h2 className="text-white text-xl font-semibold mb-4">Seat Availability</h2>

                        <p className="text-white">Movie: {movieCinema.date}</p>

                        {/* TV Screen (Seat Container) */}
                        <div className="mt-4 flex justify-center">
                            <div className="bg-black w-[400px] h-[50px] rounded-lg border-4 border-gray-600 shadow-lg flex items-center justify-center">
                                <p className="text-white">Screen</p>
                            </div>
                        </div>

                        {/* Seat Layout */}
                        <div className="mt-6 w-full">
                            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((row, rowIndex) => {
                                const seatsInRow = seats.filter(seat => seat.seatNo.startsWith(row));

                                return (
                                    <div key={rowIndex} className="flex justify-center gap-2 mb-2">
                                        {seatsInRow.map(seat => (
                                            <div
                                                key={seat.seatId}
                                                className={`w-20 h-12 flex items-center justify-center rounded-full text-white font-semibold ${seat.isAvailable ? "bg-gray-500" : "bg-red-500"}`}
                                            >
                                                {seat.seatNo}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex justify-end w-full">
                            <button
                                onClick={() => setViewSeatsModal(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                            >
                                Close
                            </button>
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
    )
}