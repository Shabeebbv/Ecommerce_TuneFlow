import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


export const wishlistContext=createContext()  

export const WishlistProvider = ({children}) => {

    const[wishlist,setWishlist]=useState([])
    const [user,setUser]=useState(null)

   

   useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem('loggedinuser'))
    if(userInfo){
    setUser(userInfo)
    fetchUserInfo(userInfo.id)
   }},[])

   const fetchUserInfo= async(userId)=>{
    try{
    const res=await axios.get(`http://localhost:3000/users/${userId}`)
    if(res.data.wishlist){
      setWishlist(res.data.wishlist || [])
    }
  }
  catch(err){
    toast.error("Failed to add wishlist ")
    console.log(err);
    

  }
   }



    const addToWishlist= async(product)=>{
      if(!user){
        toast.error('please login to add wishlist')
        return
      }
      const exist=wishlist.find(item=>product.id===item.id)
      if(!exist){
        const updatedWishlist=([...wishlist,product])  
        setWishlist(updatedWishlist)
        await axios.patch(`http://localhost:3000/users/${user.id}`,{
           wishlist:updatedWishlist
        }
         
        )
        return
      }


    }

    const removeWishlist=async (id)=>{
      const updatedwishlist= wishlist.filter(item=>item.id!==id);
      setWishlist(updatedwishlist)
      await axios.patch(`http://localhost:3000/users/${user.id}`,{
        wishlist:updatedwishlist
      })
    }
    
    const togglewishlist=(product)=>{
      const exist=wishlist.find(item=>item.id===product.id)
      if(exist){
        removeWishlist(product.id)
      }
      else{
          addToWishlist(product)
      }
    }
  return (
    <>
    <wishlistContext.Provider value={{wishlist,addToWishlist,removeWishlist,togglewishlist,user}}>
      {children}
    </wishlistContext.Provider>
    </>
    )
}
