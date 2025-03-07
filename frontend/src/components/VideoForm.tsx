import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Moon, Sun, Download, Upload, FileVideo, Music, Share2, ChevronDown, Globe, Video, Camera, Check } from "lucide-react";
import { useLanguage } from "./Header";
import { config } from '../config';

import UrlInput from "./UrlInput";
import FormatSelector from "./FormatSelector";
import ConversionStatus from "./ConversionStatus";

// Platform icons
export const PlatformIcons: Record<string, JSX.Element> = {
  "YouTube": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-red-600">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  "Facebook": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-blue-600">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
    </svg>
  ),
  "TikTok": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current">
      <path d="M9.37 10.94a3.15 3.15 0 0 0-3.17 3.17 3.14 3.14 0 0 0 3.17 3.17 3.15 3.15 0 0 0 3.17-3.17Zm11.75-3.8v3.45a8.78 8.78 0 0 1-4.5-1.27 9.88 9.88 0 0 1-1.33-1.04v4.8a7.6 7.6 0 0 1-7.74 7.74 7.55 7.55 0 0 1-3.14-.68 7.64 7.64 0 0 1-4.6-7.06 7.67 7.67 0 0 1 7.74-7.74c.2 0 .39.01.58.03v3.54a3.94 3.94 0 0 0-.58-.04 4.06 4.06 0 0 0-4.06 4.06 4.01 4.01 0 0 0 1.35 3.03 4.12 4.12 0 0 0 2.71 1.04 4.09 4.09 0 0 0 4.06-4.05V2.54h3.4c.28 1.54 1.19 2.94 2.55 3.82a7.22 7.22 0 0 0 3.56 1.77Z"/>
    </svg>
  ),
  "Instagram": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-pink-600">
      <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"/>
    </svg>
  ),
  "X": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-black">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  "Snapchat": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-yellow-400">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.723.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.36-.135-.553-.046-.18-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.046-.134-.046-.19-.016-.255.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.007-.119c-.007-.21-.015-.42-.015-.629-.06-1.598.134-3.63.704-4.781C7.189 1.247 10.682.792 11.531.792l.674-.003z"/>
    </svg>
  ),
  "Twitter": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-blue-400">
      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
    </svg>
  ),
  "Vimeo": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-teal-500">
      <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138c-.719-2.584-1.488-3.878-2.312-3.878-.179 0-.806.378-1.8809 1.132l-1.129-1.457a315.06 315.06 0 0 0 3.501-3.1279c1.579-1.368 2.765-2.085 3.5539-2.159 1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.5069.5389 2.45 1.1309 3.674 1.7759 3.674.502 0 1.2559-.796 2.2609-2.387.999-1.5899 1.5289-2.7998 1.5999-3.632.142-1.370-.395-2.05-1.618-2.05-.576 0-1.1659.133-1.769.3999 1.1699-3.8689 3.411-5.7569 6.7199-5.6449 2.4639.08 3.6269 1.664 3.493 4.7399Z" />
    </svg>
  ),
  "Dailymotion": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-blue-700">
      <path d="M10.159 6.123c.33-.15.671-.212 1.014-.3C12.31 5.541 13.443 5.44 14.552 5.682c.993.216 1.904.63 2.744 1.19.946.63 1.742 1.43 2.488 2.286.543.625 1.007 1.307 1.45 2.002.49.771.749 1.622.956 2.498.219.919.348 1.855.362 2.798.006.403.007.802-.072 1.199-.134.673-.332 1.333-.637 1.955-.64 1.295-1.558 2.285-2.816 2.947a6.272 6.272 0 0 1-1.59.549c-.484.102-.972.166-1.466.153-.496-.014-.99-.048-1.483-.112-.504-.065-1.007-.159-1.506-.27-.652-.144-1.308-.277-1.943-.472-.52-.16-1.021-.378-1.534-.562-.292-.104-.609-.153-.914-.223-.57-.13-1.137-.283-1.686-.485-.635-.233-1.262-.494-1.869-.79-.48-.233-.847-.602-1.242-.933-.933-.24-.2-.459-.422-.635-.635-.635-.635-.635-.635-.219-.202-.388-.451-.553-.7-.165-.25-.32-.504-.496-.746-.142-.196-.243-.414-.34-.632-.307-.693-.453-1.428-.521-2.183-.065-.719-.073-1.44-.04-2.16.033-.685.066-1.368.108-2.052.044-.722.159-1.435.341-2.133.189-.723.444-1.414.769-2.079.332-.679.731-1.308 1.31-1.822.357-.317.713-.641 1.139-.879.238-.133.48-.266.763-.302Zm.625 1.942c-.203-.003-.362.071-.526.154-.303.153-.516.405-.737.647-.451.496-.708 1.103-.902 1.741-.218.716-.364 1.454-.406 2.206-.048.856-.048 1.712-.055 2.568-.003.517.014 1.035.076 1.548.082.682.249 1.343.648 1.93.212.31.432.614.731.84.24.18.504.303.792.368.42.094.842.099 1.26.048.618-.075 1.213-.246 1.778-.52.492-.24.97-.508 1.358-.901.275-.279.578-.532.866-.8a.275.275 0 0 0 .082-.216c-.074-.505-.108-1.014-.194-1.519-.151-.9-.363-1.779-.787-2.59-.29-.554-.638-1.073-1.021-1.021-1.565-.47-.603-.99-1.159-1.5-1.72-.381-.418-.761-.836-1.177-1.219Z" />
    </svg>
  ),
  "Twitch": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-purple-500">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  ),
  "Reddit": (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-3 fill-current text-orange-500">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  )
};

// تعريف واجهة الخصائص (props) للمكون
interface VideoFormProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  transform?: string;
  placeholder?: string;
  error?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoForm = (props: VideoFormProps) => {
  const [videoUrl, setVideoUrl] = useState(props.value || "");
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
  const [actualQuality, setActualQuality] = useState<string>("");
  
  // Platform selection states
  const [platform, setPlatform] = useState("YouTube");
  const [showPlatformPopup, setShowPlatformPopup] = useState(false);

  // Define all supported platforms
  const platforms = ["YouTube", "Facebook", "TikTok", "Instagram", "X", "Snapchat", "Vimeo", "Dailymotion", "Twitch", "Reddit"];

  // Define quality options for all video and audio formats with more high-quality options
  // Make sure to include ALL quality options for better selection
  // Each array has 8 quality options to provide a complete range of choices
  const videoQualities = ["360p", "480p", "720p", "1080p", "1440p", "2K", "4K", "8K"];
  const audioQualities = ["64kbps", "128kbps", "192kbps", "256kbps", "320kbps", "500kbps", "1000kbps", "1500kbps"];
  
  // Add debug logs to verify all quality options are available
  useEffect(() => {
    console.log('VideoForm: All video quality options:', videoQualities);
    console.log('VideoForm: All audio quality options:', audioQualities);
    console.log('VideoForm: Current format quality options for', outputFormat, ':', formatQualityOptions[outputFormat]);
  }, [outputFormat]);
  
  // Define quality options for each format
  const formatQualityOptions = {
    // Video formats
    "mp4": videoQualities,
    "avi": videoQualities,
    "mkv": videoQualities,
    "mov": videoQualities,
    "webm": videoQualities,
    "flv": videoQualities,
    // Audio formats
    "mp3": audioQualities,
    "wav": audioQualities,
    "aac": audioQualities,
    "flac": audioQualities,
    "ogg": audioQualities,
    "m4a": audioQualities
  };
  
  // Log the contents of formatQualityOptions for debugging
  console.log('VideoForm: Format quality options initialized:', 
    Object.keys(formatQualityOptions).map(format => `${format}: ${formatQualityOptions[format].length} options`));
  
  // Define default quality for each format
  const defaultQualities = {
    // Video formats
    "mp4": "720p",
    "avi": "720p",
    "mkv": "720p",
    "mov": "720p",
    "webm": "720p",
    "flv": "720p",
    // Audio formats
    "mp3": "128kbps",
    "wav": "128kbps",
    "aac": "128kbps",
    "flac": "128kbps",
    "ogg": "128kbps",
    "m4a": "128kbps"
  };

  // Create state for all format qualities
  const [formatQualities, setFormatQualities] = useState({
    "mp4": videoQuality, // Use existing state
    "avi": "720p",
    "mkv": "720p",
    "mov": "720p",
    "webm": "720p",
    "flv": "720p",
    "mp3": audioQuality, // Use existing state
    "wav": "128kbps",
    "aac": "128kbps",
    "flac": "128kbps",
    "ogg": "128kbps",
    "m4a": "128kbps"
  });

  // Log initial format qualities
  useEffect(() => {
    console.log('VideoForm: Initial format qualities set:', formatQualities);
  }, []);

  // Define the convertVideo function
  const convertVideo = async (url: string, format: string) => {
    setStatus('loading');
    
    try {
      // Dismiss any existing toasts
      toast.dismiss();
      
      // Show loading status immediately
      const loadingToast = toast.loading("Converting your video...");
      
      // Build the URL with parameters
      let apiUrl = `${config.getPythonApiUrl()}/convert?url=${encodeURIComponent(url)}&format=${format}`;
      
      // Add quality parameters for any format
      const selectedQuality = formatQualities[format] || defaultQualities[format];
      apiUrl += `&quality=${selectedQuality}`;
      console.log(`Converting to ${format} with quality: ${selectedQuality}`);
      
      console.log("Full API URL:", apiUrl);
      
      // Make the API request
        const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5-minute timeout
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal
        });
        
        // Clear the timeout
        clearTimeout(timeoutId);
        
        // Dismiss loading toast explicitly to ensure it's closed
        toast.dismiss(loadingToast);
        
        if (!response.ok) {
          let errorMessage = `Server connection error: ${response.status}`;
          let errorDetails = '';
          
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
            errorDetails = errorData.details || '';
            
            console.error("Error details:", errorDetails);
          } catch (parseError) {
            // If we can't parse JSON, try to get text
            try {
              const errorText = await response.text();
              errorDetails = errorText;
            } catch (textError) {
              // If all else fails, use the original error
            }
          }
          
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log("Conversion response:", data);
        
        // Verify that the response contains the expected data
        if (!data.download_url) {
          throw new Error("Invalid server response: missing download URL");
        }
        
        // Store the direct download link from the server
        setDownloadUrl(data.download_url);
        
        // Extract actual quality from response
        const actualQuality = data.actual_quality || (format === 'mp4' ? videoQuality : audioQuality);
        
        // Update status and show success message
        setStatus('success');
        
        // Ensure all toasts are dismissed before showing success
        toast.dismiss();
        
        // Add a small delay before showing success message to ensure clean state
        setTimeout(() => {
          toast.success("Video conversion successful! Click the download button to get the file.");
        }, 300);
        
        // Store actual quality for display
        setActualQuality(actualQuality);
        
        // Call onSubmit (if provided) to update parent state
        if (props.onSubmit) {
          props.onSubmit();
        }
      } catch (fetchError) {
        // Clear the timeout if fetch failed
        clearTimeout(timeoutId);
        
        // Dismiss loading toast and show specific error
        toast.dismiss(loadingToast);
        
        if (fetchError.name === 'AbortError') {
          setErrorMessage("Conversion timeout: The request took too long to complete");
          toast.error("Conversion timeout: The request took too long to complete");
        } else {
          setErrorMessage(fetchError.message || "Failed to connect to the conversion server");
          toast.error(fetchError.message || "Failed to connect to the conversion server");
        }
        
        setStatus('error');
        
        // Call onSubmit (if provided) to update parent state
        if (props.onSubmit) {
          props.onSubmit();
        }
        
        return;
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred during conversion");
      setStatus('error');
      toast.error(error instanceof Error ? error.message : "Failed to convert video");
      
      // Call onSubmit (if provided) to update parent state
      if (props.onSubmit) {
        props.onSubmit();
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setErrorMessage("");
    setUrlError("");
    
      // First validate the URL
      if (!validateUrl(videoUrl)) {
      setErrorMessage(translations.error || "Please enter a valid video URL");
      setStatus('error');
      toast.error(translations.error || "Please enter a valid video URL");
      
      // Call onSubmit to reset loading state in parent if needed
      if (props.onSubmit) {
        props.onSubmit();
      }
        return;
      }
      
    // Set loading state
      setStatus('loading');
    
    // Check server connectivity before proceeding
    const isConnected = await checkServerConnectivity();
    if (!isConnected) {
      setErrorMessage("Cannot connect to the server. Please check your internet connection.");
        setStatus('error');
      toast.error("Cannot connect to the server. Please check your internet connection.");
      
      // Call onSubmit to reset loading state in parent if needed
      if (props.onSubmit) {
        props.onSubmit();
      }
        return;
      }
      
      // Proceed with video conversion
    // The convertVideo function will handle calling props.onSubmit when done
    await convertVideo(videoUrl, outputFormat);
  };

  const checkServerConnectivity = async () => {
    // Dismiss any existing toasts before checking
    toast.dismiss();
    
    try {
      console.log("Checking server connectivity with Flask server...");
      
      // Show a subtle loading toast
      const connectivityToast = toast.loading("Checking server connectivity...");
      
      // Make a simple request to the health endpoint
      const healthUrl = `${config.getPythonApiUrl()}/health`;
      console.log("Health check URL:", healthUrl);
      
      // Add a timeout to the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      try {
        const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });
      
        // Clear timeout
      clearTimeout(timeoutId);
        
        // Dismiss the toast explicitly
        toast.dismiss(connectivityToast);
        
        // Add a small delay to ensure toast animation completes
        await new Promise(resolve => setTimeout(resolve, 200));
      
      if (!response.ok) {
          console.error("Server health check failed with status:", response.status);
          toast.error(`Cannot connect to server (Status ${response.status}). Please try again later.`);
          return false;
      }
      
        // Check if response contains expected data
      const data = await response.json();
        if (!data.status || data.status !== 'ok') {
          console.error("Server health check returned unexpected data:", data);
          toast.error("Server not responding properly. Please try again later.");
          return false;
        }
        
        console.log("Server connectivity check passed:", data);
        return true;
      } catch (fetchError) {
        // Clear timeout
        clearTimeout(timeoutId);
        
        // Dismiss toast explicitly
        toast.dismiss(connectivityToast);
        
        // Add a small delay to ensure toast animation completes
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (fetchError.name === 'AbortError') {
          console.error("Server connectivity check timed out");
          toast.error("Server connection timed out. Please check your internet connection.");
        } else {
          console.error("Fetch error during server connectivity check:", fetchError);
          toast.error("Cannot reach the server. Please check your internet connection.");
        }
        
        return false;
      }
    } catch (error) {
      console.error("Server connectivity check failed:", error);
      // Dismiss all toasts before showing error
      toast.dismiss();
      toast.error("Cannot connect to server. Please check your internet connection.");
      return false;
    }
  };

  const handleDownload = async () => {
    // Clear any existing toasts before starting download
    toast.dismiss();
    
    try {
      if (!downloadUrl) {
        toast.error("No download URL available");
        return;
      }
      
      console.log("Downloading from URL:", downloadUrl);
      
      // Show loading toast
      const downloadToast = toast.loading("Starting download...");
      
      // Check if the URL is valid
      if (!downloadUrl.startsWith('http') && !downloadUrl.startsWith('/')) {
        toast.dismiss(downloadToast);
        throw new Error("Invalid download URL");
      }
      
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Try to get a filename from the URL
      const urlParts = downloadUrl.split('/');
      const possibleFilename = urlParts[urlParts.length - 1];
      
      // Set download attribute if we have a filename
      if (possibleFilename && possibleFilename.includes('.')) {
        link.download = possibleFilename;
      } else {
        // Generate a filename based on format
        link.download = `video.${outputFormat}`;
      }
      
      // Open in new tab as fallback
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Explicitly dismiss loading toast
      toast.dismiss(downloadToast);
      
      // Ensure all toasts are dismissed after a small delay to finish animation
      setTimeout(() => {
        toast.dismiss();
        // Show success message after clearing other toasts
        toast.success("Download started!");
      }, 300);
      
      // Track download for analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore
        window.gtag('event', 'download', {
          'event_category': 'Video',
          'event_label': outputFormat
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      // Dismiss all toasts before showing error
      toast.dismiss();
      toast.error('Failed to download file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const { language } = useLanguage();

  // Define translations based on the current language
  const getTranslations = () => {
    switch(language) {
      case 'en':
        return {
          title: props.title || "QuickConvert",
          subtitle: props.subtitle || "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks.",
          platformSelection: "Platform Selection",
          videoLink: props.videoUrl || "Video Link",
          conversionFormat: "Conversion Format",
          videoQuality: "Quality",
          enableTrimming: "Enable Video Trimming",
          transform: props.transform || "Convert Video",
          placeholder: props.placeholder || "https://www.youtube.com/watch?v=...",
          error: props.error || "Please enter a valid video URL",
          downloadStarted: "Download started successfully",
          downloadError: "Error downloading file",
          trimVideo: "Trim video",
          trimStart: "Start time (seconds)",
          trimEnd: "End time (seconds)",
          applyTrim: "Apply Trim",
          download: "Download",
          qrCode: "QR Code",
          drive: "Drive",
          dropbox: "Dropbox"
        };
      case 'fr':
        return {
          title: props.title || "QuickConvert",
          subtitle: props.subtitle || "Convertissez des vidéos de YouTube, Facebook, TikTok, Instagram et plus en format MP4 ou MP3 en quelques clics.",
          platformSelection: "Sélection de la plateforme",
          videoLink: props.videoUrl || "Lien vidéo",
          conversionFormat: "Format de conversion",
          videoQuality: "Qualité",
          enableTrimming: "Activer le découpage vidéo",
          transform: props.transform || "Convertir la vidéo",
          placeholder: props.placeholder || "https://www.youtube.com/watch?v=...",
          error: props.error || "Veuillez entrer une URL vidéo valide",
          downloadStarted: "Téléchargement démarré avec succès",
          downloadError: "Erreur lors du téléchargement du fichier",
          trimVideo: "Découper la vidéo",
          trimStart: "Heure de début (secondes)",
          trimEnd: "Heure de fin (secondes)",
          applyTrim: "Appliquer le découpage",
          download: "Télécharger",
          qrCode: "Code QR",
          drive: "Drive",
          dropbox: "Dropbox"
        };
      case 'ar':
        return {
          title: props.title || "QuickConvert",
          subtitle: props.subtitle || "حول مقاطع الفيديو من يوتيوب وفيسبوك وتيك توك وانستجرام والمزيد إلى صيغة MP4 أو MP3 بنقرات قليلة فقط.",
          platformSelection: "اختيار المنصة",
          videoLink: props.videoUrl || "رابط الفيديو",
          conversionFormat: "صيغة التحويل",
          videoQuality: "الجودة",
          enableTrimming: "تمكين قص الفيديو",
          transform: props.transform || "تحويل الفيديو",
          placeholder: props.placeholder || "https://www.youtube.com/watch?v=...",
          error: props.error || "يرجى إدخال رابط فيديو صالح",
          downloadStarted: "بدأ التنزيل بنجاح",
          downloadError: "خطأ في تنزيل الملف",
          trimVideo: "قص الفيديو",
          trimStart: "وقت البدء (ثواني)",
          trimEnd: "وقت النهاية (ثواني)",
          applyTrim: "تطبيق القص",
          download: "تنزيل",
          qrCode: "رمز QR",
          drive: "درايف",
          dropbox: "دروبوكس"
        };
      default:
        return {
          title: props.title || "QuickConvert",
          subtitle: props.subtitle || "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks.",
          platformSelection: "Platform Selection",
          videoLink: props.videoUrl || "Video Link",
          conversionFormat: "Conversion Format",
          videoQuality: "Quality",
          enableTrimming: "Enable Video Trimming",
          transform: props.transform || "Convert Video",
          placeholder: props.placeholder || "https://www.youtube.com/watch?v=...",
          error: props.error || "Please enter a valid video URL",
          downloadStarted: "Download started successfully",
          downloadError: "Error downloading file",
          trimVideo: "Trim video",
          trimStart: "Start time (seconds)",
          trimEnd: "End time (seconds)",
          applyTrim: "Apply Trim",
          download: "Download",
          qrCode: "QR Code",
          drive: "Drive",
          dropbox: "Dropbox"
        };
    }
  };

  const translations = getTranslations();

  // Refs for popup positioning
  const videoQualityButtonRef = useRef<HTMLButtonElement>(null);
  const audioQualityButtonRef = useRef<HTMLButtonElement>(null);
  const platformButtonRef = useRef<HTMLButtonElement>(null);
  
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
  // Function to validate video URL
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

  // Format seconds to HH:MM:SS - function kept as it may be used elsewhere
  const formatTime = (seconds: number) => {
    if (!seconds && seconds !== 0) return "00:00";
    
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };

  // Function to share to Google Drive - Nombre de archivo mejorado
  const shareToGoogleDrive = async () => {
    // Dismiss any existing toasts before starting
    toast.dismiss();
    
    if (!downloadUrl) {
      toast.error("No file available to share");
      return;
    }
    
    try {
      // Show loading toast
      const loadingToast = toast.loading("Preparing file for Google Drive...");
      
      // First download the file locally
      try {
        // Create a temporal link to download the file
        const response = await fetch(downloadUrl);
      if (!response.ok) {
          // Make sure to dismiss the loading toast
          toast.dismiss(loadingToast);
          throw new Error(`Failed to download file for sharing: ${response.status}`);
        }
        
        const blob = await response.blob();
        
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Add a small delay to ensure toast animation completes
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Generate a better filename with date
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const timeStr = `${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;
        const fileName = `converted_video_${dateStr}_${timeStr}.${outputFormat}`;
        
        // Create local download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clear all toasts before showing success
        toast.dismiss();
        
        // Show success message
        toast.success(`File '${fileName}' downloaded successfully`);
        
        // After successful download, open Google Drive in a new window
        window.open("https://drive.google.com/", "_blank");
        toast.info("Please upload the downloaded file to Google Drive manually");
    } catch (error) {
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Add a small delay to ensure toast animation completes
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Clear all toasts before showing error
        toast.dismiss();
        
        // Show error message
        toast.error("Failed to download file for Google Drive: " + (error instanceof Error ? error.message : "Unknown error"));
        console.error("Google Drive download error:", error);
      }
    } catch (error) {
      // Clear all toasts before showing error
      toast.dismiss();
      
      toast.error("Failed to prepare file for Google Drive: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error("Google Drive sharing error:", error);
    }
  };

  // Function to share to Dropbox - Nombre de archivo mejorado
  const shareToDropbox = async () => {
    // Dismiss any existing toasts before starting
    toast.dismiss();
    
    if (!downloadUrl) {
      toast.error("No file available to share");
      return;
    }
    
    try {
      // Show loading toast
      const loadingToast = toast.loading("Preparing file for Dropbox...");
      
      // First download the file locally
      try {
        // Create a temporal link to download the file
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          // Make sure to dismiss the loading toast
          toast.dismiss(loadingToast);
          throw new Error(`Failed to download file for sharing: ${response.status}`);
        }
        
        const blob = await response.blob();
        
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Add a small delay to ensure toast animation completes
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Generate a better filename with date
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const timeStr = `${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;
        const fileName = `converted_video_${dateStr}_${timeStr}.${outputFormat}`;
        
        // Create local download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clear all toasts before showing success
        toast.dismiss();
        
        // Show success message
        toast.success(`File '${fileName}' downloaded successfully`);
        
        // After successful download, open Dropbox in a new window
        window.open("https://www.dropbox.com/upload", "_blank");
        toast.info("Please upload the downloaded file to Dropbox manually");
      } catch (error) {
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Add a small delay to ensure toast animation completes
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Clear all toasts before showing error
        toast.dismiss();
        
        // Show error message
        toast.error("Failed to download file for Dropbox: " + (error instanceof Error ? error.message : "Unknown error"));
        console.error("Dropbox download error:", error);
      }
    } catch (error) {
      // Clear all toasts before showing error
      toast.dismiss();
      
      toast.error("Failed to prepare file for Dropbox: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error("Dropbox sharing error:", error);
    }
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
    if (!qrCodeUrl) {
      toast.error("No QR code available to download");
      return;
    }
    
    try {
      console.log("Downloading QR code from URL:", qrCodeUrl);
      
      // Use fetch to get the QR code image as blob
      fetch(qrCodeUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch QR code: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          // Create object URL from blob
          const blobUrl = URL.createObjectURL(blob);
          
          // Create download link
    const link = document.createElement('a');
          link.href = blobUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
          
          // Clean up
          setTimeout(() => {
    document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
          }, 100);
          
          toast.success("QR code downloaded successfully!");
        })
        .catch(error => {
          console.error("QR download error:", error);
          toast.error("Failed to download QR code: " + error.message);
        });
    } catch (error) {
      console.error("QR code download error:", error);
      toast.error("Failed to download QR code");
    }
  };

  // Update videoUrl when props.value changes
  useEffect(() => {
    if (props.value !== undefined) {
      setVideoUrl(props.value);
    }
  }, [props.value]);
  
  // Handle URL input change from UrlInput component
  const handleUrlInputChange = (value: string) => {
    setVideoUrl(value);
    if (props.onChange) {
      props.onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Add a function to handle component unmounting that clears all toasts
  React.useEffect(() => {
    // Return cleanup function to be called when component unmounts
    return () => {
      // Clear all toast notifications on unmount
      toast.dismiss();
    };
  }, []);

  // Add a function to clear any stray toasts when status changes
  React.useEffect(() => {
    // When status changes to success or error, ensure all toasts are dismissed
    if (status === 'success' || status === 'error') {
      // Set a small timeout to ensure all toasts are cleared after state changes
      setTimeout(() => {
        toast.dismiss();
      }, 500);
    }
  }, [status]);

  // Function to update quality for any format
  const updateFormatQuality = (format: string, quality: string) => {
    // Update the specific format quality
    setFormatQualities(prev => ({
      ...prev,
      [format]: quality
    }));
    
    // For backward compatibility, also update videoQuality and audioQuality
    if (format === 'mp4') {
      setVideoQuality(quality);
    } else if (format === 'mp3') {
      setAudioQuality(quality);
    }
  };

  // Add a function to ensure the quality popup is correctly initialized
  useEffect(() => {
    // This ensures we re-render the quality popup when needed
    if (showVideoQualityPopup) {
      console.log('VideoForm: Quality popup is open for format', outputFormat);
      
      // Force the popup to re-render by briefly toggling its state
      setTimeout(() => {
        setShowVideoQualityPopup(false);
        setTimeout(() => {
          setShowVideoQualityPopup(true);
        }, 10);
      }, 10);
    }
  }, [outputFormat]);

  // Add CSS styles to improve scrollbar appearance in the head
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    // Add CSS rules
    style.textContent = `
      /* Custom scrollbar styles for quality popup */
      .quality-popup {
        scrollbar-width: thin !important;
        scrollbar-color: #818cf8 #f1f5f9 !important;
        max-height: 320px !important;
        overflow-y: auto !important;
        backdrop-filter: blur(12px) !important;
        background-color: rgba(255, 255, 255, 0.85) !important;
        border: 1px solid rgba(129, 140, 248, 0.2) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
      }

      .dark .quality-popup {
        background-color: rgba(17, 24, 39, 0.85) !important;
        border-color: rgba(79, 70, 229, 0.2) !important;
      }

      .quality-popup:hover {
        backdrop-filter: blur(16px) !important;
        border-color: rgba(129, 140, 248, 0.4) !important;
      }

      .quality-popup-item {
        backdrop-filter: blur(8px) !important;
        background-color: rgba(255, 255, 255, 0.5) !important;
        border-bottom: 1px solid rgba(129, 140, 248, 0.1) !important;
        transition: all 0.3s ease !important;
      }

      .dark .quality-popup-item {
        background-color: rgba(17, 24, 39, 0.5) !important;
        border-bottom-color: rgba(79, 70, 229, 0.1) !important;
      }

      .quality-popup-item:hover {
        background-color: rgba(243, 244, 246, 0.8) !important;
        transform: translateX(4px) !important;
      }

      .dark .quality-popup-item:hover {
        background-color: rgba(55, 65, 81, 0.8) !important;
      }

      .quality-popup-item.selected {
        background: linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(99, 102, 241, 0.1)) !important;
        backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(129, 140, 248, 0.3) !important;
        font-weight: 500 !important;
      }

      .dark .quality-popup-item.selected {
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(67, 56, 202, 0.1)) !important;
        border-color: rgba(79, 70, 229, 0.3) !important;
      }

      .quality-popup-item.selected .checkmark {
        width: 24px !important;
        height: 24px !important;
        color: #22c55e !important;
        transform: scale(1.2) !important;
        filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4)) !important;
        transition: all 0.3s ease !important;
      }

      .dark .quality-popup-item.selected .checkmark {
        color: #4ade80 !important;
        filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.4)) !important;
      }

      /* Platform and quality buttons glass effect */
      .platform-button, .quality-button {
        backdrop-filter: blur(8px) !important;
        background-color: rgba(255, 255, 255, 0.8) !important;
        border: 1px solid rgba(129, 140, 248, 0.2) !important;
        transition: all 0.3s ease !important;
      }

      .dark .platform-button, .dark .quality-button {
        background-color: rgba(17, 24, 39, 0.8) !important;
        border-color: rgba(79, 70, 229, 0.2) !important;
      }

      .platform-button:hover, .quality-button:hover {
        backdrop-filter: blur(12px) !important;
        border-color: rgba(129, 140, 248, 0.4) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
      }

      .dark .platform-button:hover, .dark .quality-button:hover {
        border-color: rgba(79, 70, 229, 0.4) !important;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
      }
    `;
    // Add it to the document head
    document.head.appendChild(style);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Add CSS for scrollbar and layout improvements
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Custom scrollbar styles - with !important to ensure they override any other styles */
      .quality-popup::-webkit-scrollbar {
        width: 10px !important;
        height: 10px !important;
        display: block !important;
      }

      .quality-popup::-webkit-scrollbar-track {
        background: #f1f5f9 !important;
        border-radius: 8px !important;
        display: block !important;
      }

      .quality-popup::-webkit-scrollbar-thumb {
        background-color: #818cf8 !important;
        border-radius: 8px !important;
        border: 3px solid #f1f5f9 !important;
        display: block !important;
      }

      .dark .quality-popup::-webkit-scrollbar-track {
        background: #1e293b !important;
        border-radius: 8px !important;
        display: block !important;
      }

      .dark .quality-popup::-webkit-scrollbar-thumb {
        background-color: #4f46e5 !important;
        border-radius: 8px !important;
        border: 3px solid #1e293b !important;
        display: block !important;
      }
      
      /* Improve main form container */
      form.video-form-container {
        margin-bottom: 4rem !important;
        padding-bottom: 3rem !important;
        min-height: 580px !important; /* Ensure enough space for the form */
      }
      
      /* Push the main button down if needed */
      .video-form-container .submit-button {
        margin-top: 2rem !important;
      }
      
      /* Make the quality popup scrollable and clearly visible */
      .quality-popup {
        max-height: 400px !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        z-index: 100 !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
        scrollbar-width: thin !important;
        scrollbar-color: #818cf8 #f1f5f9 !important;
      }
      
      /* Adjust quality selection container */
      .quality-selection-container {
        margin-top: 1.5rem !important;
        margin-bottom: 1.5rem !important;
        padding: 1rem !important;
      }
      
      /* Ensure the scrollbar is visible in Firefox */
      @-moz-document url-prefix() {
        .quality-popup {
          scrollbar-width: thin !important;
          scrollbar-color: #818cf8 #f1f5f9 !important;
        }
        
        .dark .quality-popup {
          scrollbar-color: #4f46e5 #1e293b !important;
        }
      }
    `;
    
    // Append to head
    document.head.appendChild(styleElement);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Add a function to ensure scrollbars are visible in the quality popup
  useEffect(() => {
    // This function will be called when the quality popup is shown
    const ensureScrollbarsVisible = () => {
      if (showVideoQualityPopup) {
        // Find all quality popup elements
        const popups = document.querySelectorAll('.quality-popup');
        
        // Apply direct styles to ensure scrollbars are visible
        popups.forEach(popup => {
          const element = popup as HTMLElement;
          
          // Force scrollbar visibility
          element.style.overflowY = 'scroll';
          if ('scrollbarWidth' in element.style) {
            (element.style as any).scrollbarWidth = 'thin';
          }
          
          // Add a small delay to ensure styles are applied after render
          setTimeout(() => {
            element.style.overflowY = 'auto';
          }, 50);
        });
      }
    };
    
    // Call the function when the popup state changes
    ensureScrollbarsVisible();
    
    // Add a window resize listener to ensure scrollbars remain visible
    window.addEventListener('resize', ensureScrollbarsVisible);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', ensureScrollbarsVisible);
    };
  }, [showVideoQualityPopup]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Dark mode toggle */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 btn-shake"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? 
            <Sun className="h-5 w-5 text-amber-500" /> : 
            <Moon className="h-5 w-5 text-indigo-600" />
          }
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
        <form 
          className="video-form-container space-y-6 w-full max-w-[600px] rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all md:p-8 mb-12"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {/* Platform selector */}
            <div className="relative">
              <label className="text-lg font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">{translations.platformSelection}</label>
              <button
                type="button"
                ref={platformButtonRef}
                onClick={() => setShowPlatformPopup(!showPlatformPopup)}
                className="platform-button mt-2 w-full flex items-center justify-between rounded-lg border-4 border-indigo-400 dark:border-indigo-600 p-4 text-base transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/20 shadow-md"
              >
                <span className="flex items-center">
                  {PlatformIcons[platform] || <Globe className="h-6 w-6 mr-3" />}
                  <span className="font-medium text-lg">{platform}</span>
                </span>
                <ChevronDown className="h-5 w-5" />
              </button>
              
              <AnimatePresence>
                {showPlatformPopup && (
                  <motion.div 
                    className="quality-popup mt-2 absolute w-full z-50 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg shadow-lg overflow-y-auto max-h-[400px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {platforms.map(platformOption => (
                      <div 
                        key={platformOption}
                        className={`quality-popup-item ${platform === platformOption ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                        onClick={() => {
                          setPlatform(platformOption);
                          setShowPlatformPopup(false);
                        }}
                      >
                        <span className="flex items-center">
                          {PlatformIcons[platformOption] || <Globe className="h-6 w-6 mr-3" />}
                          <span className="text-base">{platformOption}</span>
                        </span>
                        {platform === platformOption && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <UrlInput 
              value={videoUrl} 
              onChange={handleUrlInputChange} 
              error={urlError} 
            />
            
            <FormatSelector 
              selectedFormat={outputFormat} 
              onChange={setOutputFormat} 
            />
          </div>
          
          {/* Quality options based on selected format - now with popup */}
          {formatQualityOptions[outputFormat] && (
            <div className="mt-4 p-4 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg shadow-md bg-white dark:bg-gray-900 relative quality-selection-container">
              <label className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                {outputFormat.match(/mp4|avi|mkv|mov|webm|flv/) ? (
                  <Video className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Music className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                )}
                {translations.videoQuality}
              </label>
              <button
                type="button"
                ref={videoQualityButtonRef}
                onClick={() => setShowVideoQualityPopup(!showVideoQualityPopup)}
                className="quality-button mt-2 w-full flex items-center justify-between rounded-lg border-2 border-indigo-200 dark:border-indigo-800 p-3 text-base transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm"
              >
                <span>{formatQualities[outputFormat] || defaultQualities[outputFormat]}</span>
                <ChevronDown className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              </button>
              
              <AnimatePresence>
                {showVideoQualityPopup && (
                  <motion.div 
                    className="quality-popup mt-2 absolute w-full z-50 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg shadow-lg overflow-y-auto max-h-[400px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#818cf8 #f1f5f9',
                      overflowY: 'auto',
                      display: 'block'
                    }}
                  >
                    {/* HARD-CODE ALL OPTIONS to ensure they all appear regardless of any potential filtering */}
                    {outputFormat.match(/mp4|avi|mkv|mov|webm|flv/) ? (
                      // Video formats - explicitly list all options
                      <>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "360p" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "360p");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>360p</span>
                          </span>
                          {formatQualities[outputFormat] === "360p" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "480p" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "480p");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>480p</span>
                          </span>
                          {formatQualities[outputFormat] === "480p" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "720p" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "720p");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>720p</span>
                          </span>
                          {formatQualities[outputFormat] === "720p" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "1080p" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "1080p");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>1080p</span>
                          </span>
                          {formatQualities[outputFormat] === "1080p" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "1440p" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "1440p");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>1440p</span>
                          </span>
                          {formatQualities[outputFormat] === "1440p" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "2K" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "2K");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>2K</span>
                          </span>
                          {formatQualities[outputFormat] === "2K" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "4K" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "4K");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>4K</span>
                          </span>
                          {formatQualities[outputFormat] === "4K" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "8K" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "8K");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                            <span>8K</span>
                          </span>
                          {formatQualities[outputFormat] === "8K" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                      </>
                    ) : (
                      // Audio formats - explicitly list all options
                      <>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "64kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "64kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                            <span>64kbps</span>
                          </span>
                          {formatQualities[outputFormat] === "64kbps" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "128kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "128kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                            <span>128kbps</span>
                          </span>
                          {formatQualities[outputFormat] === "128kbps" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "192kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "192kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                            <span>192kbps</span>
                          </span>
                          {formatQualities[outputFormat] === "192kbps" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "256kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "256kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                            <span>256kbps</span>
                          </span>
                          {formatQualities[outputFormat] === "256kbps" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "320kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "320kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                            <span>320kbps</span>
                          </span>
                          {formatQualities[outputFormat] === "320kbps" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "500kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "500kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          <span className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-pink-500 dark:text-pink-400" />
                            <span>500kbps</span>
                          </span>
                          {formatQualities[outputFormat] === "500kbps" && <Check className="checkmark h-6 w-6 text-green-500 dark:text-green-400" />}
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "1000kbps" ? 'selected bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-indigo-50 dark:border-indigo-900/10`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "1000kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          1000kbps
                        </div>
                        <div 
                          className={`quality-popup-item ${formatQualities[outputFormat] === "1500kbps" ? 'bg-indigo-50 dark:bg-indigo-900/20 font-medium text-indigo-700 dark:text-indigo-400' : ''} flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors`}
                          onClick={() => {
                            updateFormatQuality(outputFormat, "1500kbps");
                            setShowVideoQualityPopup(false);
                          }}
                        >
                          1500kbps
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 py-4 text-lg font-semibold text-white shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed btn-shake mt-6 submit-button"
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
          onDownload={handleDownload}
          selectedQuality={outputFormat === 'mp4' ? videoQuality : audioQuality}
          actualQuality={actualQuality}
        />
        
        {/* Cloud upload options and QR code (shown when conversion is successful) */}
        {status === 'success' && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-medium mb-3">{translations.subtitle}</h3>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={showQRCode}
                  className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
                >
                  <span>{translations.qrCode}</span>
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={shareToGoogleDrive}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                    title="Share to Google Drive"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-1">
                      <path fill="#fff" d="M8.267 14.68c0.089 0.132 0.147 0.253 0.265 0.345 0.125 0.097 0.254 0.17 0.385 0.242 0.505 0.268 1.093 0.434 1.701 0.497 0.64 0.069 1.304 0.027 1.945-0.1 0.295-0.058 0.587-0.138 0.876-0.223 0.464-0.137 0.881-0.295 1.254-0.497 0.256-0.137 0.51-0.277 0.751-0.435 0.292-0.189 0.557-0.401 0.822-0.628 0.151-0.13 0.29-0.271 0.431-0.403 0.09-0.085 0.087-0.17 0.18-0.256 0.032-0.037 0.087-0.076 0.099-0.059 0.033-0.118 0.133-0.17 0.183-0.188 0.188-0.392 0.372-0.596 0.553-0.142 0.125-0.328 0.222-0.483 0.334-0.133 0.095-0.095 0.187-0.187 0.252-0.279 0.175-0.187 0.345-0.378 0.511-0.573 0.218-0.256 0.411-0.535 0.618-0.802 0.327-0.423 0.647-0.839 0.945-1.284 0.131-0.196 0.255-0.394 0.372-0.599 0.044-0.077 0.085-0.156 0.127-0.233 0.054-0.099 0.092-0.2 0.147 0.298-0.177 0.161-0.351 0.404-0.487 0.593z"></path>
                    </svg>
                    <span>{translations.drive}</span>
                  </button>
                  
                  <button
                    onClick={shareToDropbox}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                    title="Share to Dropbox"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-1">
                      <path fill="#fff" d="M6 2L0 8l6 6 6-6-6-6zM12 8l6 6 6-6-6-6-6 6zM6 16L0 22l6 6 6-6-6-6zM18 16l-6 6 6 6 6-6-6-6z"></path>
                    </svg>
                    <span>{translations.dropbox}</span>
                  </button>
                </div>
              </div>
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
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Scan QR Code to Download</h3>
            
            {qrCodeUrl && (
              <>
                <div className="flex justify-center mb-4">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for download" 
                  className="w-72 h-72 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg shadow-md" 
                />
              </div>
                <button
                  onClick={downloadQRCode}
                  className="px-6 py-3 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md w-full mb-3 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download QR Code
                </button>
              </>
            )}
            
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
              Scan this QR code with your mobile device to download the converted file.
            </p>
              
              <button
                onClick={() => setShowQR(false)}
              className="px-6 py-3 bg-gray-300 text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-400 transition-colors duration-300 w-full"
              >
                Close
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoForm;
