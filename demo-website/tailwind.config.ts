import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Override default border-radius to discourage rounded corners
    borderRadius: {
      'none': '0',
      'sm': '2px',
      'DEFAULT': '4px',
      'md': '6px',
      'lg': '8px',
      // Intentionally NOT including xl, 2xl, 3xl, full
      // to discourage over-rounded patterns
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          80: "var(--ink-80)",
          60: "var(--ink-60)",
          40: "var(--ink-40)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          bright: "var(--paper-bright)",
        },
        vermilion: {
          DEFAULT: "var(--vermilion)",
          light: "var(--vermilion-light)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          light: "var(--teal-light)",
        },
        focus: "var(--focus-ring)",
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Anybody', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      },
      // No default shadows - we use borders and transforms
      boxShadow: {
        'none': 'none',
      },
    },
  },
  plugins: [],
};

export default config;
