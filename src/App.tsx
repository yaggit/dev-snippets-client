// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SnippetDetail from './pages/SnippetDetail';
import YourSnippets from './pages/YourSnippets';
import AddSnippet from './pages/AddSnippet';
import Navbar from './pages/Navbar';

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute element={<><Navbar/><Dashboard /></>} />} />
          <Route path="/snippet/:id" element={<ProtectedRoute element={<><Navbar/><SnippetDetail /></>} />} />
          <Route path="/yourSnippets" element={<ProtectedRoute element={<><Navbar/><YourSnippets /></>} />} />
          <Route path="/addSnippet" element={<ProtectedRoute element={<><Navbar/><AddSnippet /></>} />} />

          {/* Redirect if no match */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
