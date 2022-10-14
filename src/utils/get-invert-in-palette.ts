import Color from "color";
import type { ColourObject } from "$types";

export default function getInvertInPalette(palette: ColourObject, shade: string) {
  const paletteColours = (
    Object.entries(palette).filter(
      ([key, value]) =>
        key !== "50" &&
        key !== "DEFAULT" &&
        typeof value === "string" &&
        !["inherit", "currentColor", "transparent"].includes(value),
    ) as [string, string][]
  )
    .map(([key, val]) => ({
      shade: key,
      hex: val,
      luminosity: Color(val).luminosity(),
    }))
    .sort((a, b) => a.luminosity - b.luminosity);

  const curColourIndex = paletteColours.findIndex((c) => c.shade === shade);
  const invert = paletteColours[paletteColours.length - 1 - curColourIndex].hex;
  return invert;
}
