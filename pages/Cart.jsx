import React, { useContext, useEffect } from "react";
import { CartContext } from "../components/Cartcontext";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar'

// import toast from "react-hot-toast"

const CartPage = () => {
 const logged= localStorage.getItem('islogged')
  const navigate = useNavigate();
  const {
    user,
    cartItems,
    loadUserCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);


  useEffect(() => {
    if (user) loadUserCart(user);
  }, [user]);

  if (!logged) {
    return (
      <div className="text-center mt-20">
        <h2  className="text-xl font-semibold mb-4>Please login to see your cart"></h2>
        <button onClick={() => navigate("/login")} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Login
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2  className="text-xl font-semibold">Your cart is empty</h2>
      </div >
    );
  }

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

  <div className="lg:col-span-2 space-y-4">
    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

    {cartItems.map((item) => (
      <div key={item.productId} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded shadow">
        <img src={item.image} alt={item.name} className="w-28 h-28 object-contain mb-4 sm:mb-0"/>
        <div className="flex-1 sm:ml-6">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-700">₹{item.price}</p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => updateQuantity(item.productId, "dec")}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="mx-3">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, "inc")}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4 sm:mt-0">
          <button
            onClick={() => removeFromCart(item.productId)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mb-2">
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    <p className="flex justify-between mb-2 text-gray-700">Subtotal: ₹{totalPrice}</p>
    <p className="flex justify-between mb-2 text-gray-700">Shipping: ₹0.00</p>
    <p className="text-lg font-bold mb-4 mt-5">Total Price: ₹{totalPrice}</p>
    <button
      onClick={() => navigate('/checkout')}
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-md hover:from-purple-700 hover:to-indigo-600 transition duration-300"
    >
      PLACE ORDER
    </button>
  </div>
</div>
</>
  );
};

export default CartPage;