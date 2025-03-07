import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ConversionStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  downloadUrl: string;
  onDownload: () => void;
  selectedQuality?: string;
  actualQuality?: string;
}

const ConversionStatus: React.FC<ConversionStatusProps> = ({ 
  status, 
  errorMessage, 
  downloadUrl, 
  onDownload,
  selectedQuality,
  actualQuality
}) => {
  // Clear any pending toasts when status changes
  useEffect(() => {
    // When component mounts or status changes, clear any lingering toasts
    if (status === 'success' || status === 'error') {
      // Dismiss existing toasts
      toast.dismiss();
    }
  }, [status]);

  if (status === 'idle') return null;
  
  return (
    <AnimatePresence mode="wait">
      {status === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-8 flex flex-col items-center justify-center space-y-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 shadow-sm"
        >
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-base font-medium text-gray-700 dark:text-gray-300 animate-pulse">Converting your video...</p>
        </motion.div>
      )}
      
      {status === 'error' && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-8 rounded-lg border-2 border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-6 text-center shadow-sm"
        >
          <p className="text-base font-semibold text-red-800 dark:text-red-300">Conversion failed</p>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">{errorMessage || "There was an error processing your request. Please try again."}</p>
        </motion.div>
      )}
      
      {status === 'success' && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-8 w-full"
        >
          <div className="rounded-lg border-2 border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 p-6 text-center shadow-sm">
            <p className="text-base font-semibold text-green-800 dark:text-green-300">Conversion successful!</p>
            <p className="mt-2 text-sm text-green-700 dark:text-green-400">
              Your file is ready for download
              {selectedQuality && (
                <span className="block mt-1 font-medium text-green-600 dark:text-green-400">
                  Requested Quality: {selectedQuality}
                </span>
              )}
              {actualQuality && actualQuality !== selectedQuality && (
                <span className="block mt-1 font-medium text-amber-600 dark:text-amber-400">
                  Actual Quality: {actualQuality}
                </span>
              )}
            </p>
          </div>
          
          <motion.a
            href={downloadUrl}
            download
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-4 py-4 text-base font-semibold text-white shadow-md btn-shake"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Download className="h-4 w-4" />
            Download Now
          </motion.a>
          
          <motion.button
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 btn-shake"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Share2 className="h-4 w-4" />
            Share Link
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversionStatus;
