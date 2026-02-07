
import React, { useState } from 'react';
import { AspectRatio } from '../types';

interface PromptBarProps {
  onGenerate: (prompt: string, aspectRatio: AspectRatio, highQuality: boolean) => void;
  isLoading: boolean;
}

const PromptBar: React.FC<PromptBarProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [highQuality, setHighQuality] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, aspectRatio, highQuality);
    }
  };

  const ratios: { label: string; value: AspectRatio }[] = [
    { label: 'Square (1:1)', value: '1:1' },
    { label: 'Portrait (3:4)', value: '3:4' },
    { label: 'Landscape (4:3)', value: '4:3' },
    { label: 'Story (9:16)', value: '9:16' },
    { label: 'Widescreen (16:9)', value: '16:9' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to see... (e.g., 'A cyberpunk city in the clouds with neon whales flying through the air')"
            className="w-full bg-gray-900/50 border border-white/10 rounded-2xl p-6 pr-32 min-h-[140px] text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none shadow-xl"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute bottom-4 right-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 group-active:scale-95"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Visualizing...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                <span>Generate</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 p-4 glass rounded-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Aspect Ratio</span>
            <div className="flex flex-wrap gap-2">
              {ratios.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setAspectRatio(r.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${
                    aspectRatio === r.value
                      ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">High Quality (Gemini 3 Pro)</span>
                <span className="text-[10px] text-gray-500">Requires Pro API access</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={highQuality}
                onChange={(e) => setHighQuality(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptBar;
