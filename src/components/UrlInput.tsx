
import { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const UrlInput = ({ value, onChange, error }: UrlInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="video-url" className="text-sm font-medium flex items-center gap-1.5">
          Video URL
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Paste URL from YouTube, Facebook, TikTok, Instagram and more</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
      </div>
      
      <motion.div
        className={`overflow-hidden rounded-lg border ${
          isFocused ? "ring-2 ring-purple-200 dark:ring-purple-800" : ""
        } ${error ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20" : "border-input bg-background"} transition-colors`}
        whileTap={{ scale: 0.995 }}
      >
        <input
          id="video-url"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-3 py-2.5 outline-none bg-transparent placeholder:text-muted-foreground/70"
        />
      </motion.div>
      
      {error && (
        <motion.p 
          className="text-sm text-red-500 dark:text-red-400"
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
