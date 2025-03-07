import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Mic, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AITutor() {
  const [subject, setSubject] = useState("mathematics");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // Speech-to-Text (STT)
  const startListening = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event: any) => {
      if (event.results.length > 0) {
        setQuestion(event.results[0][0].transcript);
      }
    };
    recognition.onerror = () => alert("Error in voice recognition.");
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // Text-to-Speech (TTS)
  const speakResponse = () => {
    if (!response) return;
    if (!window.speechSynthesis) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(response);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  // AI Analysis
  const analyzeQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBzp-T3GQeRUCcBf18RvwuuIKUk0WVg_pQ");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `You are an AI Tutor specializing in ${subject}, also fluent in many native languages. Provide a step-by-step solution, real-world applications, and concept explanations for the following question: "${question}", translate it to the requested language and by default language is English only (nothing else until specified), in 150 - 160 words(per language).`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
      setResponse(text);
    } catch (error) {
      setResponse("I couldn't generate a response at the moment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#6EA8D7] to-[#5BAE7C] overflow-hidden p-10">
      {/* Animated Background */}
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
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">🤖 AI Tutor</h2>

        {/* Subject Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Select Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full md:w-64 rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-[#5BAE7C]"
          >
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>

        {/* Response Display Box */}
        <div className="bg-[#FDFBF6] rounded-xl p-6 h-96 mb-6 overflow-y-auto border border-gray-300 shadow-sm flex flex-col justify-between">
          {loading ? (
            <p className="text-gray-500 text-lg">Analyzing...</p>
          ) : (
            <p className="text-gray-500 text-lg whitespace-pre-wrap">
              {response || "Start a conversation with your AI tutor! ✨"}
            </p>
          )}
          {response && (
            <button
              onClick={speakResponse}
              className="mt-3 self-end bg-[#5BAE7C] text-white rounded-full p-3 shadow-lg hover:bg-green-500 transition flex items-center"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Input Box */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 rounded-xl border-2 border-gray-300 px-5 py-3 text-lg shadow-sm focus:ring-2 focus:ring-[#5BAE7C]"
          />
          {/* Speech-to-Text Button */}
          <button
            onClick={startListening}
            className={`rounded-full p-3 shadow-lg transition flex items-center ${
              listening ? "bg-red-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            <Mic className="w-6 h-6" />
          </button>
          {/* Send Button */}
          <button
            onClick={analyzeQuestion}
            className="bg-[#F5C04C] text-black rounded-xl px-6 py-3 font-semibold text-lg shadow-lg hover:bg-yellow-400 transition flex items-center gap-2"
            disabled={loading}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
