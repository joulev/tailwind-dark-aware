import colourToCSS from "./colour-to-css";
import defaultOptions from "../default-options";
import type { ExtendedOptions, GenerateUtilsProps } from "$types";

const options: ExtendedOptions = {
  ...defaultOptions,
  darkModeSelector: "@media (prefers-color-scheme: dark)",
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

it("Should work with custom CSS dark mode selector", () => {
  expect(
    colourToCSS({ ...options, darkModeSelector: ".dark &" }, ["#000000", "#ffffff"], f),
  ).toEqual({ color: "#000000", ".dark &": { color: "#ffffff" } });
});
