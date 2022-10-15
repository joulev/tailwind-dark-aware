import c from "tailwindcss/colors";
import getInvertInPalette from "./get-invert-in-palette";
import options from "../default-options";
import type { ColourObject } from "$types";

it("Should return correct colour for default `red` scale", () => {
  for (let i = 100; i <= 900; i += 100)
    expect(getInvertInPalette(options, c.red, i.toString())).toBe(
      c.red[(1000 - i).toString() as keyof typeof c.red],
    );
});

it("Should return correct colour with some keys being ignored", () => {
  const customOptions = { ...options, ignoredKeys: ["300", "800"] };
  const arr = [50, 100, 200, 400, 500, 600, 700, 900];
  for (let i = 0; i < arr.length; i++)
    expect(getInvertInPalette(customOptions, c.red, arr[i].toString())).toBe(
      c.red[arr[arr.length - 1 - i].toString() as keyof typeof c.red],
    );
});

it("Should work for `black` and `white` in default Tailwind config", () => {
  expect(getInvertInPalette(options, { ...c }, "black")).toBe(c.white);
  expect(getInvertInPalette(options, { ...c }, "white")).toBe(c.black);
});

it("Should work for nested colours", () => {
  const colour: ColourObject = {
    ...c.red,
    "purple-red": { ...c.pink },
    "yellow-red": { ...c.orange },
  };
  expect(getInvertInPalette(options, colour, "400")).toBe(c.red["600"]);
  expect(getInvertInPalette(options, colour["purple-red"] as ColourObject, "400")).toBe(
    c.pink["600"],
  );
  expect(getInvertInPalette(options, colour["yellow-red"] as ColourObject, "400")).toBe(
    c.orange["600"],
  );
});
