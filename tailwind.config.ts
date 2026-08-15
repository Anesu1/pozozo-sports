import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1A1A1A",
          hover: "#000000",
          light: "#333333",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F6F4F1",
          muted: "#ECE9E7",
          border: "#E8E4DF",
        },
        accent: {
          green: "#26D18A",
          red: "#D13648",
          pink: "#FCB6C0",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#757575",
          muted: "#9E9E9E",
        }
      },
      fontFamily: {
        sans: ['var(--font-general-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-cabinet-grotesk)', 'sans-serif'],
        heading: ['var(--font-instrument-sans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
