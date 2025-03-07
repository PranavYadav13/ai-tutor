import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Brain,
  FileText,
  ClipboardList,
  Trophy,
  Info,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Component imports
import AITutor from '../components/AITutor';
import ShortNotes from '../components/ShortNotes';
import Tests from '../components/Tests';
import Leaderboard from '../components/Leaderboard';
import About from '../components/About';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'AI Tutor', icon: Brain, path: '/ai-tutor' },
    { name: 'Short Notes', icon: FileText, path: '/notes' },
    { name: 'Tests', icon: ClipboardList, path: '/tests' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'About', icon: Info, path: '/about' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">AI Tutor</h1>
        </div>
        <nav className="flex-1 px-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg mb-2"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-blue-600">AI Tutor</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 px-6 py-4 text-gray-700 hover:bg-blue-50"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={() => signOut()}
              className="w-full flex items-center space-x-3 px-6 py-4 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0">
        <Routes>
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/notes" element={<ShortNotes />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AITutor />} />
        </Routes>
      </main>
    </div>
  );
}
