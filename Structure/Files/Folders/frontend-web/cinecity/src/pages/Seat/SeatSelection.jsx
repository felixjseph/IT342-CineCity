import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SeatSelection() {

    const showtime = JSON.parse(localStorage.getItem("showtime"));

    const [movieShowtime, setMovieShowtime] = useState([])
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(new Set());

    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url, {
                credentials: 'include'
            })

            const data = await response.json();

            if (response.ok) {
                console.log(data)
                console.log("data fetched successfully")
                setter(data)
            } else {
                console.log(data)
                console.log("error fetching data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData(`http://localhost:8080/showtime/movie/${showtime.movie.id}`, setMovieShowtime)
        fetchData(`http://localhost:8080/seats/showtime/${showtime.movieCinemaId}`, setSeats);
    }, [])

    useEffect(()=>{
        console.log(selectedSeats)
    },[selectedSeats])


    const toggleSeatSelection = (seatNo) => {
        setSelectedSeats((prevSelected) => {
            const newSet = new Set(prevSelected);
            if (newSet.has(seatNo)) {
                newSet.delete(seatNo);
            } else {
                newSet.add(seatNo);
            }
            return newSet;
        });
    };

    const groupedSeats = seats.reduce((acc, seat) => {
        const row = seat.seatNo[0];
        if (!acc[row]) acc[row] = [];
        acc[row].push(seat);
        return acc;
    }, {});

    return (
        <div className="flex h-screen text-white">
            <div className="w-[25%] p-8 border-r border-gray-600 flex flex-col items-center">
                    <img
                        src={`http://localhost:8080/movie/${showtime.movie.id}/cover?timestamp=${new Date().getTime()}`}
                        alt={`${showtime.movie.title} cover`}
                        className="w-[12rem] rounded-lg shadow-lg"
                    />
                    <div className="text-center mt-4">
                        <h1 className="text-xl font-bold text-green-400">{showtime.movie.title}</h1>
                        <p className="text-gray-400 mt-2">{showtime.cinema.cinema_name}</p>
                        <p className="text-gray-400">{showtime.movie.duration} mins</p>
                        <p className="text-gray-400">Genre: {showtime.movie.genre.genreName}</p>
                    </div>
              
                <div className="mt-8 w-full">
                    <select className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700">
                        <option>Select Showtime</option>
                        {movieShowtime.map((mshow) => (
                            <option>{mshow.date} - {mshow.time}</option>
                        ))}
                    </select>
                </div>

                <button className="mt-[2rem] w-full px-5 py-2 bg-green-500 rounded-full text-white font-bold hover:bg-green-600 cursor-pointer">
                        Proceed to Payment
                </button>
            </div>

            <div className="w-full p-7 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-[2rem] mt-3">Seat Selection</h2>

                <div className="flex justify-around items-center mb-6">
                    <div className="flex flex-col items-center mx-4 text-gray-200">
                        <h1>Available</h1>
                        <div className="mt-3 w-[1.5rem] h-[1.5rem] bg-gray-500 rounded"></div>
                    </div>
                    <div className="flex flex-col items-center mx-4 text-gray-200">
                        <h1>Selected</h1>
                        <div className="mt-3 w-[1.5rem] h-[1.5rem] bg-green-500 rounded"></div>
                    </div>
                    <div className="flex flex-col items-center mx-4 text-gray-200">
                        <h1>Not Available</h1>
                        <div className="mt-3 w-[1.5rem] h-[1.5rem] bg-red-500 rounded"></div>
                    </div>
                </div>

                <div className="w-[50%] h-[1.2rem] bg-green-500 rounded-xl shadow-lg mb-6"></div>

                <div className="grid grid-cols-11 gap-2 mb-2 items-center">
                    <span className="w-12 text-center font-bold"></span>
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="w-10 text-center font-bold">{i + 1}</span>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    {Object.keys(groupedSeats)
                        .sort()
                        .map((row) => (
                            <div key={row} className="grid grid-cols-11 gap-2 items-center">
                                <span className="w-10 text-center font-bold">{row}</span>
                                {groupedSeats[row]
                                    .sort((a, b) => a.seatNo.localeCompare(b.seatNo))
                                    .map((seat) => (
                                        <button
                                            key={seat.seatNo}
                                            onClick={() => toggleSeatSelection(seat.seatNo)}
                                            className={`w-12 h-12 rounded flex items-center justify-center cursor-pointer
                                ${selectedSeats.has(seat.seatNo) ? "bg-green-500" :
                                                    seat.reserved ? "bg-red-500" : "bg-gray-500"}`}
                                        />
                                    ))}
                            </div>
                        ))}
                </div>

            </div>
        </div>
    )
}