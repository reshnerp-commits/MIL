
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGridProps {
  images: GeneratedImage[];
  onDownload: (url: string, id: string) => void;
  onDelete: (id: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDownload, onDelete }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="w-20 h-20 mb-6 bg-gray-900 rounded-full flex items-center justify-center border border-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-400">Your gallery is empty</h3>
        <p className="mt-2 max-w-xs text-center">Start generating unique AI images by entering a prompt above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 pb-12">
      {images.map((image) => (
        <div key={image.id} className="group relative glass rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] hover:shadow-purple-500/10">
          <div className="aspect-square relative overflow-hidden bg-gray-900">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <p className="text-sm text-white line-clamp-3 mb-4 font-light italic">"{image.prompt}"</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onDownload(image.url, image.id)}
                  className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                  </svg>
                  Save
                </button>
                <button
                  onClick={() => onDelete(image.id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between border-t border-white/5">
            <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">ID: {image.id.slice(0, 8)}</span>
            <span className="text-[10px] text-gray-500 px-1.5 py-0.5 bg-white/5 rounded border border-white/10">{image.aspectRatio}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
