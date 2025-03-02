import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Moon, Sun, Download, Upload, FileVideo, Music, Share2, Scissors, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "./Header";
import axios from 'axios';

import UrlInput from "./UrlInput";
import FormatSelector from "./FormatSelector";
import ConversionStatus from "./ConversionStatus";

// Platform icons
const PlatformIcons: Record<string, JSX.Element> = {
  "YouTube": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-red-600">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  "Facebook": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-blue-600">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
    </svg>
  ),
  "TikTok": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current">
      <path d="M9.37 10.94a3.15 3.15 0 0 0-3.17 3.17 3.14 3.14 0 0 0 3.17 3.17 3.15 3.15 0 0 0 3.17-3.17Zm11.75-3.8v3.45a8.78 8.78 0 0 1-4.5-1.27 9.88 9.88 0 0 1-1.33-1.04v4.8a7.6 7.6 0 0 1-7.74 7.74 7.55 7.55 0 0 1-3.14-.68 7.64 7.64 0 0 1-4.6-7.06 7.67 7.67 0 0 1 7.74-7.74c.2 0 .39.01.58.03v3.54a3.94 3.94 0 0 0-.58-.04 4.06 4.06 0 0 0-4.06 4.06 4.01 4.01 0 0 0 1.35 3.03 4.12 4.12 0 0 0 2.71 1.04 4.09 4.09 0 0 0 4.06-4.05V2.54h3.4c.28 1.54 1.19 2.94 2.55 3.82a7.22 7.22 0 0 0 3.56 1.77Z"/>
    </svg>
  ),
  "Instagram": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-pink-600">
      <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
    </svg>
  ),
  "Twitter": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-blue-400">
      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
    </svg>
  ),
  "Vimeo": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-teal-500">
      <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138c-.719-2.584-1.488-3.878-2.312-3.878-.179 0-.806.378-1.8809 1.132l-1.129-1.457a315.06 315.06 0 0 0 3.501-3.1279c1.579-1.368 2.765-2.085 3.5539-2.159 1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.5069.5389 2.45 1.1309 3.674 1.7759 3.674.502 0 1.2559-.796 2.2609-2.387.999-1.5899 1.5289-2.7998 1.5999-3.632.142-1.370-.395-2.05-1.618-2.05-.576 0-1.1659.133-1.769.3999 1.1699-3.8689 3.411-5.7569 6.7199-5.6449 2.4639.08 3.6269 1.664 3.493 4.7399Z" />
    </svg>
  ),
  "Dailymotion": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-blue-700">
      <path d="M10.159 6.123c.33-.15.671-.212 1.014-.3C12.31 5.541 13.443 5.44 14.552 5.682c.993.216 1.904.63 2.744 1.19.946.63 1.742 1.43 2.488 2.286.543.625 1.007 1.307 1.45 2.002.49.771.749 1.622.956 2.498.219.919.348 1.855.362 2.798.006.403.007.802-.072 1.199-.134.673-.332 1.333-.637 1.955-.64 1.295-1.558 2.285-2.816 2.947a6.272 6.272 0 0 1-1.59.549c-.484.102-.972.166-1.466.153-.496-.014-.99-.048-1.483-.112-.504-.065-1.007-.159-1.506-.27-.652-.144-1.308-.277-1.943-.472-.52-.16-1.021-.378-1.534-.562-.292-.104-.609-.153-.914-.223-.57-.13-1.137-.283-1.686-.485-.635-.233-1.262-.494-1.869-.79-.48-.233-.847-.602-1.242-.933-.24-.2-.459-.422-.687-.635-.219-.202-.388-.451-.553-.7-.165-.25-.32-.504-.496-.746-.142-.196-.243-.414-.34-.632-.307-.693-.453-1.428-.521-2.183-.065-.719-.073-1.44-.04-2.16.033-.685.066-1.368.108-2.052.044-.722.159-1.435.341-2.133.189-.723.444-1.414.769-2.079.332-.679.731-1.308 1.31-1.822.357-.317.713-.641 1.139-.879.238-.133.48-.266.763-.302Zm.625 1.942c-.203-.003-.362.071-.526.154-.303.153-.516.405-.737.647-.451.496-.708 1.103-.902 1.741-.218.716-.364 1.454-.406 2.206-.048.856-.048 1.712-.055 2.568-.003.517.014 1.035.076 1.548.082.682.249 1.343.648 1.93.212.31.432.614.731.84.24.18.504.303.792.368.42.094.842.099 1.26.048.618-.075 1.213-.246 1.778-.52.492-.24.97-.508 1.358-.901.275-.279.578-.532.866-.8a.275.275 0 0 0 .082-.216c-.074-.505-.108-1.014-.194-1.519-.151-.9-.363-1.779-.787-2.59-.29-.554-.638-1.073-1.021-1.565-.47-.603-.99-1.159-1.5-1.72-.381-.418-.761-.836-1.177-1.219Z" />
    </svg>
  ),
  "Twitch": (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current text-purple-500">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  ),
};

const VideoForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [urlError, setUrlError] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Quality selection states
  const [videoQuality, setVideoQuality] = useState("720p");
  const [audioQuality, setAudioQuality] = useState("128kbps");
  const [showVideoQualityPopup, setShowVideoQualityPopup] = useState(false);
  const [showAudioQualityPopup, setShowAudioQualityPopup] = useState(false);
  
  // Platform selection states
  const [platform, setPlatform] = useState("YouTube");
  const [showPlatformPopup, setShowPlatformPopup] = useState(false);
  
  // Video trimming states
  const [trimEnabled, setTrimEnabled] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);
  const [videoDuration, setVideoDuration] = useState(180); // 3 minutes example
  
  // Refs for popup positioning
  const videoQualityButtonRef = useRef<HTMLButtonElement>(null);
  const audioQualityButtonRef = useRef<HTMLButtonElement>(null);
  const platformButtonRef = useRef<HTMLButtonElement>(null);
  
  // Video quality options
  const videoQualities = ["360p", "480p", "720p", "1080p", "1440p", "4K"];
  const audioQualities = ["64kbps", "128kbps", "192kbps", "256kbps", "320kbps"];
  const platforms = ["YouTube", "Facebook", "TikTok", "Instagram", "Twitter", "Vimeo", "Dailymotion", "Twitch"];
  
  const { language, textAlign } = useLanguage();

  // Default translations if props are not provided
  const defaultTranslations = {
    title: language === "en" ? "QuickConvert" :
           language === "fr" ? "QuickConvert" :
           language === "ar" ? "QuickConvert" :
           "QuickConvert",
    subtitle: language === "en" ? "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks." :
              language === "fr" ? "Convertissez des vidéos de YouTube, Facebook, TikTok, Instagram et plus en format MP4 ou MP3 en quelques clics." :
              language === "ar" ? "حول مقاطع الفيديو من يوتيوب وفيسبوك وتيك توك وانستجرام والمزيد إلى صيغة MP4 أو MP3 بنقرات قليلة فقط." :
              "Converta vídeos do YouTube, Facebook, TikTok, Instagram e muito mais para formato MP4 ou MP3 com apenas alguns cliques.",
    videoUrl: language === "en" ? "Video URL" :
              language === "fr" ? "URL de la vidéo" :
              language === "ar" ? "رابط الفيديو" :
              "URL do vídeo",
    transform: language === "en" ? "Convert Video" :
               language === "fr" ? "Convertir la Vidéo" :
               language === "ar" ? "تحويل الفيديو" :
               "Converter Vídeo",
    placeholder: language === "en" ? "https://www.youtube.com/watch?v=..." :
                 language === "fr" ? "https://www.youtube.com/watch?v=..." :
                 language === "ar" ? "https://www.youtube.com/watch?v=..." :
                 "https://www.youtube.com/watch?v=...",
    error: language === "en" ? "Please enter a valid video URL" :
           language === "fr" ? "Veuillez entrer une URL vidéo valide" :
           language === "ar" ? "يرجى إدخال رابط فيديو صالح" :
           "Por favor, insira um URL de vídeo válido"
  };

  // Use provided props or default translations
  const translations = {
    title: defaultTranslations.title,
    subtitle: defaultTranslations.subtitle,
    videoUrl: defaultTranslations.videoUrl,
    transform: defaultTranslations.transform,
    placeholder: defaultTranslations.placeholder,
    error: defaultTranslations.error
  };

  // Handle closing popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showVideoQualityPopup && 
        videoQualityButtonRef.current && 
        !videoQualityButtonRef.current.contains(event.target as Node)
      ) {
        setShowVideoQualityPopup(false);
      }
      
      if (
        showAudioQualityPopup && 
        audioQualityButtonRef.current && 
        !audioQualityButtonRef.current.contains(event.target as Node)
      ) {
        setShowAudioQualityPopup(false);
      }
      
      if (
        showPlatformPopup && 
        platformButtonRef.current && 
        !platformButtonRef.current.contains(event.target as Node)
      ) {
        setShowPlatformPopup(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVideoQualityPopup, showAudioQualityPopup, showPlatformPopup]);

  // Toggle dark mode and update document class
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const validateUrl = (url: string) => {
    if (!url) {
      setUrlError(translations.error);
      return false;
    }
    
    try {
      const parsedUrl = new URL(url);
      const validDomains = [
        "youtube.com", "youtu.be", "vimeo.com", "dailymotion.com", "twitch.tv",
        "facebook.com", "fb.watch", "instagram.com", "tiktok.com", "twitter.com",
        "linkedin.com", "reddit.com"
      ];
      const hostname = parsedUrl.hostname.replace("www.", "");
      
      if (!validDomains.includes(hostname)) {
        setUrlError(translations.error);
        return false;
      }

      // Check if the selected platform matches the URL
      if (!hostname.includes(platform.toLowerCase())) {
        setUrlError(`The URL does not match the selected platform: ${platform}`);
        return false;
      }
      
      setUrlError("");
      return true;
    } catch (error) {
      setUrlError(translations.error);
      return false;
    }
  };

  // Function to handle conversion
  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(videoUrl)) {
      return;
    }
    
    setStatus('loading');
    console.log(`Converting video: ${videoUrl} to ${outputFormat}`);
    console.log(`Using API URL: ${import.meta.env.VITE_API_URL}`);
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/convert`, {
        params: { url: videoUrl, format: outputFormat }
      });
      
      console.log('Conversion response:', response.data);
      
      // Set the full URL for downloading
      const fullDownloadUrl = `${import.meta.env.VITE_API_URL}${response.data.download_url}`;
      console.log(`Download URL set to: ${fullDownloadUrl}`);
      
      setDownloadUrl(fullDownloadUrl);
      setStatus('success');
      toast.success("Video converted successfully!");
    } catch (error) {
      console.error("Conversion error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      setStatus('error');
      toast.error("Failed to convert video");
    }
  };

  // Function to handle direct download
  const handleDownload = () => {
    if (!downloadUrl) return;
    
    console.log(`Downloading from: ${downloadUrl}`);
    
    try {
      // Create an anchor element
      const link = document.createElement('a');
      
      // Set the href to the download URL
      link.href = downloadUrl;
      
      // Generate a filename based on the video URL
      const videoName = videoUrl ? 
        videoUrl.split('/').pop()?.split('?')[0] || 'video' : 
        'video';
      
      // Set the download attribute to force download with custom filename
      const fileName = `${videoName}-converted.${outputFormat}`;
      link.download = fileName;
      
      // Append to the document
      document.body.appendChild(link);
      
      // Trigger the click
      link.click();
      
      // Remove from the document
      document.body.removeChild(link);
      
      toast.success(translations.downloadStarted || "Download started successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error(translations.downloadError || "Error downloading file");
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to share to Google Drive
  const shareToGoogleDrive = () => {
    if (!downloadUrl) return;
    
    // In a real implementation, this would use the Google Drive API
    // For now, we'll simulate the process
    toast.success("Uploading to Google Drive...");
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success("Successfully uploaded to Google Drive!");
    }, 2000);
  };

  // Function to share to Dropbox
  const shareToDropbox = () => {
    if (!downloadUrl) return;
    
    // In a real implementation, this would use the Dropbox API
    // For now, we'll simulate the process
    toast.success("Uploading to Dropbox...");
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success("Successfully uploaded to Dropbox!");
    }, 2000);
  };

  // Generate QR code URL with a proper download path
  const qrCodeUrl = downloadUrl ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`${window.location.origin}/download/sample?format=${outputFormat}`)}` : 
    "";

  const [showQR, setShowQR] = useState(false);

  // Function to show QR code modal
  const showQRCode = () => {
    setShowQR(true);
  };

  // Function to download QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    // Set the href to the QR code URL
    link.href = qrCodeUrl;
    // Set the download attribute to specify the filename
    link.download = 'qrcode.png';
    // Append the link to the document
    document.body.appendChild(link);
    // Trigger a click on the link
    link.click();
    // Remove the link from the document
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Dark mode toggle */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors btn-shake"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Top ad banner */}
      <div className="ad-banner mb-6">
        Banner Advertisement Space
      </div>
      
      <motion.div
        className="glass-card rounded-xl p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <form onSubmit={handleConvert} className="space-y-6">
          <div className="space-y-4">
            {/* Platform selector */}
            <div className="relative">
              <label className="text-sm font-medium">{translations.videoUrl}</label>
              <button
                type="button"
                ref={platformButtonRef}
                onClick={() => setShowPlatformPopup(!showPlatformPopup)}
                className="mt-2 w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="flex items-center">
                  {PlatformIcons[platform] || <Globe className="h-4 w-4 mr-2" />}
                  {platform}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {showPlatformPopup && (
                  <motion.div 
                    className="quality-popup mt-1 absolute w-full z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {platforms.map(platformOption => (
                      <div 
                        key={platformOption}
                        className={`quality-popup-item ${platform === platformOption ? 'selected' : ''} flex items-center`}
                        onClick={() => {
                          setPlatform(platformOption);
                          setShowPlatformPopup(false);
                        }}
                      >
                        {PlatformIcons[platformOption] || <Globe className="h-4 w-4 mr-2" />}
                        {platformOption}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <UrlInput 
              value={videoUrl} 
              onChange={setVideoUrl} 
              error={urlError} 
            />
            
            <FormatSelector 
              selectedFormat={outputFormat} 
              onChange={setOutputFormat} 
            />
          </div>
          
          {/* Quality options based on selected format - now with popup */}
          {outputFormat === "mp4" && (
            <div className="mt-4 relative">
              <label className="text-sm font-medium">{translations.videoUrl}</label>
              <button
                type="button"
                ref={videoQualityButtonRef}
                onClick={() => setShowVideoQualityPopup(!showVideoQualityPopup)}
                className="mt-2 w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span>{videoQuality}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {showVideoQualityPopup && (
                  <motion.div 
                    className="quality-popup mt-1 absolute w-full z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {videoQualities.map(quality => (
                      <div 
                        key={quality}
                        className={`quality-popup-item ${videoQuality === quality ? 'selected' : ''}`}
                        onClick={() => {
                          setVideoQuality(quality);
                          setShowVideoQualityPopup(false);
                        }}
                      >
                        {quality}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {outputFormat === "mp3" && (
            <div className="mt-4 relative">
              <label className="text-sm font-medium">{translations.videoUrl}</label>
              <button
                type="button"
                ref={audioQualityButtonRef}
                onClick={() => setShowAudioQualityPopup(!showAudioQualityPopup)}
                className="mt-2 w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span>{audioQuality}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {showAudioQualityPopup && (
                  <motion.div 
                    className="quality-popup mt-1 absolute w-full z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {audioQualities.map(quality => (
                      <div 
                        key={quality}
                        className={`quality-popup-item ${audioQuality === quality ? 'selected' : ''}`}
                        onClick={() => {
                          setAudioQuality(quality);
                          setShowAudioQualityPopup(false);
                        }}
                      >
                        {quality}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {/* Video trimming option */}
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="trim-video"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                checked={trimEnabled}
                onChange={() => setTrimEnabled(!trimEnabled)}
              />
              <label htmlFor="trim-video" className="ml-2 flex items-center text-sm font-medium">
                <Scissors className="h-4 w-4 mr-1" />
                Trim video after conversion
              </label>
            </div>
            
            {trimEnabled && (
              <div className="mt-3">
                <div className="trim-slider">
                  <div
                    className="trim-progress"
                    style={{
                      left: `${trimStart}%`,
                      width: `${trimEnd - trimStart}%`
                    }}
                  ></div>
                  <div
                    className="trim-handle"
                    style={{ left: `${trimStart}%` }}
                    // In a real implementation, add drag handling here
                  ></div>
                  <div
                    className="trim-handle"
                    style={{ left: `${trimEnd}%` }}
                    // In a real implementation, add drag handling here
                  ></div>
                </div>
                <div className="trim-time">
                  <span>{formatTime(trimStart * videoDuration / 100)}</span>
                  <span>{formatTime(trimEnd * videoDuration / 100)}</span>
                </div>
              </div>
            )}
          </div>
          
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 py-3 text-sm font-medium text-white shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed btn-shake"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {status === 'loading' ? 'Converting...' : translations.transform}
          </motion.button>
        </form>
        
        <ConversionStatus 
          status={status} 
          errorMessage={errorMessage} 
          downloadUrl={downloadUrl} 
        />
        
        {/* Cloud upload options and QR code (shown when conversion is successful) */}
        {status === 'success' && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-medium mb-3">{translations.subtitle}</h3>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={showQRCode}
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <span>QR Code</span>
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={shareToGoogleDrive}
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    title="Share to Google Drive"
                  >
                    <span>Drive</span>
                  </button>
                  
                  <button
                    onClick={shareToDropbox}
                    className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    title="Share to Dropbox"
                  >
                    <span>Dropbox</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center mt-6">
              <p className="text-sm text-muted-foreground mb-2">Scan to download on mobile</p>
              {qrCodeUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code for download" 
                    className="w-64 h-64 border rounded-lg" 
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Bottom ad banner */}
      <div className="ad-banner mt-8">
        Banner Advertisement Space
      </div>
      
      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Scan QR Code to Download</h3>
            
            {qrCodeUrl && (
              <div className="flex justify-center mb-4">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for download" 
                  className="w-64 h-64 border rounded-lg" 
                />
              </div>
            )}
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Scan this QR code with your mobile device to download the converted file.
            </p>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={downloadQRCode}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Download QR Code
              </button>
              
              <button
                onClick={() => setShowQR(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoForm;
