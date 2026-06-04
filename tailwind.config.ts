import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1DB954",
        "spotify-green-dark": "#1aa34a",
        "spotify-black": "#121212",
        "spotify-dark": "#181818",
        "spotify-gray": "#282828",
        "spotify-light-gray": "#b3b3b3",
      },
    },
  },
  plugins: [],
};
export default config;
