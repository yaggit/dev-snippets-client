import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();

  // Helper function to get the current page title from the URL
  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/yourSnippets') return 'Your Snippets';
    if (location.pathname === '/addSnippet') return 'Add Snippet';
    return 'Dev Snippets';
  };

  const { logout } = useAuth()

  return (
    <div className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="px-6 py-4 flex items-center justify-between w-full max-w-full">
        {/* Title and Navigation */}
        <h1 className="text-2xl font-bold">
        Dev<span className="font-mono italic font-normal">snippets</span> | <span className="font-normal">{getPageTitle()}</span>
        </h1>


        {/* Right-aligned Buttons */}
        <div className="ml-auto flex space-x-4">
          <Link to="/dashboard" className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-200">
            Dashboard
          </Link>
          <Link to="/yourSnippets" className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-200">
            My Snippets
          </Link>
          <Link to="/addSnippet" className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-200">
            Add Snippet
          </Link>
          <button onClick={ logout } className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
