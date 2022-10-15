const { join } = require("path");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [join(__dirname, "pages/**/*.tsx"), join(__dirname, "components/**/*.tsx")],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [require("../dist/index.js")],
};
