import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        reroute: {
          green: "#1F5136",
          "green-light": "#2E7D4F",
          cream: "#F7F5F0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
