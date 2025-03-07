import React from 'react';
import { motion } from 'framer-motion';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const StepCard = ({ number, title, description, delay }: StepCardProps) => {
  // Different colors for each step number
  const numberColors = {
    1: "bg-indigo-500 dark:bg-indigo-600 text-white",
    2: "bg-purple-500 dark:bg-purple-600 text-white",
    3: "bg-pink-500 dark:bg-pink-600 text-white"
  };
  
  return (
    <motion.div
      className="rounded-lg border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-7 shadow-md transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${numberColors[number as keyof typeof numberColors]} text-lg font-bold transition-colors shadow-md`}>
        {number}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default StepCard; 