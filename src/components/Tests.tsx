import React from "react";
import { Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Tests() {
  const tests = [
    {
      subject: "Mathematics",
      title: "Calculus Fundamentals",
      duration: "45 mins",
      questions: 30,
      difficulty: "Intermediate",
    },
    {
      subject: "Physics",
      title: "Classical Mechanics",
      duration: "60 mins",
      questions: 40,
      difficulty: "Advanced",
    },
    {
      subject: "Chemistry",
      title: "Organic Chemistry Basics",
      duration: "30 mins",
      questions: 25,
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#6EA8D7] to-[#5BAE7C] overflow-hidden p-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-40 h-40 rounded-full opacity-40"
            style={{ backgroundColor: index % 2 === 0 ? "#F5C04C" : "#C9A0DC" }}
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{ y: ["0vh", "100vh"], rotate: [0, 360] }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl z-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">📚 Available Tests</h2>
        
        <div className="grid gap-6">
          {tests.map((test, index) => (
            <motion.div 
              key={index} 
              className="bg-[#FDFBF6] rounded-xl p-6 border border-gray-300 shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-medium text-[#5BAE7C]">{test.subject}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{test.title}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${test.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    test.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"}`}
                >
                  {test.difficulty}
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#6EA8D7]" />
                  <span>{test.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#6EA8D7]" />
                  <span>{test.questions} questions</span>
                </div>
              </div>
              
              <button className="w-full bg-[#F5C04C] text-black rounded-xl px-6 py-3 font-semibold text-lg shadow-lg hover:bg-yellow-400 transition">
                Start Test
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}