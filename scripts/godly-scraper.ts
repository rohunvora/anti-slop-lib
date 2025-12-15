#!/usr/bin/env npx ts-node
/**
 * Godly.website Design Inspiration Scraper
 * 
 * Extracts website examples and generates LLM-friendly design instructions
 * that help achieve similar design styles.
 * 
 * Usage:
 *   npx ts-node scripts/godly-scraper.ts
 *   # or
 *   npm run scrape:godly
 */

interface GodlyWebsite {
  id: number;
  name: string;
  slug: string;
  url: string;
  description?: string;
  type?: string[];
  styles?: string[];
  fonts?: string[];
  frameworks?: string[];
  hosting?: string[];
  colors?: string[];
  thumbnailUrl?: string;
  createdAt?: string;
}

interface ApiWebsiteListItem {
  id: number;
  name: string;
  slug: string;
  url: string;
  description?: string;
  thumbnailUrl?: string;
  createdAt?: string;
  types?: { name: string }[];
  styles?: { name: string }[];
  fonts?: { name: string }[];
  frameworks?: { name: string }[];
  hosting?: { name: string }[];
}

interface ApiResponse {
  websites: ApiWebsiteListItem[];
  nextCursor?: number;
}

// Design style patterns mapped to LLM instructions
const STYLE_INSTRUCTIONS: Record<string, string> = {
  // Visual Styles
  "Big Background Image": "Use a full-viewport hero section with a high-quality, atmospheric background image. Apply subtle overlays for text readability.",
  "Interactive": "Implement cursor-following effects, hover state animations, and micro-interactions throughout. Elements should respond to user input.",
  "Scrolling Animation": "Use scroll-triggered animations with libraries like GSAP, Framer Motion, or CSS scroll-driven animations. Reveal content progressively.",
  "Long Scrolling": "Design an immersive single-page experience with distinct sections that flow narratively. Use sticky elements and parallax effects.",
  "Clean": "Maintain generous whitespace, clear visual hierarchy, and minimal decorative elements. Focus on typography and content clarity.",
  "Light": "Use a predominantly light color scheme with white/off-white backgrounds. Add depth through subtle shadows and muted accent colors.",
  "Dark": "Implement a dark theme with deep backgrounds (#0a0a0a to #1a1a1a). Use high-contrast text and glowing accent colors.",
  "Minimal": "Strip design to essential elements. Use a limited color palette (2-3 colors), simple geometric shapes, and ample negative space.",
  "Bold Typography": "Feature oversized display text, mix font weights dramatically, and use typography as a primary design element.",
  "Gradient": "Apply smooth color gradients for backgrounds, text, or UI elements. Use mesh gradients or multi-stop linear gradients.",
  "3D": "Incorporate 3D elements using Three.js, WebGL, or CSS 3D transforms. Add depth through perspective and spatial animations.",
  "Brutalist": "Embrace raw, unpolished aesthetics with exposed structural elements, harsh contrasts, and unconventional layouts.",
  "Glassmorphism": "Use frosted glass effects with backdrop-blur, subtle borders, and layered transparent surfaces.",
  "Grid Layout": "Structure content in a clear grid system. Use CSS Grid for complex layouts with clear visual rhythm.",
  "Asymmetric": "Break from conventional layouts with intentionally unbalanced compositions. Create visual tension and interest.",
  "Animated Cursor": "Customize the cursor with trailing effects, magnetic interactions, or contextual transformations.",
  "Split Screen": "Divide the viewport into distinct sections that can scroll independently or reveal content side by side.",
  "Video Background": "Use looping video backgrounds for immersive hero sections. Ensure videos are optimized and have fallbacks.",
  "Noise/Grain": "Add subtle noise textures to backgrounds or images for a tactile, film-like quality.",
  "Retro/Vintage": "Incorporate nostalgic design elements like serif fonts, muted color palettes, and classic layout patterns.",
  "Experimental": "Push boundaries with unconventional navigation, abstract visuals, and innovative interaction patterns.",
};

// Font pairing suggestions
const FONT_SUGGESTIONS: Record<string, string> = {
  "NB International": "Modern geometric sans-serif. Pairs well with: GT America, Inter, or a serif like Editorial New.",
  "NB International Mono": "Technical monospace feel. Great for code, numbers, or adding a systematic aesthetic.",
  "Inter": "Highly legible sans-serif for UI. Pairs with: Fraunces, Playfair Display, or Space Grotesk.",
  "SF Pro": "Apple's system font. Clean and professional. Pairs with: New York or serif alternatives.",
  "Söhne": "Contemporary Swiss-style sans-serif. Elegant and versatile.",
  "GT Walsheim": "Friendly geometric sans-serif with personality. Good for brands.",
  "Neue Montreal": "Modern grotesk with character. Works well at large sizes.",
  "Space Grotesk": "Tech-forward sans-serif with distinctive character shapes.",
  "Archivo": "Variable font great for headlines and body text. Strong and readable.",
  "Manrope": "Modern geometric sans-serif, open-source alternative to paid fonts.",
};

// Framework-specific tips
const FRAMEWORK_TIPS: Record<string, string> = {
  "React": "Use React with hooks for state management. Consider Framer Motion for animations.",
  "Next.js": "Leverage App Router, Server Components, and next/image for optimization.",
  "Tailwind CSS": "Use utility-first classes. Consider tailwind-animate or @tailwindcss/typography plugins.",
  "Framer": "Use Framer's visual builder for rapid prototyping with code-level customization.",
  "Webflow": "Visual development with clean CSS output. Great for CMS-powered sites.",
  "Vue": "Use Vue with Nuxt for SSR. Consider GSAP or anime.js for animations.",
  "GSAP": "Industry-standard animation library. Use ScrollTrigger for scroll-based animations.",
  "Three.js": "WebGL library for 3D graphics. Consider React Three Fiber for React integration.",
};

class GodlyScraper {
  private baseUrl = "https://godly.website";
  private apiUrl = "https://godly.website/api";
  private websites: GodlyWebsite[] = [];
  private rateLimitMs = 500; // Be respectful to the server

  async scrape(maxPages = 10): Promise<GodlyWebsite[]> {
    console.log("🚀 Starting Godly.website scraper...\n");
    
    let cursor: number | undefined = undefined;
    let pageCount = 0;
    
    while (pageCount < maxPages) {
      const url = cursor 
        ? `${this.apiUrl}/websites/list?take=12&cursor=${cursor}`
        : `${this.apiUrl}/websites/list?take=12`;
      
      console.log(`📥 Fetching page ${pageCount + 1}...`);
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`❌ API error: ${response.status}`);
          break;
        }
        
        const data: ApiResponse = await response.json();
        
        if (!data.websites || data.websites.length === 0) {
          console.log("✅ No more websites to fetch");
          break;
        }
        
        // Process each website
        for (const site of data.websites) {
          const website: GodlyWebsite = {
            id: site.id,
            name: site.name,
            slug: site.slug,
            url: site.url,
            description: site.description,
            thumbnailUrl: site.thumbnailUrl,
            createdAt: site.createdAt,
            type: site.types?.map(t => t.name) || [],
            styles: site.styles?.map(s => s.name) || [],
            fonts: site.fonts?.map(f => f.name) || [],
            frameworks: site.frameworks?.map(f => f.name) || [],
            hosting: site.hosting?.map(h => h.name) || [],
          };
          this.websites.push(website);
        }
        
        console.log(`   Found ${data.websites.length} websites (total: ${this.websites.length})`);
        
        if (!data.nextCursor) {
          console.log("✅ Reached end of list");
          break;
        }
        
        cursor = data.nextCursor;
        pageCount++;
        
        // Rate limiting
        await this.sleep(this.rateLimitMs);
        
      } catch (error) {
        console.error("❌ Error fetching:", error);
        break;
      }
    }
    
    console.log(`\n✨ Scraped ${this.websites.length} websites total\n`);
    return this.websites;
  }

  generateLLMInstructions(website: GodlyWebsite): string {
    const lines: string[] = [];
    
    lines.push(`## ${website.name}`);
    lines.push(`Reference: ${website.url}`);
    lines.push("");
    
    // Design prompt
    lines.push("### Design Prompt");
    lines.push("");
    lines.push("```");
    lines.push(this.generateDesignPrompt(website));
    lines.push("```");
    lines.push("");
    
    // Detailed instructions
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

  generateDesignPrompt(website: GodlyWebsite): string {
    const parts: string[] = [];
    
    // Opening
    parts.push(`Create a ${website.type?.join("/") || "modern"} website inspired by ${website.name}.`);
    
    // Style requirements
    if (website.styles && website.styles.length > 0) {
      parts.push(`\nKey design characteristics:`);
      for (const style of website.styles) {
        parts.push(`- ${style}`);
      }
    }
    
    // Typography
    if (website.fonts && website.fonts.length > 0) {
      parts.push(`\nTypography: Use ${website.fonts.join(" paired with ")} or similar fonts.`);
    }
    
    // Technical
    if (website.frameworks && website.frameworks.length > 0) {
      parts.push(`\nTechnical stack: ${website.frameworks.join(", ")}`);
    }
    
    // Closing
    parts.push(`\nReference the live site at ${website.url} for detailed inspiration.`);
    parts.push(`Focus on capturing the visual essence and interaction patterns while creating something unique.`);
    
    return parts.join("\n");
  }

  generateFullGuide(): string {
    const sections: string[] = [];
    
    sections.push("# Godly Design Inspiration - LLM Instructions Guide");
    sections.push("");
    sections.push("> Auto-generated from godly.website - Astronomically good web design inspiration");
    sections.push("");
    sections.push(`> Generated: ${new Date().toISOString().split('T')[0]}`);
    sections.push("");
    sections.push("---");
    sections.push("");
    
    // Table of contents by type
    const byType = this.groupByType();
    
    sections.push("## Categories");
    sections.push("");
    for (const [type, sites] of Object.entries(byType)) {
      sections.push(`- [${type}](#${type.toLowerCase().replace(/\s+/g, '-')}) (${sites.length} sites)`);
    }
    sections.push("");
    sections.push("---");
    sections.push("");
    
    // Generate sections by type
    for (const [type, sites] of Object.entries(byType)) {
      sections.push(`# ${type}`);
      sections.push("");
      
      for (const site of sites.slice(0, 20)) { // Limit per category
        sections.push(this.generateLLMInstructions(site));
        sections.push("---");
        sections.push("");
      }
    }
    
    return sections.join("\n");
  }

  generateCopyPastePrompts(): string {
    const prompts: string[] = [];
    
    prompts.push("# Quick Copy-Paste Design Prompts");
    prompts.push("");
    prompts.push("> Ready-to-use prompts for AI assistants (Claude, ChatGPT, etc.)");
    prompts.push("");
    
    // Group by dominant style
    const byStyle = this.groupByStyle();
    
    for (const [style, sites] of Object.entries(byStyle).slice(0, 15)) {
      prompts.push(`## ${style} Style`);
      prompts.push("");
      
      for (const site of sites.slice(0, 5)) {
        prompts.push(`### ${site.name}`);
        prompts.push("```");
        prompts.push(this.generateDesignPrompt(site));
        prompts.push("```");
        prompts.push("");
      }
    }
    
    return prompts.join("\n");
  }

  generateStyleGuide(): string {
    const lines: string[] = [];
    
    lines.push("# Design Style Reference Guide");
    lines.push("");
    lines.push("## How to Use This Guide");
    lines.push("");
    lines.push("Copy the relevant sections into your AI assistant prompt to achieve specific design styles.");
    lines.push("");
    lines.push("---");
    lines.push("");
    
    // Style definitions
    lines.push("## Style Definitions");
    lines.push("");
    
    for (const [style, instruction] of Object.entries(STYLE_INSTRUCTIONS)) {
      lines.push(`### ${style}`);
      lines.push("");
      lines.push(instruction);
      lines.push("");
      
      // Find example sites
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
    
    // Font guide
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
    
    return lines.join("\n");
  }

  private groupByType(): Record<string, GodlyWebsite[]> {
    const groups: Record<string, GodlyWebsite[]> = {};
    
    for (const site of this.websites) {
      const type = site.type?.[0] || "Other";
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(site);
    }
    
    return groups;
  }

  private groupByStyle(): Record<string, GodlyWebsite[]> {
    const groups: Record<string, GodlyWebsite[]> = {};
    
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

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  exportJSON(): string {
    return JSON.stringify({
      metadata: {
        source: "godly.website",
        scrapedAt: new Date().toISOString(),
        count: this.websites.length,
      },
      websites: this.websites,
    }, null, 2);
  }
}

// CLI execution
async function main() {
  const scraper = new GodlyScraper();
  
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  GODLY.WEBSITE SCRAPER - Design Inspiration Extractor");
  console.log("═══════════════════════════════════════════════════════════════\n");
  
  // Scrape websites (adjust maxPages as needed)
  const maxPages = parseInt(process.env.MAX_PAGES || "5", 10);
  await scraper.scrape(maxPages);
  
  // Generate outputs
  const fs = await import("fs");
  const path = await import("path");
  
  const outputDir = path.join(process.cwd(), "output", "godly-inspiration");
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write JSON data
  const jsonPath = path.join(outputDir, "websites.json");
  fs.writeFileSync(jsonPath, scraper.exportJSON());
  console.log(`📄 Saved JSON data to: ${jsonPath}`);
  
  // Write full guide
  const guidePath = path.join(outputDir, "design-guide.md");
  fs.writeFileSync(guidePath, scraper.generateFullGuide());
  console.log(`📄 Saved design guide to: ${guidePath}`);
  
  // Write copy-paste prompts
  const promptsPath = path.join(outputDir, "quick-prompts.md");
  fs.writeFileSync(promptsPath, scraper.generateCopyPastePrompts());
  console.log(`📄 Saved quick prompts to: ${promptsPath}`);
  
  // Write style guide
  const stylePath = path.join(outputDir, "style-reference.md");
  fs.writeFileSync(stylePath, scraper.generateStyleGuide());
  console.log(`📄 Saved style reference to: ${stylePath}`);
  
  console.log("\n✅ All done! Check the 'output/godly-inspiration' folder.");
}

// Export for use as module
export { GodlyScraper, GodlyWebsite, STYLE_INSTRUCTIONS, FONT_SUGGESTIONS, FRAMEWORK_TIPS };

// Run if called directly
main().catch(console.error);

