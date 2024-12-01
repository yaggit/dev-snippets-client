import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { snippetService } from '../services/snippetService';
import MonacoEditor from '@monaco-editor/react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AddSnippet: React.FC = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'HTML', 'CSS', 'Go', 'Ruby', 'PHP'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!title || !code || !language) {
        setError('Please fill all fields');
        return;
      }
      const response = await snippetService.createSnippet(title, code, language);
      if (response.status === 201) {
        toast.success('Snippet created successfully'); 
        navigate('/yourSnippets');
      }
    } catch (error) {
      setError('Error creating snippet');
      toast.error((error as any).message || 'Something went wrong'); 
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      {/* Top Navigation */}

      <div className="flex flex-col items-center p-6">
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-1/2">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-300">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>Select a language</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-300">Code</label>
            <MonacoEditor
              height="300px"
              language={language.toLowerCase() || 'javascript'}
              value={code}
              onChange={(newValue) => setCode(newValue || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
              }}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add Snippet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSnippet;
