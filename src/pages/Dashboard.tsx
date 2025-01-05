// src/pages/Dashboard.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { snippetService } from "../services/snippetService";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await snippetService.getSnippets();
        setSnippets(response.data);
      } catch (error) {
        console.error("Error fetching snippets", error);
      }
    };

    fetchSnippets();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippets]);

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSnippetClick = (id: number) => {
    navigate(`/snippet/${id}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20 flex flex-col justify-center items-center">
      {/* Snippets Grid */}
      <div className="w-full flex flex-col items-center space-y-6 px-6">
        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition duration-200"
                onClick={() => handleSnippetClick(snippet.id)}
              >
                <h3 className="text-xl font-semibold mb-2">{snippet.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{snippet.language}</p>
                <div className="text-sm mb-4">
                  {/* Code preview with Prism.js syntax highlighting */}
                  <pre className="language-js">
                    <code>{snippet.code.slice(0, 100)}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-2xl text-gray-300 font-semibold">
              Looks like you're the first dev here!
            </p>
            <p className="text-gray-400 text-sm">
              You can add your first snippet below. Let's get started!
            </p>
            <Button 
              onClick={() => navigate("/addSnippet")}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Add Snippet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
