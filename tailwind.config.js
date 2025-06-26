/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        orbit: "spin 20s linear infinite",
      },
      rotate: {
        reverse: "-360deg",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      colors: {
        primary: "#27005D",
        secondary: "#AED2FF",
        accent: "#9400FF",
        light: "#F3F4F6",
        dark: "#121212",
        gray: "#212121"
      },
    },
  },
  plugins: [],
};
