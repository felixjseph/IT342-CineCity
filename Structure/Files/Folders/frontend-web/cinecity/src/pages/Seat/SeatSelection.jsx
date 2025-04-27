import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SeatSelection() {

    const navigate = useNavigate();
    const movie = JSON.parse(localStorage.getItem("movie"));
    const showtime = JSON.parse(localStorage.getItem("showtime"));
    const [showtime2, setShowtime2] = useState();
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [movieShowtime, setMovieShowtime] = useState([])
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [active, setActive] = useState("Gcash")
    const [show, setShow] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState({
        name: "",
        email: "",
        phone: "",
        type: "gcash"
    })

    const handleChange = (e) => {
        setPaymentMethod({
            ...paymentMethod,
            [e.target.name]: e.target.value
        })
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        if (show === null) {
            toast.error("No showtime selected!")
            return
        }

        if (selectedSeats.length === 0) {
            toast.error("No seat/s selected!")
            return
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/intent`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: showtime2.price * selectedSeats.length + "00"
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                //setPaymentData(data.data.id);
                localStorage.setItem("paymentIntentId", JSON.stringify(data.data.id));
                localStorage.setItem("seats", JSON.stringify(selectedSeats))
                localStorage.setItem("showtime2", JSON.stringify(showtime2))
                console.log("Payment Intent created:", data);
                navigate("/checkout")
            } else {
                console.error("Error:", data);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentMethod = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/method`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(paymentMethod)
            });

            const data = await response.json();

            if (response.ok) {
                setPaymentMethodId(data.data.id);
                console.log("Payment method created:", data);
                localStorage.setItem("seats", JSON.stringify(selectedSeats))
                localStorage.setItem("showtime2", JSON.stringify(showtime2))
                
                await handleAttachIntent(data.data.id);
            } else {
                console.error("Error creating payment method:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAttachIntent = async (paymentMethodId) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/intent/attach/${paymentData}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    payment_method: paymentMethodId,
                    client_key: `${import.meta.env.VITE_CLIENT_KEY}`,
                    return_url: `https://system-integ-cinecity.vercel.app/payment`
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Intent attached successfully:", data);
                window.location.href = data.data.attributes.next_action.redirect.url;
            } else {
                console.error("Error attaching intent:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

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
        fetchData(`${import.meta.env.VITE_DATA_URL}/seats/showtime/${show}`, setSeats);
        fetchData(`${import.meta.env.VITE_DATA_URL}/showtime/${show}`, setShowtime2);
    }, [show])

    useEffect(() => {
        console.log(selectedSeats)
    }, [selectedSeats])


    const toggleSeatSelection = (seat) => {
        setSelectedSeats((prevSelected) => {
            const isSelected = prevSelected.some((s) => s.seatId === seat.seatId);
            if (isSelected) {
                // Remove the seat if already selected
                return prevSelected.filter((s) => s.seatId !== seat.seatId);
            } else {
                // Add the seat if not selected
                return [...prevSelected, { seatId: seat.seatId, seatNo: seat.seatNo }];
            }
        });
    };

    const groupedSeats = seats.reduce((acc, seat) => {
        const row = seat.seatNo[0];
        if (!acc[row]) acc[row] = [];
        acc[row].push(seat);
        return acc;
    }, {});

    return (
        <div className={`flex h-screen text-white`}>
            <div className="w-[25%] p-8 border-r border-gray-600 flex flex-col items-center overflow-y-auto">
                <img
                    src={`${import.meta.env.VITE_DATA_URL}/movie/${movie.id}/cover?timestamp=${new Date().getTime()}`}
                    alt={`${movie.title} cover`}
                    className="w-[12rem] rounded-lg shadow-lg"
                />
                <div className="text-center mt-4">
                    <h1 className="text-xl font-bold text-green-400">{movie.title}</h1>
                    <p className="text-gray-400">{movie.duration} mins</p>
                    <p className="text-gray-400">Genre: {movie.genre.genreName}</p>
                </div>

                <div className="mt-8 w-full">
                    <select
                        onChange={(e) => setShow(e.target.value)}
                        className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                    >
                        <option>Select showtime</option>
                        {showtime.map((mshow) => {
                            const formattedDate = new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }).format(new Date(mshow.date));

                            const formattedTime = new Intl.DateTimeFormat('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            }).format(new Date(`1970-01-01T${mshow.time}`));

                            return (
                                <option key={mshow.movieCinemaId} value={mshow.movieCinemaId}>
                                    {formattedDate} - {formattedTime}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Selected Seats:</h2>
                    {selectedSeats.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {selectedSeats.map((seat) => (
                                <span
                                    key={seat.seatId}
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    {seat.seatNo}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No seats selected</p>
                    )}
                </div>
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="px-2 flex items-center justify-center py-2 mt-4 w-full rounded bg-green-700 cursor-pointer hover:bg-green-400"
                >
                    Proceed to payment {loading && (
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                data-original="#000000" />
                        </svg>
                    )}

                </button>
            </div>

            <div className="w-full p-7 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-[2rem] mt-3">Seat Selection</h2>

                {show ? (
                    <>
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
                                                    key={seat.seatId}
                                                    disabled={!seat.isAvailable} // Disable the button if the seat is not available
                                                    onClick={() => toggleSeatSelection(seat)}
                                                    className={`w-7 h-7 rounded flex items-center justify-center
                                        ${!seat.isAvailable ? "bg-red-500 cursor-not-allowed" :
                                                            selectedSeats.some((s) => s.seatId === seat.seatId) ? "bg-green-500 cursor-pointer" :
                                                                "bg-gray-500 cursor-pointer"}`}
                                                >
                                                </button>
                                            ))}
                                    </div>
                                ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-400 mt-10">
                        <p>Please select a showtime to view available seats.</p>
                    </div>
                )}
            </div>
            {paymentData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                    <div className="relative bg-[#1E1E1E] h-[80%] flex flex-col w-[50%] rounded p-6 px-25 overflow-y-auto">
                        <h1 className="text-center text-2xl">PAYMENT METHOD</h1>
                        <hr className="my-4" />
                        <div className="mb-8 w-full flex justify-evenly p-4 w-[50%]">
                            <img src="/images/gcash.png" alt="GCASH"
                                className={`rounded-lg w-[3rem] cursor-pointer mt-4 ${active === "Gcash" ? "border-green-500 border-3 shadow-lg shadow-green-500/50" : "border-none"}`}
                                onClick={() => {
                                    setActive("Gcash")
                                    setPaymentMethod((prev) => ({
                                        ...prev,
                                        type: "gcash",
                                    }));
                                }}
                            />
                            <img src="/images/PayMayaLogo.jpg" alt="PayMaya"
                                className={`rounded-lg  w-[3rem] cursor-pointer mt-4 ${active === "Maya" ? "border-green-500 border-3 shadow-lg shadow-green-500/50" : "border-none"}`}
                                onClick={() => {
                                    setActive("Maya")
                                    setPaymentMethod((prev) => ({
                                        ...prev,
                                        type: "paymaya",
                                    }));
                                }}
                            />
                            <img src="/images/grabpay.png" alt="GrabPay"
                                className={`rounded-lg  w-[3rem] cursor-pointer mt-4 ${active === "Grab" ? "border-green-500 border-3 shadow-lg shadow-green-500/50" : "border-none"}`}
                                onClick={() => {
                                    setActive("Grab")
                                    setPaymentMethod((prev) => ({
                                        ...prev,
                                        type: "grab_pay",
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <form>
                                <div className=" flex justify-between flex-col">
                                    <div className="flex flex-col">
                                        <label className="text-sm">Phone Number <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="Phone number"
                                            className="ml-2 bg-gray-500 px-4 py-1 rounded-lg"
                                            name="phone"
                                            value={paymentMethod.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm">Full name <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="Fullname"
                                            className="ml-2 bg-gray-500 px-4 py-1 rounded-lg"
                                            name="name"
                                            value={paymentMethod.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm">Email<span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="Email"
                                            className="ml-2 bg-gray-500 px-4 py-1 rounded-lg"
                                            name="email"
                                            value={paymentMethod.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="mt-4">
                            <h1 className="font-medium text-gray-200/50">Details</h1>
                            <div>
                                <p>Movie: {showtime2.movie.title}</p>
                                <p>Cinema: {showtime2.cinema.cinema_name}</p>
                                <p>Duration: {showtime2.movie.duration} minutes</p>
                                <p>Date and Time: {showtime2.date} - {showtime2.time}</p>
                                <p>Price: ₱{showtime2.price * selectedSeats.length}</p>
                                <p>Seats: {selectedSeats.map((seat, index) => (
                                    <span key={index} className="mr-2 border border-green-500/30 px-2 rounded">{seat.seatNo}</span>
                                ))}</p>
                            </div>
                        </div>
                        <button
                            className="mt-4 py-2 rounded bg-green-500 font-medium flex items-center justify-center"
                            onClick={handlePaymentMethod}
                            disabled={loading}
                        >
                            Confirm
                            {loading && (
                                <span className="loader ml-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                            )}
                        </button>
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