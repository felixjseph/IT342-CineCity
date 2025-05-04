import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentResult() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const [status, setStatus] = useState(null);
    const seats = localStorage.getItem("seats") ? JSON.parse(localStorage.getItem("seats")) : null;
    const showtime2 = localStorage.getItem("showtime2") ? JSON.parse(localStorage.getItem("showtime2")) : null;
    const paymentMethod = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : null;

    const calledRef = useRef(false); // 🛡️ guard for duplicate calls

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/users/me`, {
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        if (users && !calledRef.current) {
            const queryParams = new URLSearchParams(location.search);
            const paymentIntent = queryParams.get("payment_intent_id");

            if (paymentIntent) {
                calledRef.current = true; // 🛡️ Prevent double calling
                retrievePaymentIntent(paymentIntent);
            }
        }
    }, [users]);

    const retrievePaymentIntent = async (paymentIntentId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/intent/${paymentIntentId}`, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                if (data.data.attributes.status === "succeeded") {
                    if (status !== "success") {
                        await handleBooking("success");
                    }
                } else {
                    if (status !== "failed") {
                        await handleBooking("failed");
                    }
                }
            }
        } catch (error) {
            console.log("Error retrieving payment intent:", error);
        }
    };

    const updateSeatAvailability = async () => {
        try {
            for (const seat of seats) {
                const response = await fetch(`${import.meta.env.VITE_DATA_URL}/seats/${seat.seatId}`, {
                    method: "PUT",
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Seat updated: ", data);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (bookingStatus) => {
        setStatus(bookingStatus);
        try {
            if (Array.isArray(seats) && seats.length > 0) {
                for (const seat of seats) {
                    const response = await fetch(`${import.meta.env.VITE_DATA_URL}/api/bookings`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            showtime: { movieCinemaId: showtime2.movieCinemaId },
                            user: { userId: users?.userId },
                            seat: { seatId: seat.seatId },
                            amount: showtime2.price,
                            status: bookingStatus,
                            paymentMethod: paymentMethod?.type
                        }),
                        credentials: 'include'
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (bookingStatus === "success") {
                            await updateSeatAvailability();
                        }
                    } else {
                        console.log("Booking failed for seat: ", seat.seatNo);
                    }
                }
            }
        } catch (error) {
            console.error("Error during booking: ", error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
                <div className="text-center">
                    {loading ? (
                        <>
                            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full dark:bg-gray-700 animate-pulse">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                            </div>
                            <div className="h-8 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                            <div className="h-6 w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                            <div className="h-4 w-72 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </>
                    ) : (
                        <>
                            <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full ${
                                status === "success" 
                                    ? "bg-green-100 dark:bg-green-700" 
                                    : "bg-red-100 dark:bg-red-700"
                            }`}>
                                {status === "success" ? (
                                    <svg className="h-12 w-12 text-green-600 dark:text-green-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                                    </svg>
                                ) : (
                                    <svg className="h-12 w-12 text-red-600 dark:text-red-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
                                    </svg>
                                )}
                            </div>
                            <h1 className={`text-4xl font-extrabold ${
                                status === "success" 
                                    ? "text-green-700 dark:text-green-400" 
                                    : "text-red-700 dark:text-red-400"
                            }`}>
                                {status === "success" ? "Payment Successful!" : "Payment Failed!"}
                            </h1>
                            <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
                                {status === "success" 
                                    ? "Thank you for your purchase."
                                    : "Sorry, your payment has failed."}
                            </p>
                            <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                                If you have any questions or need further assistance, feel free to contact us at:
                                <a href="mailto:admin@eliteai.tools" className="font-medium text-indigo-600 dark:text-indigo-400 underline">
                                    alprincegwapo@gmail.com
                                </a>
                            </p>
                        </>
                    )}
                </div>
                <button 
                    className="mt-8 text-center"
                    onClick={() => navigate('/home')}
                    disabled={loading}
                >
                    <a
                        className={`inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                        Back to Home
                    </a>
                </button>
            </div>
        </div>
    )
}