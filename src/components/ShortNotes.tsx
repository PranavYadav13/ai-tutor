import React, { useState, useEffect } from "react";
import { UploadCloud, BookOpen, Pencil } from "lucide-react";
import { motion } from "framer-motion";

interface Note {
  id: number;
  text: string;
}

export default function ShortNotes() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notesHistory, setNotesHistory] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("shortNotes");
    if (savedNotes) {
      setNotesHistory(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (notesHistory.length > 0) {
      localStorage.setItem("shortNotes", JSON.stringify(notesHistory));
    }
  }, [notesHistory]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const fakeExtractedText = `Extracted text from "${selectedFile.name}": This is a simulated short note.`;
      setNotesHistory((prevNotes) => [{ id: Date.now(), text: fakeExtractedText }, ...prevNotes]);
      setLoading(false);
    }, 2000);
  };

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
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">📖 Short Notes Generator</h2>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="border-dashed border-4 border-gray-500 p-8 rounded-xl text-center bg-white shadow-lg hover:bg-gray-100 transition"
        >
          <label className="cursor-pointer">
            <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
            <div className="flex flex-col items-center">
              <UploadCloud className="w-14 h-14 text-gray-700 mb-3 animate-pulse" />
              <p className="text-gray-900 font-medium text-lg">
                {selectedFile ? selectedFile.name : "Click to upload a PDF or image"}
              </p>
            </div>
          </label>
        </motion.div>

        <button
          onClick={handleUpload}
          className="mt-8 px-8 py-4 bg-[#F5C04C] text-black text-xl font-semibold rounded-lg hover:bg-yellow-400 transition shadow-lg flex items-center justify-center gap-3"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <span>Processing</span>
              <motion.div className="relative w-8 h-8 flex items-center">
                <motion.div
                  className="absolute inset-0 w-8 h-8"
                  animate={{ rotateY: [0, 180, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >📖</motion.div>
              </motion.div>
            </div>
          ) : (
            <>
              <Pencil className="w-6 h-6 text-black" /> Generate Notes
            </>
          )}
        </button>

        <div className="mt-8 bg-[#FDFBF6] p-6 rounded-lg shadow-lg max-h-96 overflow-y-auto border border-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📜 Generated Short Notes</h3>
          {notesHistory.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">No notes generated yet. Try uploading a file! ✨</p>
          ) : (
            <ul className="space-y-4">
              {notesHistory.map((note) => (
                <li
                  key={note.id}
                  className="p-5 bg-gray-200 shadow-md rounded-lg text-gray-900 font-medium flex items-center gap-3 hover:bg-gray-300 transition"
                >
                  <motion.div 
                    className="pointer-events-none"
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BookOpen className="w-7 h-7 text-gray-700" />
                  </motion.div>
                  {note.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
