import React from 'react'

export const Footer = () => {
  return (
    <>
    <div className="mt-44">

  <div className="bg-gray-100 py-3 flex justify-center gap-8 text-sm font-medium text-gray-700">
    <span>🚚 Free Shipping</span>
    <span>🔄 Easy Returns</span>
    <span>⭐ 4.9/5 Rated by 10K+ Customers</span>
  </div>

  <footer className="bg-black text-white py-10">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="md:col-span-1 col-span-3 space-y-2">
        <h1 className="text-2xl font-bold">
          Tune<span className="text-blue-500">Flow</span>
        </h1>
        <p className="text-gray-400 text-sm">
          We are a modern e-commerce platform providing the best products online.
        </p>
      </div>

      <div className="md:col-span-1 col-span-3 space-y-2">
        <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
        <ul className="text-gray-400 text-sm space-y-1">
          <li><a href="/" className="hover:text-blue-500 transition-colors">Home</a></li>
          <li><a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
        </ul>
      </div>

      <div className="md:col-span-1 col-span-3 space-y-2">
        <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-400 text-sm">Email: tuneflow@example.com</p>
        <p className="text-gray-400 text-sm">Phone: +91 123-456-7890</p>
        <div className="flex gap-3 mt-2">
          <a href="#" className="hover:text-blue-500 transition-colors">Facebook</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
        </div>
      </div>



    </div>

    <div className="text-center text-gray-500 text-sm mt-8 col-span-3">
      © 2025 TuneFlow, Inc. All rights reserved
    </div>
  </footer>
</div>


    </>
  )
}
