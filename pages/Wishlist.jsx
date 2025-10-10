import React, { useContext } from 'react'
import { wishlistContext } from '../components/Wishlistcontext'
import { Navbar } from '../components/Navbar'


export const Wishlist = () => {
    const {user,wishlist,removeWishlist}=useContext(wishlistContext)

    const logged=localStorage.getItem('islogged')

    if(!logged){
        return (
            <h2 className="text-2xl font-bold mb-4">please login </h2>
        )
    }


  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto mt-10">
    <h2 className="text-2xl font-bold mb-4">WishList</h2>
    {wishlist.length===0 ?( <p>Wishlist is empty</p>):(
    wishlist.map((item)=>
        <div key={item.id}  className="flex justify-between items-center border-b py-3">
            <img src={item.image} alt="image" className="w-28 h-28 object-contain mb-4 sm:mb-0" />
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-700">₹{item.price}</p>
            <button onClick={()=>removeWishlist(item.id)}  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mb-2">remove</button>
        </div>

    ))}
    </div>

    </>
    
  )
}
