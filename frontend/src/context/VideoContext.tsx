import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface VideoState {
  recentConversions: {
    url: string;
    format: string;
    quality: string;
    downloadUrl: string;
    timestamp: number;
  }[];
  cachedResults: {
    [key: string]: {
      downloadUrl: string;
      quality: string;
      timestamp: number;
    };
  };
}

type VideoAction =
  | { type: 'ADD_CONVERSION'; payload: any }
  | { type: 'CACHE_RESULT'; payload: any }
  | { type: 'CLEAR_OLD_CACHE' };

const initialState: VideoState = {
  recentConversions: [],
  cachedResults: {}
};

// Create context
const VideoContext = createContext<{
  state: VideoState;
  dispatch: React.Dispatch<VideoAction>;
}>({ state: initialState, dispatch: () => null });

// Reducer function
function videoReducer(state: VideoState, action: VideoAction): VideoState {
  switch (action.type) {
    case 'ADD_CONVERSION':
      return {
        ...state,
        recentConversions: [
          action.payload,
          ...state.recentConversions.slice(0, 9) // Keep only last 10 conversions
        ]
      };
      
    case 'CACHE_RESULT':
      const cacheKey = `${action.payload.url}_${action.payload.format}_${action.payload.quality}`;
      return {
        ...state,
        cachedResults: {
          ...state.cachedResults,
          [cacheKey]: {
            downloadUrl: action.payload.downloadUrl,
            quality: action.payload.quality,
            timestamp: Date.now()
          }
        }
      };
      
    case 'CLEAR_OLD_CACHE':
      const now = Date.now();
      const oneHour = 3600000; // 1 hour in milliseconds
      const filteredCache = Object.entries(state.cachedResults).reduce((acc, [key, value]) => {
        if (now - value.timestamp < oneHour) {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      return {
        ...state,
        cachedResults: filteredCache
      };
      
    default:
      return state;
  }
}

// Provider component
export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  
  // Clear old cache every hour
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'CLEAR_OLD_CACHE' });
    }, 3600000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('videoState', JSON.stringify(state.recentConversions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state.recentConversions]);
  
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
}

// Custom hook for using the context
export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}

// Helper function to check cache
export function checkCache(url: string, format: string, quality: string) {
  const context = useContext(VideoContext);
  const cacheKey = `${url}_${format}_${quality}`;
  const cachedResult = context.state.cachedResults[cacheKey];
  
  if (cachedResult && Date.now() - cachedResult.timestamp < 3600000) {
    return cachedResult;
  }
  
  return null;
} 