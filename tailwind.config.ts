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
        black: "#000000ff",
        blue: "#14213dff",
        orange: "#fca311ff",
        platinum: "#6b7280",
        white: "#ffffff",
        "light-blue": "#1098F7",
        "dark-blue": "#044389",
      },
      height: {
        "main-height": "calc(100vh - 9rem)",
        "text-editor": "calc(100% - 4rem)",
        "forum-index": "calc(100% - 5rem)",
        "forum-details-posts": "calc(100% - 12rem)",
        "forum-details-list": "calc(100% - 5rem)",
        "post-edit": "calc(100% - 11rem)",
        "post-edit-form": "calc(100% - 2.5rem)",
      },
      width: {
        "title-bar": "50ch",
        "description-bar": "255ch",
        "forum-edit": "clamp(20rem, 100%,40rem)",
      },
      boxShadow: {
        model: "0px 10px 3000px 1500px rgba(0, 0, 0, 0.5)",
      },
      fontSize: {
        "font-size-12": "0.75rem",
        "font-size-14": "0.875rem",
      },
    },
  },
  plugins: [],
};
export default config;
