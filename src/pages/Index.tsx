import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/Header";
import { motion } from "framer-motion";
import VideoForm from "@/components/VideoForm";

export default function Index() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, direction, textAlign } = useLanguage();

  // Translations for the Index page
  const indexTranslations = {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      toast({
        title: indexTranslations.error,
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Your video has been transformed.",
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-900/40 to-purple-900/30 dark:from-indigo-950 dark:to-purple-950 transition-colors duration-300 relative" style={{ direction }}>
      {/* Wave background animation */}
      <div className="wave-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <div className="container mx-auto flex flex-1 flex-col px-4 py-8 relative z-10">
        <Header />
        
        <motion.div
          className="my-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VideoForm 
            title={indexTranslations.title}
            subtitle={indexTranslations.subtitle}
            videoUrl={indexTranslations.videoUrl}
            transform={indexTranslations.transform}
            placeholder={indexTranslations.placeholder}
            error={indexTranslations.error}
          />
          
          <motion.div 
            className="mt-16 w-full max-w-2xl px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold">How It Works</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <StepCard
                number={1}
                title="Paste URL"
                description="Enter the URL of the video you want to convert"
                delay={0.7}
              />
              <StepCard
                number={2}
                title="Select Format"
                description="Choose your desired output format (MP4 or MP3)"
                delay={0.8}
              />
              <StepCard
                number={3}
                title="Download"
                description="Get your converted file with one click"
                delay={0.9}
              />
            </div>
          </motion.div>
          
          {/* Platform support */}
          <motion.div
            className="mt-16 w-full max-w-2xl px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-4">Supported Platforms</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <PlatformBadge name="YouTube" />
              <PlatformBadge name="Facebook" />
              <PlatformBadge name="TikTok" />
              <PlatformBadge name="Instagram" />
              <PlatformBadge name="Twitter" />
              <PlatformBadge name="Vimeo" />
            </div>
          </motion.div>
          
          {/* Blog section preview */}
          <motion.div
            className="mt-24 w-full max-w-3xl px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-xl font-semibold mb-6">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <BlogCard
                title="Top 10 Video Editing Software in 2023"
                excerpt="Discover the best tools for creating professional videos with our comprehensive guide."
                imageUrl="https://images.unsplash.com/photo-1574717024453-354056afd6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              />
              <BlogCard
                title="How to Enhance Audio Quality After Conversion"
                excerpt="Learn professional techniques to improve your audio after converting from videos."
                imageUrl="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              />
            </div>
            <motion.button
              className="mt-8 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 btn-shake"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Articles
            </motion.button>
          </motion.div>
        </motion.div>
        
        <Footer />
      </div>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const StepCard = ({ number, title, description, delay }: StepCardProps) => {
  return (
    <motion.div
      className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium transition-colors">
        {number}
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface PlatformBadgeProps {
  name: string;
}

const PlatformBadge = ({ name }: PlatformBadgeProps) => {
  return (
    <motion.div
      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-sm font-medium border border-gray-100 dark:border-gray-700"
      whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    >
      {name}
    </motion.div>
  );
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
}

const BlogCard = ({ title, excerpt, imageUrl }: BlogCardProps) => {
  return (
    <motion.div
      className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm transition-colors"
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
        />
      </div>
      <div className="p-4 text-left">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="mt-2 text-xs text-muted-foreground">{excerpt}</p>
        <div className="mt-3">
          <a href="#" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
            Read More →
          </a>
        </div>
      </div>
    </motion.div>
  );
};
