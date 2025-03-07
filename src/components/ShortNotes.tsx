import React, { useState, useEffect } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface Note {
  id: number;
  text: string;
}

export default function ShortNotes() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("shortNotes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("shortNotes", JSON.stringify(notes));
  }, [notes]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const extractTextFromImage = async (file: File) => {
    const { data } = await Tesseract.recognize(file, "eng");
    return data.text;
  };

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(reader.result as ArrayBuffer) }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(" ") + " ";
          }
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");
    setLoading(true);
    try {
      const extractedText = selectedFile.type.includes("image")
        ? await extractTextFromImage(selectedFile)
        : await extractTextFromPDF(selectedFile);

      const genAI = new GoogleGenerativeAI("AIzaSyAWNsfdKP2KEAT3_W9dBtM2WFr5GwOKl5Y");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: `Summarize: ${extractedText}` }] }],
      });
      
      const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
      setNotes((prev) => [{ id: Date.now(), text }, ...prev]);
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 p-10 overflow-hidden">
      {/* Animated Background */}
<div className="absolute inset-0 z-0">
  {[...Array(10)].map((_, index) => {
    const randomX = Math.random() * 100; // Random percentage for X position
    const randomY = Math.random() * 100; // Random percentage for Y position
    return (
      <motion.div
        key={index}
        className="absolute w-40 h-40 rounded-full opacity-40"
        style={{
          backgroundColor: index % 2 === 0 ? "#00FF7F" : "#FF4500",
          top: `${randomY}%`,
          left: `${randomX}%`,
        }}
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  })}
</div>
  

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl border border-gray-300 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6">📖 Short Notes Generator</h2>
        <motion.div whileHover={{ scale: 1.05 }} className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-50">
          <label>
            <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
            <div className="flex flex-col items-center">
              <UploadCloud className="w-12 h-12 text-gray-600" />
              <p className="text-gray-700 mt-2">{selectedFile ? selectedFile.name : "Upload an Image"}</p>
            </div>
          </label>
        </motion.div>
        <button 
          onClick={handleUpload} 
          className={`mt-6 w-full py-3 rounded-lg text-white font-semibold ${loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`} 
          disabled={loading}
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Generate Notes"}
        </button>
        <div className="mt-6 bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto">
          <h3 className="text-lg font-bold mb-2">📜 Generated Notes</h3>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes yet. Upload a file to get started!</p>
          ) : (
            <ul className="space-y-3">
              {notes.map((note) => (
                <li key={note.id} className="p-3 bg-white shadow rounded-lg flex items-start">
                  <FileText className="w-5 h-5 text-gray-600 mr-2" />
                  <p>{note.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}