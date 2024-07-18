import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../Interfaces/Users'

const Navbar = ({ user, setUser }: { user: IUser | null, setUser: Function }) => {

    const navigate = useNavigate();

    console.log('User in the navbar', user)

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/')
    }


    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full h-[55px] flex fixed top-0 shadow-lg items-center shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50">
            <div className="h-full flex flex-row items-center  m-auto px-[10px]">
                <div className=" md:flex w-[600px] h-full flex-row items-center justify-center">
                    <div className="flex items-center justify-between w-full h-auto text-xl border border-[#7042f861] bg-[#0300145e] mr-5 px-[20px] py-[10px] rounded-full text-pink-200">
                        <Link to='/'>Home</Link>
                        <Link to='/recipes'>Recipes</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                </div>
                {/* <div className="md:hidden">
                    <button className="text-gray-200 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                            />
                        </svg>
                    </button>
                </div> */}
            </div>
            {/* <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-[#03001417] backdrop-blur-md px-2`}>
                <a href="#about-me" className="block py-2 text-gray-200 hover:text-white">
                    Home
                </a>
                <a href="#skills" className="block py-2 text-gray-200 hover:text-white">
                    Recipes
                </a>
                <a href="#projects" className="block py-2 text-yellow-200 hover:text-pink">
                    Login
                </a>

            </div> */}
        </div>
    );

}

export default Navbar