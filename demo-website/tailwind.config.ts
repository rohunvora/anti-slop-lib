import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette: Ink & Paper
        ink: {
          DEFAULT: "#0d0c0b",
          90: "#1a1918",
          80: "#2d2b29",
          60: "#5c5856",
          40: "#8b8783",
          20: "#bab6b0",
        },
        paper: {
          DEFAULT: "#e8e4dc",
          warm: "#f5f2eb",
          bright: "#faf8f4",
        },
        // Accent: Vermilion
        vermilion: {
          DEFAULT: "#e63312",
          dark: "#c42a0e",
          glow: "rgba(230, 51, 18, 0.15)",
        },
        // Secondary: Teal
        teal: {
          DEFAULT: "#00a89d",
          dark: "#008a81",
        },
        // Functional
        code: "#1c1b1a",
        border: {
          DEFAULT: "#d4d0c8",
          dark: "#3d3b38",
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Anybody', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderWidth: {
        '3': '3px',
      },
      transitionDuration: {
        '150': '150ms',
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
