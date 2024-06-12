import colourToCSS from "./colour-to-css";
import defaultOptions from "../default-options";
import type { ExtendedOptions, GenerateUtilsProps } from "$types";

const options: ExtendedOptions = {
  ...defaultOptions,
  darkModeSelectors: ["@media (prefers-color-scheme: dark)"],
};

const f: GenerateUtilsProps["func"] = (value: string) => ({ color: value });

it("Should work with dark mode colour", () => {
  expect(colourToCSS(options, ["#000000", "#ffffff"], f)).toEqual({
    color: "#000000",
    "@media (prefers-color-scheme: dark)": { color: "#ffffff" },
  });
});

it("Should work with single colour", () => {
  expect(colourToCSS(options, "#000000", f)).toEqual({
    color: "#000000",
    "@media (prefers-color-scheme: dark)": { color: "#000000" },
  });
});

it("Should work with `nonInvertBehaviour` set to `no-dark`", () => {
  expect(colourToCSS({ ...options, nonInvertBehaviour: "no-dark" }, "#000000", f)).toEqual({
    color: "#000000",
  });
});

it("Should work with one custom CSS dark mode selector", () => {
  expect(
    colourToCSS({ ...options, darkModeSelectors: [".dark &"] }, ["#000000", "#ffffff"], f),
  ).toEqual({ color: "#000000", ".dark &": { color: "#ffffff" } });
});

it("Should work with more than one custom CSS dark mode selectors", () => {
  expect(
    colourToCSS(
      {
        ...options,
        darkModeSelectors: ["&:not(.light *)", "&:is(.dark *)"],
      },
      ["#000000", "#ffffff"],
      f,
    ),
  ).toEqual({
    color: "#000000",
    "&:not(.light *)": { color: "#ffffff" },
    "&:is(.dark *)": { color: "#ffffff" },
  });
});

it("Should work with nested CSS selectors", () => {
  expect(
    colourToCSS(
      {
        ...options,
        darkModeSelectors: [
          "@media (prefers-color-scheme: dark) { &:not(.light *) }",
          "&:is(.dark *)",
        ],
      },
      ["#000000", "#ffffff"],
      f,
    ),
  ).toEqual({
    color: "#000000",
    "@media (prefers-color-scheme: dark)": {
      "&:not(.light *)": { color: "#ffffff" },
    },
    "&:is(.dark *)": { color: "#ffffff" },
  });
});
