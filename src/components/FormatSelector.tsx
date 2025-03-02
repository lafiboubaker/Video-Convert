
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, FileVideo, Music } from "lucide-react";

interface FormatSelectorProps {
  selectedFormat: string;
  onChange: (format: string) => void;
}

const FormatSelector = ({ selectedFormat, onChange }: FormatSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Output Format</label>
      
      <div className="grid grid-cols-2 gap-2">
        <FormatOption
          value="mp4"
          label="Video (MP4)"
          icon={<FileVideo className="h-4 w-4" />}
          isSelected={selectedFormat === "mp4"}
          onChange={onChange}
        />
        <FormatOption
          value="mp3"
          label="Audio (MP3)"
          icon={<Music className="h-4 w-4" />}
          isSelected={selectedFormat === "mp3"}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

interface FormatOptionProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onChange: (format: string) => void;
}

const FormatOption = ({ value, label, icon, isSelected, onChange }: FormatOptionProps) => {
  return (
    <motion.button
      type="button"
      onClick={() => onChange(value)}
      className={`relative flex items-center space-x-2 rounded-lg border p-3 ${
        isSelected 
          ? "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20" 
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      } transition-colors`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className={`rounded-full p-1 ${isSelected ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"}`}>
        {icon}
      </span>
      <span className={`text-sm font-medium ${isSelected ? "text-purple-600 dark:text-purple-400" : "text-gray-700 dark:text-gray-300"}`}>
        {label}
      </span>
      {isSelected && (
        <motion.span 
          className="absolute right-2 top-2 text-purple-600 dark:text-purple-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Check className="h-4 w-4" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default FormatSelector;
