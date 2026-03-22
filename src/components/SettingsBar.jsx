import React from 'react';
import { FiMenu, FiMoon, FiSun, FiVolume2, FiVolumeX } from 'react-icons/fi';

const SettingsBar = ({ 
  isDark, 
  toggleTheme, 
  onMenuClick, 
  isSoundEnabled = true, 
  toggleSound = () => {},
  user = null
}) => {
  return (
    <div className="absolute top-4 sm:top-6 right-2 sm:right-6 flex gap-2 sm:gap-3 z-50 items-center">
      
      {/* Menu Hamburger for Mobile */}
      <button 
        onClick={onMenuClick} 
        className="md:hidden p-2.5 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full shadow-sm transition-all focus:outline-none hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-600"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* User Status / Login Button */}
      {user ? (
        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-600">
          <span className="text-xs sm:text-sm font-bold text-[#3182ce] dark:text-blue-400">Hi {user.displayName || 'Learner'}</span>
        </div>
      ) : (
        <button className="hidden sm:flex items-center text-xs font-bold bg-[#3182ce] text-white px-3 py-1.5 rounded-full shadow-sm hover:bg-blue-600 transition-colors">
          Đăng nhập
        </button>
      )}

      {/* Text-to-Speech Toggle */}
      <button 
        onClick={toggleSound} 
        className={`p-2.5 rounded-full shadow-sm transition-all focus:outline-none ${
          isSoundEnabled 
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 border border-transparent' 
            : 'bg-white text-gray-400 dark:bg-gray-800 dark:text-gray-500 border border-gray-200 dark:border-gray-600'
        } hover:scale-105 active:scale-95`}
        title="Tự động phát âm (TTS)"
      >
        {isSoundEnabled ? <FiVolume2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <FiVolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme} 
        className="p-2.5 bg-white text-gray-700 dark:bg-gray-800 dark:text-yellow-400 border border-gray-200 dark:border-gray-600 rounded-full shadow-sm transition-all focus:outline-none hover:scale-105 active:scale-95"
      >
        {isDark ? <FiMoon className="w-5 h-5 sm:w-6 sm:h-6" /> : <FiSun className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
    </div>
  );
};

export default SettingsBar;
