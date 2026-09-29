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
          teal: "#0F6E56",
          "teal-light": "#15997A",
          navy: "#14213D",
          orange: "#D85A30",
          "orange-light": "#E67C4E",
          cream: "#F7F5F0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
