import React from "react";
import { Hero } from "../components/Hero";
import { Products } from "./Products";
import "../styles/home.css";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <>
    {/* <body className="min-h-screen bg-gradient-to-br from-[#FFD580] via-[#FFAB73] to-[#FF6F61] text-gray-900"> */}
 

    <Navbar/>
      <Hero/>
      <Products/>
      {/* </body> */}
    </>
  );
};
