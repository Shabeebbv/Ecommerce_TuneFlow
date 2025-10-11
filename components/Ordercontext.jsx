import React, { createContext } from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';

export const OrderContext=createContext()

export const OrderProvider = ({children}) => {
     const[user,setUser]=useState(null)
      const[orders,setOrders]=useState([])
      
      useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('loggedinuser'))
        if(userInfo){
          setUser(userInfo)
          userData(userInfo.id)
        }
      },[])
    
      const userData=async(id)=>{
        try{
        const res=await axios.get(`http://localhost:3000/users/${id}`)
       
            
            
        
        if(res.data.orders){
          setOrders(res.data.orders)
        }
    }
    catch(err){
        toast.error("something went wrong")
        console.log(err);
        
    }
      }
         const addOrder= async(newOrder)=>{
            if(!user){
                toast.error("Please login")
                return
            }

            const updatedOrder=[...orders,...newOrder]
            setOrders(updatedOrder)
            await axios.patch(`http://localhost:3000/users/${user.id}`,{
                orders:updatedOrder
            })
            

        }
  return (
    <>
    
        <OrderContext.Provider value={{user,orders,addOrder}}>{children}</OrderContext.Provider>
    
    </>
  )
}

// what is the problem in my order page just need to know the err