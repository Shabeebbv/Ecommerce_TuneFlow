import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { FaHeart, FaShoppingCart,  FaUser, FaSearch } from "react-icons/fa";
import { useContext } from "react";
import {SearchContext} from './Search'
import { CartContext } from "./Cartcontext";
import { wishlistContext } from "./Wishlistcontext";


export const Navbar = () => {
  const {cartItems}=useContext(CartContext)
  const navigate = useNavigate();
  const{wishlist}=useContext(wishlistContext)

  const{search,setSearch}=useContext(SearchContext)

   const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return
    navigate("/products");   
   
  };

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <Link to="/" className="logo">
          Tune<span className="logo-accent">Flow</span>
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contactUs">Contact Us</Link>
      </div>

      <div className="navbar-search flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch} className="relative w-full">
        <input type="text" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit"  className="absolute right-0 top-0 h-full flex items-center justify-center bg-transparent text-blue-500 px-3 rounded-r-lg"><FaSearch  /></button>
        </form>
        
      </div>

      <div className="navbar-right flex items-center gap-6">
  <div
    className="relative cursor-pointer text-gray-600 hover:text-pink-500 transition-colors duration-200"
    onClick={() => navigate("/wishlist")}
    

  >
    <FaHeart className="text-xl" />
    {wishlist.length>0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{wishlist.length}</span>)}
  </div>

  <div
    className="relative cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200"
    onClick={() => navigate("/cart")}
  >
    <FaShoppingCart className="text-xl" />
    {cartItems.length>0&&(<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>)}
  </div>
  <div>
    <button onClick={()=>navigate('/orders')}>Orders</button>
    
  </div>
    
  <div
    className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200 flex items-center gap-1"
    onClick={() => {
      localStorage.removeItem("islogged");
      localStorage.removeItem("loggedinuser");
      navigate("/login");
    }}
  >
    
    <FaUser className="text-xl" />
    {localStorage.getItem("islogged")?(<span className="hidden md:inline text-sm font-medium">Logout</span>):(<span className="hidden md:inline text-sm font-medium">Login</span>)}
    {/* <span className="hidden md:inline text-sm font-medium">Logout</span> */}
  </div>
</div>

    </nav>
  );
};
