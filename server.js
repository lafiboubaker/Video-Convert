const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const port = 3000;

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
}

// Function to clean up old files (older than 3 hours)
const cleanupOldFiles = () => {
  const threeHoursAgo = Date.now() - (3 * 60 * 60 * 1000); // 3 hours in milliseconds
  
  fs.readdir(downloadsDir, (err, files) => {
    if (err) {
      console.error('Error reading downloads directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(downloadsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file ${file}:`, err);
          return;
        }

        // If file is older than 3 hours, delete it
        if (stats.mtimeMs < threeHoursAgo) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}:`, err);
            } else {
              console.log(`Deleted old file: ${file}`);
            }
          });
        }
      });
    });
  });
};

// Run cleanup every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000); // 1 hour in milliseconds
// Run cleanup on server start
cleanupOldFiles();

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());
app.use('/downloads', express.static(downloadsDir));

app.post('/convert', (req, res) => {
  const { url, format } = req.body;
  
  // Create unique filename
  const fileName = `${uuidv4()}.${format}`;
  const outputFile = path.join(downloadsDir, fileName);

  ffmpeg(url)
    .output(outputFile)
    .on('end', () => {
      // Verify file exists before sending
      if (fs.existsSync(outputFile)) {
        // Return file information to frontend
        const fileStats = fs.statSync(outputFile);
        res.json({
          success: true,
          fileName: fileName,
          filePath: `/downloads/${fileName}`,
          fileSize: fileStats.size,
          fullPath: outputFile
        });
      } else {
        res.status(404).json({ 
          success: false, 
          error: 'File not found after conversion' 
        });
      }
    })
    .on('error', (err) => {
      console.error('FFmpeg error:', err);
      res.status(500).json({ 
        success: false, 
        error: err.message 
      });
    })
    .run();
});

// Endpoint to download a specific file
app.get('/download/:fileName', (req, res) => {
  const filePath = path.join(downloadsDir, req.params.fileName);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ 
      success: false, 
      error: 'File not found' 
    });
  }
});

// Endpoint to check if a file exists
app.get('/check-file/:fileName', (req, res) => {
  const filePath = path.join(downloadsDir, req.params.fileName);
  if (fs.existsSync(filePath)) {
    const fileStats = fs.statSync(filePath);
    res.json({ 
      exists: true, 
      path: `/downloads/${req.params.fileName}`,
      size: fileStats.size
    });
  } else {
    res.json({ exists: false });
  }
});

// Endpoint to clean up files
app.delete('/cleanup/:fileName', (req, res) => {
  const filePath = path.join(downloadsDir, req.params.fileName);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        res.status(500).json({ success: false, error: err.message });
      } else {
        res.json({ success: true });
      }
    });
  } else {
    res.json({ success: true, message: 'File already removed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Downloads directory: ${downloadsDir}`);
});
