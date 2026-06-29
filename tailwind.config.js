export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cake: {
          pink: "#FF4FA3",
          rose: "#E43D90",
          gold: "#F5C96A",
          cream: "#FFF8F3",
          peach: "#FFD9CF",
          cocoa: "#4A342D",
          ink: "#252525",
          mint: "#CFEFE5"
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(74, 52, 45, 0.14)",
        glow: "0 18px 44px rgba(255, 79, 163, 0.28)"
      }
    }
  },
  plugins: []
};
