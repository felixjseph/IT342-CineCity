import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewLogin() {

    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/login`, {
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
                const user = await fetch(`${import.meta.env.VITE_DATA_URL}/users/me`, {
                    method: "GET",
                    headers: { 
                        "Authorization": `Bearer ${data.token}`,
                    },
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
                        navigate('/movies')
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
            toast.error("An error occurred during login")
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="bg-[#1c1c1c]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <img src="/images/logo.png" alt="logo" className="w-40 mb-8 mx-auto block" />

                    <div className="p-8 rounded-2xl bg-[#2E2F33] shadow">
                        <h2 className="text-white text-center text-3xl font-semibold">Sign in</h2>
                        <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input type="text" required className="w-full text-white text-sm border border-slate-500 px-4 py-3 rounded-md outline-white-600" placeholder="Enter email"
                                        name="email"
                                        value={login.email}
                                        onChange={handleChange}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        required 
                                        className="w-full text-white text-sm border border-slate-500 px-4 py-3 rounded-md outline-white-600" 
                                        placeholder="Enter password"
                                        name="password"
                                        value={login.password}
                                        onChange={handleChange}
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="#bbb" 
                                        stroke="#bbb" 
                                        className="w-4 h-4 absolute right-4 cursor-pointer" 
                                        viewBox="0 0 128 128"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <path d="M64 24C22.127 24 1.367 60.504.504 62.057a4 4 0 0 0 0 3.887C1.367 67.496 22.127 104 64 104s62.633-36.504 63.496-38.057a4 4 0 0 0 0-3.887C126.633 60.504 105.873 24 64 24zm0 72c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24z" data-original="#000000"></path>
                                        ) : (
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        )}
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                                    <label className="ml-3 block text-sm text-white">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="jajvascript:void(0);" className="text-green-600 hover:underline font-semibold">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className="!mt-12">
                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-2 cursor-pointer px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </div>
                                    ) : 'Sign in'}
                                </button>
                            </div>
                            <p className="text-white text-sm !mt-6 text-center">
                                Don't have an account?
                                <a
                                    href="#"
                                    onClick={() => navigate('/register')}
                                    className="text-green-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                >
                                    Register here
                                </a>
                            </p>
                        </form>
                    </div>
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
    )
}