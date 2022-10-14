import colourToCSS from "./colour-to-css";

test("Should work with dark mode colour", () => {
  expect(colourToCSS(["#000000", "#ffffff"])).toEqual({
    color: "#000000",
    "@media (prefers-color-scheme: dark)": {
      color: "#ffffff",
    },
  });
});

test("Should work with single colour", () => {
  expect(colourToCSS("#000000")).toEqual({
    color: "#000000",
  });
});
