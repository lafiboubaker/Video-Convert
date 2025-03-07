import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileVideo, Music, Film, Video, FileAudio, Headphones, ChevronDown } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: string;
  onChange: (format: string) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ selectedFormat, onChange }) => {
  const [showFormatTypePopup, setShowFormatTypePopup] = useState(false);
  const [showVideoFormatPopup, setShowVideoFormatPopup] = useState(false);
  const [formatType, setFormatType] = useState<'video' | 'audio'>('video');

  const formatTypeRef = useRef<HTMLButtonElement>(null);
  const videoFormatRef = useRef<HTMLButtonElement>(null);

  const videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'webm', 'flv'];
  const audioFormats = ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'];

  // Add CSS styles for consistent appearance with quality popup
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Format selector glass effect styles */
      .format-popup {
        scrollbar-width: thin !important;
        scrollbar-color: #818cf8 #f1f5f9 !important;
        max-height: 320px !important;
        overflow-y: auto !important;
        backdrop-filter: blur(12px) !important;
        background-color: rgba(255, 255, 255, 0.85) !important;
        border: 1px solid rgba(129, 140, 248, 0.2) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
        border-radius: 0.5rem !important;
        padding: 0.5rem 0 !important;
      }

      .dark .format-popup {
        background-color: rgba(17, 24, 39, 0.85) !important;
        border-color: rgba(79, 70, 229, 0.2) !important;
        scrollbar-color: #4f46e5 #1f2937 !important;
      }

      .format-popup:hover {
        backdrop-filter: blur(16px) !important;
        border-color: rgba(129, 140, 248, 0.4) !important;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15) !important;
      }

      .format-popup-item {
        backdrop-filter: blur(8px) !important;
        background-color: transparent !important;
        border-bottom: 1px solid rgba(129, 140, 248, 0.1) !important;
        transition: all 0.3s ease !important;
        padding: 0.75rem 1rem !important;
      }

      .dark .format-popup-item {
        border-bottom-color: rgba(79, 70, 229, 0.1) !important;
      }

      .format-popup-item:hover {
        background-color: rgba(243, 244, 246, 0.8) !important;
        transform: translateX(4px) !important;
        backdrop-filter: blur(12px) !important;
      }

      .dark .format-popup-item:hover {
        background-color: rgba(55, 65, 81, 0.8) !important;
      }

      .format-popup-item.selected {
        background: linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(99, 102, 241, 0.1)) !important;
        backdrop-filter: blur(12px) !important;
        border: none !important;
        font-weight: 500 !important;
      }

      .dark .format-popup-item.selected {
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(67, 56, 202, 0.1)) !important;
      }

      .format-popup-item.selected .checkmark {
        width: 24px !important;
        height: 24px !important;
        color: #22c55e !important;
        transform: scale(1.2) !important;
        filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4)) !important;
        transition: all 0.3s ease !important;
      }

      .dark .format-popup-item.selected .checkmark {
        color: #4ade80 !important;
        filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.4)) !important;
      }

      /* Format selector buttons glass effect */
      .format-button {
        backdrop-filter: blur(8px) !important;
        background-color: rgba(255, 255, 255, 0.85) !important;
        border: 1px solid rgba(129, 140, 248, 0.2) !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
      }

      .dark .format-button {
        background-color: rgba(17, 24, 39, 0.85) !important;
        border-color: rgba(79, 70, 229, 0.2) !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
      }

      .format-button:hover {
        backdrop-filter: blur(12px) !important;
        border-color: rgba(129, 140, 248, 0.4) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
      }

      .dark .format-button:hover {
        border-color: rgba(79, 70, 229, 0.4) !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
      }

      /* Scrollbar styles */
      .format-popup::-webkit-scrollbar {
        width: 8px !important;
      }

      .format-popup::-webkit-scrollbar-track {
        background: rgba(241, 245, 249, 0.5) !important;
        border-radius: 4px !important;
      }

      .dark .format-popup::-webkit-scrollbar-track {
        background: rgba(31, 41, 55, 0.5) !important;
      }

      .format-popup::-webkit-scrollbar-thumb {
        background: #818cf8 !important;
        border-radius: 4px !important;
      }

      .dark .format-popup::-webkit-scrollbar-thumb {
        background: #4f46e5 !important;
      }

      .format-popup::-webkit-scrollbar-thumb:hover {
        background: #6366f1 !important;
      }

      .dark .format-popup::-webkit-scrollbar-thumb:hover {
        background: #4338ca !important;
      }
    `;
    document.head.appendChild(style);
    
    const cleanup = () => {
      document.head.removeChild(style);
    };
    
    return cleanup;
  }, []);

  // Handle clicking outside to close popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formatTypeRef.current && !formatTypeRef.current.contains(event.target as Node)) {
        setShowFormatTypePopup(false);
      }
      if (videoFormatRef.current && !videoFormatRef.current.contains(event.target as Node)) {
        setShowVideoFormatPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4">
      {/* Format Type Selector */}
      <div className="relative">
        <label className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Format Type</label>
        <button
          ref={formatTypeRef}
          onClick={() => setShowFormatTypePopup(!showFormatTypePopup)}
          className="format-button mt-2 w-full flex items-center justify-between rounded-lg border-2 border-indigo-200 dark:border-indigo-800 p-3 text-base transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm"
        >
          <span className="flex items-center">
            {formatType === 'video' ? (
              <Video className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Music className="h-5 w-5 mr-2 text-pink-600 dark:text-pink-400" />
            )}
            <span>{formatType === 'video' ? 'Video' : 'Audio'}</span>
          </span>
          <ChevronDown className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        </button>

        <AnimatePresence>
          {showFormatTypePopup && (
            <motion.div
              className="format-popup absolute w-full z-50 mt-2 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className={`format-popup-item flex items-center justify-between px-4 py-3 cursor-pointer ${
                  formatType === 'video' ? 'selected' : ''
                }`}
                onClick={() => {
                  setFormatType('video');
                  onChange('mp4');
                  setShowFormatTypePopup(false);
                }}
              >
                <span className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  <span>Video</span>
                </span>
                {formatType === 'video' && (
                  <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />
                )}
              </div>
              <div
                className={`format-popup-item flex items-center justify-between px-4 py-3 cursor-pointer ${
                  formatType === 'audio' ? 'selected' : ''
                }`}
                onClick={() => {
                  setFormatType('audio');
                  onChange('mp3');
                  setShowFormatTypePopup(false);
                }}
              >
                <span className="flex items-center">
                  <Music className="h-5 w-5 mr-2 text-pink-600 dark:text-pink-400" />
                  <span>Audio</span>
                </span>
                {formatType === 'audio' && (
                  <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video/Audio Format Selector */}
      <div className="relative">
        <label className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
          {formatType === 'video' ? 'Video Format' : 'Audio Format'}
        </label>
        <button
          ref={videoFormatRef}
          onClick={() => setShowVideoFormatPopup(!showVideoFormatPopup)}
          className="format-button mt-2 w-full flex items-center justify-between rounded-lg border-2 border-indigo-200 dark:border-indigo-800 p-3 text-base transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm"
        >
          <span className="flex items-center">
            {formatType === 'video' ? (
              <Video className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Music className="h-5 w-5 mr-2 text-pink-600 dark:text-pink-400" />
            )}
            <span>{selectedFormat}</span>
          </span>
          <ChevronDown className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        </button>

        <AnimatePresence>
          {showVideoFormatPopup && (
            <motion.div
              className="format-popup absolute w-full z-50 mt-2 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {(formatType === 'video' ? videoFormats : audioFormats).map((format) => (
                <div
                  key={format}
                  className={`format-popup-item flex items-center justify-between px-4 py-3 cursor-pointer ${
                    selectedFormat === format ? 'selected' : ''
                  }`}
                  onClick={() => {
                    onChange(format);
                    setShowVideoFormatPopup(false);
                  }}
                >
                  <span className="flex items-center">
                    {formatType === 'video' ? (
                      <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                    ) : (
                      <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                    )}
                    <span>{format}</span>
                  </span>
                  {selectedFormat === format && (
                    <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FormatSelector;
