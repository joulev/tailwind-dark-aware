/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [require("path").join(__dirname, "pages/**/*.tsx")],
  theme: { extend: {} },
  plugins: [require("../dist/index.js")],
};
