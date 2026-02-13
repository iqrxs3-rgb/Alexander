import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500">Home</Link>
            <Link to="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500">Dashboard</Link>
            <Link to="/analytics" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500">Analytics</Link>
            <Link to="/bots" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500">Bots</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-gray-800 dark:text-gray-200 focus:outline-none">
              {open ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-2 pt-2 pb-3 space-y-1 shadow-lg">
          <Link to="/" className="block text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
          <Link to="/dashboard" className="block text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
          <Link to="/analytics" className="block text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Analytics</Link>
          <Link to="/bots" className="block text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Bots</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;