import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();

  // Helper function to get the current page title from the URL
  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/yourSnippets') return 'Your Snippets';
    if (location.pathname === '/addSnippet') return 'Add Snippet';
    return 'Dev Snippets';
  };

  const navigate = useNavigate();

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
          <Button 
            onClick={ ()=> navigate('/dashboard') }
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Dashboard
          </Button>
          <Button 
            onClick={ ()=> navigate('/yourSnippets') }
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Your Snippets
          </Button>
          <Button 
            onClick={ ()=> navigate('/addSnippet') }
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Add Snippet
          </Button>
          <Button 
            onClick={ logout }
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
