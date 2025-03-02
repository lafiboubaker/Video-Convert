
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </motion.h1>
          
          <div className="space-y-6 text-foreground/90">
            <p className="italic text-sm text-muted-foreground">Last Updated: September 1, 2023</p>
            
            <p>
              At QuickConvert, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you use our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>URLs of videos you wish to convert</li>
              <li>IP address and browser information for service improvement and security</li>
              <li>Email address if you sign up for our newsletter or contact support</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8">How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To improve our website functionality and user experience</li>
              <li>To monitor usage of our service</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To respond to your inquiries and provide customer support</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8">Storage of Converted Files</h2>
            <p>
              QuickConvert processes videos for conversion but does not permanently store your converted files on our servers. Once a video is converted and downloaded by you, it is automatically removed from our temporary storage within 24 hours.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Security</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@quickconvert.com.
            </p>
            
            <p className="text-sm text-muted-foreground mt-8">
              By using QuickConvert, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </motion.div>
        
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
