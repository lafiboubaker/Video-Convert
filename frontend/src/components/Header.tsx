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
      language === "zh" ? "快速转换" :
      language === "ja" ? "クイックコンバート" :
      "QuickConvert",
    description:
      language === "en" ? "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks." :
      language === "fr" ? "Convertissez des vidéos de YouTube, Facebook, TikTok, Instagram et plus en format MP4 ou MP3 en quelques clics." :
      language === "ar" ? "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 with just a few clicks." :
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
          {/* Title - with enhanced animation and logo */}
          <div className="flex flex-col items-center justify-center mb-4">
            <motion.div
              className="flex items-center justify-center gap-3"
              animate={{ 
                y: [0, -5, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }}
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))"
              }}
            >
              {/* Logo */}
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg transform rotate-3"></div>
                <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center transform -rotate-3 border-2 border-indigo-500">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-indigo-600 dark:text-indigo-400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H6C4.89543 6 4 6.89543 4 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 14L16 10M16 10H13M16 10V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              
              <motion.h1 
                className="text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-500 dark:from-indigo-300 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent"
              >
                {translations.transform}
              </motion.h1>
            </motion.div>
          </div>
          
          {/* Description - enhanced */}
          <div className={`text-xl md:text-2xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent max-w-3xl ${textAlign} mb-6`}>
            {translations.description}
          </div>

          {/* Language selector with flags */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer p-2.5 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 shadow-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className="p-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30"
              >
                <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
              </div>
              
              {/* Current language flag */}
              <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                {language === "en" && <div className="w-full h-full bg-blue-700 relative">
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-3 h-2 bg-blue-700">
                      <div className="absolute inset-0 flex flex-wrap content-start">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-0.5 h-0.5 bg-white m-px"></div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600"></div>
                    <div className="absolute top-1 left-0 w-full h-0.5 bg-white"></div>
                    <div className="absolute top-2 left-0 w-full h-0.5 bg-red-600"></div>
                    <div className="absolute top-3 left-0 w-full h-0.5 bg-white"></div>
                  </div>
                </div>}
                {language === "ar" && <div className="bg-green-700 h-full w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-1.5 bg-white flex items-center justify-center">
                      <div className="text-green-700 text-[6px] font-bold">سعودية</div>
                    </div>
                    <div className="absolute w-2 h-2 border-b border-l border-white transform -rotate-45 translate-y-0.5"></div>
                  </div>
                </div>}
                {language === "fr" && <div className="flex h-full">
                  <div className="w-1/3 h-full bg-blue-700"></div>
                  <div className="w-1/3 h-full bg-white"></div>
                  <div className="w-1/3 h-full bg-red-600"></div>
                </div>}
                {language === "pt" && <div className="bg-green-700 h-full w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>}
                {language === "es" && <div className="flex flex-col h-full">
                  <div className="h-1/4 w-full bg-red-600"></div>
                  <div className="h-2/4 w-full bg-yellow-400"></div>
                  <div className="h-1/4 w-full bg-red-600"></div>
                </div>}
                {language === "de" && <div className="flex flex-col h-full">
                  <div className="h-1/3 w-full bg-black"></div>
                  <div className="h-1/3 w-full bg-red-600"></div>
                  <div className="h-1/3 w-full bg-yellow-400"></div>
                </div>}
                {language === "it" && <div className="flex h-full">
                  <div className="w-1/3 h-full bg-green-600"></div>
                  <div className="w-1/3 h-full bg-white"></div>
                  <div className="w-1/3 h-full bg-red-600"></div>
                </div>}
                {language === "ru" && <div className="flex flex-col h-full">
                  <div className="h-1/3 w-full bg-white"></div>
                  <div className="h-1/3 w-full bg-blue-600"></div>
                  <div className="h-1/3 w-full bg-red-600"></div>
                </div>}
                {language === "zh" && <div className="bg-red-600 h-full w-full relative">
                  <div className="absolute top-0.5 left-0.5 flex flex-col">
                    <div className="flex">
                      <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                      <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                    </div>
                    <div className="flex">
                      <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                      <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                    </div>
                  </div>
                </div>}
                {language === "ja" && <div className="bg-white h-full w-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                </div>}
              </span>
              
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {language === "en" ? "English" :
                 language === "fr" ? "Français" :
                 language === "ar" ? "English" :
                 language === "pt" ? "Português" :
                 language === "es" ? "Español" :
                 language === "de" ? "Deutsch" :
                 language === "it" ? "Italiano" :
                 language === "ru" ? "Русский" :
                 language === "zh" ? "中文" :
                 language === "ja" ? "日本語" :
                 "English"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>

            {isOpen && (
              <motion.div 
                className="absolute top-full mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-700 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {["en", "fr", "ar", "pt", "es", "de", "it", "ru", "zh", "ja"].map((lang) => (
                    <motion.div
                      key={lang}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center ${
                        language === lang 
                          ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      role="menuitem"
                      onClick={() => {
                        setLanguage(lang as "en" | "fr" | "ar" | "pt" | "es" | "de" | "it" | "ru" | "zh" | "ja");
                        setIsOpen(false);
                      }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Flag icons */}
                      <span className="inline-block w-6 h-4 mr-3 rounded-sm overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                        {lang === "en" && <div className="w-full h-full bg-blue-700 relative">
                          <div className="absolute inset-0">
                            <div className="absolute top-0 left-0 w-3 h-2 bg-blue-700">
                              <div className="absolute inset-0 flex flex-wrap content-start">
                                {[...Array(3)].map((_, i) => (
                                  <div key={i} className="w-0.5 h-0.5 bg-white m-px"></div>
                                ))}
                              </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600"></div>
                            <div className="absolute top-1 left-0 w-full h-0.5 bg-white"></div>
                            <div className="absolute top-2 left-0 w-full h-0.5 bg-red-600"></div>
                            <div className="absolute top-3 left-0 w-full h-0.5 bg-white"></div>
                          </div>
                        </div>}
                        {lang === "ar" && <div className="bg-green-700 h-full w-full relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-1.5 bg-white flex items-center justify-center">
                              <div className="text-green-700 text-[6px] font-bold">سعودية</div>
                            </div>
                            <div className="absolute w-2 h-2 border-b border-l border-white transform -rotate-45 translate-y-0.5"></div>
                          </div>
                        </div>}
                        {lang === "fr" && <div className="flex h-full">
                          <div className="w-1/3 h-full bg-blue-700"></div>
                          <div className="w-1/3 h-full bg-white"></div>
                          <div className="w-1/3 h-full bg-red-600"></div>
                        </div>}
                        {lang === "pt" && <div className="bg-green-700 h-full w-full relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          </div>
                        </div>}
                        {lang === "es" && <div className="flex flex-col h-full">
                          <div className="h-1/4 w-full bg-red-600"></div>
                          <div className="h-2/4 w-full bg-yellow-400"></div>
                          <div className="h-1/4 w-full bg-red-600"></div>
                        </div>}
                        {lang === "de" && <div className="flex flex-col h-full">
                          <div className="h-1/3 w-full bg-black"></div>
                          <div className="h-1/3 w-full bg-red-600"></div>
                          <div className="h-1/3 w-full bg-yellow-400"></div>
                        </div>}
                        {lang === "it" && <div className="flex h-full">
                          <div className="w-1/3 h-full bg-green-600"></div>
                          <div className="w-1/3 h-full bg-white"></div>
                          <div className="w-1/3 h-full bg-red-600"></div>
                        </div>}
                        {lang === "ru" && <div className="flex flex-col h-full">
                          <div className="h-1/3 w-full bg-white"></div>
                          <div className="h-1/3 w-full bg-blue-600"></div>
                          <div className="h-1/3 w-full bg-red-600"></div>
                        </div>}
                        {lang === "zh" && <div className="bg-red-600 h-full w-full relative">
                          <div className="absolute top-0.5 left-0.5 flex flex-col">
                            <div className="flex">
                              <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                              <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                            </div>
                            <div className="flex">
                              <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                              <div className="w-0.5 h-0.5 bg-yellow-400 m-px"></div>
                            </div>
                          </div>
                        </div>}
                        {lang === "ja" && <div className="bg-white h-full w-full flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-red-600"></div>
                        </div>}
                      </span>
                      
                      {lang === "en"
                        ? "English"
                        : lang === "fr"
                        ? "Français"
                        : lang === "ar"
                        ? "English"
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
                        ? "中文"
                        : "日本語"}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Siri-like sound wave animation */}
          <motion.div 
            className="flex items-center justify-center gap-1.5 mt-6 h-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full"
                style={{
                  background: "linear-gradient(to top, #4f46e5, #8b5cf6, #ec4899)",
                  height: `${15 + (i % 4) * 8}px`,
                }}
                animate={{ 
                  scaleY: [0.3, 1, 0.8, 1.2, 0.5],
                  backgroundColor: [
                    "rgba(79, 70, 229, 1)",  // indigo
                    "rgba(139, 92, 246, 1)", // purple
                    "rgba(236, 72, 153, 1)", // pink
                    "rgba(59, 130, 246, 1)", // blue
                    "rgba(79, 70, 229, 1)",  // back to indigo
                  ],
                  filter: [
                    "brightness(1)",
                    "brightness(1.3)",
                    "brightness(1.1)",
                    "brightness(1.5)",
                    "brightness(1)",
                  ]
                }}
                transition={{ 
                  duration: 1.8, 
                  repeat: Infinity, 
                  delay: i * 0.08,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1]
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
