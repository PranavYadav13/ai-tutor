import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Award, Brain } from "lucide-react";

const features = [
  {
    title: "AI Tutor",
    description: "Your personal AI-powered tutor to guide you through learning with interactive assistance and insights.",
    icon: <Brain className="w-12 h-12 text-[#5BAE7C]" />, 
  },
  {
    title: "Short Notes",
    description: "Generate concise summaries from PDFs and images with AI-powered text extraction and summarization.",
    icon: <FileText className="w-12 h-12 text-[#6EA8D7]" />, 
  },
  {
    title: "Tests",
    description: "Challenge yourself with custom quizzes and tests designed to reinforce your knowledge.",
    icon: <BookOpen className="w-12 h-12 text-yellow-400" />, 
  },
  {
    title: "Leaderboard",
    description: "Compete with others and track your progress with our dynamic leaderboard system.",
    icon: <Award className="w-12 h-12 text-red-400" />, 
  },
];

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#6EA8D7] to-[#5BAE7C] overflow-hidden p-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 flex flex-wrap overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-32 h-32 rounded-full bg-white opacity-10"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8 + Math.random() * 5, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative bg-white p-10 rounded-lg shadow-lg border border-gray-300 w-full max-w-4xl z-10 text-center">
        <h2 className="text-4xl font-bold text-[#5BAE7C] flex items-center justify-center gap-2">🌱 About This Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4 border border-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              {feature.icon}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
