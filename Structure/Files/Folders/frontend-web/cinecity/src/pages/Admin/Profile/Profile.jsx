import { useEffect } from "react";
import { useState } from "react"

export default function Profile() {


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
        fetchData(`${import.meta.env.VITE_DATA_URL}/users/me`,setUser)
    },[])

    return (
        <div className="p-8 w-full relative overflow-y-scroll">
            <h1 className="text-white font-medium text-2xl">Admin Profile</h1>
            <div className=" mt-4 p-4 ">
                <div className="flex items-center">
                    <div className="profile mr-16 h-[10rem] w-[10rem] rounded-[50%] bg-blue-500"></div>
                    <label className="bg-blue-700 px-4 py-1 rounded mr-2 text-white">
                        Upload Photo
                        <input
                            type="file"
                            className="hidden"
                        />
                    </label>

                    <button className="flex mr-4 items-center px-4 py-1 rounded bg-gray-500 cursor-pointer transition duration-300 ease-in-out">Delete Profile</button>
                </div>
                <div className="flex text-white items-center mt-8">
                    <div className="mr-4">
                        <label>Username <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="username"
                            value={user.username}
                        />
                    </div>
                    <div>
                        <label>Email <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="email"
                            value={user.email}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col text-white">
                        <label>Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-[50%] p-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
                            onChange={handleChange}
                            name="password"
                            value={user.password}
                        />
                    </div>
                </div>
                <button className="flex mt-16 mr-4 items-center px-4 py-1 rounded bg-blue-700 text-white cursor-pointer transition duration-300 ease-in-out">Save Changes</button>
            </div>
        </div>
    )
}