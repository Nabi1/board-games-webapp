import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        overlay: "rgba(0, 0, 0, 0.282)",
      },
      backdropFilter: {
        blur: "blur(5px)",
      },
      colors: {
        "custom-blue": "#5273E8",
        "custom-white": "#ffffff",
        "custom-gray": "#f6f1ee",
      },
    },
  },
  plugins: [],
};
export default config;
