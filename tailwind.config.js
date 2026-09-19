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
          DEFAULT: "#055B39",
          dark: "#06452F",
          light: "#E9F5EF",
          gold: "#D58A17",
          "gold-light": "#FFF4DF",
        },

        success: {
          DEFAULT: "#2D9B4F",
          light: "#E5F5EB",
        },

        warning: {
          DEFAULT: "#E5252A",
          light: "#FDEBEC",
        },

        gold: "#D89216",
        danger: {
          DEFAULT: "#E5252A",
          light: "#FDEBEC",
        },

        info: {
          DEFAULT: "#2878C7",
          light: "#E8F3FD",
        },

        text: {
          primary: "#0B1026",
          secondary: "#526681",
          muted: "#7D8FA3",
        },

        border: "#DCE4E8",

        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F3F6F8",
        },

        background: "#FDFEFE",

        disabled: "#C7D0D8",
      },

      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        "inter-extrabold": ["Inter_800ExtraBold"],
      },

      fontSize: {
        display: ["44px", { lineHeight: "48px", fontWeight: "800" }],
        "page-title": ["30px", { lineHeight: "36px", fontWeight: "700" }],
        "screen-title": ["26px", { lineHeight: "32px", fontWeight: "700" }],
        "section-title": ["20px", { lineHeight: "26px", fontWeight: "700" }],
        "card-title": ["17px", { lineHeight: "22px", fontWeight: "700" }],
        body: ["16px", { lineHeight: "22px" }],
        label: ["14px", { lineHeight: "20px", fontWeight: "600" }],
        caption: ["12px", { lineHeight: "16px" }],
      },

      borderRadius: {
        card: "16px",
        input: "12px",
        modal: "20px",
      },

      spacing: {
        18: "72px",
        22: "88px",
      },
    },
  },
  plugins: [],
};
