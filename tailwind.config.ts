import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#A9539F",
        turquoise: "#00C7BF",
        black: "#11111F",
        blue: "#14213dff",
        orange: "#fca311ff",
        platinum: "#6b7280",
        white: "#ffffff",
        "light-blue": "#1098F7",
        "dark-blue": "#044389",
      },
      height: {
        "main-height": "calc(100vh - 5rem)",
        "text-editor": "calc(100% - 4rem)",
        "forum-index": "calc(100% - 5rem)",
        "forum-details-posts": "calc(100% - 12rem)",
        "post-edit": "calc(100% - 11rem)",
        "post-edit-form": "calc(100% - 2.5rem)",
        "user-list": "calc(100% - 8rem)",
        "user-dashboard": "calc(100% - 1.75rem)",
      },
      minHeight: {
        "main-height": "calc(100vh - 5rem)",
      },
      width: {
        "title-bar": "50ch",
        "description-bar": "255ch",
        "forum-edit": "clamp(20rem, 100%,40rem)",
        "therapist-details": "30rem",
      },
      boxShadow: {
        model: "0px 10px 3000px 1500px rgba(0, 0, 0, 0.5)",
        "post-card": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      fontSize: {
        "font-size-12": "0.75rem",
        "font-size-14": "0.875rem",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.3s ease-out forwards",
        slideOutRight: "slideOutRight 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
export default config;
