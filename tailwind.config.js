/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        char: "#141414",
        line: "#2a2a2a",
        bone: "#e9e6e0",
        mute: "#8b8b8b",
        accent: "#8ab4ff",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
