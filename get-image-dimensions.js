const fs = require('fs');

// Function to read the PNG header and get dimensions
function getPngDimensions(buffer) {
  // PNG signature is 8 bytes, followed by the IHDR chunk
  // IHDR chunk has 4 bytes length, 4 bytes type, 4 bytes width, 4 bytes height
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

// Read the file
fs.readFile('Logo.png', (err, buffer) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  try {
    const dimensions = getPngDimensions(buffer);
    console.log(`Image dimensions: ${dimensions.width} × ${dimensions.height} pixels`);
  } catch (e) {
    console.error('Error getting dimensions:', e);
  }
}); 