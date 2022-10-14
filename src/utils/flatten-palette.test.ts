import flattenPalette from "./flatten-palette";
import type { ColourObject } from "$types";

it("Should work for default Tailwind colour palette", () => {
  const flattened = flattenPalette(require("tailwindcss/colors"));
  expect(flattened).toMatchSnapshot();
});

it("Should pass trivial usage", () => {
  const colours: ColourObject = {
    red: { light: "0", dark: "1" },
    blue: { light: "2", dark: "3" },
  };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({
    "red-light": ["red", "light"],
    "red-dark": ["red", "dark"],
    "blue-light": ["blue", "light"],
    "blue-dark": ["blue", "dark"],
  });
});

it("Should work with nested colours", () => {
  const colours: ColourObject = {
    red: { light: "0", dark: "1", nested: { light: "2", dark: "3" } },
  };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({
    "red-light": ["red", "light"],
    "red-dark": ["red", "dark"],
    "red-nested-light": ["red.nested", "light"],
    "red-nested-dark": ["red.nested", "dark"],
  });
});

it('Should work with "global" colours', () => {
  const colours: ColourObject = {
    primary: "0",
    red: { light: "1", dark: "2" },
  };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({
    primary: ["", "primary"],
    "red-light": ["red", "light"],
    "red-dark": ["red", "dark"],
  });
});

it("Should ignore instances of inherit, currentColor, transparent and auto", () => {
  const colours: ColourObject = {
    inherit: "inherit",
    currentColor: "currentColor",
    transparent: "transparent",
    auto: "auto",
    red: {
      light: "0",
      inherit: "inherit",
      currentColor: "currentColor",
      transparent: "transparent",
      auto: "auto",
    },
  };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({ "red-light": ["red", "light"] });
});

it("Should ignore colours of key `50`", () => {
  const colours: ColourObject = { red: { light: "0", 50: "1" } };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({ "red-light": ["red", "light"] });
});

it("Should handle `DEFAULT` correctly", () => {
  const colours: ColourObject = {
    red: {
      light: "0",
      DEFAULT: "1",
      dark: "2",
      nested: { light: "3", DEFAULT: "4", dark: "5" },
    },
  };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({
    "red-light": ["red", "light"],
    red: ["red", "DEFAULT"],
    "red-dark": ["red", "dark"],
    "red-nested-light": ["red.nested", "light"],
    "red-nested": ["red.nested", "DEFAULT"],
    "red-nested-dark": ["red.nested", "dark"],
  });
});

it("Should handle `undefined`", () => {
  const flattened = flattenPalette(undefined);
  expect(flattened).toStrictEqual({});
});

it("Should exclude global DEFAULT colour", () => {
  // if some idiot decides to use the name "DEFAULT" for a global colour...
  const colours: ColourObject = { DEFAULT: "0" };
  const flattened = flattenPalette(colours);
  expect(flattened).toStrictEqual({});
});
