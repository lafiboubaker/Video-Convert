const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Function to generate the favicon based on the SVG logo
async function generateFavicon() {
  try {
    // Create canvas (add padding for better visibility as favicon)
    const canvas = createCanvas(64, 64);
    const ctx = canvas.getContext('2d');
    
    // Background with gradient colors (matching the logo's background)
    const gradient = ctx.createLinearGradient(0, 0, 64, 64);
    gradient.addColorStop(0, '#4f46e5');  // indigo-600
    gradient.addColorStop(1, '#9333ea');  // purple-600
    
    // Draw background
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.rect(0, 0, 64, 64);
    ctx.fill();
    
    // Center the drawing
    ctx.translate(12, 12);
    
    // Draw the video rectangle (based on the SVG in Header.tsx)
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(4, 8, 32, 24);
    ctx.stroke();
    
    // Draw the right arrow (based on the SVG path)
    ctx.beginPath();
    ctx.moveTo(24, 28);
    ctx.lineTo(32, 20);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(32, 20);
    ctx.lineTo(28, 20);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(32, 20);
    ctx.lineTo(32, 24);
    ctx.stroke();
    
    // Draw the left arrow (based on the SVG path)
    ctx.beginPath();
    ctx.moveTo(16, 20);
    ctx.lineTo(24, 28);
    ctx.stroke();
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    
    // Save to dist directory
    fs.writeFileSync(path.join(__dirname, 'dist', 'favicon.ico'), buffer);
    console.log('Favicon saved to dist/favicon.ico');
    
    // Save to frontend/public directory
    fs.writeFileSync(path.join(__dirname, 'frontend', 'public', 'favicon.ico'), buffer);
    console.log('Favicon saved to frontend/public/favicon.ico');
    
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

// Execute the function
generateFavicon(); 