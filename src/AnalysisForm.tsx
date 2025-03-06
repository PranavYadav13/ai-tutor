import React, { useState } from "react";

interface AnalysisFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, loading }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your question..."
        className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Get Answer"}
      </button>
    </form>
  );
};
