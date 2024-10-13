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
        white: "#ffffffff",
      },

      height: {
        "main-height": "calc(100vh - 9rem)",
        "text-editor": "calc(100% - 4rem)",
        "forum-index": "calc(100% - 5rem)",
        "forum-details-threads": "calc(100% - 14.5rem)",
        "forum-details-list": "calc(100% - 5rem)",
      },
      width: {
        "title-bar": "50ch",
        "description-bar": "255ch",
      },
      boxShadow: {
        model: "0px 10px 3000px 1500px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
