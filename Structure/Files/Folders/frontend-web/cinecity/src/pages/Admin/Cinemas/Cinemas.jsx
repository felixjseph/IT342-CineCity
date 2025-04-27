import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function Cinemas() {

    const [cinemas, setCinemas] = useState([])
    const [addCinema, setAddCinema] = useState({
        cinema_name: ""
    })
    const [countCinemas, setCountCinemas] = useState()
    const [addModal, setAddModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [cinemaUpdate, setCinemaUpdate] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    const handleChange = (e) => {
        setAddCinema({
            ...addCinema,
            [e.target.name]: e.target.value
        })
    }

    const numberOfCinemas = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/cinemas/stats/count`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Number of cinemas: ", data)
                setCountCinemas(data)
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (cinemaId) => {
        setCinemaUpdate(cinemaId)
        setDeleteModal(true)
    }

    const fetchCinema = async (cinemaId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/cinemas/${cinemaId}`, {
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                console.log(data)
                console.log(`cinema with id ${cinemaId} fetched successfully`)
                setAddCinema(data)
            } else {
                console.log(data)
                console.log("error fetching cinema")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (cinemaId) => {
        setCinemaUpdate(cinemaId)
        setUpdateModal(true)
        fetchCinema(cinemaId)
    }

    const handleEditSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/${cinemaUpdate}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addCinema),
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                console.log(data)
                console.log("cinema updated successfully")
                setIsLoading(false)
                toast.success("Cinema updated successfully!");
                setUpdateModal(false)
                setAddCinema({
                    cinema_name: ""
                })
                fetchCinemas();
            }
        } catch (error) {
            toast.error("Error deleting cinema");
        }
    }

    const handleDeleteSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/cinemas/${cinemaUpdate}`, {
                method: "DELETE",
                credentials: 'include'
            })

            if (response.ok) {
                console.log("cinema delete successfully")
                setDeleteModal(false)
                setIsLoading(false)
                fetchCinemas()
                toast.success("Cinema deleted successfully!");
            } else {
                console.log("error deleting cinema")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error deleting cinema");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/cinemas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addCinema),
                credentials: 'include'
            })

            const data = await response.json();

            if (response.ok) {
                console.log(data)
                console.log("cinema added successfully")
                setIsLoading(false)
                setAddModal(false)
                setAddCinema({
                    cinema_name: ""
                })
                numberOfCinemas();
                fetchCinemas()
                toast.success("Cinema added successfully!");
            } else {
                console.log(data)
                console.log("error adding cinema")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error adding cinema!");
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCinemas = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/cinemas`, {
                credentials: 'include'
            })

            const data = await response.json();
            if (response.ok) {
                console.log(data)
                console.log("cinemas fetched successfully")
                setCinemas(data);
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
        numberOfCinemas();
    }, [])

    return (
        <div className="p-8 border-white w-full relative overflow-y-scroll">
            <div className="flex justify-between">
                <h1 className="text-white font-medium text-2xl">Cinema Management</h1>
                <button
                    onClick={() => setAddModal(true)}
                    className="hover:bg-gray-500 transition duration-100 cursor-pointer flex items-center text-white bg-[#2E2F33] px-4 py-2 rounded"
                >
                    <IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" /> Add new cinema
                </button>
            </div>
            <div>
                <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
                    <h1 className="text-white mr-8">All</h1>
                    <p className="bg-gray-500/30 px-2 rounded">{countCinemas}</p>
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
                        <th className="py-3 px-6">Cinema Name</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cinemas.map((cinema) => (
                        <tr key={cinema.cinema_ID} className="border-b border-gray-700 hover:bg-gray-700 transition">
                            <td className="py-4 px-6">{cinema.cinema_name}</td>
                            <td className="py-4 px-6 flex justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(cinema.cinema_ID)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg text-sm transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cinema.cinema_ID)}
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