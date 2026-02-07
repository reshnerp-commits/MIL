
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import PromptBar from './components/PromptBar';
import ImageGrid from './components/ImageGrid';
import LoadingOverlay from './components/LoadingOverlay';
import { generateImageWithGemini } from './services/geminiService';
import { GeneratedImage, AspectRatio } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('auravision_gallery');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved gallery", e);
      }
    }
  }, []);

  // Save to local storage whenever images change
  useEffect(() => {
    localStorage.setItem('auravision_gallery', JSON.stringify(images));
  }, [images]);

  const handleGenerate = async (prompt: string, aspectRatio: AspectRatio, highQuality: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateImageWithGemini(prompt, aspectRatio, highQuality);
      
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        prompt: prompt,
        aspectRatio: aspectRatio,
        timestamp: Date.now()
      };
      
      setImages(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while generating your image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const handleDownload = useCallback((url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `auravision-${id.slice(0, 8)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="pt-16 pb-8 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
            Your Vision, <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent italic">Amplified</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Unleash the power of Gemini AI to create stunning, high-resolution visuals in seconds. 
            Free, fast, and limited only by your imagination.
          </p>
        </section>

        {/* Action Bar */}
        <PromptBar onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Error State */}
        {error && (
          <div className="mx-4 md:mx-8 mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 text-red-400 animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
            </svg>
            <div className="flex-1">
              <h4 className="font-bold mb-1">Generation Failed</h4>
              <p className="text-sm opacity-90">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
          </div>
        )}

        {/* Gallery */}
        <div className="px-4 md:px-8 mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Your Generations</h3>
          <span className="text-sm text-gray-500 font-medium">{images.length} {images.length === 1 ? 'image' : 'images'}</span>
        </div>
        
        <ImageGrid 
          images={images} 
          onDownload={handleDownload} 
          onDelete={handleDelete} 
        />
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-white/5 bg-gray-950/50">
        <p className="text-gray-500 text-sm">
          Powered by Google Gemini &copy; {new Date().getFullYear()} AuraVision AI. All rights reserved.
        </p>
      </footer>

      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default App;
