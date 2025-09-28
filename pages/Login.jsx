import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'


export const Login = () => {

  const[formData,setFormData]=useState({email: '',password:""})

  const[message,setMessage]=useState('')

  const navigate=useNavigate()

  const validateForm=()=>{
  if(!formData.email || !formData.password)return "All fields required!"
  if(!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid Email!"
  return null
  }

  const handleLogin = async (e)=>{
    e.preventDefault()

    const error=validateForm()

    if(error) return setMessage(error);

    try{

    const res= await axios.get(`http://localhost:3000/users?email=${formData.email}&password=${formData.password}`);

    if(res.data.length===0){
      setMessage("User not found!")
      return
    }
    localStorage.setItem("loggedinuser" ,JSON.stringify(res.data[0]));
    setMessage('Login Successsful!')
    setTimeout(()=>navigate('/'),500)


  }
  catch(err){
    setMessage('Login failed. Try again')
}

}

  return (
    <>
    <div className='auth-container'>
      <h2>Log in to your Tune<span className='logo-blue'>Flow</span> Account</h2>
      {message && <p className='message'>{message}</p> }
    <form onSubmit={handleLogin}>
      <input type="email" value={formData.email} onChange={(e)=>{setFormData({...formData,email: e.target.value})
       setMessage('') }} placeholder='Email'/>
      <input type="password" value={formData.password} onChange={(e)=>{setFormData({...formData,password: e.target.value})
      setMessage('')}} placeholder='Password'/>
      <button type='submit'>Log in</button>
    </form>
    <p className='auth-footer'>Don't have an account?<Link to= '/register'> Register now! </Link></p>
    <p className='auth-footer'><Link to='/forgotpassword'>Forgot your password?</Link></p>
    </div>
    </>
  )
}
