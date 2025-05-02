import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function NavBarNew() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState()

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(null);




    const userMe = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/users/me`, {
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                console.log("User fetched successfully: ", data)
                setUser(data)
            } else {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/check`, {
                    credentials: 'include',
                });
                const result = await response.json();
                console.log('Auth check response:', result);
                setIsAuthenticated(result);
                userMe();
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            }

        };
        checkAuth();
    }, []);

    return (
        <div>
            <header className="border-b-2 border-opacity-30 border-gray-200/30 flex shadow-md py-4 px-4 sm:px-10 min-h-[70px] tracking-wide relative z-50">
                <div className="flex flex-wrap items-center justify-between gap-5 w-full">
                    <img src="/images/logo.png" alt="logo" className="w-[7rem]" />

                    <div
                        id="collapseMenu"
                        className={`${menuOpen ? 'block' : 'max-lg:hidden lg:block'
                            } max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
                    >
                        {menuOpen && (
                            <button
                                onClick={handleClick}
                                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                                    <path d="M30.391 318.583a30.37..." />
                                    <path d="M287.9 318.583a30.37..." />
                                </svg>
                            </button>
                        )}

                        <ul
                            className={`lg:flex gap-x-5 ${menuOpen ? 'block' : 'max-lg:hidden'
                                } max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50`}
                        >
                            <li className="mb-6 hidden max-lg:block">
                                <a href="#"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" /></a>
                            </li>
                            {['Home', 'Movies', 'Profile'].map((item) => {
                                const path = item === 'Profile' ? '/userprofile' : `/${item.toLowerCase()}`;
                                const isActive = location.pathname === path;

                                return (
                                    <li
                                        key={item}
                                        className={`max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3`}
                                        onClick={() => navigate(path)}
                                    >
                                        <a
                                            className={`hover:text-blue-700 cursor-pointer block font-medium text-[15px] ${isActive ? 'text-green-700' : 'text-white'}`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="flex max-lg:ml-auto space-x-4">
                        {isAuthenticated ? (
                            user ? (
                                <div
                                    className="flex flex-wrap items-center justify-center gap-4 cursor-pointer"
                                    onClick={() => navigate('/userprofile')} // Redirect to /userprofile
                                >
                                    <img src="images/profile-icon.png" className="w-10 h-10 rounded-full" alt="User Avatar" />
                                    <div>
                                        <p className="text-[15px] text-white font-semibold">{user.email}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-white">Loading...</div>
                            )
                        ) : (
                            <div>
                                <button
                                    onClick={() => navigate('/newlogin')}
                                    className="px-4 py-2 text-sm rounded-full font-medium tracking-wide text-white border border-gray-400 bg-transparent hover:text-black hover:bg-gray-50 transition-all"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="px-4 py-2 text-sm rounded-full font-medium tracking-wide text-white border border-green-600 bg-green-600 hover:bg-green-700 transition-all"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}

                        {/* Hamburger button */}
                        <button onClick={handleClick} className="lg:hidden">
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header >
            <Outlet></Outlet>
        </div >
    )
}