#!/usr/bin/env npx ts-node
/**
 * Extract style tokens from website thumbnails
 * 
 * This script:
 * 1. Reads websites.json
 * 2. Downloads thumbnails
 * 3. Extracts dominant colors using Vibrant.js (if available)
 * 4. Infers fontCategory and radiusStyle
 * 5. Writes tokens back to websites.json
 * 
 * Usage:
 *   npm run extract:site-styles
 *   # or
 *   npx ts-node scripts/extractSiteStyles.ts
 * 
 * Note: For best color extraction results, install node-vibrant:
 *   npm install --save-dev node-vibrant
 * 
 * Without node-vibrant, the script will use fallback default colors.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

interface Website {
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
  primaryColor?: string;
  secondaryColor?: string;
  fontCategory?: 'serif' | 'sans' | 'monospace';
  radiusStyle?: 'sharp' | 'rounded';
}

interface WebsitesData {
  metadata: {
    source: string;
    scrapedAt: string;
    count: number;
  };
  websites: Website[];
  styleInstructions?: Record<string, string>;
  fontSuggestions?: Record<string, string>;
  frameworkTips?: Record<string, string>;
}

// Color extraction using Vibrant.js (will be installed as dependency)
// For now, we'll use a simple fallback approach
async function extractColors(imageBuffer: Buffer): Promise<{ primary: string; secondary: string }> {
  // Try to use Vibrant if available, otherwise use fallback
  try {
    const Vibrant = require('node-vibrant');
    const palette = await Vibrant.from(imageBuffer).getPalette();
    
    // Get most vibrant color as primary
    const vibrant = palette.Vibrant || palette.Muted || palette.DarkVibrant;
    const primary = vibrant?.hex || '#c42a0e';
    
    // Get secondary from a different palette entry
    const secondary = palette.LightVibrant?.hex || palette.LightMuted?.hex || '#0a6e66';
    
    return { primary, secondary };
  } catch (error) {
    // Fallback: return default colors
    console.warn('Vibrant.js not available, using fallback colors');
    return { primary: '#c42a0e', secondary: '#0a6e66' };
  }
}

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    client
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }
        
        const chunks: Buffer[] = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      })
      .on('error', reject);
  });
}

function inferFontCategory(fonts: string[]): 'serif' | 'sans' | 'monospace' {
  if (fonts.length === 0) return 'sans';

  const fontStr = fonts.join(' ').toLowerCase();

  if (fontStr.includes('mono') || fontStr.includes('code') || fontStr.includes('courier')) {
    return 'monospace';
  }

  if (
    fontStr.includes('serif') ||
    fontStr.includes('georgia') ||
    fontStr.includes('times') ||
    fontStr.includes('garamond') ||
    fontStr.includes('baskerville') ||
    fontStr.includes('playfair') ||
    fontStr.includes('lora') ||
    fontStr.includes('merriweather') ||
    fontStr.includes('crimson') ||
    fontStr.includes('libre baskerville')
  ) {
    return 'serif';
  }

  return 'sans';
}

function inferRadiusStyle(styles: string[]): 'sharp' | 'rounded' {
  const roundedIndicators = ['Fun', 'Pastel', 'Illustrative', 'Playful', 'Colourful'];
  return styles.some((s) => roundedIndicators.includes(s)) ? 'rounded' : 'sharp';
}

async function processWebsite(website: Website, index: number, total: number): Promise<Website> {
  console.log(`[${index + 1}/${total}] Processing ${website.name}...`);

  // Skip if already has tokens (unless --force flag)
  if (website.primaryColor && website.secondaryColor && !process.env.FORCE) {
    console.log(`  ✓ Already has tokens, skipping`);
    return website;
  }

  if (!website.thumbnail) {
    console.log(`  ⚠ No thumbnail, using defaults`);
    return {
      ...website,
      primaryColor: website.primaryColor || '#c42a0e',
      secondaryColor: website.secondaryColor || '#0a6e66',
      fontCategory: website.fontCategory || inferFontCategory(website.fonts),
      radiusStyle: website.radiusStyle || inferRadiusStyle(website.styles),
    };
  }

  try {
    // Download thumbnail
    const imageBuffer = await downloadImage(website.thumbnail);
    
    // Extract colors
    const colors = await extractColors(imageBuffer);
    
    // Infer other tokens
    const fontCategory = website.fontCategory || inferFontCategory(website.fonts);
    const radiusStyle = website.radiusStyle || inferRadiusStyle(website.styles);

    console.log(`  ✓ Extracted: primary=${colors.primary}, secondary=${colors.secondary}, font=${fontCategory}, radius=${radiusStyle}`);

    return {
      ...website,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      fontCategory,
      radiusStyle,
    };
  } catch (error) {
    console.error(`  ✗ Error processing ${website.name}:`, error instanceof Error ? error.message : error);
    // Return with defaults
    return {
      ...website,
      primaryColor: website.primaryColor || '#c42a0e',
      secondaryColor: website.secondaryColor || '#0a6e66',
      fontCategory: website.fontCategory || inferFontCategory(website.fonts),
      radiusStyle: website.radiusStyle || inferRadiusStyle(website.styles),
    };
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  EXTRACT SITE STYLE TOKENS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const websitesJsonPath = path.join(
    process.cwd(),
    'demo-website',
    'app',
    'data',
    'websites.json'
  );

  if (!fs.existsSync(websitesJsonPath)) {
    console.error(`❌ File not found: ${websitesJsonPath}`);
    process.exit(1);
  }

  // Read existing data
  const data: WebsitesData = JSON.parse(fs.readFileSync(websitesJsonPath, 'utf-8'));
  console.log(`📄 Loaded ${data.websites.length} websites\n`);

  // Process each website
  const processed: Website[] = [];
  for (let i = 0; i < data.websites.length; i++) {
    const processedSite = await processWebsite(data.websites[i], i, data.websites.length);
    processed.push(processedSite);
    
    // Rate limiting: wait 200ms between requests
    if (i < data.websites.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  // Update data
  data.websites = processed;
  data.metadata.scrapedAt = new Date().toISOString();

  // Write back
  fs.writeFileSync(websitesJsonPath, JSON.stringify(data, null, 2));
  console.log(`\n✅ Updated ${websitesJsonPath}`);
  console.log(`   Added tokens to ${processed.filter(w => w.primaryColor).length} websites`);
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

