import React, { useState } from 'react'
import '../styles/auth.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const Forgotpassword = () => {
    const[message,setmessage]=useState('')
    const navigate=useNavigate()

    const handle=(e)=>{
        e.preventDefault()
        setmessage('A password reset link has been sent to your email')
        setTimeout(()=>navigate('/login'),1500)
    }
  return (
   <>
   {message && <p className='message'>{message}</p> }
   <form onSubmit={handle}>
   
   <div className='auth-container'>
   <h2>Forgot Password</h2>
    
   <p>Please enter your email to reset your  password</p>
   <input type="email" placeholder='Email' required/>
   <button type='submit'>Send</button>
   <div className='auth-footer'>
     <p><Link to="/login">Back to Login</Link></p>
    

   </div>
   </div>
   </form>
   </>
  )
}
