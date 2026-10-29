/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          black: "#0A0A0A",
          pitch: "#141414",
          charcoal: "#1F1F1F",
          slate: "#404040",
          ash: "#9CA3AF",
          bone: "#F5F5F3",
          cream: "#FAF9F6",
          border: "#E5E5E0",
          white: "#FFFFFF",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif"
        ],
        display: [
          "Syne",
          "Inter",
          "-apple-system",
          "sans-serif"
        ]
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'super-wide': '0.25em',
        'ultra-wide': '0.35em',
      }
    },
  },
  plugins: [],
}
