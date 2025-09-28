import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          Tune<span className="logo-accent">Flow</span>
        </Link>
      </div>

      {/* Center - Links */}
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
        <FaSearch className="search-icon" />
      </div>

      {/* Right - Icons */}
      <div className="navbar-right">
        <FaHeart className="icon" onClick={() => navigate("/wishlist")} />
        <FaShoppingCart className="icon" onClick={() => navigate("/cart")} />
        <FaUser className="icon" onClick={() => navigate("/login")} />
      </div>
    </nav>
  );
};
