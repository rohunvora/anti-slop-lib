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
          DEFAULT: "#0d0c0b",
          80: "#2d2b29",
          60: "#4d4a47",
          40: "#7d7975",
        },
        paper: {
          DEFAULT: "#f5f2eb",
          bright: "#fdfcfa",
        },
        vermilion: {
          DEFAULT: "#c42a0e",
          light: "#e84a2e",
        },
        teal: {
          DEFAULT: "#0a6e66",
          light: "#0d918a",
        },
        focus: "#0066cc",
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
