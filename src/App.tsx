import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SnippetDetail = React.lazy(() => import('./pages/SnippetDetail'));
const YourSnippets = React.lazy(() => import('./pages/YourSnippets'));
const AddSnippet = React.lazy(() => import('./pages/AddSnippet'));
const Navbar = React.lazy(() => import('./pages/Navbar'));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Navbar />
                      <Dashboard />
                    </>
                  }
                />
              }
            />
            <Route
              path="/snippet/:id"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Navbar />
                      <SnippetDetail />
                    </>
                  }
                />
              }
            />
            <Route
              path="/yourSnippets"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Navbar />
                      <YourSnippets />
                    </>
                  }
                />
              }
            />
            <Route
              path="/addSnippet"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Navbar />
                      <AddSnippet />
                    </>
                  }
                />
              }
            />

            {/* Redirect if no match */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;