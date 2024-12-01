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
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      {/* Top Navigation */}

      {/* Snippet Details */}
      <div className="p-6 space-y-6">
        {snippet && (
          <>
            <h2 className="text-3xl font-bold">{snippet.title}</h2>
            <p className="text-sm text-gray-400">Language: {snippet.language}</p>
            <p className="text-sm text-gray-400 mb-4">Description: {snippet.description}</p>
            <div>
              <h3 className="text-xl font-semibold mb-4">Code:</h3>
              {/* Code block with Prism.js syntax highlighting */}
              <pre className={`language-${snippet.language}`}>
                <code>{snippet.code}</code>
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SnippetDetail;
