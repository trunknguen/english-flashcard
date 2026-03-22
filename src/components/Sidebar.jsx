import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiX, FiHome, FiFolder, FiTrendingUp, FiSettings, FiChevronDown } from 'react-icons/fi';
import { RiEnglishInput } from "react-icons/ri";

const Sidebar = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none">
      <div 
        className={`absolute inset-0 bg-black/40 transition-opacity pointer-events-auto ${
          isClosing ? 'animate-fade-out' : 'animate-fade-in'
        }`}
        onClick={handleClose}
      />
      <div 
        className={`relative w-[280px] max-w-[85vw] h-full bg-[#fcfcfc] dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col pointer-events-auto ${
          isClosing ? 'animate-slide-out' : 'animate-slide-in'
        }`}
      >
        {/* Header Sidebar */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 flex items-center gap-3 z-10">
          <button 
            onClick={handleClose} 
            className="p-2 -ml-2 text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all focus:outline-none"
          >
            <FiX className="w-5 h-5" />
          </button>
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 flex items-center gap-2.5 tracking-tight cursor-pointer">
            EngFlash
          </h2>
        </div>
        
        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto mt-[76px] py-2 px-3 flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
            Học tập
          </div>
          
          <NavLink 
            to="/" 
            onClick={handleClose}
            className={({isActive}) => `w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
              isActive ? 'bg-[#3182ce]/10 text-[#3182ce] dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <FiHome className="text-xl w-6 text-center" />
            <span className="flex-1 text-left">Trang chủ / Lộ trình</span>
          </NavLink>

          <NavLink 
            to="/manage" 
            onClick={handleClose}
            className={({isActive}) => `w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
              isActive ? 'bg-[#3182ce]/10 text-[#3182ce] dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <FiFolder className="text-xl w-6 text-center" />
            <span className="flex-1 text-left">Bộ thẻ (Folders & Tags)</span>
          </NavLink>

          <NavLink 
            to="/study/demo" 
            onClick={handleClose}
            className={({isActive}) => `w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
              isActive ? 'bg-[#3182ce]/10 text-[#3182ce] dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <RiEnglishInput className="text-xl w-6 text-center" />
            <span className="flex-1 text-left">Ôn tập (SRS)</span>
          </NavLink>

          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">
            Cá nhân
          </div>

          <button 
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all text-sm sm:text-base text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <FiTrendingUp className="text-xl w-6 text-center" />
            <span className="flex-1 text-left">Thống kê</span>
          </button>
          
          <button 
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all text-sm sm:text-base text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <FiSettings className="text-xl w-6 text-center" />
            <span className="flex-1 text-left">Cài đặt AI & Audio</span>
          </button>

        </div>
        
        {/* Footer Sidebar */}
        <div className="p-4 text-xs font-semibold text-gray-400 dark:text-gray-600 flex flex-col items-center justify-center gap-1 border-t border-gray-100 dark:border-gray-800">
          <span className="text-sm">🇬🇧 Master English Flashcards</span>
          <span className="opacity-70">Powered by AI Analysis</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
