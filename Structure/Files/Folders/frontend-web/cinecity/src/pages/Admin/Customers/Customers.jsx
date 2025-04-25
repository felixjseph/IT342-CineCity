import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null); // State for the selected customer
    const [filterRole, setFilterRole] = useState("All"); // State for filtering by role

    // Fetch all users from the backend
    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/', {
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Users fetched successfully: ", data);
                setCustomers(data);
            } else {
                console.error("Error fetching users:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter customers based on the search term and role
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearchTerm =
            customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole =
            filterRole === "All" || customer.role.toLowerCase() === filterRole.toLowerCase();
        return matchesSearchTerm && matchesRole;
    });

    return (
        <div className="p-8 border-white w-full relative overflow-y-scroll">
            <div className="flex justify-between items-center">
                <h1 className="text-white font-medium text-2xl">Customers</h1>
                <div className="flex gap-4 items-center">
                    {/* Filter Dropdown */}
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="bg-[#2E2F33] text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                        <option value="All">All</option>
                        <option value="User">Users</option>
                        <option value="Admin">Admins</option>
                    </select>

                    {/* Search Bar */}
                    <div className="w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33]">
                        <IoSearchSharp className="text-[#2FBD59] mr-2" />
                        <input
                            type="text"
                            placeholder="Search customers"
                            className="text-white focus:outline-none w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg mt-4">
                <thead>
                    <tr className="text-left text-gray-300 uppercase text-sm">
                        <th className="py-3 px-6 text-center">Customer ID</th>
                        <th className="py-3 px-6 text-center">Username</th>
                        <th className="py-3 px-6 text-center">Email</th>
                        <th className="py-3 px-6 text-center">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.userId} className="border-b border-gray-700 hover:bg-gray-700 transition">
                            <td className="py-4 px-6 text-center">{customer.userId}</td>
                            <td className="py-4 px-6 text-center">{customer.username}</td>
                            <td className="py-4 px-6 text-center">{customer.email}</td>
                            <td className="py-4 px-6 text-center">{customer.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="relative bg-[#1E1F25] text-white w-[350px] rounded-2xl shadow-2xl p-6 pt-12">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-2 border-4 border-[#1E1F25]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h2 className="text-center text-lg font-semibold mb-2">Customer Details</h2>
                        <div className="text-sm space-y-2 border-t border-gray-600 pt-4">
                            <div className="flex justify-between"><span className="text-gray-400">ID:</span> <span>{selectedCustomer.userId}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Username:</span> <span>{selectedCustomer.username}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Email:</span> <span>{selectedCustomer.email}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Role:</span> <span>{selectedCustomer.role}</span></div>
                        </div>

                        <div className="mt-6 border-t border-gray-600 pt-4 text-center">
                            <button
                                onClick={() => setSelectedCustomer(null)} // Close the modal
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