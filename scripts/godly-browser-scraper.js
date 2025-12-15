/**
 * Godly.website Browser Scraper
 * 
 * Run this directly in your browser console at godly.website
 * or use as a bookmarklet.
 * 
 * Usage:
 * 1. Go to https://godly.website/
 * 2. Open browser DevTools (F12 or Cmd+Opt+I)
 * 3. Paste this entire script into the Console tab
 * 4. Run: await scrapeGodly()
 */

const STYLE_INSTRUCTIONS = {
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
  "Glassmorphism": "Use frosted glass effects with backdrop-blur, subtle borders, and layered transparent surfaces.",
  "Grid Layout": "Structure content in a clear grid system. Use CSS Grid for complex layouts with clear visual rhythm.",
  "Animated Cursor": "Customize the cursor with trailing effects, magnetic interactions, or contextual transformations.",
  "Video Background": "Use looping video backgrounds for immersive hero sections. Ensure videos are optimized and have fallbacks.",
  "Noise/Grain": "Add subtle noise textures to backgrounds or images for a tactile, film-like quality.",
};

async function scrapeGodly(maxPages = 5) {
  console.log("🚀 Starting Godly.website scraper...");
  
  const websites = [];
  let cursor = null;
  let page = 0;
  
  while (page < maxPages) {
    const url = cursor 
      ? `https://godly.website/api/websites/list?take=12&cursor=${cursor}`
      : "https://godly.website/api/websites/list?take=12";
    
    console.log(`📥 Fetching page ${page + 1}...`);
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.websites || data.websites.length === 0) {
        console.log("✅ No more websites");
        break;
      }
      
      for (const site of data.websites) {
        websites.push({
          id: site.id,
          name: site.name,
          url: site.url,
          slug: site.slug,
          types: site.types?.map(t => t.name) || [],
          styles: site.styles?.map(s => s.name) || [],
          fonts: site.fonts?.map(f => f.name) || [],
          frameworks: site.frameworks?.map(f => f.name) || [],
        });
      }
      
      console.log(`   Found ${data.websites.length} sites (total: ${websites.length})`);
      
      if (!data.nextCursor) break;
      cursor = data.nextCursor;
      page++;
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 300));
      
    } catch (err) {
      console.error("❌ Error:", err);
      break;
    }
  }
  
  console.log(`\n✨ Scraped ${websites.length} websites!`);
  
  // Generate output
  const output = generateOutput(websites);
  
  // Store in window for easy access
  window.godlyWebsites = websites;
  window.godlyPrompts = output;
  
  console.log("\n📋 Access your data:");
  console.log("   window.godlyWebsites - Raw JSON data");
  console.log("   window.godlyPrompts - Formatted prompts");
  console.log("   copy(window.godlyPrompts) - Copy all prompts to clipboard");
  
  return websites;
}

function generateOutput(websites) {
  let output = `# Godly Design Inspiration - LLM Prompts
> Generated from godly.website on ${new Date().toLocaleDateString()}
> ${websites.length} websites scraped

---

`;

  // Quick prompts section
  output += `## 🚀 Quick Copy-Paste Prompts\n\n`;
  
  for (const site of websites.slice(0, 30)) {
    output += generateSitePrompt(site);
    output += "\n---\n\n";
  }
  
  // Style guide section
  output += `## 📐 Style Implementation Guide\n\n`;
  
  for (const [style, instruction] of Object.entries(STYLE_INSTRUCTIONS)) {
    output += `### ${style}\n${instruction}\n\n`;
    
    const examples = websites
      .filter(w => w.styles?.includes(style))
      .slice(0, 3);
    
    if (examples.length > 0) {
      output += "**Examples:** ";
      output += examples.map(e => `[${e.name}](${e.url})`).join(", ");
      output += "\n\n";
    }
  }
  
  return output;
}

function generateSitePrompt(site) {
  let prompt = `### ${site.name}\n\n`;
  prompt += "```\n";
  prompt += `Create a ${site.types?.join("/") || "modern"} website inspired by ${site.name}.\n`;
  
  if (site.styles?.length > 0) {
    prompt += `\nDesign characteristics:\n`;
    for (const style of site.styles) {
      prompt += `- ${style}`;
      if (STYLE_INSTRUCTIONS[style]) {
        prompt += `: ${STYLE_INSTRUCTIONS[style]}`;
      }
      prompt += "\n";
    }
  }
  
  if (site.fonts?.length > 0) {
    prompt += `\nTypography: ${site.fonts.join(", ")}\n`;
  }
  
  if (site.frameworks?.length > 0) {
    prompt += `\nStack: ${site.frameworks.join(", ")}\n`;
  }
  
  prompt += `\nReference: ${site.url}\n`;
  prompt += "```\n";
  
  return prompt;
}

// Generate a single prompt for immediate use
function generateQuickPrompt(siteName) {
  const site = window.godlyWebsites?.find(
    s => s.name.toLowerCase().includes(siteName.toLowerCase())
  );
  
  if (!site) {
    console.log("Site not found. Run scrapeGodly() first, then try again.");
    return null;
  }
  
  const prompt = generateSitePrompt(site);
  console.log(prompt);
  return prompt;
}

// Export to clipboard helper
function copyPrompts() {
  if (window.godlyPrompts) {
    navigator.clipboard.writeText(window.godlyPrompts);
    console.log("✅ Copied all prompts to clipboard!");
  } else {
    console.log("❌ No prompts available. Run scrapeGodly() first.");
  }
}

// Make functions globally available
window.scrapeGodly = scrapeGodly;
window.generateQuickPrompt = generateQuickPrompt;
window.copyPrompts = copyPrompts;

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🎨 GODLY.WEBSITE SCRAPER LOADED                           ║
╠═══════════════════════════════════════════════════════════════╣
║  Commands:                                                    ║
║  • await scrapeGodly()     - Scrape websites                  ║
║  • generateQuickPrompt()   - Get prompt for specific site     ║
║  • copyPrompts()           - Copy all prompts to clipboard    ║
╚═══════════════════════════════════════════════════════════════╝
`);

