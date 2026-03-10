import React from 'react';
import { ChevronDown, ChevronUp, Maximize } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSection, totalSections, onNavigate }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      <button
        onClick={() => onNavigate(Math.max(0, currentSection - 1))}
        disabled={currentSection === 0}
        className={`p-3 rounded-full border-2 transition-all duration-300 ${
          currentSection === 0
            ? 'border-gray-600 text-gray-600 opacity-50 cursor-not-allowed'
            : 'border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white'
        }`}
      >
        <ChevronUp size={24} />
      </button>

      <div className="flex flex-col gap-2 items-center">
        {Array.from({ length: totalSections }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(idx)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentSection === idx ? 'bg-brand-green h-6' : 'bg-gray-400 hover:bg-brand-purple'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => onNavigate(Math.min(totalSections - 1, currentSection + 1))}
        disabled={currentSection === totalSections - 1}
        className={`p-3 rounded-full border-2 transition-all duration-300 ${
          currentSection === totalSections - 1
            ? 'border-gray-600 text-gray-600 opacity-50 cursor-not-allowed'
            : 'border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white'
        }`}
      >
        <ChevronDown size={24} />
      </button>

      <button
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
        className="p-3 rounded-full border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 mt-2"
        title="Fullscreen"
      >
        <Maximize size={20} />
      </button>
    </div>
  );
};