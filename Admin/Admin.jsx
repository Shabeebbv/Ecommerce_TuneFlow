import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { AdminBarChart } from './AdminBarChart';
import { BrandOrdersDoughnut } from './AdminDoughnutChart'; 

export const Admin = () => {
  const [counts, setCounts] = useState([0, 0, 0]); // [Products, Users, Orders]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and users simultaneously
        const [productsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/users'),
        ]);

        const products = productsRes.data;
        const users = usersRes.data;

        // Count total orders across all users
        let ordersCount = 0;
        users.forEach(user => {
          if (user.orders  ) {
             user.orders.forEach(order => {
      if (order.products ) {
            ordersCount += order.products.length;
          }
        })
        }})
      
          

        // Set counts
        setCounts([products.length, users.length, ordersCount]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 ml-60 mt-16 bg-gray-100 p-6 overflow-auto">
          <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-7 rounded shadow">
              <h3 className="font-semibold text-gray-600">Products</h3>
              <p className="text-2xl font-bold">{counts[0]}</p>
            </div>
            <div className="bg-white p-7 rounded shadow">
              <h3 className="font-semibold text-gray-600">Users</h3>
              <p className="text-2xl font-bold">{counts[1]}</p>
            </div>
            <div className="bg-white p-7 rounded shadow">
              <h3 className="font-semibold text-gray-600">Orders</h3>
              <p className="text-2xl font-bold">{counts[2]}</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
            <AdminBarChart data={counts} width="50%" height="100%" />
          </div>

          {/* Brand Doughnut Chart */}
          <div className="mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Products by Brand</h2>
            <BrandOrdersDoughnut  />
          </div>
        </div>
      </div>
    </div>
  );
};
