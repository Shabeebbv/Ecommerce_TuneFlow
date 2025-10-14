import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export const Ordermanager = () => {
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const usersRes = await axios.get("http://localhost:3000/users")
      const users = usersRes.data;

      const orders = []
       users.forEach((user) => {
        if (user.orders ) {
          user.orders.forEach((order) => {
            order.products.forEach((product) => {
            orders.push({
             ...product,        
          orderId: order.orderId,
          status: order.status,
          username: user.name,
          userId: user.id,
            })
          });
        }
       )}
      })
      setAllOrders(orders);
    }

  catch(err){
    console.log(err);
    
  }
}
fetchOrders()
},[])

  const handleStatusChange = async (userId, orderId, newStatus) => {
  try {
    const userRes = await axios.get(`http://localhost:3000/users/${userId}`);
    const user = userRes.data;

    const updatedOrders = user.orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );

    await axios.patch(`http://localhost:3000/users/${userId}`, { orders: updatedOrders });

    setAllOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  } catch (err) {
    console.log(err);
  }
};

return(
   <div className="h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-1">
                  <Sidebar />
                  <div className='mt-16 ml-64'>
  <table className="min-w-full border">
  <thead>
    <tr>
      <th>Order ID</th>
      <th>User</th>
      <th>Products</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {allOrders.map((order, index) => (
      <tr key={index} className="border-b">
        <td className="p-3">{order.orderId}</td>
        <td className="p-3">{order.username}</td>
          <td className="p-3">{order.name}</td>
        <td className="p-3">{order.status}</td>
        <td className="p-3">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order.userId, order.orderId, e.target.value)}
            className="border rounded p-1"
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered"> Delivered</option>
            <option value="Cancelled">Cancelled</option>

          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>
</div>
)
}

