import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const navigate = useNavigate();
    const [updateModal, setUpdateModal] = useState(false);
    const [user, setUser] = useState({
        usernameField: "",
        email: "",
        password: ""
    });
    const [bookings, setBookings] = useState([]); // State for fetched bookings
    const [selectedTicket, setSelectedTicket] = useState(null); // State for ticket modal
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingBookings, setIsLoadingBookings] = useState(true);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/logout`, {
                method: "POST",
                credentials: 'include', // Make sure cookies are sent
            });
    
            if (response.ok) {
                // Clear session data
                setUser({
                    usernameField: "",
                    email: "",
                    password: ""
                });
                setBookings([]); // Clear bookings
                setSelectedTicket(null); // Clear selected ticket
    
                // Optionally clear localStorage if used
                localStorage.removeItem("showtime");
                localStorage.removeItem("movie");
                localStorage.removeItem("paymentMethod");
    
                // Now check authentication status again
                const authCheckResponse = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/check`, {
                    credentials: 'include' // Send cookies for auth check
                });
    
                const isAuthenticated = await authCheckResponse.json();
    
                if (!isAuthenticated) {
                    // If not authenticated, navigate to login page
                    navigate('/newlogin');
                } else {
                    console.log('User is still authenticated.');
                }
            } else {
                console.log("Error during logout.");
            }
        } catch (error) {
            console.log("Error during logout:", error);
        }
    };
    
    
    const fetchUserData = async () => {
        setIsLoadingUser(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/users/me`, {
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                console.log("Error fetching user data:", data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingUser(false);
        }
    };

    const fetchBookings = async () => {
        setIsLoadingBookings(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/api/bookings/userbookings`, {
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setBookings(data);
            } else {
                console.log("Error fetching bookings:", data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingBookings(false);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchBookings();
    }, []);

    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket); // Set the selected ticket details
    };

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/5 p-6 border-r border-gray-600 flex-shrink-0 min-w-[250px]">
                {isLoadingUser ? (
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse"></div>
                        <div className="w-32 h-6 bg-gray-700 rounded mt-4 animate-pulse"></div>
                        <div className="w-48 h-4 bg-gray-700 rounded mt-2 animate-pulse"></div>
                    </div>
                ) : (
                    <>
                        <img
                            src="images/profile-icon.png"
                            alt="Profile"
                            className="mt-[2rem] rounded-full mx-auto w-24 h-24"
                        />
                        <div className="text-center overflow-hidden">
                            <h2 className="text-lg font-bold mt-4 text-green-400 break-words">{user.usernameField}</h2>
                            <p className="mt-2 text-gray-300 break-all">{user.email}</p>
                        </div>
                    </>
                )}
                <button className="mt-[5rem] w-full px-5 py-2 bg-green-500 rounded-full text-white font-bold hover:bg-green-600 cursor-pointer"
                    onClick={() => setUpdateModal(true)}> Update Profile
                </button>
                <button className="mt-[1rem] w-full px-5 py-2 border rounded-full text-white font-bold hover:bg-gray-400 hover:border-gray-400 cursor-pointer"
                    onClick={() => navigate(-1)} > Back
                </button>
                <button className="mt-[1rem] w-full px-5 py-2 border rounded-full text-white font-bold hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer"
                    onClick={handleLogout}> Logout
                </button>
            </div>

            {/* Transaction History */}
            <div className="w-full md:w-2/2 p-6 ml-0 md:ml-6 rounded-lg shadow-md text-white">
                <h2 className="text-4xl font-bold mb-4">Transaction History</h2>
                {isLoadingBookings ? (
                    <div className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-4">
                        <div className="animate-pulse">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="border-b border-gray-700 p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg mt-4">
                        <thead>
                            <tr className="text-left text-gray-300 uppercase text-sm">
                                <th className="py-3 px-6 text-center">Booking ID</th>
                                <th className="py-3 px-6 text-center">Movie</th>
                                <th className="py-3 px-6 text-center">Date & Time</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Amount</th>
                                <th className="py-3 px-6 text-center">Payment Method</th>
                                <th className="py-3 px-6 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-4 px-6 text-center text-gray-400">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking.bookingId} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="py-4 px-6 text-center">{booking.bookingId}</td>
                                        <td className="py-4 px-6 text-center">{booking.showtime.movie.title}</td>
                                        <td className="py-4 px-6 text-center">{`${booking.showtime.date} - ${booking.showtime.time}`}</td>
                                        <td className="py-4 px-6 text-center">{booking.status}</td>
                                        <td className="py-4 px-6 text-center">₱{booking.amount}</td>
                                        <td className="py-4 px-6 text-center">{booking.paymentMethod}</td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-800 cursor-pointer"
                                                onClick={() => handleViewTicket(booking)}
                                            >
                                                View Ticket
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Ticket Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="relative bg-[#1E1F25] text-white w-[350px] rounded-2xl shadow-2xl p-6 pt-12">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-2 border-4 border-[#1E1F25]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h2 className="text-center text-lg font-semibold mb-2">Ticket Details</h2>
                        <div className="text-sm space-y-2 border-t border-gray-600 pt-4">
                            <div className="flex justify-between"><span className="text-gray-400">Movie:</span> <span>{selectedTicket.showtime.movie.title}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Cinema:</span> <span>{selectedTicket.showtime.cinema.cinema_name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Date:</span> <span>{selectedTicket.showtime.date}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Time:</span> <span>{selectedTicket.showtime.time}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Seat:</span> <span>{selectedTicket.seat.seatNo}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Price:</span> <span>₱{selectedTicket.amount}</span></div>
                        </div>

                        <div className="mt-6 border-t border-gray-600 pt-4 text-center">
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="mt-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}