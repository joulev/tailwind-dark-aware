import colourToCSS from "./colour-to-css";

it("Should work with dark mode colour", () => {
  expect(colourToCSS(["#000000", "#ffffff"], "&", "color", "--tw")).toEqual({
    "&": {
      "--tw": "1",
      color: "rgb(0 0 0 / var(--tw))",
    },
    "@media (prefers-color-scheme: dark)": {
      "&": {
        "--tw": "1",
        color: "rgb(255 255 255 / var(--tw))",
      },
    },
  });
});

it("Should work with single colour", () => {
  expect(colourToCSS("#000000", "&", "color", "--tw")).toEqual({
    "&": {
      "--tw": "1",
      color: "rgb(0 0 0 / var(--tw))",
    },
  });
});

it("Should work for colours with alpha", () => {
  expect(colourToCSS("rgba(0, 0, 0, 0.5)", "&", "color", "--tw")).toEqual({
    "&": {
      color: "rgba(0, 0, 0, 0.5)",
    },
  });
});

it("Should work for multiple properties", () => {
  expect(colourToCSS("#000000", "&", ["color", "background"], "--tw")).toEqual({
    "&": {
      "--tw": "1",
      color: "rgb(0 0 0 / var(--tw))",
      background: "rgb(0 0 0 / var(--tw))",
    },
  });
});

it("Should also work if opacity core module is disabled", () => {
  expect(colourToCSS("#000000", "&", "color")).toEqual({ "&": { color: "#000000" } });
});
