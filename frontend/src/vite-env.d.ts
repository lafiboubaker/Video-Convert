/// <reference types="vite/client" />

// Add React JSX namespace
import React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
  
  // Define window.gtag for analytics
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

// Define Vite environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
