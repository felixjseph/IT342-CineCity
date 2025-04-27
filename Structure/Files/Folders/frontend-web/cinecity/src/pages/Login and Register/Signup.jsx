import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {

    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        setRegisterUser({
            ...registerUser,
            [e.target.name]: e.target.value
        })

        if (e.target.name === "password" && e.target.value.length >= 8) {
            setPasswordError("");
        }

        if (e.target.name === "email") {
            if (!validateEmail(registerUser.email)) {
                setEmailError("Invalid email address");
            } else {
                setEmailError("");
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerUser.password.length < 8) {
            toast.error("Password must be atleast 8 characters long")
            return;
        }

        if (!validateEmail(registerUser.email)) {
            toast.error("Invalid email address")
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerUser)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setRegisterUser({
                    username: "",
                    email: "",
                    password: ""
                })
                setSuccess(true);
            } else {
                const error = await response.json();
                console.log(error);
                if (error.detail && error.detail.includes("Duplicate entry")) {
                    toast.error("Email already exist.")
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 overflow-y-hidden bg-[#1A1A1D]">
            {success ? (
                <div className="login-container bg-[#2E2F33] p-8 rounded-lg flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[25%] h-[28rem]">
                    <FaCircleCheck className="text-[#2FBD59] text-7xl mb-4" />
                    <h1 className="text-white font-medium mb-2">Congratulations</h1>
                    <p className="text-white text-center mb-8">Your account has been successfully created!</p>
                    <button
                        className="bg-[#2FBD59] text-white w-full px-2 py-2 font-medium rounded-3xl cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login now
                    </button>
                </div>
            ) : (
                <div className="login-container bg-[#2E2F33] p-8 rounded-lg flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[25%] h-auto">
                    <img src="/images/logo.png" alt="logo" className="w-[8rem] mb-2" />
                    <h1 className="text-2xl text-white font-bold mt-2">Create an account</h1>
                    <p className="text-white/30 text-sm">Hello new comers!</p>
                    <form className="flex flex-col items-center justify-center w-full mt-2" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-white my-2 py-2 px-4 w-full rounded font-medium"
                            onChange={handleChange}
                            value={registerUser.username}
                            name="username"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="bg-white my-2 py-2 px-4 w-full rounded font-medium"
                            onChange={handleChange}
                            value={registerUser.email}
                            name="email"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-white my-2 py-2 px-4 w-full rounded font-medium"
                            onChange={handleChange}
                            value={registerUser.password}
                            name="password"
                        />
                        <button className="bg-[#2FBD59] w-full py-2 rounded my-2 text-white font-medium cursor-pointer">
                            Signup
                        </button>
                    </form>
                    <div className="flex border border-white text-white w-full my-2 py-2 rounded justify-between px-8">
                        <p className="cursor-pointer hover:text-[#2FBD59]" onClick={() => navigate('/login')}>
                            SIGN IN
                        </p>
                        <p>|</p>
                        <p className="cursor-pointer hover:text-[#2FBD59]" onClick={() => navigate('/signup')}>
                            SIGN UP
                        </p>
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
    );

}