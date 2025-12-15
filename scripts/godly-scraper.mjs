#!/usr/bin/env node
/**
 * Godly.website Design Inspiration Scraper
 * 
 * Extracts website examples and generates LLM-friendly design instructions
 * that help achieve similar design styles.
 * 
 * Usage:
 *   node scripts/godly-scraper.mjs
 */

import fs from 'fs';
import path from 'path';

// Design style patterns mapped to LLM instructions
const STYLE_INSTRUCTIONS = {
  "Animation": "Implement smooth, purposeful animations throughout the site. Use CSS transitions, keyframes, or libraries like Framer Motion/GSAP.",
  "Fun": "Create a playful, engaging experience with unexpected interactions, bold colors, and delightful micro-animations.",
  "Minimal": "Strip design to essential elements. Use a limited color palette (2-3 colors), simple geometric shapes, and ample negative space.",
  "Single Page": "Build an immersive single-page experience with smooth scrolling and section-based navigation.",
  "Interactive": "Implement cursor-following effects, hover state animations, and micro-interactions throughout. Elements should respond to user input.",
  "Light": "Use a predominantly light color scheme with white/off-white backgrounds. Add depth through subtle shadows and muted accent colors.",
  "Dark": "Implement a dark theme with deep backgrounds (#0a0a0a to #1a1a1a). Use high-contrast text and glowing accent colors.",
  "Big Background Image": "Use a full-viewport hero section with a high-quality, atmospheric background image. Apply subtle overlays for text readability.",
  "Scrolling Animation": "Use scroll-triggered animations with libraries like GSAP ScrollTrigger, Framer Motion, or CSS scroll-driven animations.",
  "Long Scrolling": "Design an immersive single-page experience with distinct sections that flow narratively. Use sticky elements and parallax effects.",
  "Clean": "Maintain generous whitespace, clear visual hierarchy, and minimal decorative elements. Focus on typography and content clarity.",
  "Bold Typography": "Feature oversized display text, mix font weights dramatically, and use typography as a primary design element.",
  "Gradient": "Apply smooth color gradients for backgrounds, text, or UI elements. Use mesh gradients or multi-stop linear gradients.",
  "3D": "Incorporate 3D elements using Three.js, WebGL, or CSS 3D transforms. Add depth through perspective and spatial animations.",
  "Brutalist": "Embrace raw, unpolished aesthetics with exposed structural elements, harsh contrasts, and unconventional layouts.",
  "Glassmorphism": "Use frosted glass effects with backdrop-blur, subtle borders, and layered transparent surfaces.",
  "Grid Layout": "Structure content in a clear grid system. Use CSS Grid for complex layouts with clear visual rhythm.",
  "Asymmetric": "Break from conventional layouts with intentionally unbalanced compositions. Create visual tension and interest.",
  "Video Background": "Use looping video backgrounds for immersive hero sections. Ensure videos are optimized and have fallbacks.",
  "Noise/Grain": "Add subtle noise textures to backgrounds or images for a tactile, film-like quality.",
  "Retro": "Incorporate nostalgic design elements like serif fonts, muted color palettes, and classic layout patterns.",
  "Experimental": "Push boundaries with unconventional navigation, abstract visuals, and innovative interaction patterns.",
};

// Font suggestions
const FONT_SUGGESTIONS = {
  "Inter": "Highly legible sans-serif for UI. Modern and versatile. Pairs with: Fraunces, Playfair Display, or Space Grotesk.",
  "NB International": "Modern geometric sans-serif. Pairs well with: GT America, Inter, or a serif like Editorial New.",
  "Space Grotesk": "Tech-forward sans-serif with distinctive character shapes.",
  "Manrope": "Modern geometric sans-serif, open-source alternative to paid fonts.",
  "SF Pro": "Apple's system font. Clean and professional.",
  "Söhne": "Contemporary Swiss-style sans-serif. Elegant and versatile.",
  "GT Walsheim": "Friendly geometric sans-serif with personality.",
  "Neue Montreal": "Modern grotesk with character. Works well at large sizes.",
};

// Framework tips
const FRAMEWORK_TIPS = {
  "React": "Use React with hooks for state management. Consider Framer Motion for animations.",
  "Next.js": "Leverage App Router, Server Components, and next/image for optimization.",
  "Tailwind CSS": "Use utility-first classes. Consider tailwind-animate or @tailwindcss/typography plugins.",
  "Radix UI": "Use unstyled, accessible components as a foundation for custom UI.",
  "Framer": "Use Framer's visual builder for rapid prototyping with code-level customization.",
  "GSAP": "Industry-standard animation library. Use ScrollTrigger for scroll-based animations.",
  "Three.js": "WebGL library for 3D graphics. Consider React Three Fiber for React integration.",
  "Vercel": "Deploy with Vercel for optimal Next.js performance, edge functions, and analytics.",
};

class GodlyScraper {
  constructor() {
    this.baseUrl = "https://godly.website";
    this.websites = [];
    this.rateLimitMs = 600;
  }

  async scrape(maxItems = 60) {
    console.log("🚀 Starting Godly.website scraper...\n");
    
    // Step 1: Get list of websites from the API (includes media!)
    let cursor = null;
    let allItems = [];
    
    while (allItems.length < maxItems) {
      const url = cursor 
        ? `${this.baseUrl}/api/websites/list?take=12&cursor=${cursor}`
        : `${this.baseUrl}/api/websites/list?take=12`;
      
      console.log(`📥 Fetching list (have ${allItems.length} items)...`);
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`❌ API error: ${response.status}`);
          break;
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          console.log("✅ No more items in list");
          break;
        }
        
        // Extract media URLs from the API response
        for (const item of data.items) {
          const processedItem = {
            ...item,
            thumbnail: null,
            video: null,
          };
          
          // Extract media URLs
          if (item.media && Array.isArray(item.media)) {
            for (const m of item.media) {
              if (m.context === 'thumbnail' && m.key) {
                processedItem.thumbnail = `https://cdn.godly.website/${m.key.replace('raw/', '1280/')}`;
              }
              if (m.context === 'primary' && m.type?.includes('video') && m.key) {
                processedItem.video = `https://cdn.godly.website/${m.key.replace('raw/', '640/')}`;
                // Also get lqip thumbnail from video
                if (!processedItem.thumbnail) {
                  const videoId = m.key.split('/').pop().replace('.mp4', '');
                  processedItem.thumbnail = `https://cdn.godly.website/videos/lqip/${videoId}.jpg`;
                }
              }
            }
          }
          
          allItems.push(processedItem);
        }
        
        console.log(`   Got ${data.items.length} items (total: ${allItems.length})`);
        
        if (!data.cursor || allItems.length >= maxItems) {
          break;
        }
        
        cursor = data.cursor;
        await this.sleep(this.rateLimitMs);
        
      } catch (error) {
        console.error("❌ Error fetching list:", error.message);
        break;
      }
    }
    
    console.log(`\n📋 Found ${allItems.length} websites. Fetching details...\n`);
    
    // Step 2: Fetch details for each website
    for (let i = 0; i < Math.min(allItems.length, maxItems); i++) {
      const item = allItems[i];
      console.log(`   [${i + 1}/${Math.min(allItems.length, maxItems)}] ${item.title}...`);
      
      try {
        // The URL format is /website/slug-id (e.g., /website/roasted-1018)
        const fullSlug = `${item.slug}-${item.id}`;
        const details = await this.fetchWebsiteDetails(fullSlug, item);
        if (details) {
          // Add media from the list API
          details.thumbnail = item.thumbnail;
          details.video = item.video;
          details.views = item.views;
          details.createdAt = item.createdAt;
          this.websites.push(details);
        }
        await this.sleep(this.rateLimitMs);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
      }
    }
    
    console.log(`\n✨ Scraped ${this.websites.length} websites with full details\n`);
    return this.websites;
  }

  async fetchWebsiteDetails(slug, item) {
    const url = `${this.baseUrl}/website/${slug}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`      ⚠️ HTTP ${response.status}`);
      return null;
    }
    const html = await response.text();
    
    if (html.length < 1000) {
      console.log(`      ⚠️ Response too short: ${html.length} chars`);
      return null;
    }
    
    // Parse meta from HTML directly
    const website = {
      name: item.title,
      url: item.url,
      slug: slug,
      types: [],
      styles: [],
      fonts: [],
      frameworks: [],
      hosting: [],
    };
    
    // Extract metadata from the list items
    const typeMatches = html.matchAll(/href="\/websites\/([^"]+)"[^>]*>([^<]+)<\/a><\/li>/g);
    
    // Parse the context sections
    const sections = {
      'Type': 'types',
      'Style': 'styles',
      'Font': 'fonts',
      'Framework': 'frameworks',
      'Hosting': 'hosting',
    };
    
    for (const [sectionName, arrayName] of Object.entries(sections)) {
      // Match section headers - the pattern is: <h4 class="font-medium">Type</h4><ul class="grid list-none">...</ul>
      const sectionRegex = new RegExp(
        `<h4[^>]*>${sectionName}</h4><ul[^>]*>([\\s\\S]*?)</ul>`,
        'i'
      );
      const sectionMatch = sectionRegex.exec(html);
      if (sectionMatch) {
        const linkRegex = /href="\/websites\/[^"]+">([^<]+)<\/a>/g;
        let match;
        while ((match = linkRegex.exec(sectionMatch[1])) !== null) {
          website[arrayName].push(match[1].trim());
        }
      }
    }
    
    // Debug output
    if (process.env.DEBUG) {
      console.log(`      Name: ${website.name}, URL: ${website.url}`);
      console.log(`      Types: ${website.types.join(', ')}`);
      console.log(`      Styles: ${website.styles.join(', ')}`);
    }
    
    // Only return if we got meaningful data
    if (website.name && (website.styles.length > 0 || website.types.length > 0)) {
      return website;
    }
    
    console.log(`      ⚠️ No styles/types found for ${website.name || slug}`);
    return null;
  }

  generateLLMInstructions(website) {
    const lines = [];
    
    lines.push(`## ${website.name}`);
    lines.push(`Reference: ${website.url}`);
    lines.push("");
    
    lines.push("### Design Prompt");
    lines.push("");
    lines.push("```");
    lines.push(this.generateDesignPrompt(website));
    lines.push("```");
    lines.push("");
    
    if (website.styles && website.styles.length > 0) {
      lines.push("### Style Implementation");
      for (const style of website.styles) {
        const instruction = STYLE_INSTRUCTIONS[style];
        if (instruction) {
          lines.push(`- **${style}**: ${instruction}`);
        } else {
          lines.push(`- **${style}**: Apply ${style.toLowerCase()} design principles.`);
        }
      }
      lines.push("");
    }
    
    if (website.fonts && website.fonts.length > 0) {
      lines.push("### Typography");
      for (const font of website.fonts) {
        const suggestion = FONT_SUGGESTIONS[font];
        if (suggestion) {
          lines.push(`- **${font}**: ${suggestion}`);
        } else {
          lines.push(`- **${font}**: Use this font for headings or body text as appropriate.`);
        }
      }
      lines.push("");
    }
    
    if (website.frameworks && website.frameworks.length > 0) {
      lines.push("### Technical Stack");
      for (const framework of website.frameworks) {
        const tip = FRAMEWORK_TIPS[framework];
        if (tip) {
          lines.push(`- **${framework}**: ${tip}`);
        } else {
          lines.push(`- **${framework}**`);
        }
      }
      lines.push("");
    }
    
    return lines.join("\n");
  }

  generateDesignPrompt(website) {
    const parts = [];
    
    parts.push(`Create a ${website.types?.join("/") || "modern"} website inspired by ${website.name}.`);
    
    if (website.styles && website.styles.length > 0) {
      parts.push(`\nKey design characteristics:`);
      for (const style of website.styles) {
        const instruction = STYLE_INSTRUCTIONS[style];
        if (instruction) {
          parts.push(`- ${style}: ${instruction}`);
        } else {
          parts.push(`- ${style}`);
        }
      }
    }
    
    if (website.fonts && website.fonts.length > 0) {
      parts.push(`\nTypography: Use ${website.fonts.join(" paired with ")} or similar fonts.`);
    }
    
    if (website.frameworks && website.frameworks.length > 0) {
      parts.push(`\nTechnical stack: ${website.frameworks.join(", ")}`);
    }
    
    parts.push(`\nReference the live site at ${website.url} for detailed inspiration.`);
    parts.push(`Focus on capturing the visual essence and interaction patterns while creating something unique.`);
    
    return parts.join("\n");
  }

  generateFullGuide() {
    const sections = [];
    
    sections.push("# Godly Design Inspiration - LLM Instructions Guide");
    sections.push("");
    sections.push("> Auto-generated from godly.website - Astronomically good web design inspiration");
    sections.push("");
    sections.push(`> Generated: ${new Date().toISOString().split('T')[0]}`);
    sections.push(`> Total sites: ${this.websites.length}`);
    sections.push("");
    sections.push("---");
    sections.push("");
    
    // Table of contents by type
    const byType = this.groupByType();
    
    sections.push("## Categories");
    sections.push("");
    for (const [type, sites] of Object.entries(byType)) {
      sections.push(`- [${type}](#${type.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}) (${sites.length} sites)`);
    }
    sections.push("");
    sections.push("---");
    sections.push("");
    
    // Generate sections by type
    for (const [type, sites] of Object.entries(byType)) {
      sections.push(`# ${type}`);
      sections.push("");
      
      for (const site of sites) {
        sections.push(this.generateLLMInstructions(site));
        sections.push("---");
        sections.push("");
      }
    }
    
    return sections.join("\n");
  }

  generateCopyPastePrompts() {
    const prompts = [];
    
    prompts.push("# Quick Copy-Paste Design Prompts");
    prompts.push("");
    prompts.push("> Ready-to-use prompts for AI assistants (Claude, ChatGPT, Cursor, etc.)");
    prompts.push(`> Generated: ${new Date().toISOString().split('T')[0]}`);
    prompts.push("");
    
    // Group by dominant style
    const byStyle = this.groupByStyle();
    
    for (const [style, sites] of Object.entries(byStyle).slice(0, 15)) {
      prompts.push(`## ${style} Style`);
      prompts.push("");
      
      const instruction = STYLE_INSTRUCTIONS[style];
      if (instruction) {
        prompts.push(`> ${instruction}`);
        prompts.push("");
      }
      
      for (const site of sites.slice(0, 5)) {
        prompts.push(`### ${site.name}`);
        prompts.push("");
        prompts.push("```");
        prompts.push(this.generateDesignPrompt(site));
        prompts.push("```");
        prompts.push("");
      }
    }
    
    return prompts.join("\n");
  }

  generateStyleGuide() {
    const lines = [];
    
    lines.push("# Design Style Reference Guide");
    lines.push("");
    lines.push("## How to Use This Guide");
    lines.push("");
    lines.push("Copy the relevant sections into your AI assistant prompt to achieve specific design styles.");
    lines.push("");
    lines.push("---");
    lines.push("");
    
    lines.push("## Style Definitions");
    lines.push("");
    
    for (const [style, instruction] of Object.entries(STYLE_INSTRUCTIONS)) {
      lines.push(`### ${style}`);
      lines.push("");
      lines.push(instruction);
      lines.push("");
      
      const examples = this.websites
        .filter(w => w.styles?.includes(style))
        .slice(0, 3);
      
      if (examples.length > 0) {
        lines.push("**Examples:**");
        for (const ex of examples) {
          lines.push(`- [${ex.name}](${ex.url})`);
        }
        lines.push("");
      }
    }
    
    lines.push("---");
    lines.push("");
    lines.push("## Typography Guide");
    lines.push("");
    
    for (const [font, suggestion] of Object.entries(FONT_SUGGESTIONS)) {
      lines.push(`### ${font}`);
      lines.push("");
      lines.push(suggestion);
      lines.push("");
      
      const examples = this.websites
        .filter(w => w.fonts?.includes(font))
        .slice(0, 3);
      
      if (examples.length > 0) {
        lines.push("**Used by:**");
        for (const ex of examples) {
          lines.push(`- [${ex.name}](${ex.url})`);
        }
        lines.push("");
      }
    }
    
    lines.push("---");
    lines.push("");
    lines.push("## Framework Tips");
    lines.push("");
    
    for (const [framework, tip] of Object.entries(FRAMEWORK_TIPS)) {
      lines.push(`### ${framework}`);
      lines.push("");
      lines.push(tip);
      lines.push("");
    }
    
    return lines.join("\n");
  }

  groupByType() {
    const groups = {};
    
    for (const site of this.websites) {
      const type = site.types?.[0] || "Other";
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(site);
    }
    
    return groups;
  }

  groupByStyle() {
    const groups = {};
    
    for (const site of this.websites) {
      for (const style of site.styles || []) {
        if (!groups[style]) {
          groups[style] = [];
        }
        groups[style].push(site);
      }
    }
    
    // Sort by count
    return Object.fromEntries(
      Object.entries(groups).sort((a, b) => b[1].length - a[1].length)
    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  exportJSON() {
    return JSON.stringify({
      metadata: {
        source: "godly.website",
        scrapedAt: new Date().toISOString(),
        count: this.websites.length,
      },
      websites: this.websites,
      styleInstructions: STYLE_INSTRUCTIONS,
      fontSuggestions: FONT_SUGGESTIONS,
      frameworkTips: FRAMEWORK_TIPS,
    }, null, 2);
  }
}

// CLI execution
async function main() {
  const scraper = new GodlyScraper();
  
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  GODLY.WEBSITE SCRAPER - Design Inspiration Extractor");
  console.log("═══════════════════════════════════════════════════════════════\n");
  
  // Scrape websites
  const maxItems = parseInt(process.env.MAX_ITEMS || "30", 10);
  await scraper.scrape(maxItems);
  
  if (scraper.websites.length === 0) {
    console.log("❌ No websites scraped. Check your network connection.");
    return;
  }
  
  // Generate outputs
  const outputDir = path.join(process.cwd(), "output", "godly-inspiration");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const jsonPath = path.join(outputDir, "websites.json");
  fs.writeFileSync(jsonPath, scraper.exportJSON());
  console.log(`📄 Saved JSON data to: ${jsonPath}`);
  
  const guidePath = path.join(outputDir, "design-guide.md");
  fs.writeFileSync(guidePath, scraper.generateFullGuide());
  console.log(`📄 Saved design guide to: ${guidePath}`);
  
  const promptsPath = path.join(outputDir, "quick-prompts.md");
  fs.writeFileSync(promptsPath, scraper.generateCopyPastePrompts());
  console.log(`📄 Saved quick prompts to: ${promptsPath}`);
  
  const stylePath = path.join(outputDir, "style-reference.md");
  fs.writeFileSync(stylePath, scraper.generateStyleGuide());
  console.log(`📄 Saved style reference to: ${stylePath}`);
  
  console.log("\n✅ All done! Check the 'output/godly-inspiration' folder.");
}

main().catch(console.error);
