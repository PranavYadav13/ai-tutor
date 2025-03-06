import React, { useState } from "react";
import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 980, subject: "Physics" },
    { rank: 2, name: "Sarah Chen", score: 945, subject: "Mathematics" },
    { rank: 3, name: "Michael Brown", score: 920, subject: "Chemistry" },
    { rank: 4, name: "Emma Wilson", score: 890, subject: "Physics" },
    { rank: 5, name: "James Lee", score: 875, subject: "Mathematics" },
    { rank: 6, name: "Liam Smith", score: 860, subject: "Chemistry" },
    { rank: 7, name: "Sophia Patel", score: 840, subject: "Physics" },
    { rank: 8, name: "Daniel Garcia", score: 820, subject: "Mathematics" },
    { rank: 9, name: "Olivia Martinez", score: 810, subject: "Chemistry" },
  ];

  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const filteredLeaderboard = selectedSubject === "All Subjects" ? leaderboardData : leaderboardData.filter((student) => student.subject === selectedSubject);
  const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => b.score - a.score);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#6EA8D7] to-[#5BAE7C] overflow-hidden p-10">
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-extrabold text-gray-900">
              {selectedSubject === "All Subjects" ? "Overall Leaderboard" : `${selectedSubject} Leaderboard`}
            </h2>
          </div>
          <select
            className="border-2 border-gray-300 rounded-xl px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-[#5BAE7C]"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All Subjects">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
        </div>

        <div className="bg-[#FDFBF6] rounded-xl p-6 h-96 mb-6 overflow-y-auto border border-gray-300 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedLeaderboard.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index < 3 ? (
                        <Medal className={`w-5 h-5 mr-2 ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-orange-500"}`} />
                      ) : (
                        <span className="w-5 h-5 mr-2">{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedLeaderboard.length === 0 && <p className="text-center text-gray-500 mt-4">No records found.</p>}
        </div>
      </div>
    </div>
  );
}

