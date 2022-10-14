import c from "tailwindcss/colors";
import getInvertInPalette from "./get-invert-in-palette";
import type { ColourObject } from "$types";

it("Should return correct colour for default `red` scale", () => {
  for (let i = 100; i <= 900; i += 100)
    expect(getInvertInPalette(c.red, i.toString())).toBe(
      c.red[(1000 - i).toString() as keyof typeof c.red],
    );
});

it("Should work for `black` and `white` in default Tailwind config", () => {
  expect(getInvertInPalette({ ...c }, "black")).toBe(c.white);
  expect(getInvertInPalette({ ...c }, "white")).toBe(c.black);
});

it("Should work for nested colours", () => {
  const colour: ColourObject = {
    ...c.red,
    "purple-red": { ...c.pink },
    "yellow-red": { ...c.orange },
  };
  expect(getInvertInPalette(colour, "400")).toBe(c.red["600"]);
  expect(getInvertInPalette(colour["purple-red"] as ColourObject, "400")).toBe(c.pink["600"]);
  expect(getInvertInPalette(colour["yellow-red"] as ColourObject, "400")).toBe(c.orange["600"]);
});
