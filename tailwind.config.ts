import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        babra: {
          red: "#a9141d",
          gold: "#c79a3d",
          black: "#080606"
        }
      }
    }
  },
  plugins: []
};

export default config;
