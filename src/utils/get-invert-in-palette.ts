import Color from "color";
import type { ColourObject, Options } from "$types";

export default function getInvertInPalette(options: Options, palette: ColourObject, shade: string) {
  const paletteColours = (
    Object.entries(palette).filter(
      ([key, value]) =>
        !options.ignoredKeys.includes(key) &&
        key !== "DEFAULT" &&
        typeof value === "string" &&
        !["inherit", "currentColor", "transparent", "auto"].includes(value),
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
