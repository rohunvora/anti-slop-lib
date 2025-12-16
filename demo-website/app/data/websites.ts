// Re-export the scraped website data with types
import websitesData from './websites.json';

export interface Website {
  name: string;
  url: string;
  slug: string;
  types: string[];
  styles: string[];
  fonts: string[];
  frameworks: string[];
  hosting: string[];
  thumbnail: string | null;
  video: string | null;
  views?: number;
  createdAt?: string;
  // Style tokens (optional, extracted from thumbnails)
  primaryColor?: string;
  secondaryColor?: string;
  fontCategory?: 'serif' | 'sans' | 'monospace';
  radiusStyle?: 'sharp' | 'rounded';
}

export interface WebsitesData {
  metadata: {
    source: string;
    scrapedAt: string;
    count: number;
  };
  websites: Website[];
}

export const data = websitesData as WebsitesData;
export const websites = data.websites;

// Extract unique values for filtering
export const allTypes = Array.from(new Set(websites.flatMap(w => w.types))).sort();
export const allStyles = Array.from(new Set(websites.flatMap(w => w.styles))).sort();
export const allFonts = Array.from(new Set(websites.flatMap(w => w.fonts))).sort();
export const allFrameworks = Array.from(new Set(websites.flatMap(w => w.frameworks))).sort();

// Get websites by filter
export function getWebsitesByType(type: string): Website[] {
  return websites.filter(w => w.types.includes(type));
}

export function getWebsitesByStyle(style: string): Website[] {
  return websites.filter(w => w.styles.includes(style));
}

export function getWebsiteBySlug(slug: string): Website | undefined {
  return websites.find(w => w.slug === slug);
}

