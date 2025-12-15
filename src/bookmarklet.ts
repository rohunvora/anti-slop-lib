/**
 * ANTI-SLOP BOOKMARKLET
 * 
 * Drop this into your browser bookmarks to analyze any live website for slop patterns.
 * 
 * Usage:
 * 1. Create a new bookmark in your browser
 * 2. Set the URL to the output of generateBookmarklet()
 * 3. Click the bookmark on any webpage to analyze it
 */

export const BOOKMARKLET_CODE = `
(function() {
  // Slop detection patterns
  const SLOP_PATTERNS = {
    fonts: [
      'Inter', 'inter', 'Space Grotesk', 'space-grotesk',
      'Plus Jakarta Sans', 'Manrope', 'DM Sans', 'font-sans'
    ],
    purpleColors: [
      'purple', 'violet', 'indigo', '#8B5CF6', '#7C3AED', 
      '#6366F1', '#818CF8', '#A78BFA', '#6D28D9', '#5B21B6'
    ],
    slopClasses: [
      'from-purple', 'from-violet', 'from-indigo',
      'to-pink', 'to-fuchsia', 'bg-purple', 'bg-violet', 'bg-indigo',
      'backdrop-blur', 'rounded-xl', 'rounded-2xl', 'shadow-md', 'shadow-lg'
    ],
    slopCopy: [
      /AI[- ]?Powered/i, /Supercharge/i, /Transform your/i,
      /Revolutionize/i, /Seamlessly/i, /Effortlessly/i,
      /10x your/i, /Ship faster/i, /Get Started Free/i
    ]
  };

  // Collect all stylesheets
  function getComputedFonts() {
    const fonts = new Set();
    document.querySelectorAll('*').forEach(el => {
      const font = getComputedStyle(el).fontFamily;
      fonts.add(font);
    });
    return Array.from(fonts);
  }

  // Get all class names
  function getAllClasses() {
    const classes = new Set();
    document.querySelectorAll('[class]').forEach(el => {
      el.classList.forEach(c => classes.add(c));
    });
    return Array.from(classes);
  }

  // Get page text
  function getPageText() {
    return document.body.innerText;
  }

  // Analyze
  function analyze() {
    const issues = [];
    let score = 0;

    // Check fonts
    const fonts = getComputedFonts();
    SLOP_PATTERNS.fonts.forEach(slopFont => {
      if (fonts.some(f => f.toLowerCase().includes(slopFont.toLowerCase()))) {
        issues.push({ type: 'font', severity: 'warning', detail: 'Using ' + slopFont + ' font' });
        score += 8;
      }
    });

    // Check classes
    const classes = getAllClasses();
    const classStr = classes.join(' ');
    SLOP_PATTERNS.slopClasses.forEach(slopClass => {
      if (classStr.includes(slopClass)) {
        const severity = slopClass.includes('purple') || slopClass.includes('violet') || slopClass.includes('indigo')
          ? 'critical' : 'warning';
        issues.push({ type: 'class', severity, detail: 'Found ' + slopClass + ' class' });
        score += severity === 'critical' ? 15 : 8;
      }
    });

    // Check purple colors in inline styles
    document.querySelectorAll('[style]').forEach(el => {
      const style = el.getAttribute('style') || '';
      SLOP_PATTERNS.purpleColors.forEach(color => {
        if (style.toLowerCase().includes(color.toLowerCase())) {
          issues.push({ type: 'color', severity: 'critical', detail: 'Purple/violet color: ' + color });
          score += 15;
        }
      });
    });

    // Check copy
    const text = getPageText();
    SLOP_PATTERNS.slopCopy.forEach(pattern => {
      if (pattern.test(text)) {
        issues.push({ type: 'copy', severity: 'warning', detail: 'Generic copy: ' + pattern.toString() });
        score += 5;
      }
    });

    // Check for blobs (look for large blurred elements)
    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      if (style.filter.includes('blur') && parseInt(style.width) > 200) {
        issues.push({ type: 'imagery', severity: 'critical', detail: 'Possible blob/orb decoration' });
        score += 15;
      }
    });

    return { score: Math.min(100, score), issues };
  }

  // Calculate grade
  function getGrade(score) {
    if (score <= 10) return 'A';
    if (score <= 25) return 'B';
    if (score <= 45) return 'C';
    if (score <= 65) return 'D';
    return 'F';
  }

  // Create UI
  function showResults(result) {
    const existing = document.getElementById('anti-slop-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'anti-slop-panel';
    panel.innerHTML = \`
      <style>
        #anti-slop-panel {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 350px;
          max-height: 80vh;
          background: #1a1a1a;
          color: #fff;
          font-family: -apple-system, system-ui, sans-serif;
          font-size: 14px;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          z-index: 999999;
          overflow: hidden;
        }
        #anti-slop-panel * { box-sizing: border-box; margin: 0; padding: 0; }
        .asp-header {
          padding: 16px;
          background: #252525;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .asp-title {
          font-weight: 600;
          font-size: 16px;
        }
        .asp-close {
          background: none;
          border: none;
          color: #888;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
        }
        .asp-close:hover { color: #fff; }
        .asp-score {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #333;
        }
        .asp-grade {
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
        }
        .asp-grade.A, .asp-grade.B { color: #22c55e; }
        .asp-grade.C { color: #eab308; }
        .asp-grade.D, .asp-grade.F { color: #ef4444; }
        .asp-score-num {
          color: #888;
          margin-top: 4px;
        }
        .asp-issues {
          padding: 16px;
          max-height: 300px;
          overflow-y: auto;
        }
        .asp-issue {
          padding: 8px 12px;
          margin-bottom: 8px;
          border-radius: 4px;
          font-size: 13px;
        }
        .asp-issue.critical { background: rgba(239, 68, 68, 0.2); border-left: 3px solid #ef4444; }
        .asp-issue.warning { background: rgba(234, 179, 8, 0.2); border-left: 3px solid #eab308; }
        .asp-issue.info { background: rgba(59, 130, 246, 0.2); border-left: 3px solid #3b82f6; }
        .asp-type {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 10px;
          opacity: 0.7;
          margin-bottom: 2px;
        }
        .asp-empty {
          text-align: center;
          color: #22c55e;
          padding: 20px;
        }
        .asp-footer {
          padding: 12px 16px;
          background: #252525;
          border-top: 1px solid #333;
          font-size: 11px;
          color: #666;
          text-align: center;
        }
        .asp-footer a { color: #888; }
      </style>
      <div class="asp-header">
        <span class="asp-title">🔍 Anti-Slop Analysis</span>
        <button class="asp-close" onclick="document.getElementById('anti-slop-panel').remove()">×</button>
      </div>
      <div class="asp-score">
        <div class="asp-grade \${getGrade(result.score)}">\${getGrade(result.score)}</div>
        <div class="asp-score-num">Slop Score: \${result.score}/100</div>
      </div>
      <div class="asp-issues">
        \${result.issues.length === 0 
          ? '<div class="asp-empty">✨ No slop patterns detected!</div>'
          : result.issues.map(i => \`
              <div class="asp-issue \${i.severity}">
                <div class="asp-type">\${i.type}</div>
                \${i.detail}
              </div>
            \`).join('')
        }
      </div>
      <div class="asp-footer">
        Anti-Slop Library • <a href="https://github.com/anti-slop" target="_blank">GitHub</a>
      </div>
    \`;
    
    document.body.appendChild(panel);
  }

  // Run analysis
  const result = analyze();
  showResults(result);
})();
`.trim();

/**
 * Generate a minified bookmarklet URL
 */
export function generateBookmarklet(): string {
  // Minify by removing newlines and extra spaces
  const minified = BOOKMARKLET_CODE
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,:])\s*/g, '$1')
    .trim();
  
  return `javascript:${encodeURIComponent(minified)}`;
}

/**
 * Get the bookmarklet as a simple HTML link for documentation
 */
export function getBookmarkletLink(title = 'Anti-Slop Check'): string {
  const url = generateBookmarklet();
  return `<a href="${url}">${title}</a>`;
}

/**
 * Get installation instructions
 */
export function getBookmarkletInstructions(): string {
  return `
# Anti-Slop Bookmarklet

Analyze any website for AI slop patterns directly in your browser.

## Installation

1. **Create a new bookmark** in your browser (Cmd/Ctrl + D, or right-click bookmarks bar)
2. **Edit the bookmark**:
   - Name it "Anti-Slop Check"
   - Replace the URL with the code below
3. **Save the bookmark**

## Bookmarklet Code

Copy this entire string as the bookmark URL:

\`\`\`
${generateBookmarklet()}
\`\`\`

## Usage

1. Navigate to any website you want to analyze
2. Click the "Anti-Slop Check" bookmark
3. A panel will appear showing:
   - Overall grade (A-F)
   - Slop score (0-100)
   - List of detected issues

## What It Checks

- **Fonts**: Inter, Space Grotesk, and other overused fonts
- **Colors**: Purple gradients and typical AI color palettes
- **Components**: rounded-xl cards, glassmorphism, shadows
- **Copy**: Generic headlines like "AI-Powered" or "Transform your"
- **Effects**: Blurred blob decorations

## Limitations

- Only analyzes visible content and inline styles
- Cannot read external stylesheets deeply
- Best used as a quick check, not a comprehensive audit
`.trim();
}

