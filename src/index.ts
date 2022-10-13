import * as plugin from "tailwindcss/plugin";

export = plugin(({ addComponents }) => {
  addComponents({
    ".test-class": {
      color: "red",
    },
  });
});
