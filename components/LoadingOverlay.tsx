
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Awakening the neural pathways...",
  "Sampling latent dreamscapes...",
  "Painting with mathematical gradients...",
  "Synthesizing visual concepts...",
  "Fine-tuning aesthetic parameters...",
  "Capturing the essence of your prompt...",
  "Brewing pixels and magic...",
  "Traversing high-dimensional vectors..."
];

const LoadingOverlay: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center glass backdrop-blur-2xl">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute inset-8 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-bounce">
                <path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/>
             </svg>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Creating Magic</h2>
        <p className="text-gray-400 font-medium animate-pulse transition-opacity duration-500">
          {MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
