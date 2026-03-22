import React, { useState, useRef } from 'react';
import { FiUpload, FiFolderPlus, FiCpu, FiMoreVertical, FiCheckCircle } from 'react-icons/fi';
import { FaFileExcel, FaFileCsv, FaSpinner } from 'react-icons/fa';
import { analyzeCSVData, fetchWordData } from '../utils/aiHelpers';

const DeckItem = ({ name, count, color }) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-${color}-500 shadow-md`}>
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 dark:text-gray-100">{name}</h4>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{count} thuật ngữ</p>
      </div>
    </div>
    <button className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none">
      <FiMoreVertical />
    </button>
  </div>
);

const FlashcardManager = () => {
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [importedCards, setImportedCards] = useState([]);
  
  const [autoGenWord, setAutoGenWord] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const result = await analyzeCSVData(text);
      setImportedCards(result);
      setIsAnalyzing(false);
    };
    reader.readAsText(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsHoveringDrop(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
      const dummyEvent = { target: { files: [file] } };
      await handleFileUpload(dummyEvent);
    } else {
      alert("Vui lòng tải lên file định dạng .csv");
    }
  };

  const handleAutoGenerate = async () => {
    if (!autoGenWord.trim()) return;
    setIsGenerating(true);
    const res = await fetchWordData(autoGenWord.trim());
    setGeneratedCard(res);
    setIsGenerating(false);
  };

  return (
    <div className="w-full animate-slide-in flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">Bộ thẻ (Decks)</h2>
        <button className="flex items-center gap-2 text-sm font-bold bg-[#3182ce] text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors shadow-sm">
          <FiFolderPlus className="w-5 h-5" /> Thêm Bộ Mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Decks List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <DeckItem name="IT Vocabulary" count={120} color="blue" />
          <DeckItem name="TOEIC Part 1" count={85} color="green" />
          <DeckItem name="Phrasal Verbs Daily" count={42} color="purple" />
          <DeckItem name="IELTS Reading Tech" count={67} color="pink" />
          <DeckItem name="Irregular Verbs" count={150} color="orange" />
        </div>

        {/* AI Import Panel */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-white/10">
              <FiCpu className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                <FiCpu className="w-6 h-6" /> AI Smart Import
              </h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Kéo thả file Excel hoặc CSV vào đây. Trí tuệ nhân tạo sẽ tự động phân loại cột tiếng Anh, nghĩa tiếng Việt và tạo thẻ cho bạn.
              </p>

              <div 
                className={`w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isHoveringDrop 
                    ? 'border-white bg-white/20 scale-105' 
                    : 'border-white/40 hover:border-white/80 hover:bg-white/10'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsHoveringDrop(true); }}
                onDragLeave={() => setIsHoveringDrop(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input type="file" accept=".csv,.txt" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                
                {isAnalyzing ? (
                  <div className="flex flex-col items-center animate-fade-in text-white/90">
                    <FaSpinner className="w-8 h-8 mb-3 animate-spin" />
                    <span className="font-bold text-sm">AI đang phân tích...</span>
                  </div>
                ) : importedCards.length > 0 ? (
                  <div className="flex flex-col items-center animate-fade-in text-emerald-300">
                    <FiCheckCircle className="w-8 h-8 mb-3" />
                    <span className="font-bold text-sm text-center">Tạo thành công {importedCards.length} thẻ!<br/><span className="text-xs text-white/60">Bấm để tải file khác</span></span>
                  </div>
                ) : (
                  <>
                    <FiUpload className="w-8 h-8 mb-3 opacity-90" />
                    <span className="font-bold text-center text-sm">Kéo thả file CSV vào đây<br/>hoặc Click để chọn</span>
                    <div className="flex gap-3 mt-4 text-white/60">
                      <FaFileExcel className="w-6 h-6" />
                      <FaFileCsv className="w-6 h-6" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Tính năng Auto-Generate</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Chỉ cần nhập một từ vựng tiếng Anh, AI hệ thống sẽ tự động ghép ảnh, dịch nghĩa và gắn phiên âm.
            </p>
            <div className="flex bg-gray-50 dark:bg-gray-900 rounded-xl p-2 border border-gray-200 dark:border-gray-700 flex-col gap-2">
              <div className="flex w-full">
                <input 
                  type="text" 
                  value={autoGenWord}
                  onChange={(e) => setAutoGenWord(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAutoGenerate()}
                  placeholder="Nhập từ vựng tiếng Anh..." 
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-sm text-gray-800 dark:text-gray-100 font-medium" 
                />
                <button 
                  onClick={handleAutoGenerate}
                  disabled={isGenerating}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? <FaSpinner className="animate-spin inline-block mr-1" /> : 'Tạo nhanh'}
                </button>
              </div>

              {generatedCard && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 animate-fade-in flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-lg font-black text-blue-600 dark:text-blue-400">{generatedCard.word}</span>
                      <span className="ml-2 text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">{generatedCard.ipa}</span>
                    </div>
                    {generatedCard.audio && (
                      <button onClick={() => new Audio(generatedCard.audio).play()} className="text-blue-500">
                        <FiVolume2 className="w-5 h-5"/>
                      </button>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">{generatedCard.meaning || "Không tìm thấy nghĩa tiếng Anh"}</div>
                  {generatedCard.examples[0] && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-blue-400 pl-2">
                      Ví dụ: {generatedCard.examples[0]}
                    </div>
                  )}
                  {/* Image isn't embedded reliably due to unsplash random, omitted for UI clean */}
                  <button className="w-full mt-2 py-2 bg-gray-100 dark:bg-gray-700 text-xs font-bold rounded-lg text-gray-600 dark:text-gray-300">
                    + Thêm vào bộ thẻ
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FlashcardManager;
