import React, { useContext } from 'react'
import { wishlistContext } from '../components/Wishlistcontext'


export const Wishlist = () => {
    const {user,wishlist}=useContext(wishlistContext)

    const logged=localStorage.getItem('islogged')

    if(!logged){
        return (
            <h2>please login </h2>
        )
    }


  return (
    <>
    <h2>WishList</h2>
    {wishlist.length===0 ?( <p>Wishlist is empty</p>):(
    wishlist.map((item)=>
        <div>
            <img src={item.image} alt="image" />
            <h2>{item.name}</h2>
        </div>

    ))}
    </>
    
  )
}
