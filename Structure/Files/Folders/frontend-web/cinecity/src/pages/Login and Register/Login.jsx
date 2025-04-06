import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
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
        <div className="flex justify-center items-center overflow-y-hidden">
            <div className="login-container mt-16 w-[25%] bg-[#2E2F33] p-8 rounded-lg flex flex-col justify-center items-center">
                <img src="/images/logo.png" alt="logo" className="w-[8rem] mb-2" />
                <h1 className="text-2xl text-white font-bold mt-2">Welcome Back</h1>
                <p className="text-white/30 text-sm ">Sign in to continue</p>
                <form className="flex flex-col items-center justify-center w-full mt-2" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" className="bg-white my-2 py-2 px-4 w-full rounded font-medium"
                        onChange={handleChange}
                        name="email"
                        value={login.email}
                    />
                    <input type="password" placeholder="Password" className="bg-white my-2 py-2 px-4 w-full font-medium"
                        onChange={handleChange}
                        name="password"
                        value={login.password}
                    />
                    <button className="bg-[#2FBD59] w-full py-2 rounded my-2 text-white font-medium cursor-pointer">Login</button>
                </form>
                <div className="flex border-1 border-white text-white w-full my-2 py-2 rounded justify-between px-8">
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
    )
}