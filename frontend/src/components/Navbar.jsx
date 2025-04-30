import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const [isOpen, setOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!token);
    }, []);

    return <div>
        <nav class="bg-slate-200">
            <div class="max-w-screen-xl flex flex-wrap items-end justify-end mx-auto p-4">

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <Link
                        to="/"
                        className="px-4 py-2 mr-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded">
                        View Blogs
                    </Link>
                    {isLoggedIn &&
                        <Link
                            to="/login"
                            className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded">
                            Log In
                        </Link>

                    }
                    {!isLoggedIn &&
                        <Link
                            to="/modifyposts"
                            className="px-4 py-2 mr-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded">
                            Edit Blogs
                        </Link>
                    }
                    {!isLoggedIn &&
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                setIsLoggedIn(false);
                                navigate("/login");
                            }}
                            className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded"
                        >
                            Log Out
                        </button>
                    }
                </div>
                <button data-collapse-toggle="navbar-hamburger" type="button" class="md:hidden lg:hidden inline-flex items-center justify-center p-2 w-10 h-10 
                text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger"
                    aria-expanded="false" onClick={() => {
                        setOpen(!isOpen)
                    }}>
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} `}>
                <NavLink to="/" className="block py-2 px-3 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-gray-400 md:dark:text-white"
                    style={({ isActive }) => ({
                        color: isActive ? "Black" : "gray",
                        textDecoration: "none",
                    })}>
                    View Blogs
                </NavLink>
                {isLoggedIn &&
                    <NavLink to="/login" className="block py-2 px-3 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-gray-400 md:dark:text-white"
                        style={({ isActive }) => ({
                            color: isActive ? "Black" : "Black",
                            textDecoration: "none",
                        })}>
                        Log In
                    </NavLink>
                }
                {!isLoggedIn &&
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            setIsLoggedIn(false);
                            navigate("/login");
                        }}
                        className="block py-2 px-3 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-black md:dark:text-white"
                    >
                        Log Out
                    </button>
                }


            </div>
        </nav>
    </div>
}