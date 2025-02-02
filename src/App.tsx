import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SnippetDetail = React.lazy(() => import('./pages/SnippetDetail'));
const YourSnippets = React.lazy(() => import('./pages/YourSnippets'));
const AddSnippet = React.lazy(() => import('./pages/AddSnippet'));
const Navbar = React.lazy(() => import('./pages/Navbar'));

const App = () => (
  <Router>
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippet/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <SnippetDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yourSnippets"
            element={
              <ProtectedRoute>
                <Navbar />
                <YourSnippets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addSnippet"
            element={
              <ProtectedRoute>
                <Navbar />
                <AddSnippet />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  </Router>
);

export default App;
