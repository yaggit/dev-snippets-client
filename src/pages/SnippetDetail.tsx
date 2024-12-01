// src/pages/SnippetDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { snippetService } from '../services/snippetService';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const SnippetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        const response = await snippetService.getSnippetById(Number(id));
        setSnippet(response.data);
        Prism.highlightAll();
      } catch (error) {
        setError('Error fetching snippet details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSnippet();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
          <div className="mt-4">
            <div className="animate-spin h-12 w-12 border-t-4 border-indigo-600 rounded-full border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">Something went wrong!</h2>
          <p className="text-lg text-gray-400">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      {/* Snippet Detail Card */}
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-xl space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{snippet.title}</h2>
          <p className="text-sm text-gray-400">Language: <span className="text-indigo-500">{snippet.language}</span></p>
          <p className="text-sm text-gray-400 mb-4">Description: {snippet.description}</p>
        </div>

        {/* Code Block */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Code:</h3>
          <pre className={`language-${snippet.language} p-6 bg-gray-900 rounded-lg`}>
            <code>{snippet.code}</code>
          </pre>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetail;
