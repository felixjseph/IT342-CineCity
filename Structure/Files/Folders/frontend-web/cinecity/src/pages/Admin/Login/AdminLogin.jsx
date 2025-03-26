import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {

    const [admin, setAdmin] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) =>{
        setAdmin({
            ...admin,
            [e.target.name]:e.target.value
        })
    }

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(admin),
                credentials:'include'
            })
            const data = await response.json();
            if(response.ok){
                const status = await fetch('http://localhost:8080/auth/check',{
                    credentials:'include'
                })
                const stat = await status.json();
                if(status.ok){
                    console.log(stat)
                }else{
                    console.log(stat)
                }
                console.log(data)
                setAdmin({
                    email:"",
                    password:""
                })

                navigate('/admin/data/dashboard')
            }else{
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#242424]">
        <div className="w-full max-w-md p-8 space-y-6 bg-[#2E2F33] shadow-lg rounded-2xl text-white">
          <h2 className="text-2xl font-bold text-center text-white">Admin Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={handleChange}
                value={admin.email}
                name="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={handleChange}
                value={admin.password}
                name="password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  