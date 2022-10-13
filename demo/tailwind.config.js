const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [require("path").join(__dirname, "pages/**/*.tsx")],
  theme: {
    extend: {
      colors: {
        short: "black",
        "my-own-color": {
          DEFAULT: "#ff0000",
          "very-nested": {
            "in-more-level": colors.blue,
          },
          ...colors.green,
        },
      },
    },
  },
  plugins: [require("../dist/index.js")],
};
