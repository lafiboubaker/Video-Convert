
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-900/20 to-purple-900/10 dark:from-indigo-950 dark:to-purple-950 transition-colors duration-300 relative">
      {/* Wave background animation */}
      <div className="wave-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <div className="container mx-auto flex flex-1 flex-col px-4 py-8 relative z-10">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <motion.div
          className="glass-card rounded-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About QuickConvert
          </motion.h1>
          
          <div className="space-y-6 text-foreground/90">
            <p>
              QuickConvert is a cutting-edge platform designed to simplify the way you interact with online video content. Our mission is to provide a seamless and efficient solution for converting videos from popular platforms into formats that suit your needs, all while respecting copyright laws and content creator rights.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Our Story</h2>
            <p>
              Founded in 2023, QuickConvert was born out of frustration with complex, ad-filled conversion tools that often delivered poor results. Our team of passionate developers and digital media enthusiasts set out to create a tool that was both powerful and user-friendly.
            </p>
            
            <p>
              What started as a simple converter has grown into a comprehensive platform that supports multiple formats, quality options, and advanced features like video trimming and cloud integration.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Our Technology</h2>
            <p>
              QuickConvert utilizes state-of-the-art conversion algorithms that optimize for both speed and quality. Our infrastructure is designed to handle thousands of conversions simultaneously, ensuring you never have to wait long for your media.
            </p>
            
            <p>
              We continuously update our systems to support the latest formats and platforms, keeping pace with the ever-evolving digital media landscape.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Simplicity:</strong> We believe powerful tools don't have to be complicated.</li>
              <li><strong>Respect:</strong> We respect content creators and intellectual property rights.</li>
              <li><strong>Privacy:</strong> We prioritize your privacy and don't store your converted content.</li>
              <li><strong>Quality:</strong> We're committed to providing high-quality conversions every time.</li>
              <li><strong>Accessibility:</strong> Our tools are designed to be accessible to everyone, regardless of technical knowledge.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
            <p>
              We're always looking to improve QuickConvert and welcome your feedback. If you have questions, suggestions, or concerns, please don't hesitate to reach out to our support team at support@quickconvert.com.
            </p>
            
            <p className="text-sm text-muted-foreground mt-8">
              Thank you for choosing QuickConvert for your media conversion needs. We're excited to be part of your digital journey.
            </p>
          </div>
        </motion.div>
        
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
