import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {SearchContext} from '../components/Search'
import { CartContext } from '../components/Cartcontext'
import { useNavigate } from 'react-router-dom'
import { wishlistContext } from '../components/Wishlistcontext'
import { FaHeart, FaRegHeart } from 'react-icons/fa';



export const Products = () => {
  const[products,setProducts] =useState([])
  const {search}=useContext(SearchContext)
  const navigate =useNavigate()
  const { addToCart ,cartItems} = useContext(CartContext);
  const {togglewishlist}=useContext(wishlistContext)

  useEffect(()=>{
    axios.get("http://localhost:3000/products")
    .then((res)=>setProducts(res.data))
    .catch((err) => console.error("Error fetching products:", err));
    
  },[])

   const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  
  return (
    
    <>
    
    <h2 className="text-2xl font-bold mb-4">Today's Best Deals For You!</h2>
    {filteredProducts.length===0 ?(
      <p className='text-center font-bold text-2xl'>No products found</p>
    ):(
      

    <div 
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8">
      {filteredProducts.map((item,index)=>{const discount=item.oldPrice?Math.round(((item.oldPrice-item.price)/item.oldPrice)*100):null;
      return(
        <React.Fragment key={item.id} >
     <div 
     className="group relative flex flex-col justify-between border rounded-lg p-4 shadow hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 text-center min-h-[350px] hover:bg-gray-50">
          <div 
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">


            {/* wishlist */}
             <button onClick={()=>togglewishlist(item)}><FaRegHeart/></button>
            </div>

          <img src={item.image} alt="headphone" className="w-full h-40 object-contain mb-3 rounded hover:scale-105 transition-transform duration-300"/>
          <div><h3 className="text-lg font-semibold">{item.name}</h3>
          <div 
          className="flex items-center justify-center space-x-2 mt-2">

          {item.rating &&(<span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center ">{item.rating}<span className="ml-1">★</span></span>)}
          {item.ratings &&(<span className="text-gray-500 font-bold text-sm">({item.ratings})</span>)}</div>
          <div className="flex items-center justify-center gap-2 mb-2 mt-1">
            <p className="text-black font-bold">₹{item.price}</p>
           {item.oldPrice && (<p className="text-gray-500 line-through text-sm">₹{item.oldPrice}</p>)}
          {discount&&(<span  className="text-green-600 font-medium text-xs ml-1">{discount}%OFF</span>)}
          </div>
          {item.stock <= 4 && item.stock > 0 && (<p className="text-red-600 font-medium text-xs mt-1">Only {item.stock} left</p>)}
          {item.tag&&(<span className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500
 text-white text-xs font-semibold px-2 py-1 rounded">{item.tag}</span>)}
          
          </div>

          {/* cartttt */}
          {cartItems.some((items)=>items.productId === item.id)?(<button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={()=>{
            navigate('/cart')
          }}>Go to cart</button>):(
<button onClick={() => addToCart(item)}
className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105">Add to cart</button>
      )}
{item.stock === 0 && (
  <p className="text-red-600 font-bold">Out of stock</p>
)}

        </div>

        
      
       {/* {index === 8 && (
        <div className="col-span-full my-6">
          <img src="download.png" alt="Mid Banner" 
    className="w-full h-full object-cover rounded-lg shadow-lg"/>
        </div> 
       )}  */}
      </React.Fragment>
      )
      
})}
    </div>
    )}
    </>
  )
  }
