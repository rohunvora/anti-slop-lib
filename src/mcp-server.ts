#!/usr/bin/env node

/**
 * ANTI-SLOP MCP SERVER
 * 
 * "We don't generate design — we remove the tells that make your site look mass-produced."
 * 
 * Provides tools to detect template/AI signals and suggest minimal fixes.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { analyze, verifyFix, quickCheck, ToneMode } from './analyzer.js';
import { SIGNALS, getSignalsBySalience } from './signals.js';
import { getKit, listKitNames, type KitName } from './design-kits/index.js';

const server = new Server(
  {
    name: 'anti-slop',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================================================
// TOOL DEFINITIONS
// ============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // ==================== CORE TOOLS ====================
      {
        name: 'check_for_template_signals',
        description: 'Analyze code/CSS/HTML for signals that make sites look template-derived or AI-generated. Returns ranked signals with specific fixes. These are perception triggers — not proof of AI usage.',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'The code to analyze (HTML, CSS, JSX, or Tailwind classes)',
            },
            tone: {
              type: 'string',
              enum: ['direct', 'diplomatic'],
              description: 'Output tone: "direct" is blunt, "diplomatic" is softer. Default: direct',
            },
          },
          required: ['code'],
        },
      },
      {
        name: 'verify_fix',
        description: 'Compare before/after code to verify improvements. Shows which signals were removed, which remain, and any regressions.',
        inputSchema: {
          type: 'object',
          properties: {
            originalCode: {
              type: 'string',
              description: 'The original code with template signals',
            },
            newCode: {
              type: 'string',
              description: 'The fixed code to compare against',
            },
            tone: {
              type: 'string',
              enum: ['direct', 'diplomatic'],
              description: 'Output tone. Default: direct',
            },
          },
          required: ['originalCode', 'newCode'],
        },
      },
      {
        name: 'suggest_patches',
        description: 'Get specific code patches to remove a detected signal. Returns minimal, structural, and alternative fixes.',
        inputSchema: {
          type: 'object',
          properties: {
            signalId: {
              type: 'string',
              description: 'The signal ID to get patches for (e.g., "purple-gradient", "centered-hero-generic-cta")',
            },
            context: {
              type: 'string',
              description: 'Optional: the specific code context where the signal was detected, for more targeted patches',
            },
          },
          required: ['signalId'],
        },
      },
      {
        name: 'list_signals',
        description: 'List all detectable template signals with their salience levels and descriptions.',
        inputSchema: {
          type: 'object',
          properties: {
            salience: {
              type: 'string',
              enum: ['high', 'medium', 'low', 'all'],
              description: 'Filter by salience level. Default: all',
            },
          },
        },
      },

      // ==================== ESCAPE HATCH TOOLS ====================
      {
        name: 'get_escape_kit',
        description: 'Get an "escape hatch" design grammar if you\'re stuck. These are coherent directions that avoid template signals — not "the right design." Available: editorial, technical, playful',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['editorial', 'technical', 'playful'],
              description: 'The design grammar to retrieve',
            },
          },
          required: ['style'],
        },
      },
      {
        name: 'list_escape_kits',
        description: 'List available escape hatch design grammars with their characteristics.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },

      // ==================== UTILITY TOOLS ====================
      {
        name: 'get_css_variables',
        description: 'Get CSS variables for an escape kit (ready to paste into globals.css)',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['editorial', 'technical', 'playful'],
              description: 'The design grammar',
            },
          },
          required: ['style'],
        },
      },
      {
        name: 'get_tailwind_config',
        description: 'Get Tailwind config extension for an escape kit',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['editorial', 'technical', 'playful'],
              description: 'The design grammar',
            },
          },
          required: ['style'],
        },
      },

      // ==================== BACKWARDS COMPATIBILITY ====================
      // These are hidden from main listing but still work
      {
        name: 'analyze_for_slop',
        description: '[DEPRECATED: Use check_for_template_signals] Analyze code for AI slop patterns.',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'The code to analyze',
            },
          },
          required: ['code'],
        },
      },
    ],
  };
});

// ============================================================================
// TOOL HANDLERS
// ============================================================================

// Map style names to kit names
const STYLE_TO_KIT: Record<string, KitName> = {
  'editorial': 'warm-editorial',
  'technical': 'swiss-precision',
  'playful': 'vibrant-play',
};

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    // ==================== CORE TOOLS ====================

    case 'check_for_template_signals': {
      const code = args?.code as string;
      const tone = (args?.tone as ToneMode) || 'direct';

      if (!code) {
        return { content: [{ type: 'text', text: 'Error: code is required' }] };
      }

      const result = analyze(code, { tone });

      // Format signals for output
      const formattedSignals = result.topSignals.map(signal => ({
        id: signal.id,
        label: signal.label,
        salience: signal.salience,
        confidence: Math.round(signal.confidence * 100) / 100,
        whyItReadsGeneric: signal.whyItReadsGeneric,
        perception: signal.perception,
        evidence: signal.evidence.slice(0, 5),  // Limit evidence
        quickFixes: signal.quickFixes.map(fix => ({
          effort: fix.effort,
          change: fix.change,
          patch: fix.patch,
          tradeoffs: fix.tradeoffs,
        })),
        prevalence: signal.prevalence,
        references: signal.references,
      }));

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            templateScore: result.templateScore,
            risk: result.risk,
            headline: result.headline,
            explanation: result.explanation,
            summary: result.summary,
            topSignals: formattedSignals,
            allSignalIds: result.allSignals.map(s => s.id),
            disclaimer: result.disclaimer,
          }, null, 2),
        }],
      };
    }

    case 'verify_fix': {
      const originalCode = args?.originalCode as string;
      const newCode = args?.newCode as string;
      const tone = (args?.tone as ToneMode) || 'direct';

      if (!originalCode || !newCode) {
        return { content: [{ type: 'text', text: 'Error: both originalCode and newCode are required' }] };
      }

      const result = verifyFix(originalCode, newCode, { tone });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            improved: result.improved,
            before: result.before,
            after: result.after,
            signalsRemoved: result.signalsRemoved,
            signalsDowngraded: result.signalsDowngraded,
            signalsRemaining: result.signalsRemaining,
            regressions: result.regressions,
            summary: result.summary,
          }, null, 2),
        }],
      };
    }

    case 'suggest_patches': {
      const signalId = args?.signalId as string;
      const context = args?.context as string;

      if (!signalId) {
        return { content: [{ type: 'text', text: 'Error: signalId is required' }] };
      }

      const signal = SIGNALS.find(s => s.id === signalId);
      if (!signal) {
        return {
          content: [{
            type: 'text',
            text: `Error: Unknown signal "${signalId}". Use list_signals to see available signals.`,
          }],
        };
      }

      const patches = {
        signalId: signal.id,
        label: signal.label,
        whyItReadsGeneric: signal.whyItReadsGeneric,
        fixes: signal.quickFixes.map(fix => ({
          effort: fix.effort,
          description: fix.change,
          patch: fix.patch || null,
          tradeoffs: fix.tradeoffs || null,
        })),
        references: signal.references || [],
        note: 'These are minimal changes to remove the template signal. Choose based on your constraints.',
      };

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(patches, null, 2),
        }],
      };
    }

    case 'list_signals': {
      const salience = args?.salience as string || 'all';

      let signals = SIGNALS;
      if (salience !== 'all') {
        signals = getSignalsBySalience(salience as 'high' | 'medium' | 'low');
      }

      const formatted = signals.map(s => ({
        id: s.id,
        label: s.label,
        category: s.category,
        salience: s.salience,
        whyItReadsGeneric: s.whyItReadsGeneric,
        perception: s.perception,
        prevalence: s.prevalence,
      }));

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            count: formatted.length,
            signals: formatted,
          }, null, 2),
        }],
      };
    }

    // ==================== ESCAPE HATCH TOOLS ====================

    case 'get_escape_kit': {
      const style = args?.style as string;
      if (!style || !STYLE_TO_KIT[style]) {
        return {
          content: [{
            type: 'text',
            text: 'Error: style must be one of: editorial, technical, playful',
          }],
        };
      }

      const kitName = STYLE_TO_KIT[style];
      const kit = getKit(kitName);

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            style,
            name: kit.name,
            vibe: kit.vibe,
            note: 'This is an escape hatch — a coherent direction that avoids template signals. Not "the right design."',
            grammar: {
              typography: {
                display: kit.fonts.display.name,
                body: kit.fonts.body.name,
                pairing: `${kit.fonts.display.name} for headlines, ${kit.fonts.body.name} for body`,
                cssImports: kit.fonts.cssImports,
              },
              spacing: {
                rhythm: kit.tokens.typography,
                radius: kit.tokens.radius,
                borderWidth: kit.tokens.borderWidth,
              },
              palette: {
                light: kit.tokens.colors,
                dark: kit.tokens.colorsDark,
                constraint: 'Use these as a system, not individual colors',
              },
              components: {
                button: kit.components.button,
                card: kit.components.card,
              },
              layout: {
                heroAsymmetric: kit.layouts.heroAsymmetric,
                heroEditorial: kit.layouts.heroEditorial,
              },
            },
            antiPatterns: kit.guidance?.antiPatterns || [],
            references: kit.references.gold.map(r => ({
              name: r.name,
              url: r.url,
              stealThis: r.stealThis,
            })),
          }, null, 2),
        }],
      };
    }

    case 'list_escape_kits': {
      const kits = [
        {
          style: 'editorial',
          name: 'Warm Editorial',
          vibe: 'Literary, thoughtful, New Yorker website feel',
          bestFor: ['Blogs', 'Newsletters', 'Content-heavy sites', 'Publishing'],
          keyTraits: ['Serif headlines', 'Warm colors', 'Sharp corners', 'Border accents'],
        },
        {
          style: 'technical',
          name: 'Swiss Precision',
          vibe: 'Clean, systematic, Linear/Vercel feel',
          bestFor: ['SaaS', 'Developer tools', 'Dashboards', 'Enterprise'],
          keyTraits: ['Geometric sans', 'Minimal color', 'Tight grid', 'Subtle depth'],
        },
        {
          style: 'playful',
          name: 'Vibrant Play',
          vibe: 'Bold, energetic, consumer app feel',
          bestFor: ['Consumer apps', 'Games', 'Social products', 'Creative tools'],
          keyTraits: ['Bold type', 'Saturated colors', 'Rounded elements', 'Motion'],
        },
      ];

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            note: 'These are escape hatches — coherent directions that avoid template signals. Pick one if you\'re stuck, or just use the signal detection to fix specific issues.',
            kits,
          }, null, 2),
        }],
      };
    }

    // ==================== UTILITY TOOLS ====================

    case 'get_css_variables': {
      const style = args?.style as string;
      if (!style || !STYLE_TO_KIT[style]) {
        return {
          content: [{
            type: 'text',
            text: 'Error: style must be one of: editorial, technical, playful',
          }],
        };
      }

      const kitName = STYLE_TO_KIT[style];
      const kit = getKit(kitName);
      const colors = kit.tokens.colors;
      const colorsDark = kit.tokens.colorsDark;

      const css = `/* ${kit.name} - Escape Hatch CSS Variables */
/* This is ONE direction that avoids template signals. Not "the right design." */

/* Font imports */
${kit.fonts.cssImports.join('\n')}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: ${colors.background};
    --foreground: ${colors.foreground};
    --primary: ${colors.primary};
    --primary-foreground: ${colors.primaryForeground};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${colors.secondaryForeground};
    --muted: ${colors.muted};
    --muted-foreground: ${colors.mutedForeground};
    --accent: ${colors.accent};
    --accent-foreground: ${colors.accentForeground};
    --border: ${colors.border};
    --ring: ${colors.ring};
    --radius: ${kit.tokens.radius === 'none' ? '0' : kit.tokens.radius === 'sm' ? '0.125rem' : kit.tokens.radius === 'md' ? '0.375rem' : '0.5rem'};
  }

  .dark {
    --background: ${colorsDark.background};
    --foreground: ${colorsDark.foreground};
    --primary: ${colorsDark.primary};
    --primary-foreground: ${colorsDark.primaryForeground};
    --secondary: ${colorsDark.secondary};
    --secondary-foreground: ${colorsDark.secondaryForeground};
    --muted: ${colorsDark.muted};
    --muted-foreground: ${colorsDark.mutedForeground};
    --accent: ${colorsDark.accent};
    --accent-foreground: ${colorsDark.accentForeground};
    --border: ${colorsDark.border};
    --ring: ${colorsDark.ring};
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: ${kit.fonts.fallbackStack};
  }
}
`;

      return { content: [{ type: 'text', text: css }] };
    }

    case 'get_tailwind_config': {
      const style = args?.style as string;
      if (!style || !STYLE_TO_KIT[style]) {
        return {
          content: [{
            type: 'text',
            text: 'Error: style must be one of: editorial, technical, playful',
          }],
        };
      }

      const kitName = STYLE_TO_KIT[style];
      const kit = getKit(kitName);

      const config = `// tailwind.config.ts
// ${kit.name} - Escape Hatch Config

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: ${JSON.stringify(kit.tailwindExtend, null, 6).split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')},
  },
  plugins: [],
};

export default config;
`;

      return { content: [{ type: 'text', text: config }] };
    }

    // ==================== BACKWARDS COMPATIBILITY ====================

    case 'analyze_for_slop': {
      // Redirect to new tool
      const code = args?.code as string;
      if (!code) {
        return { content: [{ type: 'text', text: 'Error: code is required' }] };
      }

      const result = analyze(code, { tone: 'direct' });

      // Return in old format for compatibility
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            // Old format fields
            slopScore: result.templateScore,
            grade: result.risk === 'low' ? 'A' : result.risk === 'medium' ? 'C' : 'F',
            isSlop: result.risk !== 'low',
            // New format fields
            templateScore: result.templateScore,
            risk: result.risk,
            headline: result.headline,
            summary: result.summary,
            issues: result.topSignals.map(s => ({
              pattern: s.label,
              severity: s.salience,
              description: s.whyItReadsGeneric,
              fix: s.quickFixes[0]?.change,
            })),
            disclaimer: result.disclaimer,
            _deprecated: 'This tool is deprecated. Use check_for_template_signals instead.',
          }, null, 2),
        }],
      };
    }

    // Legacy tool names that redirect
    case 'get_design_kit': {
      // Map old kit names to new style names
      const kitName = args?.kit as string;
      const styleMap: Record<string, string> = {
        'warm-editorial': 'editorial',
        'swiss-precision': 'technical',
        'brutalist-raw': 'technical',
        'forest-organic': 'editorial',
        'noir-luxury': 'technical',
        'vibrant-play': 'playful',
      };
      const style = styleMap[kitName] || 'editorial';

      // Redirect to get_escape_kit
      const kit = getKit(kitName as KitName);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            _note: 'Design kits are now "escape hatches" — use get_escape_kit for the new API',
            id: kit.id,
            name: kit.name,
            vibe: kit.vibe,
            fonts: {
              display: kit.fonts.display.name,
              body: kit.fonts.body.name,
              cssImports: kit.fonts.cssImports,
            },
            colors: kit.tokens.colors,
            components: kit.components,
            antiPatterns: kit.guidance?.antiPatterns || [],
          }, null, 2),
        }],
      };
    }

    case 'list_design_kits': {
      // Redirect to list_escape_kits with a note
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            _note: 'Design kits are now "escape hatches" — use list_escape_kits for the new API',
            kits: listKitNames().map(name => {
              const kit = getKit(name);
              return {
                id: kit.id,
                name: kit.name,
                vibe: kit.vibe,
              };
            }),
          }, null, 2),
        }],
      };
    }

    case 'suggest_kit_for_project': {
      // Simplified redirect
      const projectType = (args?.projectType as string || '').toLowerCase();

      let style = 'editorial';
      if (projectType.includes('saas') || projectType.includes('dashboard') || projectType.includes('tool') || projectType.includes('dev')) {
        style = 'technical';
      } else if (projectType.includes('game') || projectType.includes('social') || projectType.includes('consumer') || projectType.includes('app')) {
        style = 'playful';
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            _note: 'Use get_escape_kit with the recommended style',
            recommended: style,
            reason: `Based on project type "${projectType}"`,
          }, null, 2),
        }],
      };
    }

    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
  }
});

// ============================================================================
// START SERVER
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Anti-Slop MCP server v2.0 running');
  console.error('Tools: check_for_template_signals, verify_fix, suggest_patches, list_signals');
  console.error('Escape hatches: get_escape_kit, list_escape_kits');
}

main().catch(console.error);
