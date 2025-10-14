import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white fixed top-0 left-0 flex flex-col h-screen shadow-md">
      <Link to="/admin" className="py-4 text-center text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </Link>

      <nav className="flex flex-col p-4 space-y-3">
        <Link to="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
          <FaBox /> Products
        </Link>
        <Link to="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
          <FaUsers /> Users
        </Link>
        <Link to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
          <FaShoppingCart /> Orders
        </Link>
      </nav>
    </div>
  );
};
