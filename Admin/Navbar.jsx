import React from 'react'
import { Link } from 'react-router-dom'
import {  FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const Navbar= () => {
  const navigate=useNavigate()
  return (
    <nav className="bg-gray-800 text-white shadow-md px-6 py-3 w-full fixed top-0 left-0 z-50 "><div className='flex justify-between '>
        <div className="flex items-center gap-2">
        <div className="flex justify-between items-center">
          <Link to={'/admin'}>  <h2 className="text-xl font-semibold tracking-wide">Tune<span className='text-blue-500'>Flow</span></h2></Link>
            </div>
        </div>
        <div
    className="cursor-pointer text-white hover:text-red-500 transition-colors duration-200 flex items-center gap-1"
    onClick={() => {
      localStorage.removeItem("islogged");
      localStorage.removeItem("loggedinuser");
      navigate("/login");
    }}
  >
        <FaUser className="text-xl" />Logout</div>
        </div>
    </nav>
  )
}
