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
        // Warm editorial palette (good design)
        editorial: {
          primary: "#B8860B",
          secondary: "#8B4513",
          background: "#FAF7F2",
          surface: "#FFFFFF",
          text: "#2D2A26",
          muted: "#6B6560",
          accent: "#CD853F",
          border: "#E8E4DD",
        },
        // Slop palette (bad design)
        slop: {
          purple: "#8B5CF6",
          indigo: "#6366F1",
          pink: "#EC4899",
          dark: "#0f0f0f",
          slate: "#111827",
        },
      },
      fontFamily: {
        // Good fonts
        serif: ["Fraunces", "serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
        // Slop fonts
        slop: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

