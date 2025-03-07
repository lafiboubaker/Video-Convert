
import { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Link } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const UrlInput = ({ value, onChange, error }: UrlInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="video-url" className="text-lg font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
          Video Link
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg p-3">
                <p>Enter the URL of the video you want to convert from YouTube, Facebook, TikTok, Instagram, or other supported platforms</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
      </div>
      
      <motion.div
        className={`overflow-hidden rounded-lg border-4 ${
          isFocused ? "ring-4 ring-indigo-500 dark:ring-indigo-600 border-indigo-600 dark:border-indigo-500" : ""
        } ${error ? "border-red-400 bg-red-50 dark:border-red-800 dark:bg-red-900/20" : "border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10"} transition-all duration-200 shadow-lg`}
        whileTap={{ scale: 0.995 }}
      >
        <input
          id="video-url"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter video link"
          className="w-full px-6 py-5 outline-none bg-transparent placeholder:text-muted-foreground/70 text-lg font-medium"
        />
      </motion.div>
      
      {error && (
        <motion.p 
          className="text-sm font-medium text-red-500 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/10 rounded-md border border-red-200 dark:border-red-800/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default UrlInput;
