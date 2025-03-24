import { useNavigate } from "react-router-dom"


export default function Signup(){

    const navigate = useNavigate();
    return(
        <div className="flex justify-center items-center overflow-y-hidden">
            <div className="login-container mt-16 w-[20rem] bg-[#2E2F33] p-8 rounded-lg flex flex-col justify-center items-center">
                <img src="/images/logo.png" alt="logo" className="w-[15rem] mb-2"/>
                <form className="flex flex-col items-center justify-center w-full">
                    <input type="text" placeholder="Username" className="border-1 bg-white my-2 py-2 px-4 w-full rounded-3xl font-medium"/>
                    <input type="text" placeholder="Email" className="border-1 bg-white my-2 py-2 px-4 w-full rounded-3xl font-medium"/>
                    <input type="password" placeholder="Password" className="border-1 bg-white my-2 py-2 px-4 w-full rounded-3xl font-medium"/>
                    <button className="bg-[#2FBD59] w-full py-2 rounded-3xl my-2 text-white font-medium">Signup</button>
                </form>
                <div className="flex border-1 border-white text-white w-full my-2 py-2 rounded-3xl justify-between px-8">
                    <p className="cursor-pointer hover:text-[#2FBD59]" onClick={()=>navigate('/login')}>SIGN IN</p>
                    <p>|</p>
                    <p className="cursor-pointer hover:text-[#2FBD59]" onClick={()=>navigate('/signup')}>SIGN UP</p>
                </div>
            </div>
        </div>
    )
}