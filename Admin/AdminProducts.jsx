import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export const ProductManager = () => {
  const [product,setProduct]=useState([])
  const [newProduct,setNewProduct]=useState({id:'',name:'',category:'',oldPrice:'',price:'',rating:'',ratings:'',stock:'',image:'',description:'',tag:''})

  const fetchingData=async()=>{
    const res=await axios.get('http://localhost:3000/products')
    setProduct(res.data)

  }

  useEffect(()=>{
    fetchingData()
  },[])

  const addProduct=async()=>{
    await axios.post('http://localhost:3000/products',newProduct)
    setNewProduct({id:'',name:'',category:'',oldPrice:'',price:'',rating:'',ratings:'',stock:'',image:'',description:'',tag:''})

  }

  const deleteProduct= async(id)=>{
    await axios.delete(`http://localhost:3000/products/${id}`)
    fetchingData()
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        
          <div className="flex-1 p-6 bg-gray-100 overflow-auto ml-56">
          <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
           <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-3">Add New Product</h2>
            <div>
           {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded shadow"> */}
        <form
  onSubmit={(e) => {
    e.preventDefault(); 
     if (
      !newProduct.id ||
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.image 
      
    ) {
      toast.error("⚠️ Please fill in all required fields before adding the product.");
      return;
    }
    addProduct();
  }}
  className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded shadow"
>
  <input
    type="number"
    placeholder="Product id"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.id}
    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
    required
  />

  <input
    type="text"
    placeholder="Name"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.name}
    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
    required
  />

  <input
    type="text"
    placeholder="Brand"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.category}
    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
    required
  />

  <input
    type="number"
    placeholder="Old Price"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.oldPrice}
    onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
    required
  />

  <input
    type="number"
    placeholder="Price"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.price}
    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
    required
  />

  <input
    type="number"
    placeholder="Rating"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.rating}
    onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
    
  />

  <input
    type="number"
    placeholder="No. of Ratings"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.ratings}
    onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })}
    
  />

  <input
    type="number"
    placeholder="Stock"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.stock}
    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
    required
  />

  <input
    type="text"
    placeholder="Image URL"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.image}
    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
    required
  />

  <input
    type="text"
    placeholder="Description"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.description}
    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
  />

  <input
    type="text"
    placeholder="Tag"
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={newProduct.tag}
    onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })}
  />

  <button
    type='submit'
    className="col-span-1 md:col-span-3 lg:col-span-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
  >
    Add Product
  </button>
  </form>
</div>

          </div>
        <div className="bg-white p-4 rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.map((prod) => (
                  <tr key={prod.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{prod.id}</td>
                    <td className="p-3"><img src={prod.image}  className="w-24 h-24 object-fill rounded-md"/></td>
                    <td className="p-3">{prod.name}</td>
                    <td className="p-3">₹{prod.price}</td>
                    <td className="p-3">{prod.category}</td>
                    <td className="p-3">{prod.stock}</td>
                    <Link to={`/admin/products/${prod.id}/edit`} className="bg-blue-500  text-white px-3 py-1 my-4 rounded inline-block">Edit
                    </Link>                    
                    <button onClick={()=>deleteProduct(prod.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    <td className="p-3 space-x-2">
                      </td>
                      </tr>
                      ))}
                      </tbody>
                      </table>
        </div>

        </div>
      </div>
    </div>
  );
};
