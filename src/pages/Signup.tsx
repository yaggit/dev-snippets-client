// src/pages/Signup.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authService.signup(username, email, password);

      const { token } = response.token;
      login(token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl p-40 font-bold">
        Dev<span className="font-mono italic font-normal">snippets</span>
        </h1>
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-lg font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-indigo-400 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
