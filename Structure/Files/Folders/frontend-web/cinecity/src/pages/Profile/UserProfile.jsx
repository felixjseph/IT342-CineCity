import { useEffect } from "react";
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function UserProfile() {
        const navigate = useNavigate();
        const [updateModal, setUpdateModal] = useState(false);
        const [user, setUser] = useState({
            username:"",
            email:"",
            password:""
        })
    
        const handleChange = (e) =>{
            setUser({
                ...user,
                [e.target.name]:e.target.value
            })
        }
        
        const handleLogout = async (e) => {
            try {
              const response = await fetch('http://localhost:8080/auth/logout', {
                method:"POST",
                credentials: 'include'
              })
        
              if (response.ok) {
                navigate('/login')
              } else {
                console.log("error has occured")
              }
            } catch (error) {
              console.log(error)
            }
          }

        const fetchData = async(url, setter)=>{
            try {
                const response = await fetch(url,{
                    credentials:'include'
                })
    
                const data = await response.json();
                if(response.ok){
                    console.log(data)
                    console.log("data fetched successfully")
                    setter(data)
                }else{
                    console.log(data)
                    console.log("error fetching data")
                }
            } catch (error) {
                console.log(error)
            }
        }
    
        useEffect(()=>{
            fetchData('http://localhost:8080/users/me',setUser)
        },[])
        
        const handleUpdate = async () => {
            try {
                // const response = await fetch('http://localhost:8080/users/update', {
                //     method: "PUT",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     credentials: "include",
                //     body: JSON.stringify(user)
                // });
                
                if (response.ok) {
                    alert("Profile updated successfully!");
                    setUpdateModal(false);
                } else {
                    alert("Failed to update profile.");
                }

            } catch (error) {
                console.log(error);
            }
        };

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/5 p-6 border-r border-gray-600 flex-shrink-0 min-w-[250px]">
                <img
                    src="images/profile-icon.png"
                    alt="Profile"
                    className="mt-[2rem] rounded-full mx-auto w-24 h-24"
                />
                <div className="text-center overflow-hidden">
                    <h2 className="text-lg font-bold mt-4 text-green-400 break-words">{user.username}</h2>
                    <p className="mt-2 text-gray-300 break-all">{user.email}</p>
                </div>
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

            {updateModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/8">

                        <h2 className="text-3xl font-bold mb-4">Update Profile</h2>

                        <h2 className="mb-2">Username</h2>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <h2 className="mb-2">Email</h2>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <h2 className="mb-2">Password</h2>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <h2 className="mb-2">Confirm Password</h2>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />

                        <div className="mt-[1rem] flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded mr-2 cursor-pointer hover:bg-gray-500"
                                onClick={() => setUpdateModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 "
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

             {/* Temporary History for now */}
            <div className="w-full md:w-2/2 p-6 ml-0 md:ml-6 rounded-lg shadow-md text-white">
                <h2 className="text-4xl font-bold mb-4">Transaction History</h2>
                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-600">
                    <th className="p-2 text-left">Ticket ID</th>
                    <th className="p-2 text-left">Movie</th>
                    <th className="p-2 text-left">Date & Time</th>
                    <th className="p-2 text-left">Payment</th>
                    <th className="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t">
                    <td className="p-2">#12345</td>
                    <td className="p-2">The Batman</td>
                    <td className="p-2">April 5, 2025 - 7:00 PM</td>
                    <td className="p-2">Credit Card</td>
                    <td className="p-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer">
                        View Ticket
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>

           
        </div>

            
    )
}