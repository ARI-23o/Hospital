/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a1d37",
          800: "#0f2d59",
          700: "#163d75",
          600: "#1e4f94",
        },
        teal: {
          500: "#0d9488",
          600: "#0f766e",
          700: "#115e59",
        },
        medical: {
          blue: "#0284c7",
          sky: "#e0f2fe",
          lightSky: "#f0f9ff",
          surface: "#f8fafc",
          card: "#ffffff",
          green: "#10b981",
          accentGreen: "#16a34a",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 45, 89, 0.06), 0 2px 6px -1px rgba(15, 45, 89, 0.04)",
        card: "0 10px 25px -5px rgba(15, 45, 89, 0.08), 0 8px 10px -6px rgba(15, 45, 89, 0.04)",
        hover: "0 20px 30px -10px rgba(15, 45, 89, 0.12), 0 10px 10px -5px rgba(15, 45, 89, 0.04)",
      },
    },
  },
  plugins: [],
};
