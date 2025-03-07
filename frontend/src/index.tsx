import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create a dynamic favicon that matches the logo
const createFavicon = () => {
  try {
    // Create canvas element for drawing
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Check if the drawing context exists
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    
    // Background with gradient colors
    const gradient = ctx.createLinearGradient(0, 0, 64, 64);
    gradient.addColorStop(0, '#4f46e5');  // indigo-600
    gradient.addColorStop(1, '#9333ea');  // purple-600
    
    // Draw background
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.rect(0, 0, 64, 64);
    ctx.fill();
    
    // Apply a slight rotation effect like the logo
    ctx.save();
    ctx.translate(32, 32);
    ctx.rotate(-3 * Math.PI / 180);
    ctx.translate(-32, -32);
    
    // Draw video rectangle with white thick stroke
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(12, 16, 40, 32);
    ctx.stroke();
    
    // Draw first arrow from left
    ctx.beginPath();
    ctx.moveTo(24, 32);
    ctx.lineTo(16, 32);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(16, 32);
    ctx.lineTo(20, 28);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(16, 32);
    ctx.lineTo(20, 36);
    ctx.stroke();
    
    // Draw second arrow from right
    ctx.beginPath();
    ctx.moveTo(40, 32);
    ctx.lineTo(48, 32);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(48, 32);
    ctx.lineTo(44, 28);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(48, 32);
    ctx.lineTo(44, 36);
    ctx.stroke();
    
    // Draw connecting diagonal line
    ctx.beginPath();
    ctx.moveTo(24, 32);
    ctx.lineTo(40, 32);
    ctx.stroke();
    
    ctx.restore();
    
    // Convert to favicon and apply
    // Add timestamp to prevent browser caching
    const timestamp = new Date().getTime();
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon") + '?v=' + timestamp;
    
    // Remove any previous favicons
    const existingIcons = document.querySelectorAll('link[rel="shortcut icon"], link[rel="icon"]');
    existingIcons.forEach(icon => icon.parentNode?.removeChild(icon));
    
    // Add the new favicon
    document.head.appendChild(link);
    
    console.log('New favicon created successfully 🎉');
  } catch(e) {
    console.error('Error creating favicon:', e);
  }
};

// Execute after DOM is ready
document.addEventListener('DOMContentLoaded', createFavicon);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 