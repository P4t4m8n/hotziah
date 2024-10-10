import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      height: {
        "main-hight": "calc(100vh - 13rem)",
        "text-editor": "calc(100% - 4rem)",
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
