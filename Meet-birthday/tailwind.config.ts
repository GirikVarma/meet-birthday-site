import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        graphite: {
          900: "#08080a",
          800: "#121215",
        },
        apple: {
          blue: "#2997ff",
          gray: "#86868b",
        }
      }
    },
  },
  plugins: [],
};
export default config;