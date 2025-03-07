// API configuration
const nodeApiUrl = '/api'; // Node.js server (proxy to localhost:3000)
const pythonApiUrl = '/python-api'; // Python Flask server (proxy to localhost:5000)

// Export configuration functions
export const config = {
  // Node.js server endpoints
  getNodeApiUrl: () => nodeApiUrl,
  getDownloadUrl: (fileName: string) => `/downloads/${fileName}`,
  getCleanupUrl: (fileName: string) => `${nodeApiUrl}/cleanup/${fileName}`,
  
  // Python Flask server endpoints
  getPythonApiUrl: () => pythonApiUrl,
  getConvertUrl: () => `${pythonApiUrl}/convert`,
  getDownloadFileUrl: (fileName: string) => `${pythonApiUrl}/download?file=${fileName}`,
  getGenerateQrUrl: (downloadUrl: string) => `${pythonApiUrl}/generate_qr?url=${encodeURIComponent(downloadUrl)}`
}; 