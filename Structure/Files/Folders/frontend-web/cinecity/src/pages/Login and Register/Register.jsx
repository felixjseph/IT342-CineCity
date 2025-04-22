import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {

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
            const response = await fetch("http://localhost:8080/auth/signup", {
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
        <div className="flex flex-col justify-center sm:h-screen p-4">
            <div className="max-w-md w-full mx-auto border bg-[#2E2F33] border-slate-300 rounded-2xl p-8">
                <div className="text-center mb-12">
                    <img src="/images/logo.png" alt="logo" className="w-40 mb-8 mx-auto block" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Username</label>
                            <input name="username" type="text" className="text-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email"
                                onChange={handleChange}
                                value={registerUser.username}
                            />
                        </div>
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Email</label>
                            <input name="email" type="email" className="text-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email"
                                onChange={handleChange}
                                value={registerUser.email}
                            />
                        </div>
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Password</label>
                            <input name="password" type="password" className="text-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password"
                                onChange={handleChange}
                                value={registerUser.password}
                            />
                        </div>

                    </div>

                    <div className="mt-12">
                        <button className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-green-600 cursor-pointer hover:bg-green-700 focus:outline-none">
                            Create an account
                        </button>
                    </div>
                    <p className="text-white text-sm mt-6 text-center">Already have an account? <a href="javascript:void(0);" className="text-green-600 font-medium hover:underline ml-1" onClick={() => navigate('/newlogin')}>Login here</a></p>
                </form>
            </div>

            {success && (
                <div>
                    <div
                        className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                            <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg"
                                onClick={()=>setSuccess(false)}
                                className="w-3.5 h-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                                viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                                
                            </svg>

                            <div className="my-10 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 shrink-0 fill-green-500 inline"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
                                        data-original="#000000" />
                                    <path
                                        d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
                                        data-original="#000000" />
                                </svg>
                                <h4 className="text-xl text-slate-900 font-semibold mt-4">Account created successfully!</h4>
                            </div>

                            <button
                                onClick={()=>navigate("/newlogin")}
                                className="px-5 py-2.5 w-full rounded-lg text-white text-sm font-medium border-none outline-none bg-gray-800 hover:bg-gray-700">Go to login
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