import React, { useState } from 'react';
import { FiVolume2, FiImage, FiSkipForward, FiCheck, FiX } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';

const mockCard = {
  word: 'Abandon',
  ipa: '/əˈbæn.dən/',
  type: 'verb',
  meaning: 'Từ bỏ, bỏ rơi',
  examples: [
    'They had to abandon the sinking ship.',
    'He abandoned his plans to go abroad.'
  ],
  image: 'https://images.unsplash.com/photo-1518481546747-d5cb52ccfa8d?q=80&w=600&auto=format&fit=crop'
};

const StudySession = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-4 sm:pt-10 animate-fade-in">
      <div className="w-full max-w-lg mb-6 flex justify-between items-center text-gray-500 dark:text-gray-400 font-bold px-2">
        <span>Thẻ: 12 / 45</span>
        <span className="flex items-center gap-1"><FaBrain className="text-blue-500" /> Hệ thống SRS đang kích hoạt</span>
      </div>

      {/* 3D Flip Card */}
      <div className="perspective w-full max-w-lg h-[450px] sm:h-[500px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`w-full h-full relative preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center p-8">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 bg-gray-100 dark:bg-gray-900 px-4 py-1.5 rounded-full">
              Chạm để lật
            </span>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4 text-center">
              {mockCard.word}
            </h2>
            <button 
              className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors focus:outline-none"
              onClick={(e) => { e.stopPropagation(); /* play TTS */ }}
            >
              <FiVolume2 className="w-8 h-8" />
            </button>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col pt-8 pb-6 px-6 sm:px-8 overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-start w-full border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
              <div>
                <h2 className="text-3xl font-black text-blue-600 dark:text-blue-400">{mockCard.word}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-gray-500 dark:text-gray-400 font-medium font-mono bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded text-sm">{mockCard.ipa}</span>
                  <span className="text-xs font-bold uppercase text-purple-600 bg-purple-100 dark:bg-purple-900/40 px-2 py-0.5 rounded">{mockCard.type}</span>
                </div>
              </div>
              <button 
                className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-full hover:bg-blue-100 mt-1"
                onClick={(e) => { e.stopPropagation(); /* play TTS */ }}
              >
                <FiVolume2 className="w-6 h-6" />
              </button>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex-1">
              {mockCard.meaning}
            </h3>

            <div className="flex flex-col gap-3 flex-1">
              {mockCard.examples.map((ex, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 border-l-4 border-emerald-400">
                  {ex}
                </div>
              ))}
            </div>

            <div className="w-full h-32 rounded-xl mt-4 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
               <img src={mockCard.image} alt="visual aid" className="w-full h-full object-cover" />
               <div className="absolute top-2 right-2 bg-black/50 text-white rounded p-1.5 backdrop-blur-sm">
                 <FiImage className="w-4 h-4" />
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Action Buttons (SRS) */}
      <div className={`flex w-full max-w-lg mt-8 gap-3 sm:gap-4 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-2xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors active:scale-95 shadow-sm">
          <FiX className="w-6 h-6 sm:w-8 sm:h-8 mb-1" />
          <span className="text-xs sm:text-sm uppercase tracking-wider">Lại tí (1m)</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-2xl hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors active:scale-95 shadow-sm">
          <FiSkipForward className="w-6 h-6 sm:w-8 sm:h-8 mb-1" />
          <span className="text-xs sm:text-sm uppercase tracking-wider">Khó (10m)</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold rounded-2xl hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors active:scale-95 shadow-sm">
          <FiCheck className="w-6 h-6 sm:w-8 sm:h-8 mb-1" />
          <span className="text-xs sm:text-sm uppercase tracking-wider">Tốt (1d)</span>
        </button>
      </div>

    </div>
  );
};

export default StudySession;
