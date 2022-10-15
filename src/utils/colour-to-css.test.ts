import colourToCSS from "./colour-to-css";
import options from "../default-options";

it("Should work with dark mode colour", () => {
  expect(colourToCSS(options, ["#000000", "#ffffff"], "&", "color", "--tw")).toEqual({
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
  expect(colourToCSS(options, "#000000", "&", "color", "--tw")).toEqual({
    "&": {
      "--tw": "1",
      color: "rgb(0 0 0 / var(--tw))",
    },
  });
});

it("Should work with `nonInvertBehaviour` set to `same-dark`", () => {
  expect(
    colourToCSS({ ...options, nonInvertBehaviour: "same-dark" }, "#000000", "&", "color", "--tw"),
  ).toEqual({
    "&": {
      "--tw": "1",
      color: "rgb(0 0 0 / var(--tw))",
    },
    "@media (prefers-color-scheme: dark)": {
      "&": {
        "--tw": "1",
        color: "rgb(0 0 0 / var(--tw))",
      },
    },
  });
});

it("Should work for colours with alpha", () => {
  expect(colourToCSS(options, "rgba(0, 0, 0, 0.5)", "&", "color", "--tw")).toEqual({
    "&": {
      color: "rgba(0, 0, 0, 0.5)",
    },
  });
});

it("Should work for multiple properties", () => {
  expect(colourToCSS(options, "#000000", "&", ["color", "background"], "--tw")).toEqual({
    "&": {
      "--tw": "1",
      color: "rgb(0 0 0 / var(--tw))",
      background: "rgb(0 0 0 / var(--tw))",
    },
  });
});

it("Should also work if opacity core module is disabled", () => {
  expect(colourToCSS(options, "#000000", "&", "color", undefined)).toEqual({
    "&": { color: "#000000" },
  });
});

it("Should work with custom CSS added", () => {
  expect(colourToCSS(options, "#000000", "&", "color", undefined, { "font-size": "1rem" })).toEqual(
    {
      "&": { color: "#000000", "font-size": "1rem" },
    },
  );
});
