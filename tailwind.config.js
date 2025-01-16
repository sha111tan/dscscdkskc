/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./App.{js,jsx,ts,tsx}", // Главный файл приложения
    "./src/**/*.{js,jsx,ts,tsx}", // Все компоненты в папке src
  ],
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-mono": ['"IBMPlexMono"', "Arial", "sans-serif"],
      },
      fontWeight: {
        "extra-bold": "900",
      },
      colors: {
        orange: "#f1814a",
        "black-20": "rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
    },
  },
  plugins: [
    // Добавляем поддержку кастомных утилит, которые будут работать в NativeWind
    function ({ addUtilities }) {
      addUtilities({
        ".will-change-opacity": {
          willChange: "opacity",
        },
      });
    },
  ],
};
