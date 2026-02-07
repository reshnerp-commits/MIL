
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 flex items-center justify-between border-b border-white/10 glass sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">AuraVision AI</h1>
          <p className="text-xs text-gray-400 hidden sm:block">Transform imagination into pixels</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          Gemini 3 Ready
        </span>
      </div>
    </header>
  );
};

export default Header;
