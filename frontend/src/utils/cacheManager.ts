import { toast } from 'sonner';

interface CacheItem {
  url: string;
  format: string;
  quality: string;
  downloadUrl: string;
  timestamp: number;
  filePath: string;
}

class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem>;
  private readonly CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  private cleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.cache = new Map();
    this.startCleanupInterval();
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private startCleanupInterval() {
    // Run cleanup every hour
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000);
  }

  public addToCache(key: string, item: CacheItem): void {
    this.cache.set(key, item);
    this.saveToLocalStorage();
  }

  public getFromCache(key: string): CacheItem | undefined {
    const item = this.cache.get(key);
    if (item && this.isItemValid(item)) {
      return item;
    }
    if (item) {
      this.removeFromCache(key);
    }
    return undefined;
  }

  private isItemValid(item: CacheItem): boolean {
    return Date.now() - item.timestamp < this.CACHE_DURATION;
  }

  private async cleanup() {
    const now = Date.now();
    const expiredKeys: string[] = [];

    this.cache.forEach((item, key) => {
      if (now - item.timestamp >= this.CACHE_DURATION) {
        expiredKeys.push(key);
        this.deleteFile(item.filePath);
      }
    });

    expiredKeys.forEach(key => this.removeFromCache(key));
    this.saveToLocalStorage();

    if (expiredKeys.length > 0) {
      toast.info(`Cleaned up ${expiredKeys.length} expired files`);
    }
  }

  private async deleteFile(filePath: string) {
    try {
      const response = await fetch('/api/delete-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  private removeFromCache(key: string) {
    this.cache.delete(key);
  }

  private saveToLocalStorage() {
    try {
      const cacheData = Array.from(this.cache.entries());
      localStorage.setItem('videoCache', JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  private loadFromLocalStorage() {
    try {
      const cacheData = localStorage.getItem('videoCache');
      if (cacheData) {
        const entries = JSON.parse(cacheData);
        this.cache = new Map(entries);
        // Cleanup invalid entries on load
        this.cleanup();
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
    }
  }

  public destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

export const cacheManager = CacheManager.getInstance(); 