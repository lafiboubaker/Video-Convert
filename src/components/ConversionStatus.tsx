
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2 } from "lucide-react";

interface ConversionStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string;
  downloadUrl?: string;
}

const ConversionStatus = ({ status, errorMessage, downloadUrl }: ConversionStatusProps) => {
  if (status === 'idle') return null;
  
  return (
    <AnimatePresence mode="wait">
      {status === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-8 flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Converting your video...</p>
        </motion.div>
      )}
      
      {status === 'error' && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-8 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-4 text-center"
        >
          <p className="text-sm font-medium text-red-800 dark:text-red-300">Conversion failed</p>
          <p className="mt-1 text-xs text-red-700 dark:text-red-400">{errorMessage || "There was an error processing your request. Please try again."}</p>
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
          <div className="rounded-lg border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 p-4 text-center">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">Conversion successful!</p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-400">Your file is ready for download</p>
          </div>
          
          <motion.a
            href={downloadUrl}
            download
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm btn-shake"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Download className="h-4 w-4" />
            Download Now
          </motion.a>
          
          <motion.button
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 btn-shake"
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
