import React from "react";

interface AnalysisResultProps {
  analysis: string;
  loading: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, loading }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      {loading ? (
        <p className="text-gray-500">Generating response...</p>
      ) : (
        <p className="text-gray-800 whitespace-pre-line">{analysis || "No response yet."}</p>
      )}
    </div>
  );
};