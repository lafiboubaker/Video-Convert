/**
 * Header Component
 * Displays the main header of the application with a title, description, and language selector.
 * Includes animated sound waves under the title for visual appeal.
 */

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, ChevronDown, ArrowUp } from "lucide-react";

// Create a language context to be used across the entire site
import React, { createContext, useContext } from "react";

// Define language context type
type LanguageContextType = {
  language: "en" | "fr" | "ar" | "pt" | "es" | "de" | "it" | "ru" | "zh" | "ja";
  setLanguage: (lang: "en" | "fr" | "ar" | "pt" | "es" | "de" | "it" | "ru" | "zh" | "ja") => void;
  translations: {
    transform: string;
    description: string;
  };
  direction: "ltr" | "rtl";
  textAlign: string;
};

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translations: {
    transform: "",
    description: ""
  },
  direction: "ltr",
  textAlign: "text-left"
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<"en" | "fr" | "ar" | "pt" | "es" | "de" | "it" | "ru" | "zh" | "ja">("en");
  
  // Define translations for each language
  const translations = {
    transform:
      language === "en" ? "QuickConvert" :
      language === "fr" ? "QuickConvert" :
      language === "ar" ? "QuickConvert" :
      language === "pt" ? "QuickConvert" :
      language === "es" ? "QuickConvert" :
      language === "de" ? "QuickConvert" :
      language === "it" ? "QuickConvert" :
      language === "ru" ? "QuickConvert" :
      language === "zh" ? "QuickConvert" :
      "QuickConvert",
    description:
      language === "en" ? "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks." :
      language === "fr" ? "Convertissez des vidéos de YouTube, Facebook, TikTok, Instagram et plus en format MP4 ou MP3 en quelques clics." :
      language === "ar" ? "حول مقاطع الفيديو من يوتيوب وفيسبوك وتيك توك وانستجرام والمزيد إلى صيغة MP4 أو MP3 بنقرات قليلة فقط." :
      language === "pt" ? "Converta vídeos do YouTube, Facebook, TikTok, Instagram e muito mais para formato MP4 ou MP3 com apenas alguns cliques." :
      language === "es" ? "Convierte videos de YouTube, Facebook, TikTok, Instagram y más a formato MP4 o MP3 con solo unos clics." :
      language === "de" ? "Konvertieren Sie Videos von YouTube, Facebook, TikTok, Instagram und mehr in MP4- oder MP3-Format mit nur wenigen Klicks." :
      language === "it" ? "Converti video da YouTube, Facebook, TikTok, Instagram e altro in formato MP4 o MP3 con pochi clic." :
      language === "ru" ? "Преобразуйте видео с YouTube, Facebook, TikTok, Instagram и других платформ в формат MP4 или MP3 всего за несколько кликов." :
      language === "zh" ? "只需点击几下即可将 YouTube、Facebook、TikTok、Instagram 等平台的视频转换为 MP4 或 MP3 格式。" :
      language === "ja" ? "YouTube、Facebook、TikTok、Instagramなどの動画を数回のクリックでMP4またはMP3形式に変換します。" :
      "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks.",
  };

  // Set text direction based on language
  const direction = language === "ar" ? "rtl" : "ltr";
  const textAlign = language === "ar" ? "text-right" : "text-left";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, direction, textAlign }}>
      {children}
    </LanguageContext.Provider>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, translations, direction, textAlign } = useLanguage();

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add this state for scroll to top button
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Add this useEffect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this function for scrolling to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className="w-full p-4 md:p-6"
      style={{ direction }}
    >
      {/* Left side ad space */}
      <div className="fixed left-0 top-1/4 w-[160px] h-[600px] hidden lg:flex flex-col items-center justify-center z-40">
        <div className="bg-gray-100/90 dark:bg-gray-800/90 rounded-lg p-2 w-full h-full flex items-center justify-center backdrop-blur-sm">
          <p className="text-gray-400 text-sm text-center">Ad Space</p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Title - the only element with animation */}
          <motion.h1 
            className="text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent"
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
          >
            {translations.transform}
          </motion.h1>
          
          {/* Description - static */}
          <div className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl ${textAlign}`}>
            {translations.description}
          </div>

          {/* Language selector */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Globe className="h-6 w-6 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language.toUpperCase()}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>

            {isOpen && (
              <div className="absolute top-full mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {["en", "fr", "ar", "pt", "es", "de", "it", "ru", "zh", "ja"].map((lang) => (
                    <div
                      key={lang}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      role="menuitem"
                      onClick={() => {
                        setLanguage(lang as "en" | "fr" | "ar" | "pt" | "es" | "de" | "it" | "ru" | "zh" | "ja");
                        setIsOpen(false);
                      }}
                    >
                      {lang === "en"
                        ? "English"
                        : lang === "fr"
                        ? "Français"
                        : lang === "ar"
                        ? "Arabic"
                        : lang === "pt"
                        ? "Português"
                        : lang === "es"
                        ? "Español"
                        : lang === "de"
                        ? "Deutsch"
                        : lang === "it"
                        ? "Italiano"
                        : lang === "ru"
                        ? "Русский"
                        : lang === "zh"
                        ? "简体中文"
                        : "日本語"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound wave animation */}
          <motion.div 
            className="flex items-center justify-center gap-1 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 h-${6 + Math.floor(Math.random() * 10)} bg-indigo-500 dark:bg-indigo-400 rounded-full`}
                animate={{ 
                  scaleY: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side ad space */}
      <div className="fixed right-0 top-1/4 w-[160px] h-[600px] hidden lg:flex flex-col items-center justify-center z-40">
        <div className="bg-gray-100/90 dark:bg-gray-800/90 rounded-lg p-2 w-full h-full flex items-center justify-center backdrop-blur-sm">
          <p className="text-gray-400 text-sm text-center">Ad Space</p>
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Header;
