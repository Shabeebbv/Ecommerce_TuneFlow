import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { SiToptal } from 'react-icons/si'

export const UserManager = () => {
    const[user,setUser]=useState([])

    const fetchUser=async()=>{
        try{
          const res=  await axios.get("http://localhost:3000/users")
           const normalUsers = res.data.filter(user => user.role !== "admin");
          setUser(normalUsers)
        }
        catch(err){
          console.log(err); 
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    const toggleStatus=async (user)=>{
        try{
        const updateStatus= user.status==="active"?"inactive":"active"
        await axios.patch(`http://localhost:3000/users/${user.id}`,{
            status:updateStatus
            })
    setUser(prev =>
            prev.map(u => (u.id === user.id ? { ...u, status: updateStatus } : u))
        );
    }
        catch(err){
            console.log(err);
            
        }
    }

    const deleteUser = async (userId) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await axios.delete(`http://localhost:3000/users/${userId}`);
    setUser(user.filter(u => u.id !== userId));
    toast.success("User deleted successfully");
  } catch (err) {
    console.log(err);
    toast.error("Failed to delete user");
  }
};



  return (
    <>
    <div>
         <div className="h-screen flex flex-col">
              <Navbar />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-6 bg-gray-100 overflow-auto ml-56">
          <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <div className="bg-white p-4 rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Orders</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>   
                </tr>
              </thead>
              <tbody>
                {user.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.orders.reduce((total,order)=>total+order.products.length,0)}</td>
                    <td className="p-3">{user.status}</td>  
                     <td className="p-3">
                    {user.status==="active" ?(
                    <button onClick={()=>toggleStatus(user)}  className={`px-3 py-1 my-4 rounded text-white bg-red-600 hover:bg-red-700 `
                    //    "bg-green-600 hover:bg-green-700"
                  }>Block </button>):(<button onClick={()=>toggleStatus(user)}  className={`px-3 py-1 rounded my-4 text-white bg-green-600 hover:bg-green-700 `
                
                  }>Unblock </button>)}
                  <div>
                   <button onClick={() => deleteUser(user.id)} className="px-3 py-1 rounded text-white bg-gray-600 hover:bg-gray-700">Delete
                    </button></div></td>
                   
                      </tr>
                      ))}
                      </tbody>
                      </table>
        </div>

        </div>
      </div>
    </div>
    </div>
    </>
    )
}
