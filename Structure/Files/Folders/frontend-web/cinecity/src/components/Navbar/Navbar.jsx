import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="h-screen">
            <nav className="border-b-2 border-opacity-30 border-gray-200/30 px-16 py-2">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <img src="/images/logo.png" alt="logo" className="w-[10rem]" />
                        <ul className="text-white flex items-center">
                            <li className="ml-[3rem] mx-4 cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
                                onClick={() => navigate('/home')}>Home</li>
                            <li className="mx-4 cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
                                onClick={() => navigate(`/movie`)}>Movies  </li>
                            <li className="mx-4 cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
                                onClick={() => navigate(`/account`)}>Profile</li>
                        </ul>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src="/images/profile-icon.png" 
                            alt="User Profile"
                            className="w-[2rem] h-[2rem] rounded-full cursor-pointer"
                            onClick={() => navigate('/account')}  
                        />
                    </div>
                </div>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}
