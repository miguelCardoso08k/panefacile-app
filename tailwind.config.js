/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F3",
        ink: "#17201B",
        brand: {
          50: "#EAF4EE",
          100: "#D6E9DC",
          500: "#0B6B3A",
          600: "#075C31",
          700: "#064A29",
          900: "#07351F",
        },
        gold: "#D89216",
        danger: "#D93636",
      },
    },
  },
  plugins: [],
};
