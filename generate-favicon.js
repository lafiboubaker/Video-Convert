const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Function to generate the favicon
async function generateFavicon() {
  try {
    // Create canvas
    const canvas = createCanvas(64, 64);
    const ctx = canvas.getContext('2d');
    
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
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'dist', 'favicon.ico'), buffer);
    console.log('Favicon created successfully in dist folder');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

// Execute the function
generateFavicon(); 