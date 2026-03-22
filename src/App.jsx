import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SettingsBar from './components/SettingsBar';
import Dashboard from './pages/Dashboard';
import FlashcardManager from './pages/FlashcardManager';
import StudySession from './pages/StudySession';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
        <SettingsBar 
          isDark={isDark} 
          toggleTheme={() => setIsDark(!isDark)} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <main className="pt-20 px-4 pb-8 sm:px-6 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage" element={<FlashcardManager />} />
            <Route path="/study/:deckId" element={<StudySession />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
