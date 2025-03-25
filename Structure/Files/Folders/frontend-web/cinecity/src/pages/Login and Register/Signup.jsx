import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6";

export default function Signup() {

    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        setRegisterUser({
            ...registerUser,
            [e.target.name]: e.target.value
        })

        if(e.target.name === "password" && e.target.value.length >= 8){
            setPasswordError("");
        }

        if(e.target.name === "email"){
            if(!validateEmail(registerUser.email)){
                setEmailError("Invalid email address");
            }else{
                setEmailError("");
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerUser.password.length < 8) {
            setPasswordError("Password must be atleast 8 characters long")
            return;
        }

        if(!validateEmail(registerUser.email)){
            setEmailError("Invalid email address");
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
                setErrorMessage("");
            } else {
                const error = await response.json();
                console.log(error);
                if (error.detail && error.detail.includes("Duplicate entry")) {
                    setErrorMessage("Email already exists");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("An error occurred. Please try again.");
        }
    }

    return (
        <div className="flex justify-center items-center overflow-y-hidden">
            {success ? (
                <div className="login-container mt-16 w-[20rem] bg-[#2E2F33] p-8 rounded-lg flex flex-col justify-center items-center h-[28rem]">
                    <FaCircleCheck className="text-[#2FBD59] text-7xl mb-4" />
                    <h1 className="text-white font-medium mb-2">Congratulations</h1>
                    <p className="text-white text-center mb-8">Your account has been successfully created!</p>
                    <button className="bg-[#2FBD59] text-white w-full px-2 py-2 font-medium rounded-3xl cursor-pointer"
                        onClick={() => navigate('/login')}
                    >Go to Login now</button>
                </div>
            ) : (
                <div className="login-container mt-16 w-[20rem] bg-[#2E2F33] p-8 rounded-lg flex flex-col justify-center items-center h-[28rem]">
                    <img src="/images/logo.png" alt="logo" className="w-[15rem] mb-2" />
                    <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" className="bg-white my-2 py-2 px-4 w-full rounded-3xl font-medium"
                            onChange={handleChange} value={registerUser.username} name="username"
                        />
                        <input type="text" placeholder="Email" className="bg-white my-2 py-2 px-4 w-full rounded-3xl font-medium"
                            onChange={handleChange} value={registerUser.email} name="email"
                        />
                        {emailError && <p className="text-red-500 text-sm pl-2 w-full">{emailError}</p>}
                        {errorMessage && <p className="text-red-500 text-sm pl-2 w-full">{errorMessage}</p>}
                        <input type="password" placeholder="Password" className="bg-white my-2 py-2 px-4 w-full rounded-3xl font-medium"
                            onChange={handleChange} value={registerUser.password} name="password"
                        />
                        {passwordError && <p className="text-red-500 text-sm pl-2 w-full">{passwordError}</p>}
                        <button className="bg-[#2FBD59] w-full py-2 rounded-3xl my-2 text-white font-medium cursor-pointer">Signup</button>
                    </form> 
                    <div className="flex border-1 border-white text-white w-full my-2 py-2 rounded-3xl justify-between px-8">
                        <p className="cursor-pointer hover:text-[#2FBD59]" onClick={() => navigate('/login')}>SIGN IN</p>
                        <p>|</p>
                        <p className="cursor-pointer hover:text-[#2FBD59]" onClick={() => navigate('/signup')}>SIGN UP</p>
                    </div>
                </div>
            )}
        </div>
    )
}