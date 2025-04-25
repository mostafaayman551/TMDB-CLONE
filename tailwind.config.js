/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        10: "10",
      },
      colors: {
        imdb: "#F5C518",
        facebook: "#1877F2",
        twitter: "#1DA1F2",
        instagram: "#E1306C",
      },
    },
  },
  plugins: [],
};
