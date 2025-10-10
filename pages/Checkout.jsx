import React, { useContext, useEffect,useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/Cartcontext';
import axios from 'axios';

export const Checkout = () => {
  const[user,setUser]=useState(null)
  const[orders,setOrders]=useState([])

  

  const userData=async()=>{
    const res=await axios.get(`http://localhost:3000/users/${user.id}`)
    
  }

  
    
  const[formData,setFormData]=useState({name: "",email: "",phonenumber: "",address: "",city:"",pincode:"",landmark:""})
  const validation=()=>{
  if(!formData.name || !formData.phonenumber || !formData.address || !formData.city || !formData.pincode||!formData.landmark )
    return "All fields are required"
  
   if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
    return "Please enter a valid email address";
  
  
   if (!/^\d{6}$/.test(formData.pincode))
    return "Pincode must be 6 digits";

  if (!/^\d{10}$/.test(formData.phonenumber))
    return "Phone number must be 10 digits";
  
  return null
}
const handlePlaceOrder = () => {
  const error = validation();
  if (error) {
    toast.error(error);
  } else {
    toast.success('Order placed successfully');
    setTimeout(() => navigate('/orders'), 1000);
  }
};

// console.log("total: ",total);

  const{cartItems}=useContext(CartContext)
    const total=cartItems.reduce((sum,item)=>
    sum+item.price*item.quantity,0)
  
  const navigate=useNavigate()
  return (
    <div className="bg-gray-50 min-h-screen py-2">
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text" placeholder="Full Name"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2" onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text" placeholder="Address"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2" onChange={(e)=>setFormData({...formData,address: e.target.value} )}
            />
            <input
              type="text"
              placeholder="City" className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={(e)=>setFormData({...formData,city: e.target.value} )}
            />
            <input
              type="text"placeholder="PIN Code"className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={(e)=>setFormData({...formData,pincode: e.target.value} )}
            />
             <input type="text" placeholder='Landmark'
          className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2"
          onChange={(e)=>setFormData({...formData,landmark: e.target.value} )}
/>
            <input
              type="text" placeholder="Phone Number"  className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2"
              onChange={(e)=>setFormData({...formData,phonenumber: e.target.value} )}
            />
            <input type="text" placeholder='Email (Optional)'
          className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2"
          onChange={(e)=>setFormData({...formData,email: e.target.value} )}
/>
          </div>
          
          
        </div>
        

        <div className= "md:sticky md:top-20 self-start bg-white p-5 rounded-lg shadow-sm flex flex-col gap-4">


          <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3">Order Summary</h3>
             <div className="space-y-3 max-h-56 overflow-y-auto">
            {cartItems.map(item=>(<div key={item.id}
            className='flex items-center justify-between border p-2 rounded-lg'>
            {/* <div className="space-y-4 max-h-72 overflow-y-auto"> */}


              {/* <div className="flex items-center justify-between border p-3 rounded-lg"> */}
                <div className="flex items-center gap-3">
                  <img src={item.image} alt="product" className="w-10 h-10 object-cover rounded" />
               <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qty:{item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-sm">₹{item.price}</p>
              {/* </div> */}


            {/* </div> */}
            <div className="flex justify-between mt-4 font-semibold text-gray-700 border-t pt-3">
              {/* <span>Total</span>
              <span>$120</span> */}
            </div>
                        

            {/* {item.totalPrice} */}
            </div>))}
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg flex justify-between text-base font-semibold">
               <span>Total Price: </span>
            <span className="text-purple-700">
            ₹{total}</span></div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2">Payment Method</h3>
            <div className="flex flex-col gap-2 text-sm">
              <label className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-100" >
                <input type="radio" name="payment" className="accent-purple-600" />
                Credit Card
              </label>
              <label className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="radio" name="payment" className="accent-purple-600" />
                Cash On Delivery
              </label>
              <label className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="radio" name="payment" className="accent-purple-600" />
                Pay with UPI
              </label>
            </div>
          </div>

          <button onClick={handlePlaceOrder}  className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition duration-300 mt-4">
            Place Order 
          </button>
        </div>
      </div>
      <Link to="/cart" 
  className="text-purple-600 font-medium mt-4 inline-block hover:underline"> ← Return to cart</Link>
    </div>
    </div>
    
  );
};
