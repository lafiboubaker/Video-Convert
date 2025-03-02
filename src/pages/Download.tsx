import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Download = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the file ID from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const format = searchParams.get('format') || 'mp4';

  useEffect(() => {
    if (!id) {
      toast.error("No download ID provided");
      navigate('/');
      return;
    }
    
    // Start download automatically
    setIsDownloading(true);
    
    try {
      // Use static file for download
      const staticFileUrl = format === "mp3" 
        ? "/downloads/sample.mp3" 
        : "/downloads/sample.mp4";
      
      // Create an anchor element
      const link = document.createElement('a');
      
      // Set the href to the static file URL
      link.href = staticFileUrl;
      
      // Generate a unique filename
      const fileName = `video-${id}-converted.${format}`;
      link.download = fileName;
      
      // Append to the document
      document.body.appendChild(link);
      
      // Trigger the click
      link.click();
      
      // Remove from the document
      document.body.removeChild(link);
      
      setIsDownloading(false);
      toast.success("Download started successfully");
      
      // Redirect back to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error downloading file");
      setIsDownloading(false);
    }
  }, [id, format, navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Download your file</h1>
      {isDownloading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p>Starting download...</p>
        </div>
      ) : (
        <p>Download complete. Redirecting to home...</p>
      )}
    </div>
  );
};

export default Download;
