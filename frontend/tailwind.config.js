import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        blackblue: {
          primary: "#3B82F6",        // Blue
          secondary: "#000000",      // Black
          accent: "#1E40AF",         // Darker blue
          neutral: "#1f2937",        // Gray
          "base-100": "#000000",     // Background
          "base-content": "#ffffff", // White text
          info: "#60A5FA",
          success: "#4ADE80",
          warning: "#FACC15",
          error: "#F87171",
        },
      },
      // all default themes can stay below
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
