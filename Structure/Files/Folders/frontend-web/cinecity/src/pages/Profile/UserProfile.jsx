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
            // First, clear all local state and storage
            setUser({
                usernameField: "",
                email: "",
                password: ""
            });
            setBookings([]);
            setSelectedTicket(null);
            
            // Clear all relevant localStorage items
            localStorage.clear(); // This will clear all items, but you can be specific if needed
            
            // Call the logout endpoint
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/logout`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
    
            if (response.ok) {
                // Force a hard reload to clear any cached auth state
                window.location.href = '/newlogin';
            } else {
                console.error("Logout failed:", await response.text());
                // Still redirect to login even if the server request fails
                window.location.href = '/newlogin';
            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Still redirect to login even if there's an error
            window.location.href = '/newlogin';
        }
    };
    
    
    const fetchUserData = async () => {
        setIsLoadingUser(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/users/me`, {
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (response.status === 401) {
                // Unauthorized - redirect to login
                navigate('/newlogin');
                return;
            }
            
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                console.error("Error fetching user data:", data);
                // Handle error appropriately
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle error appropriately
        } finally {
            setIsLoadingUser(false);
        }
    };
    
    const fetchBookings = async () => {
        setIsLoadingBookings(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/api/bookings/userbookings`, {
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (response.status === 401) {
                // Unauthorized - redirect to login
                navigate('/newlogin');
                return;
            }
            
            const data = await response.json();
            if (response.ok) {
                setBookings(data);
            } else {
                console.error("Error fetching bookings:", data);
                // Handle error appropriately
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            // Handle error appropriately
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
        <div className="flex flex-col h-screen">
            {/* Profile Sidebar */}
            <div className="w-full p-6 border-b border-gray-600">
                <div className="flex justify-between items-center">
                    {isLoadingUser ? (
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
                                <div className="w-48 h-4 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-4">
                                <img
                                    src="images/profile-icon.png"
                                    alt="Profile"
                                    className="rounded-full w-12 h-12 object-cover"
                                />
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-green-400 break-words">{user.usernameField}</h2>
                                    <p className="mt-2 text-gray-300 break-all">{user.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button 
                                    className="cursor-pointer px-5 py-3 border border-gray-600 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center min-w-[100px]"
                                    onClick={() => navigate(-1)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Back
                                </button>
                                <button 
                                    className="cursor-pointer px-5 py-3 border border-red-500 rounded-lg text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center justify-center min-w-[100px]"
                                    onClick={handleLogout}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 9a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V12z" clipRule="evenodd" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Transaction History */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                            Transaction History
                        </h2>
                        
                        {isLoadingBookings ? (
                            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
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
                            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Booking ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Movie</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment Method</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {bookings.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                                                        No bookings found
                                                    </td>
                                                </tr>
                                            ) : (
                                                bookings.map((booking) => (
                                                    <tr key={booking.bookingId} className="hover:bg-gray-700 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{booking.bookingId}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{booking.showtime.movie.title}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{`${booking.showtime.date} - ${booking.showtime.time}`}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                booking.status === 'success' 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₱{booking.amount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{booking.paymentMethod}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <button
                                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                                                                onClick={() => handleViewTicket(booking)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                </svg>
                                                                View Ticket
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ticket Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="relative bg-gray-800 text-white w-[350px] rounded-2xl shadow-2xl p-6 pt-12">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-2 border-4 border-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h2 className="text-center text-xl font-semibold mb-4">Ticket Details</h2>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Movie:</span>
                                <span className="font-medium">{selectedTicket.showtime.movie.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Cinema:</span>
                                <span className="font-medium">{selectedTicket.showtime.cinema.cinema_name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Date:</span>
                                <span className="font-medium">{selectedTicket.showtime.date}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Time:</span>
                                <span className="font-medium">{selectedTicket.showtime.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Seat:</span>
                                <span className="font-medium">{selectedTicket.seat.seatNo}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Price:</span>
                                <span className="font-medium text-green-400">₱{selectedTicket.amount}</span>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
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