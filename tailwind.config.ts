import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gooseNavy: "#08294A",
        gooseNavySoft: "#123F6A",
        gooseKiwi: "#7BCB4A",
        gooseBanana: "#FFD95A",
        gooseCanvas: "#F7FAFF"
      },
      borderRadius: {
        goose: "1rem"
      },
      boxShadow: {
        card: "0 10px 24px rgba(8, 41, 74, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
