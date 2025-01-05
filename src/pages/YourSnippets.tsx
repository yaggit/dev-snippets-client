import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { snippetService } from "../services/snippetService";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

const YourSnippets: React.FC = () => {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<any>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [updatedLanguage, setUpdatedLanguage] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await snippetService.getSnippetByUser();
        setSnippets(response.data);
      } catch (error) {
        console.error("Error fetching snippets", error);
      }
    };

    fetchSnippets();
  }, []);

  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "Go",
    "Ruby",
    "PHP",
  ];

  const handleEdit = (snippet: any) => {
    setEditingSnippet(snippet);
    setUpdatedTitle(snippet.title);
    setUpdatedCode(snippet.code);
    setUpdatedLanguage(snippet.language);
    setUpdatedDescription(snippet.description); 
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (
      !updatedTitle ||
      !updatedCode ||
      !updatedLanguage ||
      !updatedDescription
    ) {
      console.log("All fields must be filled.");
      return;
    }

    try {
      await snippetService.updateSnippet(
        editingSnippet.id,
        updatedTitle,
        updatedDescription,
        updatedCode,
        updatedLanguage
      );
      setSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet.id === editingSnippet.id
            ? {
                ...snippet,
                title: updatedTitle,
                code: updatedCode,
                language: updatedLanguage,
                description: updatedDescription,
              }
            : snippet
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await snippetService.deleteSnippet(id);
      setSnippets(snippets.filter((snippet) => snippet.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const handleOpenDeleteModal = (snippet: any) => {
    setEditingSnippet(snippet);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
    {/* Snippets Grid */}
    <div className="flex flex-col items-center space-y-6 mb-8">
      {snippets.length === 0 && (
        <div className="text-center text-white space-y-4">
          <h2 className="text-2xl text-gray-300 font-semibold">
            No snippets found!
          </h2>
          <p className="text-gray-400 text-sm">
            Looks like you haven't added any snippets yet. Add your first one below!
          </p>
          <Button 
            onClick={() => navigate("/addSnippet")}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Add Snippet
          </Button>
        </div>
      )}

        {/* Display Snippets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-gray-800 rounded-xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition duration-200 relative"
              onClick={() => navigate(`/snippet/${snippet.id}`)}
            >
              <h3 className="text-xl font-semibold mb-2">{snippet.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{snippet.language}</p>
              <div className="text-sm mb-4">
                <pre className="language-js">
                  <code>{snippet.code.slice(0, 100)}</code>
                </pre>
              </div>

              {/* Edit and Delete buttons */}
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(snippet);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDeleteModal(snippet);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Snippet Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl overflow-hidden max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">
                Edit Snippet
              </h2>
            </div>

            {/* Scrollable content section */}
            <div className="flex-grow overflow-y-auto mb-4 custom-scrollbar">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="w-full p-3 border border-gray-700 rounded-md text-white bg-gray-700"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-700 rounded-md text-white bg-gray-700"
                  placeholder="Provide a brief description of your snippet"
                />
              </div>

              {/* Language */}
              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-white"
                >
                  Language
                </label>
                <select
                  id="language"
                  value={updatedLanguage}
                  onChange={(e) => setUpdatedLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-700 rounded-md text-white bg-gray-700"
                >
                  <option value="" disabled>
                    Select a language
                  </option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Code Editor */}
              <div className="mb-4">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-white"
                >
                  Code
                </label>
                <MonacoEditor
                  height="300px"
                  language={updatedLanguage || "javascript"}
                  value={updatedCode}
                  onChange={(value) => setUpdatedCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                  }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Snippet Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Delete Snippet
            </h2>
            <p className="text-white mb-4">
              Are you sure you want to delete this snippet?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(editingSnippet.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourSnippets;
