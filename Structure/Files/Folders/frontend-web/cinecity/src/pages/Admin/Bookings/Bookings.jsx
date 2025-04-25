import { useState, useEffect } from "react"
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function Bookings() {
    const [bookings, setBookings] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [cinemaUpdate, setCinemaUpdate] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [ticketModal, setTicketModal] = useState(null)

    const fetchCinemas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/bookings', {
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                console.log("bookings fetched successfully: ", data)
                setBookings(data);
            } else {
                console.log(data)
                console.log("error fetching cinemas")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCinemas();
    }, [])

    return (
        <div className="p-8 border-white w-full relative overflow-y-scroll">
            <div className="flex justify-between">
                <h1 className="text-white font-medium text-2xl">Bookings</h1>
                <button
                    onClick={() => setAddModal(true)}
                    className="hover:bg-gray-500 transition duration-100 cursor-pointer flex items-center text-white bg-[#2E2F33] px-4 py-2 rounded"
                >
                    <IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" /> Add new bookings
                </button>
            </div>
            <div>
                <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
                    <h1 className="text-white mr-8">All</h1>
                    <p className="bg-gray-500/30 px-2 rounded">0</p>
                </div>
                <div className="w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33] mt-4">
                    <IoSearchSharp className="text-[#2FBD59] mr-2" />
                    <input
                        type="text"
                        placeholder="Search cinema"
                        className="text-white focus:outline-none w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400"
                    />
                </div>
            </div>
            <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg mt-4">
                <thead>
                    <tr className="text-left text-gray-300 uppercase text-sm">
                        <th className="py-3 px-6 text-center">Booking ID</th>
                        <th className="py-3 px-6 text-center">Amount</th>
                        <th className="py-3 px-6 text-center">Payment type</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Seat No.</th>
                        <th className="py-3 px-6 text-center">Ticket</th>
                        <th className="py-3 px-6 text-center">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId} className="border-b border-gray-700 hover:bg-gray-700 transition">
                            <td className="py-4 px-6 text-center">{booking.bookingId}</td>
                            <td className="py-4 px-6 text-center">₱ {booking.amount}</td>
                            <td className="py-4 px-6 text-center">{booking.paymentMethod}</td>
                            <td className="py-4 px-6 text-center">{booking.status}</td>
                            <td className="py-4 px-6 text-center">{booking.seat.seatId}</td>
                            <td className="py-4 px-6 text-center text-green-600 underline cursor-pointer"
                                onClick={() => {
                                    setTicketModal(booking)
                                    console.log(booking)
                                }}
                            >View ticket</td>
                            <td className="py-4 px-6 flex justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(booking.bookingId)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg text-sm transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(booking.bookingId)}
                                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-sm transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {addModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black-500/20 backdrop-blur-sm">
                    <div className="bg-[#2E2F33] p-6 rounded shadow-lg w-96 text-white">
                        <h2 className="text-lg font-semibold mb-4">Add new cinema</h2>
                        <input
                            type="text"
                            placeholder="Cinema name"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="cinema_name"
                            value={addCinema.cinema_name}
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
                        <h2 className="text-lg font-semibold mb-4">Update cinema</h2>
                        <input
                            type="text"
                            placeholder="Cinema name"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="cinema_name"
                            value={addCinema.cinema_name !== null ? addCinema.cinema_name : ""}
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
                        <h1>Are you sure you want to delete this cinema?</h1>
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

            {ticketModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="relative bg-[#1E1F25] text-white w-[350px] rounded-2xl shadow-2xl p-6 pt-12">
                        {/* Top Circle with Check Icon */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-2 border-4 border-[#1E1F25]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h2 className="text-center text-lg font-semibold mb-2">Ticket Confirmed!</h2>
                        <p className="text-center text-sm mb-4 text-gray-300">Here are your ticket details</p>

                        <div className="text-sm space-y-2 border-t border-gray-600 pt-4">
                            <div className="flex justify-between"><span className="text-gray-400">Movie:</span> <span>{ticketModal.showtime.movie.title}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Cinema:</span> <span>{ticketModal.showtime.cinema.cinema_name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Date:</span> <span>{ticketModal.showtime.date}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Time:</span> <span>{ticketModal.showtime.time}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Seat:</span> <span>{ticketModal.seat.seatNo}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Price:</span> <span>₱{ticketModal.amount}</span></div>
                        </div>

                        <div className="mt-6 border-t border-gray-600 pt-4 text-center text-xs text-gray-500">
                            <button
                                onClick={() => setTicketModal(null)}
                                className="mt-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
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