// Web Worker for video processing
self.onmessage = async (e: MessageEvent) => {
    const { url, format, quality } = e.data;
    
    try {
        // Build API URL
        const apiUrl = new URL('/convert', self.location.origin);
        apiUrl.searchParams.append('url', url);
        apiUrl.searchParams.append('format', format);
        apiUrl.searchParams.append('quality', quality);
        
        // Send progress update
        self.postMessage({ type: 'progress', message: 'Starting conversion...' });
        
        // Make API request
        const response = await fetch(apiUrl.toString());
        const data = await response.json();
        
        if (response.ok) {
            self.postMessage({ type: 'success', data });
        } else {
            self.postMessage({ type: 'error', error: data.error });
        }
    } catch (error) {
        self.postMessage({ type: 'error', error: error.message });
    }
};

// Export empty type for TypeScript
export {}; 