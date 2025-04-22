import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {

    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false)

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const fetchUser = async (e) => {
            try {

            } catch (error) {
                console.log(error)
            }
        }

        fetchUser();
    }, [authenticated])

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login),
                credentials: 'include'
            })

            const data = await response.json()

            if (response.ok) {
                console.log(data)
                setLogin({
                    email: "",
                    password: ""
                })
                const user = await fetch('http://localhost:8080/users/me', {
                    method: "GET",
                    credentials: 'include',
                });

                if (user.ok) {
                    const userRes = await user.json();
                    console.log('User details:', userRes);
                    toast.success("Login Successful")
                    if (userRes.role === "ADMIN") {
                        console.log('User role:', userRes.role);
                        navigate('/admin/dashboard')
                    } else {
                        console.log('User role:', userRes.role);
                        navigate('/movie')
                    }
                } else {
                    const errorRes = await user.text();
                    console.log('Error fetching user:', errorRes);
                }
            } else {
                console.log(data)
                console.log("An error has occured");
                if (data.description?.includes('incorrect')) {
                    toast.error("The username or password is incorrect")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c1c1c] px-4">
            <div className="max-w-sm sm:max-w-md md:max-w-lg bg-[#2E2F33] p-6 sm:p-8 rounded-lg flex flex-col justify-center items-center shadow-lg">
                <img src="/images/logo.png" alt="logo" className="w-24 sm:w-28 mb-4" />
                <h1 className="text-xl sm:text-2xl text-white font-bold">Welcome Back</h1>
                <p className="text-white/30 text-sm mb-4">Sign in to continue</p>

                <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={login.email}
                        onChange={handleChange}
                        className="bg-white my-2 py-2 px-4 w-full rounded font-medium text-sm sm:text-base"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={login.password}
                        onChange={handleChange}
                        className="bg-white my-2 py-2 px-4 w-full rounded font-medium text-sm sm:text-base"
                    />
                    <button className="bg-[#2FBD59] w-full py-2 rounded my-2 text-white font-medium hover:bg-[#29a94f] transition">
                        Login
                    </button>
                </form>

                <div className="flex border border-white/20 text-white w-full my-3 py-2 rounded justify-between px-6 text-sm sm:text-base">
                    <p className="cursor-pointer hover:text-[#2FBD59]" onClick={() => navigate('/login')}>SIGN IN</p>
                    <p>|</p>
                    <p className="cursor-pointer hover:text-[#2FBD59]" onClick={() => navigate('/signup')}>SIGN UP</p>
                </div>
            </div>

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
    );
}