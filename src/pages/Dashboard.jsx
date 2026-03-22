import React from 'react';
import { FiPlayCircle, FiPlus } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const LevelCard = ({ title, desc, progress, colorClass, isLocked }) => {
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all ${isLocked ? 'opacity-60 grayscale' : 'hover:shadow-md hover:-translate-y-1'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-black ${colorClass}`}>{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
        </div>
        {!isLocked ? (
          <div className={`p-3 rounded-full bg-opacity-10 dark:bg-opacity-20 ${colorClass.replace('text-', 'bg-')}`}>
            <FiPlayCircle className={`w-6 h-6 ${colorClass}`} />
          </div>
        ) : (
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
            <span className="text-xl">🔒</span>
          </div>
        )}
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full ${colorClass.replace('text-', 'bg-')}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs font-bold text-gray-400">
        <span>Tiến độ</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="w-full animate-fade-in flex flex-col gap-6">
      
      {/* Header Profile / Streak */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black mb-2">EngFlash Journey</h1>
          <p className="text-blue-50">Tiếp tục hành trình chinh phục tiếng Anh của bạn!</p>
        </div>
        
        <div className="relative z-10 flex gap-4 mt-4 sm:mt-0 bg-white/20 px-4 py-3 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase tracking-wider font-bold text-blue-100">Streak</span>
            <span className="text-2xl font-black">🔥 12</span>
          </div>
          <div className="w-px bg-white/30"></div>
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase tracking-wider font-bold text-blue-100">Từ đã học</span>
            <span className="text-2xl font-black">450</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Lộ Trình Học</h2>
        <NavLink to="/manage" className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <FiPlus /> Tạo Bộ Thẻ
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <LevelCard title="Cấp độ A1" desc="Từ vựng tiếng Anh cơ bản, giao tiếp hàng ngày" progress={85} colorClass="text-green-500" isLocked={false} />
        <LevelCard title="Cấp độ A2" desc="Mở rộng từ vựng, diễn đạt ý tưởng cá nhân" progress={30} colorClass="text-blue-500" isLocked={false} />
        <LevelCard title="Cấp độ B1" desc="Giao tiếp trôi chảy các chủ đề quen thuộc" progress={0} colorClass="text-purple-500" isLocked={true} />
        <LevelCard title="TOEIC 500+" desc="Từ vựng công sở, email, thương mại cơ bản" progress={10} colorClass="text-orange-500" isLocked={false} />
        <LevelCard title="IELTS 6.0+" desc="Từ vựng học thuật, thảo luận các vấn đề phức tạp" progress={0} colorClass="text-pink-500" isLocked={true} />
      </div>

      <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          AI
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Thử sức với AI Import!</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">Bạn có danh sách từ vựng Excel/CSV? Hãy tải lên và để AI tự động trích xuất Nghĩa, Phiên âm, và Ví dụ cho bạn.</p>
        <NavLink to="/manage" className="px-6 py-3 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-blue-500 transition-all shadow-md">
          Đến Quản lý Thẻ
        </NavLink>
      </div>

    </div>
  );
};

export default Dashboard;
