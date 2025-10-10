import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";

// import '../styles/auth.css'

export const Register = () => {
  const navigate=useNavigate()

  const[formData,setFormData]=useState({name: "",email: "",password: "",confirmpassword: ""})
  // const [message,setMessage]=useState('')


const validation=()=>{
  if(!formData.name || !formData.email || !formData.password || !formData.confirmpassword){
   return toast.error( "All fields are required")
  }
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
   return toast.error("Invalid email format!");
  }

  if (formData.password.length<6){
   return toast.error("Password must be at least 6 characters!")
  }
  if(formData.password !== formData.confirmpassword){
   return toast.error("Password do not match")
  }
  return null
}

  const onHandle= async (e)=>{
    e.preventDefault()

    const error=validation()

    if(error){
      // setMessage(error)
      return;
    

  }
  try{
  const res= await axios.get(`http://localhost:3000/users?email=${formData.email}`)
    if (res.data.length>0){
      toast.error('Email already registerd');
      return
    }
    await axios.post("http://localhost:3000/users",{
      ...formData,
      role:"user",
      cart:[],
      wishlist:[],
      orders:[]

    })
    toast.success('Registration successful')
    navigate('/login')
  }
  catch(err){
    toast.error('Registration failed')
  }


}


 
  return (
    <div className='auth-container'>
      <h2>Create Your Tune<span className='logo-blue'>Flow</span> Account</h2>
      {/* {message && <p className='message'>{message}</p> } */}
      <form onSubmit={onHandle}>
      <input type="text" value={formData.name}  placeholder='Full Name' onChange={(e)=>setFormData({...formData,name: e.target.value} )} />
      <input type="email" value={formData.email} placeholder='Email' onChange={(e)=>setFormData({...formData,email: e.target.value})}  />
      <input type="password" value={formData.password} placeholder='Password' onChange={(e)=>setFormData({...formData,password: e.target.value})}/>
      <input type="password" value={formData.confirmpassword} placeholder='Confirm password' onChange={(e)=>setFormData({...formData,confirmpassword: e.target.value})}/>
      <button type='submit'>Register</button>
      
      </form>
    </div>
  )
}
